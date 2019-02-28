/* eslint-disable require-jsdoc */
import fs from 'fs';
import path from 'path';
import forge from 'node-forge';
import Web3 from 'web3';
import Enigma from '../../src/Enigma';
import utils from '../../src/enigma-utils';
import EnigmaContract from '../../../build/contracts/Enigma';
import EnigmaTokenContract from '../../../build/contracts/EnigmaToken';
import SampleContract from '../../../build/contracts/Sample';
import * as eeConstants from '../../src/emitterConstants';
import data from '../data';
import EthCrypto from 'eth-crypto';


forge.options.usePureJavaScript = true;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Enigma tests', () => {
  let accounts;
  let web3;
  let enigma;
  let sampleContract;
  let epochSize;
  it('initializes', () => {
    const provider = new Web3.providers.HttpProvider('http://localhost:9545');
    web3 = new Web3(provider);
    return web3.eth.getAccounts().then((result) => {
      accounts = result;
      console.log('the accounts', accounts);
      enigma = new Enigma(
        web3,
        EnigmaContract.networks['4447'].address,
        EnigmaTokenContract.networks['4447'].address,
        'http://localhost:3346',
        {
          gas: 4712388,
          gasPrice: 100000000000,
          from: accounts[0],
        },
      );
      enigma.admin();
      expect(Enigma.version()).toEqual('0.0.1');
    });
  });

  it('initializes Sample contract', async () => {
    sampleContract = new enigma.web3.eth.Contract(SampleContract['abi'],
      SampleContract.networks['4447'].address);
    expect(sampleContract.options.address).toBeTruthy;
  });

  it('should distribute ENG tokens', async () => {
    const tokenContract = enigma.tokenContract;
    let promises = [];
    const allowance = utils.toGrains(1000);
    for (let i = 1; i < accounts.length - 1; i++) {
      let promise = new Promise(async (resolve, reject) => {
        await tokenContract.methods.approve(accounts[i], allowance).send(enigma.txDefaults);
        const transferResult = await tokenContract.methods.transfer(accounts[i], allowance).send(enigma.txDefaults);
        resolve(transferResult);
      });
      promises.push(promise);
    }
    const results = await Promise.all(promises);
    expect(results.length).toEqual(accounts.length - 2);
  });

  let workerAddress;
  it('should check that one worker and the principal node, and only them, are registered', async () => {
    let workerStatuses = [];
    for (let i = 0; i < 10; i++) {
      workerStatuses.push(await enigma.admin.getWorkerStatus(accounts[i]));
    }
    expect(workerStatuses).toEqual([2, 0, 0, 0, 0, 0, 0, 0, 0, 2]);
    workerAddress = await enigma.admin.getWorkerSignerAddr(accounts[0]);
    workerAddress = workerAddress.toLowerCase().slice(-40);
    console.log('WorkerAddress is '+workerAddress);
  });

  // it('should register Principal node', async () => {
  //   let worker = data.principal;
  //   const report = '0x' + Array.from(worker[1]).map((c) => c.charCodeAt(0).toString(16)).join('');
  //   const signature = '0x' + worker[3];
  //   let result = await new Promise((resolve, reject) => {
  //     enigma.enigmaContract.methods.register(worker[0], report, signature)
  //       .send({
  //         gas: 4712388,
  //         gasPrice: 100000000000,
  //         from: accounts[9],
  //       })
  //       .on('receipt', (receipt) => resolve(receipt))
  //       .on('error', (error) => reject(error));
  //   });
  //   expect(result).toBeTruthy;
  // });

  // it('MOCK should set the worker parameters (principal only) - initialization', async () => {
  //   let blockNumber = await web3.eth.getBlockNumber();
  //   let getActiveWorkersResult = await enigma.enigmaContract.methods.getActiveWorkers(blockNumber).call({
  //     from: accounts[9],
  //   });
  //   let workerAddresses = getActiveWorkersResult['0'];
  //   let workerBalances = getActiveWorkersResult['1'];
  //   const nonce = parseInt(await enigma.enigmaContract.methods.getUserTaskDeployments(accounts[9]).call());
  //   const seed = Math.floor(Math.random() * 100000);
  //   const hash = web3.utils.soliditySha3(
  //     {t: 'uint', v: seed},
  //     {t: 'uint', v: nonce},
  //     {t: 'address[]', v: workerAddresses},
  //     {t: 'uint[]', v: workerBalances},
  //   );
  //   const sig = utils.sign(data.principal[4], hash);

  //   const receipt = await new Promise((resolve, reject) => {
  //     enigma.enigmaContract.methods.setWorkersParams(blockNumber, seed, sig)
  //       .send({
  //         gas: 4712388,
  //         gasPrice: 100000000000,
  //         from: accounts[9],
  //       })
  //       .on('receipt', (receipt) => resolve(receipt))
  //       .on('error', (error) => {
  //         console.log('errored');
  //         reject(error);
  //       });
  //   });
  //   expect(receipt).toBeTruthy;
  // });

  it('should check worker\'s stake balance is empty', async () => {
    let balance = await enigma.admin.getBalance(accounts[0]);
    expect(balance).toEqual(0);
  });

  const deposit = 900;
  it('should deposit tokens in worker bank', async () => {
    let result = await new Promise((resolve, reject) => {
    enigma.admin.deposit(accounts[0], utils.toGrains(deposit))
      .on(eeConstants.DEPOSIT_RECEIPT, (result) => resolve(result))
      .on(eeConstants.ERROR, (err) => {
        reject(err);
      });
    });
    expect(result).toBeTruthy;
  });

  it('should check worker\'s balance has been filled', async () => {
    const balance = await enigma.admin.getBalance(accounts[0]);
    expect(balance).toEqual(900 * 10 ** 8);
  });

  it('should login the worker', async () => {
    let result = await new Promise((resolve, reject) => {
      enigma.admin.login(accounts[0])
        .on(eeConstants.LOGIN_RECEIPT, (result) => {
          resolve(result);
        });
    });
    expect(result).toBeTruthy;
  });

  it('should check that one worker, and only one worker, is logged in', async () => {
    let workerStatuses = [];
    for (let i = 0; i < 10; i++) {
      workerStatuses.push(await enigma.admin.getWorkerStatus(accounts[i]));
    }
    expect(workerStatuses).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0, 2]);
  });

  // it('MOCK should set the worker parameters (principal only)', async () => {
  //   let blockNumber = await web3.eth.getBlockNumber();
  //   let getActiveWorkersResult = await enigma.enigmaContract.methods.getActiveWorkers(blockNumber).call({
  //     from: accounts[9],
  //   });
  //   let workerAddresses = getActiveWorkersResult['0'];
  //   let workerBalances = getActiveWorkersResult['1'];
  //   const nonce = parseInt(await enigma.enigmaContract.methods.getUserTaskDeployments(accounts[9]).call());
  //   const seed = Math.floor(Math.random() * 100000);
  //   const hash = web3.utils.soliditySha3(
  //     {t: 'uint', v: seed},
  //     {t: 'uint', v: nonce},
  //     {t: 'address[]', v: workerAddresses},
  //     {t: 'uint[]', v: workerBalances},
  //   );
  //   const sig = utils.sign(data.principal[4], hash);

  //   const receipt = await new Promise((resolve, reject) => {
  //     enigma.enigmaContract.methods.setWorkersParams(blockNumber, seed, sig)
  //       .send({
  //         gas: 4712388,
  //         gasPrice: 100000000000,
  //         from: accounts[9],
  //       })
  //       .on('receipt', (receipt) => resolve(receipt))
  //       .on('error', (error) => {
  //         console.log('errored');
  //         reject(error);
  //       });
  //   });
  //   expect(receipt).toBeTruthy;
  // });

  it('should get the worker parameters for the current block', async () => {
    const blockNumber = await web3.eth.getBlockNumber();
    const workerParams = await enigma.getWorkerParams(blockNumber);
    expect(workerParams.workers).toEqual([]);
    expect(workerParams.stakes).toEqual([]);
  });

  it('should move forward epochSize blocks by calling dummy contract', async () => {
    const epochSize = await enigma.enigmaContract.methods.getEpochSize().call();
    for (let i = 0; i < epochSize; i++) {
      await sampleContract.methods.incrementCounter().send({from: accounts[8]});
    }
    // Wait for 2s for the Ppal node to pick up the new epoch
    await sleep(2000);
  }, 8000);

  // it('MOCK should set the worker parameters (principal only) a second time to pick up on new stakes', async () => {
  //   const blockNumber = await web3.eth.getBlockNumber();
  //   let getActiveWorkersResult = await enigma.enigmaContract.methods.getActiveWorkers(blockNumber).call();
  //   let workerAddresses = getActiveWorkersResult['0'];
  //   let workerBalances = getActiveWorkersResult['1'];
  //   const nonce = parseInt(await enigma.enigmaContract.methods.getUserTaskDeployments(accounts[9]).call());
  //   const seed = Math.floor(Math.random() * 100000);
  //   const hash = web3.utils.soliditySha3(
  //     {t: 'uint', v: seed},
  //     {t: 'uint', v: nonce},
  //     {t: 'address[]', v: workerAddresses},
  //     {t: 'uint[]', v: workerBalances},
  //   );
  //   const sig = utils.sign(data.principal[4], hash);

  //   const receipt = await new Promise((resolve, reject) => {
  //     enigma.enigmaContract.methods.setWorkersParams(blockNumber, seed, sig)
  //       .send({
  //         gas: 4712388,
  //         gasPrice: 100000000000,
  //         from: accounts[9],
  //       })
  //       .on('receipt', (receipt) => resolve(receipt))
  //       .on('error', (error) => {
  //         console.log('errored');
  //         reject(error);
  //       });
  //   });
  //   expect(receipt).toBeTruthy;
  // });

  it('should get the worker parameters for the current block', async () => {
    const blockNumber = await web3.eth.getBlockNumber();
    const workerParams = await enigma.getWorkerParams(blockNumber);
    expect(workerParams.workers).toEqual([accounts[0]]);
    expect(workerParams.stakes).toEqual([90000000000]);
  });

  const userPubKey = '2ea8e4cefb78efd0725ed12b23b05079a0a433cc8a656f212accf58672fee44a20cfcaa50466237273e762e49ec'+
    '912be61358d5e90bff56a53a0ed42abfe27e3';
  it('should create getTaskEncryptionKey from core (with call to P2P)', async () => {
    const encryptionKeyResult = await new Promise((resolve, reject) => {
        workerAddress
        console.log(workerAddress);
        enigma.client.request('getWorkerEncryptionKey', {workerAddress: workerAddress, userPubKey: userPubKey}, (err, response) => {
          if (err) {
            reject(err);
          }
          resolve(response);
        });
      });
    console.log(encryptionKeyResult)

    expect(encryptionKeyResult.result.workerEncryptionKey.length).toBe(128);
    expect(encryptionKeyResult.result.workerSig.length).toBe(130);
  });

  let scTask;
  let task;
  it('should deploy secret contract', async () => {
    let scTaskFn = 'construct()';
    let scTaskArgs = '';
    let scTaskGasLimit = 100;
    let scTaskGasPx = utils.toGrains(1);
    let preCode;
    try {
      preCode = fs.readFileSync(path.resolve(__dirname,'./addition.wasm'));
      preCode = preCode.toString('hex');
    } catch(e) {
      console.log('Error:', e.stack);
    }
    scTask = await new Promise((resolve, reject) => {
      enigma.deploySecretContract(scTaskFn, scTaskArgs, scTaskGasLimit, scTaskGasPx, accounts[0], preCode)
        .on(eeConstants.DEPLOY_SECRET_CONTRACT_RESULT, (receipt) => resolve(receipt))
        .on(eeConstants.ERROR, (error) => reject(error));
    });
  });

  it('should get the confirmed deploy contract task', async () => {
    do {
      scTask = await enigma.getTaskRecordStatus(scTask);
      console.log(scTask.ethStatus);
      await sleep(1000);
    } while (scTask.ethStatus != 2);
    expect(scTask.ethStatus).toEqual(2);
  });

  it('should verify deployed contract', async () => {
    const result = await enigma.admin.isDeployed('0x'+scTask.scAddr);
    expect(result).toEqual(true);
  });

  it('should get deployed contract bytecode hash', async () => {
    const result = await enigma.admin.getCodeHash('0x'+scTask.scAddr);
    expect(result).toBeTruthy;
    console.log('Deployed contract bytecode hash is:')
    console.log(result);
  });

  it('should execute compute task', async () => {
    let taskFn = 'addition(uint,uint)';
    let taskArgs = [
      [24, 'uint256'],
      [67, 'uint256'],
    ];
    let taskGasLimit = 100000;
    let taskGasPx = utils.toGrains(1);
    task = await new Promise((resolve, reject) => {
      enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, accounts[0], scTask.scAddr)
        .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
        .on(eeConstants.ERROR, (error) => reject(error));
    });
    console.log(task);
  });

  it('should get the pending task', async () => {
    task = await enigma.getTaskRecordStatus(task);
    expect(task.ethStatus).toEqual(1);
  });

  it('should get the confirmed task', async () => {
    do {
      task = await enigma.getTaskRecordStatus(task);
      console.log(task.ethStatus);
      await sleep(1000);
    } while (task.ethStatus != 2);
    expect(task.ethStatus).toEqual(2);
  });

  it('should get the result', async () => {
    do {
      task = await enigma.getTaskRecordStatus(task);
      console.log(task.ethStatus);
      await sleep(1000);
    } while (task.ethStatus != 2);
    expect(task.ethStatus).toEqual(2);
  });

  it('should clean up', async() => {
    // Log out
    await new Promise((resolve, reject) => {
      enigma.admin.logout(accounts[0])
        .on(eeConstants.LOGOUT_RECEIPT, (result) => {
          resolve(result);
        })
        .on(eeConstants.ERROR, (err) => {
          reject(err);
        });
    });
    let workerStatus = await enigma.admin.getWorkerStatus(accounts[0]);
    expect(workerStatus).toEqual(2);

    // Advance epoch to be able to withdraw
    const epochSize = await enigma.enigmaContract.methods.getEpochSize().call();
    for (let i = 0; i < epochSize; i++) {
      await sampleContract.methods.incrementCounter().send({from: accounts[8]});
    }

    // Wait for 2s for the Ppal node to pick up the new epoch
    await sleep(2000);

    // Withdraw stake
    const bal = parseInt((await enigma.enigmaContract.methods.getWorker(accounts[0]).call()).balance);
    await expect(new Promise((resolve, reject) => {
      enigma.admin.withdraw(accounts[0], bal)
        .on(eeConstants.WITHDRAW_RECEIPT, (result) => resolve(result))
        .on(eeConstants.ERROR, (err) => {
          reject(err);
        });
    }));
    const endingBalance = parseInt((await enigma.enigmaContract.methods.getWorker(accounts[0]).call()).balance);
    expect(endingBalance).toEqual(0);
  });

});
