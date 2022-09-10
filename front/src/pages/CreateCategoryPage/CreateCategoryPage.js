import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {BACKEN_URL, getIpfsClient} from "../../config/config";
import Button from "../../components/Button/Button";
import {useIpfsFileUpload} from "../../hooks/useIpfsFileUpload";
import FileUpload from "../../components/FileUpload/FileUpload";
import {setCategories} from "../../store/actions";
import Input from "../../components/Input/Input";

import './CreateCategoryPage.css'
import Header from "../../components/Header/header";

const CreateCategoryPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categories = useSelector(state => state.categories)
    const [nom, setNom] = useState(null)
    const [fileUrl, setFileUrl, uploadImg] = useIpfsFileUpload(getIpfsClient())

    const handleForm = (e) => {
        e?.preventDefault()
        if(nom && fileUrl) {
            axios.post(BACKEN_URL + "/categories/create", {
                nom,
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
                    <Input type="text" placeholder="Nom" label="Nom" onChange={e => setNom(e.target.value)} />
                    <Button disabled={!nom || !fileUrl} onClick={handleForm}>Envoyer</Button>
                </form>
            </main>
        </>
    )
}

export default CreateCategoryPage
