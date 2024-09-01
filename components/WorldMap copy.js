import React, { useState, useEffect, useRef } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { zoom as d3Zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import { csv } from "d3-fetch";
import { FaPlus, FaMinus, FaChartBar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const WorldMap = () => {
  const [geographies, setGeographies] = useState([]);
  const [countryCoords, setCountryCoords] = useState({});
  const [ghgData, setGhgData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const svgRef = useRef(null);
  const zoomRef = useRef(null);

  const projection = geoEqualEarth()
    .scale(160)
    .translate([window.innerWidth / 2, window.innerHeight / 2]);

  useEffect(() => {
    fetch("/world-110m.json")
      .then((response) => response.json())
      .then((worlddata) => {
        setGeographies(
          feature(worlddata, worlddata.objects.countries).features
        );
      })
      .catch((error) => console.error("Error fetching world data:", error));

    fetch("/latlong.json")
      .then((response) => response.json())
      .then((data) => {
        const coords = {};
        data.ref_country_codes.forEach((country) => {
          coords[country.country] = [country.longitude, country.latitude];
        });
        setCountryCoords(coords);
      })
      .catch((error) =>
        console.error("Error fetching coordinates data:", error)
      );

    csv("/data.csv")
      .then((data) => {
        const ghg = {};
        data.forEach((row) => {
          ghg[row.Country] = parseFloat(row["2022"]);
        });
        setGhgData(ghg);
      })
      .catch((error) => console.error("Error fetching GHG data:", error));

    const svg = select(svgRef.current);
    const zoom = d3Zoom()
      .scaleExtent([1, 8])
      .on("zoom", ({ transform }) => {
        svg.select("g.countries").attr("transform", transform);
        svg.select("g.markers").attr("transform", transform);
      });
    svg.call(zoom);
    zoomRef.current = zoom;

    return () => {
      svg.on(".zoom", null);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = Object.keys(countryCoords).filter((country) =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleCountryClick = (countryName) => {
    if (comparisonMode) {
      // Toggle country selection for comparison mode
      if (selectedCountries.includes(countryName)) {
        setSelectedCountries(
          selectedCountries.filter((country) => country !== countryName)
        );
      } else {
        setSelectedCountries([...selectedCountries, countryName]);
      }
      setSelectedCountry(""); // Clear single selection if in comparison mode
    } else {
      // Default behavior: zoom to country and show single data
      setSelectedCountry(countryName);
      setSelectedCountries([countryName]); // Only keep the single selected country
      showZoomToCountry(countryName);
    }
  };

  const handleSuggestionClick = (country) => {
    setSearchTerm(country);
    setSuggestions([]);
    handleCountryClick(country);
  };

  const showZoomToCountry = (countryName) => {
    const coords = countryCoords[countryName];
    if (coords) {
      const [longitude, latitude] = coords;
      const [x, y] = projection([longitude, latitude]);

      const svg = select(svgRef.current);
      const zoom = zoomRef.current;

      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          zoomIdentity
            .translate(window.innerWidth / 2 - x * 4, window.innerHeight / 2 - y * 4)
            .scale(4)
        );
    } else {
      console.error(`Coordinates for ${countryName} are not available.`);
    }
  };

  const zoomIn = () => {
    const svg = select(svgRef.current);
    const zoom = zoomRef.current;
    svg.transition().duration(750).call(zoom.scaleBy, 1.2);
  };

  const zoomOut = () => {
    const svg = select(svgRef.current);
    const zoom = zoomRef.current;
    svg.transition().duration(750).call(zoom.scaleBy, 0.8);
  };

  const dataForChart = selectedCountries.map((country) => ({
    name: country,
    GHG: ghgData[country] || 0,
  }));

  const singleCountryData = selectedCountry
    ? [
        {
          name: selectedCountry,
          GHG: ghgData[selectedCountry] || 0,
        },
      ]
    : [];

  return (
    <div className="relative w-full h-screen flex flex-col">
      <div className="relative sticky top-0 h-16 flex items-center justify-center bg-white shadow-md">
        <h1 className="text-xl font-bold ">GHG Emission 2022</h1>
      </div>
      <div className="relative flex-grow">
        <div className="absolute left-4 bottom-16 flex space-x-2 items-center">
          <button
            onClick={() => {
              if (comparisonMode) {
                setSelectedCountries([]);
                setSelectedCountry("");
              }
              setComparisonMode(!comparisonMode);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            {comparisonMode ? "Disable Comparison" : "Enable Comparison"}
          </button>
          <button
            onClick={zoomIn}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <FaPlus />
          </button>
          <button
            onClick={zoomOut}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <FaMinus />
          </button>
          {comparisonMode && selectedCountries.length > 0 && (
            <button
              onClick={() => setComparisonMode(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
              <FaChartBar />
            </button>
          )}
        </div>
        <div className="absolute top-4 left-4 w-64">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto z-10 absolute w-full">
              {suggestions.map((country, index) => (
                <li
                  key={`suggestion-${index}`}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(country)}
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <svg
          ref={svgRef}
          className="w-full h-full"
          width="100%"
          height="100%"
          viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <g className="countries">
            {geographies.map((d, i) => (
              <path
                key={`path-${i}`}
                d={geoPath().projection(projection)(d)}
                fill={
                  selectedCountries.includes(d.properties.name)
                    ? "#FFEB3B"
                    : "#B0BEC5"
                } // Highlight selected countries
                stroke="#000"
                strokeWidth={0.5}
                onClick={() => handleCountryClick(d.properties.name)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </g>
          <g className="markers">
            {Object.entries(countryCoords).map(([country, coords], i) => (
              <circle
                key={`marker-${i}`}
                cx={projection(coords)[0]}
                cy={projection(coords)[1]}
                r={selectedCountries.includes(country) ? 8 : 5}
                fill={
                  selectedCountries.includes(country) ? "#FF5722" : "#00BCD4"
                } // Highlight selected countries
                stroke="#FFF"
                strokeWidth={1}
                style={{ cursor: "pointer" }}
                onClick={() => handleCountryClick(country)}
              />
            ))}
          </g>
        </svg>
      </div>
      {!comparisonMode && selectedCountry && singleCountryData.length > 0 && (
          <div className="absolute top-16 right-4 w-1/3 bg-white p-4 border border-gray-300 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Single Country Data</h3>
            <p className="mt-2 text-sm">Country: {singleCountryData[0].name}</p>
            <p className="text-sm">GHG Emission: {singleCountryData[0].GHG} tons</p>
          </div>
        )}
        {comparisonMode && selectedCountries.length > 0 && (
          <div className="absolute bottom-8 right-4 w-1/3 bg-white p-4 border border-gray-300 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Comparison Chart</h3>
            <BarChart
              width={400}
              height={200}
              data={dataForChart}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="GHG" fill="#da702f" />
            </BarChart>
          </div>
        )}
    </div>
  );
};

export default WorldMap;
