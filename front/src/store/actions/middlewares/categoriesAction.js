import axios from "axios";

import {setCategories} from "../index";
import {BACKEN_URL} from "../../../config/config";

export const getCategoriesAction = () => {
    return (dispatch => {
        axios.get(BACKEN_URL + "/categories")
            .then(res => dispatch(setCategories(res.data)))
            .catch(err => console.log(err))
    });
};
