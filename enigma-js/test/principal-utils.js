import Docker from 'dockerode';

const docker = new Docker();
exports.execInContainer = (enigma, commandOption) => {
  let container = docker.getContainer(process.env.PRINCIPAL_CONTAINER);
  return new Promise((resolve, reject) => {
    const contractAddress = enigma.enigmaContract.options.address.substring(2);
    const cmd = ['bash', '-c', `./enigma-principal-app ${commandOption} --contract-address ${contractAddress}`];
    const cmdStr = cmd.join(' ');
    console.log('Calling:\n', cmdStr);
    container.exec(
      {
        Cmd: cmd,
        AttachStdin: true,
        AttachStdout: true,
        WorkingDir: '/root/src/enigma-principal/bin',
      }, (err, exec) => {
        exec.start({hijack: true, stdin: true}, (err, stream) => {
          if (err) {
            reject(err);
            return;
          }
          let out = '';
          stream.on('data', (line) => {
            out += line;
          });
          stream.on('error', (err) => {
            out += err;
          });
          stream.on('end', () => {
            const txFrom = out.lastIndexOf('0x');
            const txLen = out.length - txFrom;
            console.log(`Called cmd ${cmdStr}:\n${out}`);
            if (txLen === 67) {
              const tx = out.substr(txFrom);
              resolve(tx);
            } else {
              reject(`Unable to call command ${commandOption} from the Principal node container: ${out}`);
            }
          });
        });
      });
  });
};
