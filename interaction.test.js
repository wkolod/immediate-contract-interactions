const Arweave = require("arweave");
const { SmartWeaveNodeFactory, LoggerFactory } = require("redstone-smartweave");
const fs = require("fs");

jest.setTimeout(30000);

const apiConfig = {
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  url: 'https://arweave.net'
};

const arweave = Arweave.init(apiConfig);

LoggerFactory.INST.logLevel('debug');
const smartweave = SmartWeaveNodeFactory.memCached(arweave);

let wallet = {};
let contract = {};

const getContract = (contractTxId, wallet) => {
  return smartweave
    .contract(contractTxId)
    .setEvaluationOptions({
      internalWrites: true,
      fcpOptimization: true,
      stackTrace: {
        saveState: true
      }
    })
    .connect(wallet);
}

describe("Testing writing an interaction immediately after deploying the contract", () => {
  beforeAll(async () => {
    try {
      const keyfile = fs.readFileSync('./.config-wallet.json').toString();
      wallet = JSON.parse(keyfile);
    } catch(error) {
      console.error("Unable to load a JSON keyfile from: ./.config-wallet.json");
    }
  });

  it("should deploy the contract", async () => {
    const contractSrc = fs.readFileSync('./contract.js').toString();
    const initialState = fs.readFileSync('./initial_state.json').toString();
    const contractId = await smartweave.createContract.deploy({
      wallet: wallet,
      initState: initialState,
      src: contractSrc,
    });
    contract = getContract(contractId, wallet);
  });

  it("should write a contract interaction", async () => {
    await contract.writeInteraction({
      function: "register",
    });
  });
});