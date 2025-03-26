"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicAirspacePartition = void 0;
const web3_js_1 = require("@solana/web3.js");
class DynamicAirspacePartition {
    constructor(program, provider) {
        this.program = program;
        this.provider = provider;
    }
    async getAirspace(airspaceId) {
        return await this.program.account.airspace.fetch(airspaceId);
    }
    async splitAirspace(airspaceId, splitPoint) {
        const airspace = await this.getAirspace(airspaceId);
        const result = await this.program.rpc.splitAirspace(splitPoint, {
            accounts: {
                airspace: airspaceId,
                owner: airspace.owner,
            },
        });
        // Handle the result which should be an array of strings
        if (Array.isArray(result)) {
            return result.map((p) => new web3_js_1.PublicKey(p));
        }
        throw new Error('Invalid response from splitAirspace');
    }
    async mergeAirspaces(partition1Id, partition2Id) {
        const result = await this.program.rpc.mergeAirspaces({
            accounts: {
                partition1: partition1Id,
                partition2: partition2Id,
            },
        });
        // Handle the result which should be a string
        if (typeof result === 'string') {
            return new web3_js_1.PublicKey(result);
        }
        throw new Error('Invalid response from mergeAirspaces');
    }
    async updateUtilizationScore(airspaceId, score) {
        await this.program.rpc.updateUtilizationScore(score, {
            accounts: {
                airspace: airspaceId,
            },
        });
    }
    async autoRebalance(airspaceId) {
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
                const siblingId = parent.childrenIds.find((id) => !id.equals(airspaceId));
                if (siblingId) {
                    await this.mergeAirspaces(airspaceId, siblingId);
                }
            }
        }
    }
}
exports.DynamicAirspacePartition = DynamicAirspacePartition;
