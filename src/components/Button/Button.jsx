import React from 'react';
import "./Button.css";

function Button({
    children,
    onClick,
    theme,
    type="button",
}) {


    return (
        <button type={type} onClick={onClick} className={'button ' + theme}>{children}</button>
    )
}

export default Button