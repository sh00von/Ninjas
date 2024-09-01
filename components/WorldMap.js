import React, { useState, useEffect, useRef } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { zoom as d3Zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import * as d3 from "d3";

const WorldMap = () => {
  const [geographies, setGeographies] = useState([]);
  const [countryCoords, setCountryCoords] = useState({});
  const [ghgData, setGhgData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const svgRef = useRef(null);

  const projection = geoEqualEarth()
    .scale(160)
    .translate([window.innerWidth / 2, window.innerHeight / 2]);

  useEffect(() => {
    fetch("/world-110m.json")
      .then(response => response.json())
      .then(worlddata => {
        setGeographies(feature(worlddata, worlddata.objects.countries).features);
      })
      .catch(error => console.error("Error fetching world data:", error));

    fetch("/latlong.json")
      .then(response => response.json())
      .then(data => {
        const coords = {};
        data.ref_country_codes.forEach(country => {
          coords[country.country] = [country.longitude, country.latitude];
        });
        setCountryCoords(coords);
      })
      .catch(error => console.error("Error fetching coordinates data:", error));

    d3.csv("/data.csv")
      .then(data => {
        const ghg = {};
        data.forEach(row => {
          ghg[row.Country] = parseFloat(row["2022"]);
        });
        setGhgData(ghg);
      })
      .catch(error => console.error("Error fetching GHG data:", error));

    const svg = select(svgRef.current);
    const zoom = d3Zoom()
      .scaleExtent([1, 8])
      .on("zoom", ({ transform }) => {
        svg.select("g.countries").attr("transform", transform);
        svg.select("g.markers").attr("transform", transform);
      });
    svg.call(zoom);

    return () => {
      svg.on(".zoom", null);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = Object.keys(countryCoords).filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    showZoomToCountry(countryName);
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

      // Zoom into the country
      const svg = select(svgRef.current);
      const zoom = d3Zoom()
        .scaleExtent([1, 8])
        .translateExtent([[0, 0], [window.innerWidth, window.innerHeight]])
        .on("zoom", ({ transform }) => {
          svg.select("g.countries").attr("transform", transform);
          svg.select("g.markers").attr("transform", transform);
        });
      svg.transition().duration(750).call(
        zoom.transform,
        zoomIdentity.translate(window.innerWidth / 2 - x * 4, window.innerHeight / 2 - y * 4).scale(4)
      );
    } else {
      console.error(`Coordinates for ${countryName} are not available.`);
    }
  };

  const getMarkerColor = (countryName) => {
    return countryName === selectedCountry ? "#208ac2" : "#E91E63";
  };

  return (
    <div className="relative w-full h-full flex">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="absolute top-4 left-4 p-2 border border-gray-300 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-12 left-4 bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto z-10">
          {suggestions.map((country, index) => (
            <li
              key={`suggestion-${index}`}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
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
              fill="#B0BEC5" // Default color for countries
              stroke="#000"
              strokeWidth={0.5}
              onClick={() => handleCountryClick(d.properties.name)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </g>
        <g className="markers">
          {Object.entries(countryCoords).map(([country, coords], i) => (
            <circle
              key={`marker-${i}`}
              cx={projection(coords)[0]}
              cy={projection(coords)[1]}
              r={5}
              fill={getMarkerColor(country)}
              stroke="#FFFFFF"
              className="marker"
              onClick={() => handleCountryClick(country)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </g>
      </svg>
      {selectedCountry && (
        <div className="absolute top-4 right-4 bg-white p-4 border border-gray-300 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">{selectedCountry}</h3>
          <p>GHG Emission: {ghgData[selectedCountry] || "No data"} GHG</p>
          <p>Coordinates: {countryCoords[selectedCountry]?.join(", ") || "No data"}</p>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
