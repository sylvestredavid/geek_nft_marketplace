import React from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import NftCard from "../../components/NftCard/NftCard";

import './CategoryPage.css'
import Header from "../../components/Header/header";

const CategoryPage = () => {
    const {id} = useParams()
    const category = useSelector(state => state.categories.find(cat => cat.id === id))
    const nfts = useSelector(state => state.nfts.filter(nft => nft.categoryId === id))

    if(!category) {
        return (
            <p>category not found</p>
        )
    }

    return (
        <>
            <Header />
            <main className="categoryMain">
                <div className="categoryMain_infos">
                    {
                        category.cover ? <img src={category.cover} className="categoryMain_infos-cover" alt={category.nom} /> : <div className="categoryMain_infos-cover bgWheat" />
                    }
                    <h2 className="categoryMain_infos-name">{category.nom}</h2>
                </div>
                <div className="categoryMain_nftsContainer">
                    {
                        nfts.map((nft, index) => (
                            <NftCard nft={nft} key={index} showToBuy={nft.toSell} showCategory={false}/>
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default CategoryPage
