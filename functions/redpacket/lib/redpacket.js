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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenFactory = exports.hexlinkErc721Metadata = exports.hexlinkErc721Contract = exports.hexlinkErc721Interface = exports.HEXLINK_ERC721_VERSION_LATEST = exports.redPacketContract = exports.tokenFactoryAddress = exports.redPacketAddress = exports.tokenFactoryInterface = exports.redPacketInterface = void 0;
const ethers_1 = require("ethers");
const common_1 = require("../../common");
const HAPPY_RED_PACKET_ABI_json_1 = __importDefault(require("./abi/HAPPY_RED_PACKET_ABI.json"));
const HEXLINK_ERC721_ABI_V1_json_1 = __importDefault(require("./abi/HEXLINK_ERC721_ABI_V1.json"));
const HEXLINK_TOKEN_FACTORY_ABI_json_1 = __importDefault(require("./abi/HEXLINK_TOKEN_FACTORY_ABI.json"));
const addresses_json_1 = __importDefault(require("./addresses.json"));
exports.redPacketInterface = new ethers_1.ethers.utils.Interface(HAPPY_RED_PACKET_ABI_json_1.default);
exports.tokenFactoryInterface = new ethers_1.ethers.utils.Interface(HEXLINK_TOKEN_FACTORY_ABI_json_1.default);
function redPacketAddress(chain) {
    return addresses_json_1.default[chain.name].redpacket;
}
exports.redPacketAddress = redPacketAddress;
function tokenFactoryAddress(chain) {
    return addresses_json_1.default[chain.name].tokenFactory;
}
exports.tokenFactoryAddress = tokenFactoryAddress;
function redPacketContract(provider) {
    return __awaiter(this, void 0, void 0, function* () {
        return new ethers_1.ethers.Contract(redPacketAddress(yield (0, common_1.getChainFromProvider)(provider)), HAPPY_RED_PACKET_ABI_json_1.default, provider);
    });
}
exports.redPacketContract = redPacketContract;
exports.HEXLINK_ERC721_VERSION_LATEST = 1;
function hexlinkErc721Abi(version) {
    if (version != 1) { // only support version 1 now
        throw new Error("Unsupported version");
    }
    return HEXLINK_ERC721_ABI_V1_json_1.default;
}
function hexlinkErc721Interface(version) {
    return new ethers_1.ethers.utils.Interface(hexlinkErc721Abi(version || exports.HEXLINK_ERC721_VERSION_LATEST));
}
exports.hexlinkErc721Interface = hexlinkErc721Interface;
function getVersion(address, provider) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const abi = [
                "function version() pure returns (uint256)",
            ];
            const contract = new ethers_1.ethers.Contract(address, abi, provider);
            return (yield contract.version()).toNumber();
        }
        catch (err) {
            return exports.HEXLINK_ERC721_VERSION_LATEST;
        }
    });
}
function hexlinkErc721Contract(address, provider) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = yield getVersion(address, provider);
        return new ethers_1.ethers.Contract(address, hexlinkErc721Abi(version), provider);
    });
}
exports.hexlinkErc721Contract = hexlinkErc721Contract;
function hexlinkErc721Metadata(erc721) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            name: yield erc721.name(),
            symbol: yield erc721.symbol(),
            validator: yield erc721.validator(),
            tokenURI: yield erc721.tokenURI(0),
            maxSupply: (yield erc721.maxSupply()).toString(),
            transferrable: yield erc721.transferrable(),
        };
    });
}
exports.hexlinkErc721Metadata = hexlinkErc721Metadata;
function tokenFactory(provider) {
    return __awaiter(this, void 0, void 0, function* () {
        return new ethers_1.ethers.Contract(tokenFactoryAddress(yield (0, common_1.getChainFromProvider)(provider)), hexlinkErc721Abi(exports.HEXLINK_ERC721_VERSION_LATEST), provider);
    });
}
exports.tokenFactory = tokenFactory;
