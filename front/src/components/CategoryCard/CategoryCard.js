import React from "react";
import {Link} from "react-router-dom";

import './CategoryCard.css'

const CategoryCard = ({category}) => {
    return (
        <Link to={"/category/" + category.id} className="categoryCard">
            <div className="categoryCard_imgContainer">
                <img src={category.cover} alt="category" />
            </div>
            <div className="categoryCard_infos">
                <img src={category.cover} alt="category" />
                <h2 className="categoryCard_infos-name">{category.nom}</h2>
            </div>
        </Link>
    )
}

export default CategoryCard
