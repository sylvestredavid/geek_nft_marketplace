import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import NftCard from "../../components/NftCard/NftCard";
import Header from "../../components/Header/header";

import './ExploreNftsPage.css'

const ExploreNftsPage = () => {
    const marketplaceContract = useSelector(state => state.marketplaceContract)
    const nfts = useSelector(state => state.nfts)
    const [displayedNfts, setDisplayedNfts] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        async function load() {
            const listedNfts = await marketplaceContract.methods.getListedNfts().call()
            console.log(listedNfts)
            const nftsToDisplay = []
            for(let i = 0; i < listedNfts.length; i++) {
                const nft = listedNfts[i]
                const nftToAdd = nfts.find(n => n.tokenId === nft.tokenId)
                if(nftToAdd) {
                    nftsToDisplay.push(nftToAdd)
                }
            }
            setDisplayedNfts(nftsToDisplay)
        }
        load()
    }, [])

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
                        displayedNfts.filter(nft => nft.name.includes(searchValue)).map((nft, index) => (
                            <NftCard nft={nft} key={index} showToBuy={true} showCategory={true}/>
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default ExploreNftsPage
/*
const NftCard = nfts.find(n => n.id === +r.dataId)
                    if(NftCard) {
                        nftsToDisplay.push(NftCard)
                    }
 */
