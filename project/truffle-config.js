const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = "859e767d4be34e8f914f101ac53fe4f1";
// //
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4, // Ropsten's id
      gas: 6721975, // Ropsten has a lower block limit than mainnet
      gasPrice: 20000000000,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      },
    },
  },
};
