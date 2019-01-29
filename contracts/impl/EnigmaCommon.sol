pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

library EnigmaCommon {
    // ========================================== Structs ==========================================

    struct TaskRecord {
        bytes32 inputsHash; // Inputs hash of encryptedFn, encryptedArgs, and contract address/preCodeHash)
        uint gasLimit; // ENG gas limit units
        uint gasPx; // ENG gas px in grains (10 ** 8) amount
        bytes proof; // Signature of (taskId, inStateDeltaHash, outStateDeltaHash, ethCall)
        address sender; // Sender of TaskRecord
        uint blockNumber; // Block number TaskRecord was mined
        TaskStatus status; // RecordUndefined: 0; RecordCreated: 1; ReceiptVerified: 2; ReceiptFailed: 3
    }

    struct Worker {
        address signer; // Enclave address
        WorkerStatus status; // Unregistered: 0, Registered: 1, LoggedIn: 2, LoggedOut: 3
        bytes report; // Decided to store this as one  RLP encoded attribute for easier external storage in the future
        uint256 balance; // ENG balance
    }

    /**
    * The data representation of the worker parameters used as input for
    * the worker selection algorithm
    */
    struct WorkersParams {
        uint firstBlockNumber;
        address[] workers;
        uint[] balances;
        uint seed;
        uint nonce;
    }

    struct SecretContract {
        address owner; // Owner who deployed secret contract
        bytes32 preCodeHash; // Predeployed bytecode hash
        bytes32 codeHash; // Deployed bytecode hash
        bytes32[] stateDeltaHashes;
        bytes32 outputHash;
        SecretContractStatus status; // Undefined: 0, Deployed: 1
        // TODO: consider keeping an index of taskIds
    }

    // ========================================== Enums ==========================================

    enum TaskStatus {RecordUndefined, RecordCreated, ReceiptVerified, ReceiptFailed}

    enum WorkerStatus {Unregistered, Registered, LoggedIn, LoggedOut}

    enum SecretContractStatus {Undefined, Deployed}
}
