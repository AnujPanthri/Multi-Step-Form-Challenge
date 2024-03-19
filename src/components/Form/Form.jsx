import React from 'react';
import "./Form.css";


export function FormHeader({
    title,
    description,
}) {
    return (
        <header className='form__header'>
            <h2 className='form__title'>{title}</h2>
            <p className='form__desc'>{description}</p>
        </header>
    )
}

export function FormBody({ children }) {
    return (
        <div className='form__body'>{children}</div>
    )
}

export function FormFooter({ children }) {
    return (
        <div className='form__footer'>
            {children}
        </div>
    );
}

export function Form({
    onSubmit,
    children,
}) {
    return (
        <form className='form' onSubmit={onSubmit}>

            {children}

        </form>
    )
}
