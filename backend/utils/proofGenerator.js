const snarkjs = require("snarkjs");
const path = require("path");

const proofPath = path.join(__dirname, "../zk/zkProof.wasm");
const keyPath = path.join(__dirname, "../zk/zkProof.zkey");

async function generateProof(identityCommitment, externalNullifier) {
  try {
    const idCommitment = BigInt(identityCommitment);
    const extNullifier = BigInt(externalNullifier);

    const input = {
      identityCommitment: idCommitment,
      externalNullifier: extNullifier,
      signalHash: idCommitment ^ extNullifier,
      nullifierHash: idCommitment + extNullifier,
    };

    console.log("Inputs for proof generation:", input);

    // Generate the proof
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      input,
      proofPath,
      keyPath
    );

    console.log("Generated proof:", proof);
    console.log("Public signals:", publicSignals);

    return {
      proofArray: [
        proof.pi_a[0],
        proof.pi_a[1],
        proof.pi_b[0][1],
        proof.pi_b[0][0],
        proof.pi_b[1][1],
        proof.pi_b[1][0],
        proof.pi_c[0],
        proof.pi_c[1],
      ].map((x) => x.toString()),
      nullifierHash: publicSignals[0],
    };
  } catch (error) {
    console.error("Proof generation error:", error);
    throw new Error("Failed to generate proof");
  }
}

module.exports = { generateProof };
