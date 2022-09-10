import {MARKETPLACE_CONTRACT_ABI} from "./marketplaceAbi";
import {NFT_CONTRACT_ABI} from "./nftAbi";
import {getIpfsClient} from "./getIpfsClient";
import {getWeb3} from "./getWeb3";

const BACKEN_URL = "http://localhost:8080"

const MARKETPLACE_CONTRACT_ADDRESS = "0xc60c8c1999E7ea8972419D04ea36BF9FE8D46582"

const NFT_CONTRACT_ADDRESS = "0x4C5674AaEE96AB2483a87939c55221f48878d595"

export {
    MARKETPLACE_CONTRACT_ABI,
    NFT_CONTRACT_ABI,
    BACKEN_URL,
    MARKETPLACE_CONTRACT_ADDRESS,
    NFT_CONTRACT_ADDRESS,
    getIpfsClient,
    getWeb3
}
