import React from "react";

import './Button.css'

const Button = ({children, onClick, disabled}) => {
    return (
        <button
            className={`btn ${disabled ? 'btn-disabled' : ''}`}
            onClick={onClick && !disabled ? onClick : null}
        >
            {children}
        </button>
    )
}

export default Button
