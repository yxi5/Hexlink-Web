"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refunder = exports.getChain = exports.getChainFromProvider = exports.SUPPORTED_CHAINS = exports.ARBITRUM = exports.ARBITRUM_NOVA = exports.ARBITRUM_TESTNET = exports.GALILEO = exports.MUMBAI = exports.POLYGON = exports.GOERLI = void 0;
const ethers_1 = require("ethers");
exports.GOERLI = {
    chainId: "5",
    name: "goerli",
    fullName: "Goerli Test Network",
    rpcUrls: ["https://goerli.infura.io/v3/"],
    nativeCurrency: {
        name: "Goerli Ethereum",
        symbol: "gETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://goerli.etherscan.io"],
    logoUrl: "https://token.metaswap.codefi.network/assets/networkLogos/ethereum.svg",
};
exports.POLYGON = {
    chainId: "137",
    rpcUrls: ["https://polygon-mainnet.infura.io/v3/"],
    name: "polygon",
    fullName: "Polygon Network",
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com"],
    logoUrl: "https://token.metaswap.codefi.network/assets/networkLogos/polygon.svg",
};
exports.MUMBAI = {
    chainId: "80001",
    rpcUrls: ["https://polygon-mumbai.infura.io/v3/"],
    name: "mumbai",
    fullName: "Polygon Test Network",
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    logoUrl: "https://token.metaswap.codefi.network/assets/networkLogos/polygon.svg",
};
exports.GALILEO = {
    chainId: "3334",
    rpcUrls: ["https://galileo.web3q.io:8545"],
    name: "galileo",
    fullName: "Web3Q Galileo Test Network",
    nativeCurrency: {
        name: "W3Q",
        symbol: "W3Q",
        decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.galileo.web3q.io/"],
    logoUrl: "",
};
exports.ARBITRUM_TESTNET = {
    chainId: "421613",
    rpcUrls: ["https://endpoints.omniatech.io/v1/arbitrum/goerli/public"],
    name: "arbitrum_testnet",
    fullName: "Arbitrum Test Network",
    nativeCurrency: {
        name: "Arbitrum Ethereum",
        symbol: "aETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://goerli-rollup-explorer.arbitrum.io"],
    logoUrl: "https://i.postimg.cc/020dzv9j/nova.png",
};
exports.ARBITRUM_NOVA = {
    chainId: "42170",
    rpcUrls: ["https://nova.arbitrum.io/rpc"],
    name: "arbitrum_nova",
    fullName: "Arbitrum Nova",
    nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://nova-explorer.arbitrum.io/"],
    logoUrl: "https://i.postimg.cc/020dzv9j/nova.png",
};
exports.ARBITRUM = {
    chainId: "42161",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    name: "arbitrum",
    fullName: "Arbitrum One",
    nativeCurrency: {
        name: "Arbitrum Ethereum",
        symbol: "AETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.arbitrum.io/"],
    logoUrl: "https://i.postimg.cc/mkJcpr2T/arbilogo.png",
};
exports.SUPPORTED_CHAINS = [exports.GOERLI, exports.MUMBAI, exports.ARBITRUM, exports.ARBITRUM_TESTNET];
function getChainFromProvider(provider) {
    return __awaiter(this, void 0, void 0, function* () {
        const network = yield provider.getNetwork();
        return getChain(network.chainId);
    });
}
exports.getChainFromProvider = getChainFromProvider;
function getChain(chain) {
    chain = chain.toString();
    if (chain === "goerli" || chain === "5") {
        return exports.GOERLI;
    }
    else if (chain === "polygon" || chain === "137") {
        return exports.POLYGON;
    }
    else if (chain === "mumbai" || chain == "80001") {
        return exports.MUMBAI;
    }
    else if (chain === "galileo" || chain == "3334") {
        return exports.GALILEO;
    }
    else if (chain === "arbitrum_nova" || chain == "42170") {
        return exports.ARBITRUM_NOVA;
    }
    else if (chain === "arbitrum_testnet" || chain == "421613") {
        return exports.ARBITRUM_TESTNET;
    }
    else if (chain === "arbitrum" || chain == "42161") {
        return exports.ARBITRUM;
    }
    throw new Error("Unsupported chain");
}
exports.getChain = getChain;
function refunder(_chain) {
    return ethers_1.ethers.constants.AddressZero;
}
exports.refunder = refunder;
