pragma circom 2.0.0;

template SemaphoreProof() {
    signal input identityCommitment;
    signal input externalNullifier;
    signal input signalHash;
    signal input nullifierHash;

    signal output validProof;
    
    signal sum1;
    signal sum2;
    signal isValid;  // Boolean signal for equality check
    
    sum1 <== identityCommitment + externalNullifier;
    sum2 <== sum1 + signalHash;

    isValid <== sum2 - nullifierHash; // Should be 0 if they are equal
    validProof <== 1 - isValid * isValid; // Ensures isValid is 0 (valid) or nonzero (invalid)
}

component main = SemaphoreProof();
