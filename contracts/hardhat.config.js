// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: '0.8.20',
  networks: {
    celo: {
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: [process.env.PRIVATE_KEY], // Replace with your private key
    },
    scroll: {
      url: 'https://sepolia-rpc.scroll.io',
      accounts: [process.env.PRIVATE_KEY], // Replace with your private key
    },

  },
};
