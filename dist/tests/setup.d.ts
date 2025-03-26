import * as anchor from '@project-serum/anchor';
import { PublicKey, Keypair } from '@solana/web3.js';
export declare const setupTest: () => Promise<{
    program: anchor.Program<{
        version: string;
        name: string;
        instructions: never[];
        accounts: never[];
        types: never[];
    }>;
    provider: anchor.AnchorProvider;
    wallet: anchor.Wallet;
    testAirspace: anchor.web3.Keypair;
    testTokenMint: anchor.web3.Keypair;
    testOwner: anchor.web3.Keypair;
}>;
export declare const createTestAirspace: (program: any, owner: Keypair, bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
    height: number;
}) => Promise<PublicKey>;
