import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

const API_KEY = '7873f91ccdaa44919ff595db0ac6d32e'; // Replace with your OpenCage API key

const getCoordinates = async (country) => {
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: country,
        key: API_KEY,
        language: 'en',
        pretty: 1
      }
    });
    const results = response.data.results;
    if (results.length > 0) {
      return results[0].geometry; // Return the first result's geometry
    }
  } catch (error) {
    console.error(`Error fetching coordinates for ${country}:`, error);
  }
  return null;
};

const Map = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      axios.get('/data.csv')
        .then(async (response) => {
          // Parse CSV data
          const parsedData = response.data.split('\n').slice(1).map(line => {
            const [country, value] = line.split(',');
            return { country, value: parseFloat(value) };
          });

          // Fetch coordinates for each country
          const dataWithCoordinates = await Promise.all(parsedData.map(async entry => {
            const coordinates = await getCoordinates(entry.country);
            return { ...entry, coordinates };
          }));

          setData(dataWithCoordinates);
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">GHG Emissions by Country (2022)</h1>
      {typeof window !== 'undefined' && (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '80vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.map((entry, index) => {
            const { coordinates } = entry;
            return coordinates ? (
              <Marker key={index} position={[coordinates.lat, coordinates.lng]}>
                <Popup>
                  <div>
                    <strong>{entry.country}</strong><br />
                    GHG Emissions in 2022: {entry.value.toFixed(2)} units
                  </div>
                </Popup>
              </Marker>
            ) : null;
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
