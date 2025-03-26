import { useState } from 'react';
import Map, { Source, Layer, LayerProps } from 'react-map-gl';
import { Box, Paper, Typography, Button, Slider, Stack, Stepper, Step, StepLabel } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// Set mapbox token from environment variables
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';
// @ts-ignore
mapboxgl.accessToken = MAPBOX_TOKEN;

// Mock data for airspaces
const DEMO_AIRSPACES = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: '1',
        name: 'Zone A',
        fee: 10,
        color: '#627BC1'
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
    'fill-color': ['get', 'color'],
    'fill-opacity': 0.5,
    'fill-outline-color': '#000'
  }
};

// Layer style for flight path
const flightPathStyle: LayerProps = {
  id: 'flight-path',
  type: 'line',
  paint: {
    'line-color': '#ff0000',
    'line-width': 3
  }
};

const FlightSimulator = () => {
  const [viewport, setViewport] = useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 12
  });

  const [activeStep, setActiveStep] = useState(0);
  const [altitude, setAltitude] = useState(100);
  const [speed, setSpeed] = useState(30);
  const [waypoints, setWaypoints] = useState<[number, number][]>([]);
  const [flightPath, setFlightPath] = useState<GeoJSON.Feature | null>(null);

  const steps = [
    'Plan Flight',
    'Simulate Flight',
    'Generate Proof',
    'Verify Proof'
  ];

  const handleAddWaypoint = (event: any) => {
    if (event.lngLat) {
      setWaypoints([...waypoints, [event.lngLat.lng, event.lngLat.lat]]);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    
    // Generate flight path when moving to simulate step
    if (activeStep === 0 && waypoints.length > 1) {
      const pathFeature: GeoJSON.Feature = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: waypoints
        }
      };
      setFlightPath(pathFeature);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const generateProof = () => {
    // Mock proof generation
    alert('Proof generated: mock_proof_' + Date.now());
    handleNext();
  };

  const verifyProof = () => {
    // Mock proof verification
    alert('Proof verified successfully!');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Map
          {...viewport}
          onMove={evt => setViewport(evt.viewState)}
          onClick={handleAddWaypoint}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <Source type="geojson" data={DEMO_AIRSPACES}>
            <Layer {...layerStyle} />
          </Source>
          {flightPath && (
            <Source type="geojson" data={flightPath}>
              <Layer {...flightPathStyle} />
            </Source>
          )}
        </Map>

        <Paper sx={{ position: 'absolute', top: 20, right: 20, p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Flight Controls</Typography>
            <Typography>Altitude: {altitude}m</Typography>
            <Slider
              value={altitude}
              onChange={(_, value) => setAltitude(value as number)}
              min={0}
              max={500}
              step={10}
            />
            <Typography>Speed: {speed}km/h</Typography>
            <Slider
              value={speed}
              onChange={(_, value) => setSpeed(value as number)}
              min={0}
              max={100}
              step={5}
            />
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Next
            </Button>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep === 2 && (
              <Button variant="contained" color="primary" onClick={generateProof}>
                Generate Proof
              </Button>
            )}
            {activeStep === 3 && (
              <Button variant="contained" color="secondary" onClick={verifyProof}>
                Verify Proof
              </Button>
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default FlightSimulator; 