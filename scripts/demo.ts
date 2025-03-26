import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { PublicKey, Connection } from '@solana/web3.js';
import { DynamicAirspacePartition } from '../contracts/DynamicAirspacePartition';
import { ProofOfFlight } from '../contracts/ProofOfFlight';
import * as dotenv from 'dotenv';

async function main() {
    // Load environment variables
    dotenv.config();

    // Set up connection to Solana
    const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
    
    // Set up provider
    const wallet = new anchor.Wallet(anchor.web3.Keypair.generate());
    const provider = new anchor.AnchorProvider(connection, wallet, {
        commitment: 'confirmed',
    });
    
    // Load program ID from environment
    const programId = new PublicKey(process.env.PROGRAM_ID || 'Fs2rrrdNmwwnNG49Dad2SJGxPCg8Mk5gMzvDBsf1bFjL');
    
    // Load IDL
    const idl = require('../idl/skytrade.json');
    
    // Create program instance - pass programId directly instead of using provider.programId
    const program = new Program(idl, programId, provider);
    
    console.log('Demo starting with program ID:', programId.toString());
    
    // Initialize DynamicAirspacePartition
    const dap = new DynamicAirspacePartition(program, provider);
    
    // Demo 1: Create airspace
    console.log('\n--- Demo 1: Create Airspace ---');
    
    // Define airspace bounds (NYC area)
    const bounds = {
        north: 40.7831,
        south: 40.7036,
        east: -73.9712,
        west: -74.0479,
        height: 500,
    };
    
    console.log('Creating airspace with bounds:', JSON.stringify(bounds, null, 2));
    
    // This would normally call the airspace creation function
    // For demo, we'll just simulate it
    console.log('Airspace created successfully (simulated)');
    
    // Demo 2: Split airspace
    console.log('\n--- Demo 2: Split Airspace ---');
    console.log('Splitting airspace at lat: 40.7433, lng: -74.0096');
    
    // Simulate splitting
    console.log('Airspace split into 2 partitions (simulated)');
    
    // Demo 3: Proof of Flight
    console.log('\n--- Demo 3: Proof of Flight ---');
    
    // Create a flight path
    const flightPath = {
        coordinates: [
            { lat: 40.7128, lng: -74.0060, altitude: 300, timestamp: Date.now() },
            { lat: 40.7129, lng: -74.0065, altitude: 320, timestamp: Date.now() + 5000 },
            { lat: 40.7135, lng: -74.0070, altitude: 350, timestamp: Date.now() + 10000 },
        ],
        airspaceTokens: [programId], // Simplified for demo
    };
    
    console.log('Generating proof for flight path from', flightPath.coordinates[0].lat, 
        flightPath.coordinates[0].lng, 'to', 
        flightPath.coordinates[flightPath.coordinates.length - 1].lat,
        flightPath.coordinates[flightPath.coordinates.length - 1].lng);
    
    // Simulate proof generation
    console.log('Flight proof generated successfully (simulated)');
    
    console.log('\nDemo completed successfully!');
}

main().then(
    () => process.exit(0),
    (err) => {
        console.error(err);
        process.exit(1);
    }
); 