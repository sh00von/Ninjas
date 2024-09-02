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
  const [year, setYear] = useState(2022);

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

    // Parse CSV data correctly
    csv("/totalghg.csv").then((data) => {
      const ghg = {};
      data.forEach((row) => {
        const country = row.Country;
        ghg[country] = {};
        Object.keys(row).forEach((key) => {
          if (key !== "Country") {
            ghg[country][key] = parseFloat(row[key]) || 0; // Parse float and handle NaN
          }
        });
      });
      setGhgData(ghg);
    }).catch((error) => console.error("Error fetching GHG data:", error));

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
      if (selectedCountries.includes(countryName)) {
        setSelectedCountries(
          selectedCountries.filter((country) => country !== countryName)
        );
      } else {
        setSelectedCountries([...selectedCountries, countryName]);
      }
      setSelectedCountry("");
    } else {
      setSelectedCountry(countryName);
      setSelectedCountries([countryName]);
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
    svg.transition().duration(750).call(zoom.scaleBy, 1.4);
  };

  const zoomOut = () => {
    const svg = select(svgRef.current);
    const zoom = zoomRef.current;
    svg.transition().duration(750).call(zoom.scaleBy, 0.6);
  };

  const dataForChart = selectedCountries.map((country) => ({
    name: country,
    GHG: ghgData[country] ? ghgData[country][year] || 0 : 0,
  }));

  const singleCountryData = selectedCountry
    ? [
        {
          name: selectedCountry,
          GHG: ghgData[selectedCountry] ? ghgData[selectedCountry][year] || 0 : 0,
        },
      ]
    : [];

  const handleYearChange = (event) => {
    setYear(Number(event.target.value));
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-gray-100">
      <div className="relative sticky top-0 h-16 flex items-center justify-center bg-white shadow-md">
        <h1 className="text-xl font-bold">GHG Emission Data ({year})</h1>
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64">
  <input
    type="range"
    min={1970}
    max={2022}
    value={year}
    onChange={handleYearChange}
    className="w-full h-4 appearance-none cursor-pointer"
    style={{
      background: `linear-gradient(to right, rgba(255, 205, 205, 0.5) 0%, rgba(255, 0, 0, 0.8) 100%)`
    }}
  />
  <div className="flex justify-between text-sm mt-1">
    <span>1970</span>
    <span>{year}</span>
    <span>2022</span>
  </div>
</div>

        <svg ref={svgRef} width="100%" height="100%">
          <g className="countries">
            {geographies.map((geo, i) => {
              const countryName = geo.properties.name;
              const dataValue = ghgData[countryName] ? ghgData[countryName][year] || 0 : 0;
              const colorIntensity = dataValue > 0 ? `rgb(${255 - Math.min(dataValue * 2, 255)}, 0, ${Math.min(dataValue * 2, 255)})` : "#ddd";

              return (
                <path
                  key={i}
                  d={geoPath().projection(projection)(geo)}
                  fill={colorIntensity}
                  stroke="#333"
                  strokeWidth={0.5}
                  onClick={() => handleCountryClick(countryName)}
                />
              );
            })}
          </g>
          <g className="markers">
  {Object.keys(countryCoords).map((country, index) => {
    const coords = countryCoords[country];
    
    if (coords) {
      const [longitude, latitude] = coords;
      const [x, y] = projection([longitude, latitude]);

      // Get the GHG value for the current country and year
      const ghgValue = ghgData[country]?.[year] || 0;

      // Define colors for different emission categories
      let fillColor;
      if (ghgValue > 500) {
        // Extreme Emission: Dark Red
        fillColor = '#660000';
      } else if (ghgValue > 100) {
        // Very High Emission: Red
        fillColor = '#cc0000';
      } else if (ghgValue > 50) {
        // High Emission: Orange
        fillColor = '#ff6600';
      } else if (ghgValue > 10) {
        // Moderate Emission: Yellow
        fillColor = '#ffff00';
      } else {
        // Low Emission: Light Green
        fillColor = '#99ff99';
      }

      // Determine the radius of the circle based on whether the country is selected
      const radius = selectedCountries.includes(country) ? 5 : 3;

      return (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={radius}
          fill={fillColor}
          stroke="#FFF"
          strokeWidth={1}
          style={{ cursor: "pointer" }}
          onClick={() => handleCountryClick(country)}
        />
      );
    }

    return null;
  })}
</g>

        </svg>
      </div>
      <div className="absolute bottom-8 right-4 w-1/3 bg-white p-4 border border-gray-300 rounded-md shadow-md">
        {comparisonMode && selectedCountries.length > 1 ? (
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
        ) : selectedCountry ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{selectedCountry}</h2>
            <p className="mt-2 text-lg">GHG Emissions: {singleCountryData[0]?.GHG || 0}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600">Select a country to view details</p>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
