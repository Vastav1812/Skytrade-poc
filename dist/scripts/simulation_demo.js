"use strict";
/**
 * SkyTrade Demo - Simulation Mode
 *
 * This demo simulates the functionality of the SkyTrade platform without requiring
 * a real Solana blockchain connection.
 */
// Simulate classes and types from Solana
class PublicKey {
    constructor(key) {
        this.key = key;
    }
    equals(other) {
        return this.key === other.key;
    }
    toString() {
        return this.key;
    }
}
// Mock DynamicAirspacePartition class
class DynamicAirspacePartition {
    async splitAirspace(airspaceId, splitPoint) {
        console.log(`Splitting airspace ${airspaceId.toString()} at lat: ${splitPoint.lat}, lng: ${splitPoint.lng}`);
        // Simulate the split - return two new partitions
        return [
            new PublicKey(`${airspaceId.toString()}_north`),
            new PublicKey(`${airspaceId.toString()}_south`)
        ];
    }
    async mergeAirspaces(partition1Id, partition2Id) {
        console.log(`Merging airspaces ${partition1Id.toString()} and ${partition2Id.toString()}`);
        // Simulate the merge - return a new merged partition
        return new PublicKey(`merged_${partition1Id.toString()}_${partition2Id.toString()}`);
    }
    async updateUtilizationScore(airspaceId, score) {
        console.log(`Updating utilization score for ${airspaceId.toString()} to ${score}`);
        // Simulation - no return value
    }
    async autoRebalance(airspaceId) {
        console.log(`Auto-rebalancing airspace ${airspaceId.toString()}`);
        // Simulation - no return value
    }
}
// Mock ProofOfFlight class
class ProofOfFlight {
    async generateProof(flightPath) {
        console.log(`Generating proof for flight path with ${flightPath.coordinates.length} coordinates`);
        // Simulate generating a proof - return a mock proof string
        return `proof_${Date.now()}_${Math.round(Math.random() * 1000000)}`;
    }
    async verifyProof(proof, flightPath) {
        console.log(`Verifying proof: ${proof}`);
        // Simulate verification - always return true in simulation
        return true;
    }
    async recordFlight(flightPath, proof) {
        console.log(`Recording flight with proof: ${proof}`);
        // Simulate recording a flight - return a mock record ID
        return new PublicKey(`flight_record_${Date.now()}`);
    }
}
// Main demo function
async function main() {
    console.log("=======================================");
    console.log("  SkyTrade Demo - Simulation Mode");
    console.log("=======================================\n");
    // Create instances of our classes
    const dap = new DynamicAirspacePartition();
    const pof = new ProofOfFlight();
    // Demo 1: Dynamic Airspace Partitioning
    console.log("\n--- Demo 1: Dynamic Airspace Partitioning ---");
    const airspaceId = new PublicKey("airspace_original_1");
    console.log(`Starting with airspace: ${airspaceId.toString()}`);
    // Split airspace
    console.log("\nSplitting airspace:");
    const splitPoint = { lat: 40.7433, lng: -74.0096 };
    const newPartitions = await dap.splitAirspace(airspaceId, splitPoint);
    console.log("Resulting partitions:");
    newPartitions.forEach((partition, index) => {
        console.log(`  ${index + 1}. ${partition.toString()}`);
    });
    // Merge airspaces
    console.log("\nMerging partitions back:");
    const mergedPartition = await dap.mergeAirspaces(newPartitions[0], newPartitions[1]);
    console.log(`Merged result: ${mergedPartition.toString()}`);
    // Update utilization score
    console.log("\nUpdating utilization score:");
    await dap.updateUtilizationScore(mergedPartition, 85);
    // Auto-rebalance
    console.log("\nAuto-rebalancing based on utilization:");
    await dap.autoRebalance(mergedPartition);
    // Demo 2: Proof of Flight
    console.log("\n--- Demo 2: Proof of Flight Protocol ---");
    // Create a flight path
    const flightPath = {
        coordinates: [
            { lat: 40.7128, lng: -74.0060, altitude: 300, timestamp: Date.now() },
            { lat: 40.7129, lng: -74.0065, altitude: 320, timestamp: Date.now() + 5000 },
            { lat: 40.7135, lng: -74.0070, altitude: 350, timestamp: Date.now() + 10000 },
        ],
        airspaceTokens: [new PublicKey("airspace_token_1"), new PublicKey("airspace_token_2")],
    };
    console.log(`Flight path created with ${flightPath.coordinates.length} waypoints`);
    console.log(`From (${flightPath.coordinates[0].lat}, ${flightPath.coordinates[0].lng}) to (${flightPath.coordinates[flightPath.coordinates.length - 1].lat}, ${flightPath.coordinates[flightPath.coordinates.length - 1].lng})`);
    // Generate proof
    console.log("\nGenerating flight proof:");
    const proof = await pof.generateProof(flightPath);
    console.log(`Generated proof: ${proof}`);
    // Verify proof
    console.log("\nVerifying flight proof:");
    const verified = await pof.verifyProof(proof, flightPath);
    console.log(`Proof verification result: ${verified ? "VALID" : "INVALID"}`);
    // Record flight
    console.log("\nRecording flight with proof:");
    const flightRecordId = await pof.recordFlight(flightPath, proof);
    console.log(`Flight recorded with ID: ${flightRecordId.toString()}`);
    console.log("\n=======================================");
    console.log("  SkyTrade Demo Completed");
    console.log("=======================================");
}
// Run the demo
main().then(() => console.log("\nDemo completed successfully!"), (err) => console.error("Demo failed with error:", err));
