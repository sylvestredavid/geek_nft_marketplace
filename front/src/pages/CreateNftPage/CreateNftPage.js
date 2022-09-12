import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Web3 from "web3";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {BACKEN_URL, getIpfsClient, getWeb3, NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS} from "../../config/config";
import {setNfts} from "../../store/actions";
import Button from "../../components/Button/Button";
import {useIpfsFileUpload} from "../../hooks/useIpfsFileUpload";
import FileUpload from "../../components/FileUpload/FileUpload";
import Input from "../../components/Input/Input";

import './CreateNftPage.css'
import Header from "../../components/Header/header";

const client = getIpfsClient()
const web3 = getWeb3()
const CreateNftPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const marketplaceContract = useSelector(state => state.marketplaceContract)
    const account = useSelector(state => state.account)
    const nfts = useSelector(state => state.nfts)
    const categories = useSelector(state => state.categories)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    const [fileUri, setFileUri, uploadImg] = useIpfsFileUpload(client)

    async function uploadToIPFS() {
        if (!name || !description || !price || !fileUri) {
            return
        } else {
            // first, upload metadata to IPFS
            const data = JSON.stringify({
                name, description, image: fileUri
            })
            try {
                const added = await client.add(data)
                const url = `https://ipfs.infura.io/ipfs/${added.path}`
                // after metadata is uploaded to IPFS, return the URL to use it in the transaction
                return url
            } catch (error) {
                console.log('Error uploading file: ', error)
            }
        }
    }

    const handleForm = async (e) => {
        e?.preventDefault()
        if(name && description && price && fileUri) {
            const url = await uploadToIPFS();
            const fees = await marketplaceContract.methods.getListingFee().call()
            const weiPrice = Web3.utils.toWei(price, "ether");
            const nftContract = new web3.eth.Contract(NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS)
            nftContract.methods.mint(url).send({from: account}).on('receipt', function (receipt) {
                console.log('minted', receipt);
                // List the NFT
                const tokenId = receipt.events.NftMinted.returnValues[0];
                marketplaceContract.methods.listNFT(NFT_CONTRACT_ADDRESS, tokenId, weiPrice)
                    .send({from: account, value: fees}).on('receipt', function () {
                    axios.post(BACKEN_URL + '/nfts/create', {
                        name,
                        description,
                        fileUri,
                        owner: account,
                        toSell: true,
                        weiPrice,
                        categoryId: selectedCategory.id,
                        tokenId
                    })
                        .then(res => {
                            dispatch(setNfts([...nfts, res.data]))
                            navigate('/mes-nft', {state: {display: "listed"}})
                        })
                });
            });
        }
    }

    const changeSelectedCategory = (event) => {
        setSelectedCategory(categories.find(col => col.id === event.target.value))
    }

    return (
        <>
            <Header />
            <main className="createMain">
                <form onSubmit={handleForm} className="createMain_form">
                    <div className="createMain_form_formfield">
                        <FileUpload label="Média (png, jpg, gif)" onChange={uploadImg} fileUrl={fileUri} onDelete={() => setFileUri(null)} />
                    </div>
                    <Input type="text" placeholder="Nom" label="Nom" onChange={e => setName(e.target.value)} />
                    <Input type="textarea" placeholder="Description" label="Description" onChange={e => setDescription(e.target.value)} />
                    <Input type="number" placeholder="prix" label="prix" step="0.0001" onChange={e => setPrice(e.target.value)} />
                    <div className="createMain_form_formfield">
                        <label htmlFor="category" className="createMain_form_formfield-label">Category</label>
                        <select
                            className="createMain_form_formfield-select"
                            value={selectedCategory?.id} placeholder="category" onChange={changeSelectedCategory}>
                            {
                                categories.map((category, index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <Button disabled={!name || !description || !price || !fileUri} onClick={handleForm}>Envoyer</Button>
                </form>
            </main>
        </>
    )
}

export default CreateNftPage
