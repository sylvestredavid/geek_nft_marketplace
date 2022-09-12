import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {BACKEN_URL, IPFS_CLIENT} from "../../config/config";
import Button from "../../components/Button/Button";
import {useIpfsFileUpload} from "../../hooks/useIpfsFileUpload";
import FileUpload from "../../components/FileUpload/FileUpload";
import {setCategories} from "../../store/actions";
import Input from "../../components/Input/Input";
import Header from "../../components/Header/header";

import './CreateCategoryPage.css'

const CreateCategoryPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categories = useSelector(state => state.categories)
    const [name, setName] = useState(null)
    const [fileUrl, setFileUrl, uploadImg] = useIpfsFileUpload(IPFS_CLIENT)

    const handleForm = (e) => {
        e?.preventDefault()
        if(name && fileUrl) {
            axios.post(BACKEN_URL + "/categories/create", {
                name,
                cover: fileUrl
            }).then(res => {
                dispatch(setCategories([...categories, res.data]))
                navigate('/explore-categories')
            })
        }
    }

    return (
        <>
            <Header />
            <main className="createCategoryMain">
                <form onSubmit={handleForm} className="createCategoryMain_form">
                    <div className="createCategoryMain_form_formfield">
                        <FileUpload label="Image de couverture" onChange={uploadImg} fileUrl={fileUrl} onDelete={() => setFileUrl(null)} />
                    </div>
                    <Input type="text" placeholder="Nom" label="Nom" onChange={e => setName(e.target.value)} />
                    <Button disabled={!name || !fileUrl} onClick={handleForm}>Envoyer</Button>
                </form>
            </main>
        </>
    )
}

export default CreateCategoryPage
