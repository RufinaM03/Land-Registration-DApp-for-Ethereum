require("dotenv").config(); // Load .env file

// const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache local blockchain
      network_id: "*", // Match any network ID
      gas: 5000000,
      gasPrice: 20000000000,
    },
    // goerli: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       process.env.PRIVATE_KEY, // From .env
    //       `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}` // From .env
    //     ),
    //   network_id: 5, // Goerli network ID
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // },
  },

  compilers: {
    solc: {
      version: "0.8.4",
    },
  },
  contracts_directory: "./contracts",
  contracts_build_directory: "./build/contracts",
};
