import jayson from 'jayson';
import cors from 'cors';
import connect from 'connect';
import bodyParser from 'body-parser';
import web3Utils from 'web3-utils';
import data from '../test/data';
import EthCrypto from 'eth-crypto';
import utils from './enigma-utils';

export default class RPCServer {
  constructor() {
    let _counter = 0;
    this.app = connect();
    this.serverInstance = null;
    this.resetCounter = () => {
      _counter = 0;
    };
    this.server = jayson.server({
      getWorkerEncryptionKey: function(workerAddress, callback) {
        if (!workerAddress) {
          callback({code: -32602, message: 'Invalid params'});
        } else {
          const worker = data.workers.find((w) => w[0] === '0x' + workerAddress);
          const identity = EthCrypto.createIdentity();
          // see the corresponding implementation in Enigma.js for an explanation of this hardcoded hex string
          const hexToSign = '0x0000000000000013456e69676d612055736572204d6573736167650000000000000040'+identity.publicKey;
          const signature = EthCrypto.sign(worker[4], web3Utils.soliditySha3({t: 'bytes', value: hexToSign}));
          callback(null, {
            result: {
              workerEncryptionKey: identity.publicKey,
              workerSig: utils.remove0x(signature),
            }, id: 'ldotj6nghv7a',
          });
        }
      },
      deploySecretContract: function(preCode, encryptedArgs, encryptedFn, userDHKey, contractAddress, callback) {
        if (!preCode) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!encryptedArgs) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!encryptedFn) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!userDHKey) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!contractAddress) {
          callback({code: -32602, message: 'Invalid params'});
        } else {
          callback(null, {
            deploySentResult: true,
          });
        }
      },
      sendTaskInput: function(taskId, workerAddress, encryptedFn, encryptedArgs, contractAddress, userDHKey, callback) {
        if (!taskId) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!workerAddress) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!encryptedFn) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!encryptedArgs) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!contractAddress) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!userDHKey) {
          callback({code: -32602, message: 'Invalid params'});
        } else {
          callback(null, {
            sendTaskResult: true,
          });
        }
      },
      getTaskStatus: function(taskId, workerAddress, withResult, callback) {
        if (!taskId) {
          callback({code: -32602, message: 'Invalid params'});
        } else if (!workerAddress) {
          callback({code: -32602, message: 'Invalid params'});
        } else {
          _counter++;
          let status = (_counter < 5) ? 'INPROGRESS' : 'SUCCESS';
          callback(null, {
            result: {
              output: [22, 22, 22, 22, 22, 33, 44, 44, 44, 44, 44, 44, 44, 55, 66, 77, 88, 99],
              status: status,
            },
          });
        }
      },
      getTaskResult: function(taskId, callback) {
        if (!taskId) {
          callback({code: -32602, message: 'Invalid params'});
        } else {
          switch (_counter) {
            case (0):
              _counter++;
              callback(null, {
                result: {
                  status: 'INVALIDSTATUS',
                },
              });
              break;
            case (1):
              _counter++;
              callback(null, {
                result: {
                  status: 'null',
                },
              });
              break;
            case (2):
              _counter++;
              callback(null, {
                result: {
                  status: 'UNVERIFIED',
                },
              });
              break;
            case (3):
              _counter++;
              callback(null, {
                result: {
                  status: 'INPROGRESS',
                },
              });
              break;
            case (4):
              _counter++;
              callback(null, {
                result: {
                  taskId: '0x0033105ed3302282dddd38fcc8330a6448f6ae16bbcb26209d8740e8b3d28538',
                  status: 'FAILED',
                  output: [22, 22, 22, 22, 22, 33, 44, 44, 44, 44, 44, 44, 44, 55, 66, 77, 88, 99],
                  usedGas: 'amount-of-gas-used',
                  signature: 'enclave-signature',
                },
              });
              break;
            default:
              _counter++;
              callback(null, {
                result: {
                  taskId: '0x0033105ed3302282dddd38fcc8330a6448f6ae16bbcb26209d8740e8b3d28538',
                  status: 'SUCCESS',
                  output: [22, 22, 22, 22, 22, 33, 44, 44, 44, 44, 44, 44, 44, 55, 66, 77, 88, 99],
                  delta: {'key': 0, 'data': [11, 2, 3, 5, 41, 44]},
                  usedGas: 'amount-of-gas-used',
                  ethereumPayload: 'hex of payload',
                  ethereumAddress: 'address of the payload',
                  signature: 'enclave-signature',
                },
              });
          }
        }
      },
    }, {
      collect: false, // don't collect params in a single argument
    });
  }

  listen() {
    this.app.use(cors({methods: ['POST']}));
    this.app.use(bodyParser.json());
    this.app.use(this.server.middleware());
    this.serverInstance = this.app.listen(3000);
  }

  close(done) {
    this.serverInstance.close(done);
  }
}
