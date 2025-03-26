# SkyTrade: Decentralized Air Rights Marketplace

## Overview

SkyTrade is a revolutionary blockchain platform enabling property owners to monetize their airspace while providing drone operators with efficient access to flight corridors. The platform connects air rights holders with the growing drone delivery and urban air mobility markets through a decentralized marketplace.

## Tech Stack

- **Blockchain**: Solana (for high throughput and low transaction costs)
- **Smart Contracts**: Anchor framework for Solana program development
- **Frontend**: 
  - React 18 with TypeScript
  - Vite for fast development and optimized builds
  - Material-UI for responsive component design
- **Mapping Technology**:
  - Mapbox GL for 3D map rendering
  - React Map GL for React integration
- **State Management**: React Context API
- **Routing**: React Router v6
- **Testing**: 
  - Jest for unit testing
  - Mocha for smart contract tests
- **Development Tools**:
  - ESLint for code quality
  - TypeScript for type safety
  - GitHub Actions for CI/CD

## Repository Structure

```
skytrade-poc/
├── contracts/               # Smart contract implementations
│   ├── DynamicAirspacePartition.ts
│   └── ProofOfFlight.ts
├── frontend-new/            # React frontend application
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   └── public/              # Static assets
├── scripts/                 # Utility scripts
│   └── demo.ts              # Simulation demo
├── tests/                   # Test files
└── package.json             # Project dependencies
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SkyTradeLinks/skytrade-poc.git
cd skytrade-poc
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Set up your environment variables:
```bash
npm run setup:env
```

4. Edit the `.env` file in the `frontend-new` directory to add your Mapbox token:
```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

## Integration Guide

### Integrating with Mapbox

1. Sign up for a free account at [Mapbox](https://www.mapbox.com/)
2. Create an access token in your Mapbox dashboard
3. Add the token to your `.env` file as described above

### Integrating with Solana

1. Install Solana CLI tools:
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
```

2. Set up a local development validator:
```bash
solana-test-validator
```

3. Configure your Solana connection in the `.env` file:
```
VITE_SOLANA_RPC_URL=http://localhost:8899
```

## Testing

### Running Frontend Tests

```bash
cd frontend-new
npm test
```

### Testing Smart Contracts

```bash
npm run test
```

### Running the Simulation Demo

```bash
npm run demo
```

This will simulate the DAP and PoF protocols, demonstrating:
- Airspace partitioning operations
- Generation and verification of flight proofs

### Manual Testing with the UI

1. Start the development server:
```bash
npm run dev
```

2. Open your browser to http://localhost:3000

3. Test the following features:
   - Dashboard metrics and visualization
   - Airspace map interaction (splitting/merging)
   - Flight simulation and proof generation
   - Navigation between different application views

## Contributing to SkyTrade

1. Fork the repository on GitHub
2. Create a feature branch
3. Make your changes and add appropriate tests
4. Ensure all tests pass and code meets linting standards
5. Submit a pull request with a detailed description of your changes

## Deployment

### Frontend Deployment

```bash
cd frontend-new
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

### Smart Contract Deployment

```bash
anchor build
anchor deploy
```

## Getting Help

If you encounter any issues or have questions about integrating with the SkyTrade platform, please:
1. Check the existing GitHub issues
2. Create a new issue with detailed information about your problem
3. Reach out to the development team through the GitHub Discussions tab

---

Thank you for your interest in contributing to the SkyTrade ecosystem! Together, we're building the infrastructure for the aerial economy of tomorrow. 