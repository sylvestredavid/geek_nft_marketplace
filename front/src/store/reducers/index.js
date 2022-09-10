import {SET_ACCOUNT, SET_CATEGORIES, SET_CONTRACT, SET_ETH_COURS, SET_NFTS, SET_USER} from "../actions/types";

const reducers = (state, action) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                account: action.snapshot,
            };
        case SET_CONTRACT:
            return {
                ...state,
                marketplaceContract: action.snapshot,
            };
        case SET_NFTS:
            return {
                ...state,
                nfts: action.snapshot,
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.snapshot,
            };
        case SET_ETH_COURS:
            return {
                ...state,
                ethCours: action.snapshot,
            };
        case SET_USER:
            return {
                ...state,
                user: action.snapshot,
            };
        default:
            return state;
    }
};

export default reducers;
