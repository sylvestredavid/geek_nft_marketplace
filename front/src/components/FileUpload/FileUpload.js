import React, {useRef} from "react";

import Close from "../../assets/icons/close.png";
import Upload from "../../assets/icons/upload.png";

import "./FileUpload.css"

const FileUpload = ({label, fileUrl, onChange, onDelete}) => {
    const hiddenFileInput = useRef(null);
    return (
        <>
            <label htmlFor="image" className="label">{label}</label>
            <input ref={hiddenFileInput} name="image" id="hiddenFileInput" type="file" onChange={onChange}
                   className="hiddenFileInput"/>
            {
                fileUrl ? (
                    <div className="file">
                        <div className="file_delete" onClick={onDelete}>
                            <img src={Close} alt="icone delete"/>
                        </div>
                        <img src={fileUrl} alt="nft preview"/>
                    </div>
                ) : (
                    <div className="fileInput"
                            onClick={() => hiddenFileInput.current.click()}>
                        <img src={Upload} alt="icone upload"/>
                    </div>
                )
            }
        </>
    )
}

export default FileUpload
