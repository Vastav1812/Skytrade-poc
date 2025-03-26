# SkyTrade Frontend

This is the frontend application for the SkyTrade platform, a decentralized marketplace for air rights trading and drone flight management.

## Features

- Interactive airspace map visualization
- Real-time drone flight simulation
- Proof of Flight (PoF) verification
- Dynamic airspace partitioning
- User dashboard with portfolio management

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skytrade.git
cd skytrade/frontend-new
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
VITE_SOLANA_RPC_URL=your_solana_rpc_url_here
```

## Mapbox Token Setup

The application uses Mapbox for map visualization. You need to set up a Mapbox token to use the maps:

1. Sign up for a free account at [Mapbox](https://www.mapbox.com/)
2. Create an access token in your Mapbox account
3. Create a `.env` file in the root directory of the frontend project
4. Add your Mapbox token to the `.env` file:
   ```
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```

Without a valid Mapbox token, the map components will not function properly and will show errors in the console.

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
frontend-new/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── AirspaceMap.tsx
│   │   ├── FlightSimulator.tsx
│   │   └── Navigation.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── index.html
│   └── manifest.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .eslintrc.json
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Material-UI
- React Map GL
- React Router
- Mapbox GL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.