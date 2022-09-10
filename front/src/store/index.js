import rootReducer from "./reducers";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

const initialState = {
    account: null,
    marketplaceContract: null,
    user: null,
    nfts: [],
    categories: [],
    ethCours: 0
};

export default createStore(rootReducer, initialState, applyMiddleware(thunk));
