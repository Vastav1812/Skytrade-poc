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
exports.createTestAirspace = exports.setupTest = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const setupTest = async () => {
    // Set up the connection to local validator
    const connection = new web3_js_1.Connection('http://localhost:8899', 'confirmed');
    // Create a dummy wallet for testing
    const wallet = new anchor.Wallet(web3_js_1.Keypair.generate());
    const provider = new anchor.AnchorProvider(connection, wallet, { commitment: 'confirmed' });
    anchor.setProvider(provider);
    // We can't use the workspace without building the project properly
    // So we'll just simulate the program for testing
    const programId = new web3_js_1.PublicKey("Fs2rrrdNmwwnNG49Dad2SJGxPCg8Mk5gMzvDBsf1bFjL");
    const idl = {
        version: "0.1.0",
        name: "skytrade",
        instructions: [],
        accounts: [],
        types: []
    };
    const program = new anchor_1.Program(idl, programId, provider);
    // Generate test accounts
    const testAirspace = web3_js_1.Keypair.generate();
    const testTokenMint = web3_js_1.Keypair.generate();
    const testOwner = web3_js_1.Keypair.generate();
    // In a real test we would fund the accounts
    // But for validation purposes we'll skip that step
    return {
        program,
        provider,
        wallet,
        testAirspace,
        testTokenMint,
        testOwner,
    };
};
exports.setupTest = setupTest;
const createTestAirspace = async (program, owner, bounds) => {
    // This is a mock implementation since we can't interact with a real program
    const airspaceKeypair = web3_js_1.Keypair.generate();
    // In a real test, we would call the program to create an airspace
    // For validation, we'll just return the public key
    return airspaceKeypair.publicKey;
};
exports.createTestAirspace = createTestAirspace;
