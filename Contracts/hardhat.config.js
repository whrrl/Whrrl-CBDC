require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
console.log("%c Line:25 🍣 process.env.RPC_URL", "color:#7f2b82", process.env.RPC_URL);
module.exports = {
  solidity: {
    version: "0.6.2",
    settings: {
      evmVersion: "homestead",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    whrrl: {
      url: process.env.RPC_URL,
      accounts: [process.env.SIGNER_PRIV_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  }
};