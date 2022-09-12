import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Web3 from "web3";
import axios from "axios";

import Eth from "../../assets/icons/eth.svg";
import {setNfts} from "../../store/actions";
import {BACKEN_URL, getWeb3, NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS} from "../../config/config";
import Button from "../../components/Button/Button";
import ReselModal from "../../components/ReselModal/ReselModal";

import './NftPage.css'
import NftActivity from "../../components/NftActivity/NftActivity";
import Header from "../../components/Header/header";

const NftPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const marketplaceContract = useSelector(state => state.marketplaceContract);
    const account = useSelector(state => state.account);
    const nfts = useSelector(state => state.nfts)
    const nft = useSelector(state => state.nfts.find(n => n.id === id))
    const ethCours = useSelector(state => state.ethCours)

    const [showReselModal, setShowReselModal] = useState(false)

    const weiToEur = () => {
        const ethPrice =  +Web3.utils.fromWei(nft.weiPrice, "ether")
        return (ethCours * ethPrice).toFixed(2)
    }

    const getOwner = () => {
        return nft.owner === account ? 'you' : nft.owner.substring(2, 8)
    }

    const onBuy = () => {
        console.log(nft.weiPrice)
        marketplaceContract.methods.buyNft(NFT_CONTRACT_ADDRESS, nft.tokenId)
            .send({ from: account, value: nft.weiPrice }).on('receipt', function () {
                axios.put(BACKEN_URL + "/nfts/" + nft.id + "/update", {
                    ...nft,
                    owner: account,
                    toSell: false
                }).then(res => {
                    const index = nfts.findIndex(n => n.id === res.data.id)
                    nfts[index] = res.data
                    dispatch(setNfts([...nfts]))
                })
        })
    }

    const onSell = async (price) => {
        const fees = await marketplaceContract.methods.getListingFee().call()
        const weiPrice = Web3.utils.toWei(price, "ether");
        marketplaceContract.methods.resellNFT(NFT_CONTRACT_ADDRESS, nft.tokenId, weiPrice)
            .send({ from: account, value: fees }).on('receipt', function () {
                axios.put(BACKEN_URL + "/nfts/" + nft.id + "/update", {
                    ...nft,
                    toSell: true,
                    weiPrice
                }).then(res => {
                    const index = nfts.findIndex(n => n.id === res.data.id)
                    nfts[index] = res.data
                    dispatch(setNfts([...nfts]))
                    setShowReselModal(false)
                })
        })
    }

    return (
        <>
            <Header />
            <main className="nftPageMain">
                <div className="nftPageMain_body">
                    <img src={nft.fileUri} className="nftPageMain_body-img" alt={nft.name} />
                    <div className="nftPageMain_body_infos">
                        <div className="nftPageMain_body_infos_texts">
                            <h2 className="nftPageMain_body_infos-name">{nft.name}</h2>
                            <p className="nftPageMain_body_infos-owner">owner: <span>{getOwner()}</span></p>
                            <p className="nftPageMain_body_infos-descr">{nft.description}</p>
                        </div>
                        {
                            nft.toSell && nft.owner !== account && (
                                <Button onClick={onBuy}>
                                    <p>Acheter</p>
                                    <img className="btnImage" src={Eth} alt="eth icon"/>
                                    <p><b>{Web3.utils.fromWei(nft.weiPrice, "ether")}</b> ({weiToEur()}€)</p>
                                </Button>
                            )
                        }
                        {
                            !nft.toSell && nft.owner === account && (
                                <Button onClick={() => setShowReselModal(true)}>
                                    <p>Vendre</p>
                                </Button>
                            )
                        }
                    </div>
                </div>
                <div className="nftPageMain_activity">
                    <h2 className="nftPageMain_activity-title">Activitée</h2>
                    <NftActivity tokenId={nft.tokenId} />
                </div>
                <ReselModal nft={nft} onSubmit={(price) => onSell(price)} onClose={() => setShowReselModal(false)} showModal={showReselModal} />
            </main>
        </>
    )
}

export default NftPage
