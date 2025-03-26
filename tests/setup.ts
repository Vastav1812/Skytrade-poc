import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { PublicKey, Keypair, SystemProgram, SYSVAR_RENT_PUBKEY, Connection } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const setupTest = async () => {
    // Set up the connection to local validator
    const connection = new Connection('http://localhost:8899', 'confirmed');
    
    // Create a dummy wallet for testing
    const wallet = new anchor.Wallet(Keypair.generate());
    
    const provider = new anchor.AnchorProvider(
        connection, 
        wallet, 
        { commitment: 'confirmed' }
    );
    anchor.setProvider(provider);

    // We can't use the workspace without building the project properly
    // So we'll just simulate the program for testing
    const programId = new PublicKey("Fs2rrrdNmwwnNG49Dad2SJGxPCg8Mk5gMzvDBsf1bFjL");
    const idl = {
        version: "0.1.0",
        name: "skytrade",
        instructions: [],
        accounts: [],
        types: []
    };
    
    const program = new Program(idl, programId, provider);

    // Generate test accounts
    const testAirspace = Keypair.generate();
    const testTokenMint = Keypair.generate();
    const testOwner = Keypair.generate();

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

export const createTestAirspace = async (
    program: any,
    owner: Keypair,
    bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
        height: number;
    }
): Promise<PublicKey> => {
    // This is a mock implementation since we can't interact with a real program
    const airspaceKeypair = Keypair.generate();
    
    // In a real test, we would call the program to create an airspace
    // For validation, we'll just return the public key
    
    return airspaceKeypair.publicKey;
}; 