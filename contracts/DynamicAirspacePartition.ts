import { Program } from "@project-serum/anchor";
import { AnchorProvider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export class DynamicAirspacePartition {
    private program: Program;
    private provider: AnchorProvider;

    constructor(program: Program, provider: AnchorProvider) {
        this.program = program;
        this.provider = provider;
    }

    private async getAirspace(airspaceId: PublicKey): Promise<any> {
        return await this.program.account.airspace.fetch(airspaceId);
    }

    async splitAirspace(
        airspaceId: PublicKey,
        splitPoint: { lat: number; lng: number }
    ): Promise<PublicKey[]> {
        const airspace = await this.getAirspace(airspaceId);
        const result = await this.program.rpc.splitAirspace(
            splitPoint,
            {
                accounts: {
                    airspace: airspaceId,
                    owner: airspace.owner,
                },
            }
        );

        // Handle the result which should be an array of strings
        if (Array.isArray(result)) {
            return result.map((p: string) => new PublicKey(p));
        }
        throw new Error('Invalid response from splitAirspace');
    }

    async mergeAirspaces(
        partition1Id: PublicKey,
        partition2Id: PublicKey
    ): Promise<PublicKey> {
        const result = await this.program.rpc.mergeAirspaces(
            {
                accounts: {
                    partition1: partition1Id,
                    partition2: partition2Id,
                },
            }
        );

        // Handle the result which should be a string
        if (typeof result === 'string') {
            return new PublicKey(result);
        }
        throw new Error('Invalid response from mergeAirspaces');
    }

    async updateUtilizationScore(
        airspaceId: PublicKey,
        score: number
    ): Promise<void> {
        await this.program.rpc.updateUtilizationScore(
            score,
            {
                accounts: {
                    airspace: airspaceId,
                },
            }
        );
    }

    async autoRebalance(airspaceId: PublicKey): Promise<void> {
        const airspace = await this.getAirspace(airspaceId);
        
        // If utilization is high, split the airspace
        if (airspace.utilizationScore > 80) {
            // Calculate center point of the airspace
            const centerLat = (airspace.bounds.north + airspace.bounds.south) / 2;
            const centerLng = (airspace.bounds.east + airspace.bounds.west) / 2;
            
            await this.splitAirspace(airspaceId, { lat: centerLat, lng: centerLng });
        }
        // If utilization is low and has parent, merge with siblings
        else if (airspace.utilizationScore < 30 && airspace.parentId) {
            // Get siblings from parent
            const parent = await this.getAirspace(airspace.parentId);
            if (parent.childrenIds.length > 1) {
                // Find a sibling to merge with
                const siblingId = parent.childrenIds.find(
                    (id: PublicKey) => !id.equals(airspaceId)
                );
                if (siblingId) {
                    await this.mergeAirspaces(airspaceId, siblingId);
                }
            }
        }
    }
} 