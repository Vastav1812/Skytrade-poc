"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const anchor = __importStar(require("@project-serum/anchor"));
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const DynamicAirspacePartition_1 = require("../contracts/DynamicAirspacePartition");
const dotenv = __importStar(require("dotenv"));
async function main() {
    // Load environment variables
    dotenv.config();
    // Set up connection to Solana
    const connection = new web3_js_1.Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
    // Set up provider
    const wallet = new anchor.Wallet(anchor.web3.Keypair.generate());
    const provider = new anchor.AnchorProvider(connection, wallet, {
        commitment: 'confirmed',
    });
    // Load program ID from environment
    const programId = new web3_js_1.PublicKey(process.env.PROGRAM_ID || 'Fs2rrrdNmwwnNG49Dad2SJGxPCg8Mk5gMzvDBsf1bFjL');
    // Load IDL
    const idl = require('../idl/skytrade.json');
    // Create program instance - pass programId directly instead of using provider.programId
    const program = new anchor_1.Program(idl, programId, provider);
    console.log('Demo starting with program ID:', programId.toString());
    // Initialize DynamicAirspacePartition
    const dap = new DynamicAirspacePartition_1.DynamicAirspacePartition(program, provider);
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
    console.log('Generating proof for flight path from', flightPath.coordinates[0].lat, flightPath.coordinates[0].lng, 'to', flightPath.coordinates[flightPath.coordinates.length - 1].lat, flightPath.coordinates[flightPath.coordinates.length - 1].lng);
    // Simulate proof generation
    console.log('Flight proof generated successfully (simulated)');
    console.log('\nDemo completed successfully!');
}
main().then(() => process.exit(0), (err) => {
    console.error(err);
    process.exit(1);
});
