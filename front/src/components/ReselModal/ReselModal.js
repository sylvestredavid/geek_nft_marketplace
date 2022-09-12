import React, {useState} from "react";

import Input from "../Input/Input";
import Close from '../../assets/icons/close.png'
import Button from "../Button/Button";

import './ReselModal.css'

const ReselModal = ({showModal, nft, onClose, onSubmit}) => {
    const [price, setPrice] = useState()
    return (
        <>
            {
                showModal && (
                    <div className="reselModalBg">
                        <div className="reselModalBody">
                            <img src={Close} alt="close" className="reselModalBody-close" onClick={onClose} />
                            <h2 className="reselModalBody-title">Mettre en ventre {nft.name}</h2>
                            <img className="reselModalBody-img" src={nft.fileUri} alt={nft.name} />
                            <Input type="number" placeholder="prix" label="prix" step="0.0001" onChange={e => setPrice(e.target.value)} />
                            <Button onClick={() => onSubmit(price)} disabled={!price || price <= 0}>Envoyer</Button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ReselModal
