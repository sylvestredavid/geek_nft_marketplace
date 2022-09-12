import React from "react";

import './Input.css'

const Input = ({label, placeholder, type, step, onChange}) => {
    return (
        <div className="inputContainer">
            <label htmlFor={label} className="inputContainer-label">{label}</label>
            {
                type === "textarea" ? (
                    <textarea
                        className="inputContainer-input"
                        name={label} placeholder={placeholder}
                        onChange={onChange}></textarea>
                ) : (
                    <input
                        className="inputContainer-input"
                        name={label} type={type} placeholder={placeholder} step={step} onChange={onChange}/>
                )
            }
        </div>
    )
}

export default Input
