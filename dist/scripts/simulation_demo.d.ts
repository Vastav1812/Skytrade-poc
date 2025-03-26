/**
 * SkyTrade Demo - Simulation Mode
 *
 * This demo simulates the functionality of the SkyTrade platform without requiring
 * a real Solana blockchain connection.
 */
declare class PublicKey {
    private key;
    constructor(key: string);
    equals(other: PublicKey): boolean;
    toString(): string;
}
interface FlightPath {
    coordinates: {
        lat: number;
        lng: number;
        altitude: number;
        timestamp: number;
    }[];
    airspaceTokens: PublicKey[];
}
declare class DynamicAirspacePartition {
    splitAirspace(airspaceId: PublicKey, splitPoint: {
        lat: number;
        lng: number;
    }): Promise<PublicKey[]>;
    mergeAirspaces(partition1Id: PublicKey, partition2Id: PublicKey): Promise<PublicKey>;
    updateUtilizationScore(airspaceId: PublicKey, score: number): Promise<void>;
    autoRebalance(airspaceId: PublicKey): Promise<void>;
}
declare class ProofOfFlight {
    generateProof(flightPath: FlightPath): Promise<string>;
    verifyProof(proof: string, flightPath: FlightPath): Promise<boolean>;
    recordFlight(flightPath: FlightPath, proof: string): Promise<PublicKey>;
}
declare function main(): Promise<void>;
