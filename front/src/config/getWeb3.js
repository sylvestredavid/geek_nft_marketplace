import Web3 from "web3";

export const getWeb3 = () => {
    return new Web3(Web3.givenProvider || 'http://localhost:7545');
}
