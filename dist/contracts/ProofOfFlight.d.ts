import { Program } from "@project-serum/anchor";
import { AnchorProvider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
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
export declare class ProofOfFlight {
    private program;
    private provider;
    constructor(program: Program, provider: AnchorProvider);
    generateProof(flightPath: FlightPath): Promise<string>;
    verifyProof(proof: string, flightPath: FlightPath): Promise<boolean>;
    recordFlight(flightPath: FlightPath, proof: string): Promise<PublicKey>;
}
export {};
