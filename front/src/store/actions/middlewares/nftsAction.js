import axios from "axios";

import {setNfts} from "../index";
import {BACKEN_URL} from "../../../config/config";

export const getNftsAction = () => {
    return (dispatch => {
        axios.get(BACKEN_URL + "/nfts")
            .then(res => dispatch(setNfts(res.data)))
            .catch(err => console.log(err))
    });
};
