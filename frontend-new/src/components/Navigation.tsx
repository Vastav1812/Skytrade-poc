import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SkyTrade
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/airspace"
          >
            Airspace Map
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/simulator"
          >
            Flight Simulator
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 