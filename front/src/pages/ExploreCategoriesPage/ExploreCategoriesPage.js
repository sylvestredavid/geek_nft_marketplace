import React, {useState} from "react";
import {useSelector} from "react-redux";

import CategoryCard from "../../components/CategoryCard/CategoryCard";

import './ExploreCategoriesPage.css'
import Header from "../../components/Header/header";

const ExploreCategoriesPage = () => {
    const categories = useSelector(state => state.categories)
    const [searchValue, setSearchValue] = useState('')

    return (
        <>
            <Header
                input={
                    <input type="text"
                           placeholder="chercher un nft"
                           className="header-search"
                           value={searchValue} onChange={e => setSearchValue(e.target.value)}
                    />
                }
            />
            <main className="exploreMain">
                <div className="exploreMain_nftsContainer">
                    {
                        categories.filter(cat => cat.nom.includes(searchValue)).map((cat, index) => (
                            <CategoryCard category={cat} key={index}/>
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default ExploreCategoriesPage
/*
const NftCard = nfts.find(n => n.id === +r.dataId)
                    if(NftCard) {
                        nftsToDisplay.push(NftCard)
                    }
 */
