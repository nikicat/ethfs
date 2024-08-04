//import '@openzeppelin/hardhat-upgrades'
import { HardhatUserConfig, task, vars } from "hardhat/config";
//import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
//import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-chai-matchers";
//import "@nomicfoundation/hardhat-ignition-ethers";
import "@typechain/hardhat";
import "tsconfig-paths/register";
//import "hardhat-gas-reporter";
//import "hardhat-abi-exporter";
//import "solidity-coverage";
//import "hardhat-contract-sizer";

//import "./tasks/upgrade.cjs";


const config: HardhatUserConfig = {
    paths: {
        sources: "./contracts",
    },
    solidity: {
        compilers: [
            {
                version: '0.8.26',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 2000,
                        details: {
                            yulDetails: {
                                optimizerSteps: "u",
                            },
                        },
                    },
                    viaIR: true,
                },
            },
        ],
    },
    typechain: {
        target: "ethers-v6",
        node16Modules: true,
    },
    networks: {
        hardhat: {
            loggingEnabled: true
        },
        sepolia: {
            url: "https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY,
            accounts: process.env.SEPOLIA_PRIVATE_KEY ? [process.env.SEPOLIA_PRIVATE_KEY] : [],
        },
        goerli: {
            url: "https://goerli.infura.io/v3/" + process.env.INFURA_API_KEY,
            accounts: process.env.GOERLI_PRIVATE_KEY ? [process.env.GOERLI_PRIVATE_KEY] : [],
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    sourcify: {
        enabled: true
    },
}

export default config;
