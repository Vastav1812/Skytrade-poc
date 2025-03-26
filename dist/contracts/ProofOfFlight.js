"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfFlight = void 0;
const web3_js_1 = require("@solana/web3.js");
const web3_js_2 = require("@solana/web3.js");
class ProofOfFlight {
    constructor(program, provider) {
        this.program = program;
        this.provider = provider;
    }
    async generateProof(flightPath) {
        const proof = await this.program.rpc.generateFlightProof(flightPath, {
            accounts: {
                droneOperator: this.provider.wallet.publicKey,
                systemProgram: web3_js_2.SystemProgram.programId,
            },
        });
        return proof;
    }
    async verifyProof(proof, flightPath) {
        const result = await this.program.rpc.verifyFlightProof(proof, {
            accounts: {
                droneOperator: this.provider.wallet.publicKey,
            },
        });
        // Convert string result to boolean
        return result === 'verified';
    }
    async recordFlight(flightPath, proof) {
        const flightRecord = await this.program.rpc.recordFlight(flightPath, proof, {
            accounts: {
                droneOperator: this.provider.wallet.publicKey,
                systemProgram: web3_js_2.SystemProgram.programId,
            },
        });
        // Convert string to PublicKey
        return new web3_js_1.PublicKey(flightRecord);
    }
}
exports.ProofOfFlight = ProofOfFlight;
