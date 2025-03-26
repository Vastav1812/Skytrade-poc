import { useState, useEffect } from 'react';
import Map, { Source, Layer, LayerProps } from 'react-map-gl';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// Set mapbox token from environment variables
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';
// @ts-ignore
mapboxgl.accessToken = MAPBOX_TOKEN;

// Mock data for airspace parcels
const DEMO_AIRSPACES = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: '1',
        name: 'Downtown Zone',
        utilization: 85,
        value: 25000,
        owner: 'City Corp'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-74.006, 40.7128],
          [-74.006, 40.7228],
          [-73.996, 40.7228],
          [-73.996, 40.7128],
          [-74.006, 40.7128]
        ]]
      }
    }
  ]
};

// Layer style for airspace visualization
const layerStyle: LayerProps = {
  id: 'airspace-layer',
  type: 'fill',
  paint: {
    'fill-color': '#627BC1',
    'fill-opacity': 0.5,
    'fill-outline-color': '#000'
  }
};

const AirspaceMap = () => {
  const [viewport, setViewport] = useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 12
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6">Airspace Map</Typography>
          <Button variant="contained" color="primary">
            Split Airspace
          </Button>
          <Button variant="contained" color="secondary">
            Merge Airspaces
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Map
          {...viewport}
          onMove={evt => setViewport(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <Source type="geojson" data={DEMO_AIRSPACES}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </Box>
    </Box>
  );
};

export default AirspaceMap; 