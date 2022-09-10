import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Web3 from "web3";

import Eth from '../../assets/icons/eth.svg'

import './NftCard.css'

const NftCard = ({nft, showToBuy, showCategory}) => {
    const ethCours = useSelector(state => state.ethCours)

    const weiToEur = () => {
        const ethPrice =  +Web3.utils.fromWei(nft.weiPrice, "ether")
        return (ethCours * ethPrice).toFixed(2)
    }
    return (
        <Link to={"/details/" + nft.id} className="nftCard">
            <div className="nftCard_imgContainer">
                <img src={nft.fileUri} alt="ape" />
            </div>
            <div className="nftCard_infos">
                <h2 className="nftCard_infos-name">{nft.nom}</h2>
                {
                    showCategory && (
                        <Link to={"/category/" + nft.categoryId} className="nftCard_infos-category">{nft.categoryName}</Link>
                    )
                }
                {
                    showToBuy && (
                        <>
                            <p className="nftCard_infos-priceTitle">Prix</p>
                            <div className="nftCard_infos-priceContainer">
                                <img src={Eth} alt="eth icon"/>
                                <p><b>{Web3.utils.fromWei(nft.weiPrice, "ether")}</b>({weiToEur()}€)</p>
                            </div>
                            <div className="nftCard_infos_buy">
                                <p>Acheter</p>
                            </div>
                        </>
                    )
                }
            </div>
        </Link>
    )
}

export default NftCard
