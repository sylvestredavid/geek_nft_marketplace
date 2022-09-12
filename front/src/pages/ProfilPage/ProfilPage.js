import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";

import {setUser} from "../../store/actions";
import NftCard from "../../components/NftCard/NftCard";
import Eth from '../../assets/icons/eth.svg'
import Metamask from '../../assets/icons/MetaMask.png'
import {useLocation} from "react-router-dom";
import {getWeb3} from "../../config/config";

import './ProfilPage.css'
import Header from "../../components/Header/header";

const ProfilPage = () => {
    const {state} = useLocation();
    const dispatch = useDispatch()
    const marketplaceContract = useSelector(state => state.marketplaceContract);
    const account = useSelector(state => state.account);
    const user = useSelector(state => state.user);
    const nfts = useSelector(state => state.nfts);

    const [ownedNfts, setOwnedNfts] = useState([])
    const [listedNfts, setListedNfts] = useState([])
    const [createdNfts, setCreatedNfts] = useState([])
    const [toDisplay, setToDisplay] = useState(state?.display ? state.display : "owned")

    useEffect(() => {
        async function loadListed() {
            const listedNfts = await marketplaceContract.methods.getMyListedNfts().call({from: account})
            console.log(listedNfts)
            const nftsToDisplay = []
            for(let i = 0; i < listedNfts.length; i++) {
                const nft = listedNfts[i]
                const nftToAdd = nfts.find(n => n.tokenId === nft.tokenId)
                if(nftToAdd) {
                    nftsToDisplay.push(nftToAdd)
                }
            }
            setListedNfts(nftsToDisplay)
        }
        async function loadOwned() {
            const listedNfts = await marketplaceContract.methods.getMyOwnedNfts().call({from: account})
            const nftsToDisplay = []
            for(let i = 0; i < listedNfts.length; i++) {
                const nft = listedNfts[i]
                const nftToAdd = nfts.find(n => n.tokenId === nft.tokenId)
                if(nftToAdd) {
                    nftsToDisplay.push(nftToAdd)
                }
            }
            setOwnedNfts(nftsToDisplay)
        }
        async function loadCreated() {
            const listedNfts = await marketplaceContract.methods.getMyCreatedNfts().call({from: account})
            const nftsToDisplay = []
            for(let i = 0; i < listedNfts.length; i++) {
                const nft = listedNfts[i]
                const nftToAdd = nfts.find(n => n.tokenId === nft.tokenId)
                if(nftToAdd) {
                    nftsToDisplay.push(nftToAdd)
                }
            }
            setCreatedNfts(nftsToDisplay)
        }
        loadListed()
        loadOwned()
        loadCreated()
    }, [user])

    const signToMetamask = () => {
        const msg = `Vous etes sur le point de signer pour geekNft\nEn signant vous acceptez les conditions generales\naddress:${account}\nnonce:${uuidv4()}`
        const web3 = getWeb3();
        web3.eth.personal.sign(msg, account).then(r => {
            axios.post("http://localhost:8080/auth/login", {
                "signature": r,
                "message": msg,
                "address": account
            }).then(
                res => {
                    window.localStorage.setItem("geekNft", res.data.token)
                    dispatch(setUser(res.data.user))
                }
            )
        })
    }

    const getNftsToDisplay = () => {
        switch (toDisplay) {
            case "owned":
                return ownedNfts
            case "listed":
                return listedNfts
            case "created":
                return createdNfts
            default:
                return ownedNfts
        }
    }

    if (!user) {
        return (
            <main className="profilMain">
                <button onClick={signToMetamask} className="profilMain-btn">
                    <span>Se connecter avec Metamask</span>
                    <img src={Metamask} alt="icone metamask"/>
                </button>
            </main>
        )
    }

    return (
        <>
            <Header />
            <main className="profilMain">
                <h2 className="profilMain-username">{user.name}</h2>
                <p  className="profilMain-account"><img src={Eth} alt="icone ETH" />{account.substring(0, 5)}...{account.slice(-4)}</p>
                <div className="profilMain_onglets">
                    <button className={toDisplay === "owned" ? "selectedOnglet" : ""} onClick={() => setToDisplay("owned")}>Collectés {ownedNfts.length}</button>
                    <button className={toDisplay === "listed" ? "selectedOnglet" : ""} onClick={() => setToDisplay("listed")}>Listés {listedNfts.length}</button>
                    <button className={toDisplay === "created" ? "selectedOnglet" : ""} onClick={() => setToDisplay("created")}>Créés {createdNfts.length}</button>
                </div>
                <div className="profilMain_nftsContainer">
                    {
                        getNftsToDisplay().map((nft, index) => (
                            <NftCard nft={nft} key={index} showToBuy={false} showCategory={true}/>
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default ProfilPage
