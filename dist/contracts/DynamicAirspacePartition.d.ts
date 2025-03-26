import { Program } from "@project-serum/anchor";
import { AnchorProvider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
export declare class DynamicAirspacePartition {
    private program;
    private provider;
    constructor(program: Program, provider: AnchorProvider);
    private getAirspace;
    splitAirspace(airspaceId: PublicKey, splitPoint: {
        lat: number;
        lng: number;
    }): Promise<PublicKey[]>;
    mergeAirspaces(partition1Id: PublicKey, partition2Id: PublicKey): Promise<PublicKey>;
    updateUtilizationScore(airspaceId: PublicKey, score: number): Promise<void>;
    autoRebalance(airspaceId: PublicKey): Promise<void>;
}
