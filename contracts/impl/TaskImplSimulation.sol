pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";

import { EnigmaCommon } from "./EnigmaCommon.sol";
import { EnigmaState } from "./EnigmaState.sol";
import { WorkersImplSimulation } from "./WorkersImplSimulation.sol";
import "../utils/SolRsaVerify.sol";

/**
 * @author Enigma
 *
 * Library that maintains functionality associated with tasks
 */
library TaskImplSimulation {
    using SafeMath for uint256;
    using ECDSA for bytes32;

    event TaskRecordCreated(bytes32 taskId, bytes32 inputsHash, uint gasLimit, uint gasPx, address sender,
        uint blockNumber);
    event TaskRecordsCreated(bytes32[] taskIds, bytes32[] inputsHashes, uint[] gasLimits, uint[] gasPxs, address sender,
        uint blockNumber);
    event SecretContractDeployed(bytes32 scAddr, bytes32 codeHash, bytes32 initStateDeltaHash);
    event ReceiptVerified(bytes32 taskId, bytes32 stateDeltaHash, bytes32 outputHash, bytes optionalEthereumData,
        address optionalEthereumContractAddress, bytes sig);
    event ReceiptsVerified(bytes32[] taskIds, bytes32[] stateDeltaHashes, bytes32[] outputHashes,
        bytes _optionalEthereumData, address optionalEthereumContractAddress, bytes sig);
    event ReceiptFailed(bytes32 taskId, bytes sig);

    function createDeploymentTaskRecordImpl(
        EnigmaState.State storage state,
        bytes32 _inputsHash,
        uint _gasLimit,
        uint _gasPx,
        uint _firstBlockNumber,
        uint _nonce
    )
    public
    {
        // Check that the locally-generated nonce matches the on-chain value, otherwise _scAddr is invalid
        require(state.userTaskDeployments[msg.sender] == _nonce, "Incorrect nonce yielding bad secret contract address");

        // Worker deploying task must be the appropriate worker as per the worker selection algorithm
        require(_firstBlockNumber == WorkersImplSimulation.getFirstBlockNumberImpl(state, block.number), "Wrong epoch for this task");

        // Transfer fee from sender to contract
        uint fee = _gasLimit.mul(_gasPx);
        require(state.engToken.allowance(msg.sender, address(this)) >= fee, "Allowance not enough");
        require(state.engToken.transferFrom(msg.sender, address(this), fee), "Transfer not valid");

        // Create taskId and TaskRecord
        bytes32 taskId = keccak256(abi.encodePacked(msg.sender, state.userTaskDeployments[msg.sender]));
        EnigmaCommon.TaskRecord storage task = state.tasks[taskId];
        require(task.sender == address(0), "Task already exists");
        task.inputsHash = _inputsHash;
        task.gasLimit = _gasLimit;
        task.gasPx = _gasPx;
        task.sender = msg.sender;
        task.blockNumber = block.number;
        task.status = EnigmaCommon.TaskStatus.RecordCreated;

        // Increment user task deployment nonce
        state.userTaskDeployments[msg.sender]++;

        emit TaskRecordCreated(taskId, _inputsHash, _gasLimit, _gasPx, msg.sender, block.number);
    }

    function deploySecretContractFailureImpl(EnigmaState.State storage state, bytes32 _taskId, uint _gasUsed,
        bytes memory _sig)
    public
    {
        EnigmaCommon.TaskRecord storage task = state.tasks[_taskId];
        require(task.status == EnigmaCommon.TaskStatus.RecordCreated, 'Invalid task status');

        // Worker deploying task must be the appropriate worker as per the worker selection algorithm
        require(msg.sender == WorkersImplSimulation.getWorkerGroupImpl(state, task.blockNumber, _taskId)[0],
            "Not the selected worker for this task");

        // Check that worker isn't charging the user too high of a fee
        require(task.gasLimit >= _gasUsed, "Too much gas used for task");

        // Update proof and status attributes of TaskRecord
        task.proof = _sig;
        task.status = EnigmaCommon.TaskStatus.ReceiptFailed;

        transferFundsAfterTask(state, msg.sender, task.sender, _gasUsed, task.gasLimit.sub(_gasUsed), task.gasPx);

        // Verify the worker's signature
        bytes32 msgHash = keccak256(abi.encodePacked(task.inputsHash,
            _gasUsed,
            bytes1(0x00)));
        require(msgHash.recover(_sig) == state.workers[msg.sender].signer, "Invalid signature");

        emit ReceiptFailed(_taskId, _sig);
    }

    function verifyDeployReceipt(EnigmaState.State storage state, bytes32 _taskId, uint _gasUsed, address _sender,
        bytes memory _sig)
    internal
    {
        EnigmaCommon.TaskRecord storage task = state.tasks[_taskId];
        require(task.status == EnigmaCommon.TaskStatus.RecordCreated, 'Invalid task status');

        // Worker deploying task must be the appropriate worker as per the worker selection algorithm
        require(_sender == WorkersImplSimulation.getWorkerGroupImpl(state, task.blockNumber, _taskId)[0],
            "Not the selected worker for this task");

        // Check that worker isn't charging the user too high of a fee
        require(task.gasLimit >= _gasUsed, "Too much gas used for task");

        // Update proof and status attributes of TaskRecord
        task.proof = _sig;
        task.status = EnigmaCommon.TaskStatus.ReceiptVerified;

        transferFundsAfterTask(state, _sender, task.sender, _gasUsed, task.gasLimit.sub(_gasUsed), task.gasPx);
    }

    function deploySecretContractImpl(EnigmaState.State storage state, bytes32 _taskId, bytes32 _preCodeHash,
        bytes32 _codeHash, bytes32 _initStateDeltaHash, bytes memory _optionalEthereumData,
        address _optionalEthereumContractAddress, uint _gasUsed, bytes memory _sig)
    public
    {
        verifyDeployReceipt(state, _taskId, _gasUsed, msg.sender, _sig);
        EnigmaCommon.TaskRecord memory task = state.tasks[_taskId];

        // Verify the worker's signature
        bytes32 msgHash = keccak256(abi.encodePacked(task.inputsHash,
            _codeHash,
            _initStateDeltaHash,
            _gasUsed,
            uint64(_optionalEthereumData.length), _optionalEthereumData,
            uint64(20), _optionalEthereumContractAddress,
            bytes1(0x01)));
        require(msgHash.recover(_sig) == state.workers[msg.sender].signer, "Invalid signature");

        // Set the secret contract's attributes in registry
        EnigmaCommon.SecretContract storage secretContract = state.contracts[_taskId];
        secretContract.owner = task.sender;
        secretContract.preCodeHash = _preCodeHash;
        secretContract.codeHash = _codeHash;
        secretContract.status = EnigmaCommon.SecretContractStatus.Deployed;
        secretContract.stateDeltaHashes.push(_initStateDeltaHash);
        state.scAddresses.push(_taskId);

        if (_optionalEthereumContractAddress != address(0)) {
            (bool success,) = _optionalEthereumContractAddress.call(_optionalEthereumData);
            require(success, "Ethereum call failed");
        }

        emit SecretContractDeployed(_taskId, _codeHash, _initStateDeltaHash);
    }

    function transferFundsAfterTask(EnigmaState.State storage state, address _worker, address _user, uint _gasUsed,
        uint _gasUnused, uint _gasPx)
    internal {
        // Credit worker with the fees associated with this task
        state.workers[_worker].balance = state.workers[_worker].balance.add(_gasUsed.mul(_gasPx));

        // Credit the task sender with the unused gas fees
        require(state.engToken.transfer(_user, (_gasUnused).mul(_gasPx)),
            "Token transfer failed");
    }

    function createTaskRecordImpl(
        EnigmaState.State storage state,
        bytes32 _inputsHash,
        uint _gasLimit,
        uint _gasPx,
        uint _firstBlockNumber
    )
    public
    {
        // Worker deploying task must be the appropriate worker as per the worker selection algorithm
        require(_firstBlockNumber == WorkersImplSimulation.getFirstBlockNumberImpl(state, block.number), "Wrong epoch for this task");

        // Transfer fee from sender to contract
        uint fee = _gasLimit.mul(_gasPx);
        require(state.engToken.allowance(msg.sender, address(this)) >= fee, "Allowance not enough");
        require(state.engToken.transferFrom(msg.sender, address(this), fee), "Transfer not valid");

        // Create taskId and TaskRecord
        bytes32 taskId = keccak256(abi.encodePacked(msg.sender, state.userTaskDeployments[msg.sender]));
        EnigmaCommon.TaskRecord storage task = state.tasks[taskId];
        require(task.sender == address(0), "Task already exists");
        task.inputsHash = _inputsHash;
        task.gasLimit = _gasLimit;
        task.gasPx = _gasPx;
        task.sender = msg.sender;
        task.blockNumber = block.number;
        task.status = EnigmaCommon.TaskStatus.RecordCreated;

        // Increment user task deployment nonce
        state.userTaskDeployments[msg.sender]++;

        emit TaskRecordCreated(taskId, _inputsHash, _gasLimit, _gasPx, msg.sender, block.number);
    }

    function commitTaskFailureImpl(
        EnigmaState.State storage state,
        bytes32 _scAddr,
        bytes32 _taskId,
        uint _gasUsed,
        bytes memory _sig
    )
    public
    {
        EnigmaCommon.SecretContract memory secretContract = state.contracts[_scAddr];

        EnigmaCommon.TaskRecord storage task = state.tasks[_taskId];
        require(task.status == EnigmaCommon.TaskStatus.RecordCreated, 'Invalid task status');

        // Worker deploying task must be the appropriate worker as per the worker selection algorithm
        require(msg.sender == WorkersImplSimulation.getWorkerGroupImpl(state, task.blockNumber, _scAddr)[0],
            "Not the selected worker for this task");

        // Check that worker isn't charging the user too high of a fee
        require(task.gasLimit >= _gasUsed, "Too much gas used for task");

        // Update proof and status attributes of TaskRecord
        task.proof = _sig;
        task.status = EnigmaCommon.TaskStatus.ReceiptFailed;

        transferFundsAfterTask(state, msg.sender, task.sender, _gasUsed, task.gasLimit.sub(_gasUsed), task.gasPx);

        // Verify the worker's signature
        bytes32 msgHash = keccak256(abi.encodePacked(task.inputsHash,
            secretContract.codeHash,
            _gasUsed,
            bytes1(0x00)));
        require(msgHash.recover(_sig) == state.workers[msg.sender].signer, "Invalid signature");

        emit ReceiptFailed(_taskId, _sig);
    }

    function verifyReceipt(EnigmaState.State storage state, bytes32 _scAddr, bytes32 _taskId, bytes32 _stateDeltaHash, uint _gasUsed, address _sender,
        bytes memory _sig)
    internal
    {
        EnigmaCommon.TaskRecord storage task = state.tasks[_taskId];
        require(task.status == EnigmaCommon.TaskStatus.RecordCreated, 'Invalid task status');

        // Worker deploying task must be the appropriate worker as per the worker selection algorithm
        require(_sender == WorkersImplSimulation.getWorkerGroupImpl(state, task.blockNumber, _scAddr)[0], "Not the selected worker for this task");

        // Check that worker isn't charging the user too high of a fee
        require(task.gasLimit >= _gasUsed, "Too much gas used for task");

        // Update proof and status attributes of TaskRecord
        task.proof = _sig;
        task.status = EnigmaCommon.TaskStatus.ReceiptVerified;

        transferFundsAfterTask(state, _sender, task.sender, _gasUsed, task.gasLimit.sub(_gasUsed), task.gasPx);
    }

    function commitReceiptImpl(
        EnigmaState.State storage state,
        bytes32 _scAddr,
        bytes32 _taskId,
        bytes32 _stateDeltaHash,
        bytes32 _outputHash,
        bytes memory _optionalEthereumData,
        address _optionalEthereumContractAddress,
        uint _gasUsed,
        bytes memory _sig
    )
    public
    {
        EnigmaCommon.SecretContract storage secretContract = state.contracts[_scAddr];
        // Obtain the last state delta hash the contract is aware of
        bytes32 lastStateDeltaHash = secretContract.stateDeltaHashes[secretContract.stateDeltaHashes.length - 1];

        // Verify the receipt
        verifyReceipt(state, _scAddr, _taskId, _stateDeltaHash, _gasUsed, msg.sender, _sig);

        // Append the new state delta hash and set the contract's output hash
        secretContract.stateDeltaHashes.push(_stateDeltaHash);
        secretContract.outputHashes.push(_outputHash);

        // Verify the worker's signature
        bytes32 msgHash = keccak256(abi.encodePacked(secretContract.codeHash,
            state.tasks[_taskId].inputsHash,
            lastStateDeltaHash,
            _stateDeltaHash,
            _outputHash,
            _gasUsed,
            uint64(_optionalEthereumData.length), _optionalEthereumData,
            uint64(20), _optionalEthereumContractAddress,
            bytes1(0x01)));

        require(msgHash.recover(_sig) == state.workers[msg.sender].signer, "Invalid signature");

        if (_optionalEthereumContractAddress != address(0)) {
            (bool success,) = _optionalEthereumContractAddress.call(_optionalEthereumData);
            require(success, "Ethereum call failed");
        }

        emit ReceiptVerified(_taskId, _stateDeltaHash, _outputHash, _optionalEthereumData,
            _optionalEthereumContractAddress, _sig);
    }

    function createTaskRecordsImpl(
        EnigmaState.State storage state,
        bytes32[] memory _inputsHashes,
        uint[] memory _gasLimits,
        uint[] memory _gasPxs,
        uint _firstBlockNumber
    )
    public
    {
        // Worker deploying task must be the appropriate worker as per the worker selection algorithm
        require(_firstBlockNumber == WorkersImplSimulation.getFirstBlockNumberImpl(state, block.number), "Wrong epoch for this task");

        bytes32[] memory taskIds = new bytes32[](_inputsHashes.length);
        for (uint i = 0; i < _inputsHashes.length; i++) {
            // Transfer fee from sender to contract
            uint fee = _gasLimits[i].mul(_gasPxs[i]);
            require(state.engToken.allowance(msg.sender, address(this)) >= fee, "Allowance not enough");
            require(state.engToken.transferFrom(msg.sender, address(this), fee), "Transfer not valid");

            // Create taskId and TaskRecord
            bytes32 taskId = keccak256(abi.encodePacked(msg.sender, state.userTaskDeployments[msg.sender]));
            EnigmaCommon.TaskRecord storage task = state.tasks[taskId];
            require(task.sender == address(0), "Task already exists");
            taskIds[i] = taskId;
            task.inputsHash = _inputsHashes[i];
            task.gasLimit = _gasLimits[i];
            task.gasPx = _gasPxs[i];
            task.sender = msg.sender;
            task.blockNumber = block.number;
            task.status = EnigmaCommon.TaskStatus.RecordCreated;

            // Increment user task deployment nonce
            state.userTaskDeployments[msg.sender]++;
        }
        emit TaskRecordsCreated(taskIds, _inputsHashes, _gasLimits, _gasPxs, msg.sender, block.number);
    }

    function commitReceiptsImpl(
        EnigmaState.State storage state,
        bytes32 _scAddr,
        bytes32[] memory _taskIds,
        bytes32[] memory _stateDeltaHashes,
        bytes32[] memory _outputHashes,
        bytes memory _optionalEthereumData,
        address _optionalEthereumContractAddress,
        uint[] memory _gasesUsed,
        bytes memory _sig
    )
    public
    {
        bytes32[] memory inputsHashes = new bytes32[](_taskIds.length);
        EnigmaCommon.SecretContract storage secretContract = state.contracts[_scAddr];
        // Obtain the last state delta hash the contract is aware of
        bytes32 lastStateDeltaHash = secretContract.stateDeltaHashes[secretContract.stateDeltaHashes.length - 1];

        for (uint i = 0; i < _taskIds.length; i++) {
            // Verify the receipt
            verifyReceipt(state, _scAddr, _taskIds[i], _stateDeltaHashes[i], _gasesUsed[i], msg.sender, _sig);
            inputsHashes[i] = state.tasks[_taskIds[i]].inputsHash;

            // Append the new state delta hash
            secretContract.stateDeltaHashes.push(_stateDeltaHashes[i]);
            secretContract.outputHashes.push(_outputHashes[i]);
        }

        // Verify the worker's signature
        bytes32 msgHash = keccak256(abi.encodePacked(secretContract.codeHash,
            inputsHashes,
            lastStateDeltaHash,
            _stateDeltaHashes,
            _outputHashes,
            _gasesUsed,
            uint64(_optionalEthereumData.length), _optionalEthereumData,
            uint64(20), _optionalEthereumContractAddress,
            bytes1(0x01)));

        require(msgHash.recover(_sig) == state.workers[msg.sender].signer, "Invalid signature");

        if (_optionalEthereumContractAddress != address(0)) {
            (bool success,) = _optionalEthereumContractAddress.call(_optionalEthereumData);
            require(success, "Ethereum call failed");
        }

        emit ReceiptsVerified(_taskIds, _stateDeltaHashes, _outputHashes, _optionalEthereumData,
            _optionalEthereumContractAddress, _sig);
    }
}
