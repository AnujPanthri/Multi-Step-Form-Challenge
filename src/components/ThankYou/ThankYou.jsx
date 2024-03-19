import React from 'react'
import "./ThankYou.css";
import logo from "/assets/images/icon-thank-you.svg";
import { Form } from "@components/Form";

function ThankYou() {
    return (
        <Form>

            <div className='thankyou'>
                <img className='logo' src={logo} alt="" />
                <span className="title">Thank you!</span>
                <p className="msg">
                    Thanks for confirming your subscription! We hope you have
                    fun using our platform. If you ever need support, please feel
                    free to email us at support@loremgaming.com.
                </p>
            </div>
        </Form>
    )
}

export default ThankYou