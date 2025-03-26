import { Program } from "@project-serum/anchor";
import { AnchorProvider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js";

// Define the FlightPath type
interface Coordinate {
    lat: number;
    lng: number;
    altitude: number;
    timestamp: number;
}

export interface FlightPath {
    coordinates: Coordinate[];
    airspaceTokens: PublicKey[];
}

export class ProofOfFlight {
    private program: Program;
    private provider: AnchorProvider;

    constructor(program: Program, provider: AnchorProvider) {
        this.program = program;
        this.provider = provider;
    }

    async generateProof(flightPath: FlightPath): Promise<string> {
        const proof = await this.program.rpc.generateFlightProof(
            flightPath,
            {
                accounts: {
                    droneOperator: this.provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
            }
        );

        return proof;
    }

    async verifyProof(proof: string, flightPath: FlightPath): Promise<boolean> {
        const result = await this.program.rpc.verifyFlightProof(
            proof,
            {
                accounts: {
                    droneOperator: this.provider.wallet.publicKey,
                },
            }
        );

        // Convert string result to boolean
        return result === 'verified';
    }

    async recordFlight(
        flightPath: FlightPath,
        proof: string
    ): Promise<PublicKey> {
        const flightRecord = await this.program.rpc.recordFlight(
            flightPath,
            proof,
            {
                accounts: {
                    droneOperator: this.provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
            }
        );

        // Convert string to PublicKey
        return new PublicKey(flightRecord);
    }
} 