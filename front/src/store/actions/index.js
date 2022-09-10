import {SET_ACCOUNT, SET_CATEGORIES, SET_CONTRACT, SET_ETH_COURS, SET_NFTS, SET_USER} from "./types";

export const setAccount = (snapshot) => {
    return {
        type: SET_ACCOUNT,
        snapshot,
    };
};

export const setContract = (snapshot) => {
    return {
        type: SET_CONTRACT,
        snapshot,
    };
};

export const setNfts = (snapshot) => {
    return {
        type: SET_NFTS,
        snapshot,
    };
};

export const setCategories = (snapshot) => {
    return {
        type: SET_CATEGORIES,
        snapshot,
    };
};

export const setEthCours = (snapshot) => {
    return {
        type: SET_ETH_COURS,
        snapshot,
    };
};

export const setUser = (snapshot) => {
    return {
        type: SET_USER,
        snapshot,
    };
};
