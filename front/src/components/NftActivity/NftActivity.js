import React, {useEffect, useState} from "react";
import './NftActivity.css'
import {useSelector} from "react-redux";
import {getWeb3, MARKETPLACE_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS} from "../../config/config";
import Web3 from "web3";
import Eth from '../../assets/icons/eth.svg'

const web3 = getWeb3()
const NftActivity = ({tokenId}) => {
    const account = useSelector(state => state.account)
    const marketplaceContract = useSelector(state => state.marketplaceContract);

    const [events, setEvents] = useState([])

    useEffect(() => {
        async function loadEvents() {
            const minted = await getNftMintedEvents();
            const listeds = await getNFTListedEvents();
            const soldeds = await getNFTSoldEvents();
            const tranfereds = await getNFTTransferEvents();

            setEvents([...minted, ...listeds, ...soldeds, ...tranfereds].sort((a,b) => a.timestamp - b.timestamp))
        }
        loadEvents()
    }, [])

    useEffect(() => {
        console.log(events)
    }, [events])

    const getNFTListedEvents = async() => {
        const events = await marketplaceContract.getPastEvents('NFTListed', {
            fromBlock: 0,
            toBlock: 'latest',
            filter: {tokenId: tokenId}
        })
        const result = []
        for(let i = 0; i < events.length; i++) {
            const event = {
                type: "listed",
                from: events[i].returnValues.seller,
                timestamp: await getTimeByBlock(events[i].transactionHash)
            }
            result.push(event)
        }
        return result
    }

    const getNFTSoldEvents = async() => {
        const events = await marketplaceContract.getPastEvents('NFTSold', {
            fromBlock: 0,
            toBlock: 'latest',
            filter: {tokenId: tokenId}
        })
        const result = []
        for(let i = 0; i < events.length; i++) {
            const event = {
                type: "sold",
                from: events[i].returnValues.seller,
                to: events[i].returnValues.owner,
                timestamp: await getTimeByBlock(events[i].transactionHash),
                price: events[i].returnValues.price
            }
            result.push(event)
        }
        return result
    }

    const getNFTTransferEvents = async() => {
        const nftContract = new web3.eth.Contract(NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS)
        const events = await nftContract.getPastEvents('Transfer', {
            fromBlock: 0,
            toBlock: 'latest',
            filter: {tokenId: tokenId}
        })
        const result = []
        for(let i = 0; i < events.length; i++) {
            const event = {
                type: "transfer",
                from: events[i].returnValues.from,
                to: events[i].returnValues.to,
                timestamp: await getTimeByBlock(events[i].transactionHash)
            }
            result.push(event)
        }
        return result
    }

    const getNftMintedEvents = async() => {
        const nftContract = new web3.eth.Contract(NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS)
        const events = await nftContract.getPastEvents('NftMinted', {
            fromBlock: 0,
            toBlock: 'latest',
            filter: {tokenId: tokenId}
        })
        const result = []
        for(let i = 0; i < events.length; i++) {
            const event = {
                type: "minted",
                timestamp: await getTimeByBlock(events[i].transactionHash)
            }
            result.push(event)
        }
        return result
    }

    const getTimeByBlock = async(txHash) => {
        const blockN = await web3.eth.getTransaction(txHash)
        const blockData = await web3.eth.getBlock(blockN.blockNumber)

        return blockData.timestamp
    }

    const formatAddress = (address) => {
        if(!address) {
            return ""
        }
        if(/^0x0+$/.test(address)){
            return "null"
        }
        if(address === account){
            return "you"
        }
        if(address === MARKETPLACE_CONTRACT_ADDRESS){
            return "Geek nft"
        }
        return address.substring(2, 8)
    }

    const formatPrice = (price) => {
        if(!price) {
            return ""
        }
        return (<span><img src={Eth} className="ethPriceIcon" alt="eth icon" />{Web3.utils.fromWei(price, "ether")}</span>)
    }

    const formatDate = (timestamp) => {
        if(!timestamp) {
            return ""
        }
        const date = new Date(timestamp * 1000)
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
        const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

        return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}`
    }

    return (
        <table className="nftActivity">
            <thead>
            <tr>
                <th>Date</th>
                <th>type</th>
                <th>from</th>
                <th>to</th>
                <th>price</th>
            </tr>
            </thead>
            <tbody>
            {
                events.map((event, index) => (
                    <tr key={index}>
                        <td>{formatDate(event.timestamp)}</td>
                        <td>{event.type}</td>
                        <td>{formatAddress(event.from)}</td>
                        <td>{formatAddress(event.to)}</td>
                        <td>{formatPrice(event.price)}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default NftActivity
