import React, { useContext, useState } from 'react'
import "./PlanForm.css";
import { Form, FormHeader, FormBody, FormFooter } from '@components/Form';
import Button from "@components/Button";
import arcadelogo from "/assets/images/icon-arcade.svg";
import advancedlogo from "/assets/images/icon-advanced.svg";
import prologo from "/assets/images/icon-pro.svg";
import { DataContext } from '@/providers/DataProvider';
import { PlanSchema } from '@/schemas';

function Card({
    logo,
    title,
    rate,
    msg,
    value,
    name,
    plan,
    setPlan,
}) {
    return (
        <label className={'card ' + (value == plan ? "active" : "")} onClick={() => setPlan(value)} htmlFor={value}>
            <input type="radio" id={value} value={value} name={name} defaultChecked={value == plan} hidden />
            <img className="card__logo" src={logo} alt="logo" />
            <div className='flex flex-col gap-0-4'>
                <span className="card__title">{title}</span>
                <span className="card__rate">{rate}</span>
                <span className="card__msg">{msg}</span>
            </div>
        </label>
    );
}

function ToggleButton({
    checked,
    name,
    onClick,
}) {
    return (
        <>
            <div onClick={onClick} className={'togglebtn ' + (checked ? "on" : "")}>
                <input type="checkbox" id="togglebtn" name={name} onChange={() => { }} checked={checked} hidden />
                <div className='togglebtn__switch'></div>
            </div>
        </>
    )
}

function PlanForm({
    setFormIdx,
}) {

    const { plans, allFormData, setAllFormData } = useContext(DataContext);


    const [plan, setPlan] = useState(allFormData.plan ?? "arcade");
    const [isyearly, setIsYearly] = useState(allFormData.isyearly ?? false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const formdata = new FormData(e.target);

        const parsedData = PlanSchema.safeParse({
            plan: formdata.get("plan"),
        })

        if (!parsedData.success) {

            setErrors(parsedData.error.flatten().fieldErrors);
            return false;
        }

        setAllFormData((prev) => {
            return {
                ...prev,
                plan: parsedData.data.plan,
                isyearly: formdata.has("isyearly"),
            }
        })

        setFormIdx(prev => prev + 1);
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormHeader
                title="Select your plan"
                description="You have the option of monthly or yearly billing."
            />
            <FormBody>

                <div className='flex flex-col gap-2'>

                    <div className='cards'>
                        <Card
                            logo={arcadelogo}
                            title="Arcade"
                            rate={isyearly ? plans.arcade.yearly.rate + "/yr" : plans.arcade.monthly.rate + "/mo"}
                            msg={isyearly ? plans.arcade.yearly.msg : null}
                            name="plan"
                            value="arcade"
                            plan={plan}
                            setPlan={setPlan}
                        />
                        <Card
                            logo={advancedlogo}
                            title="Advanced"
                            rate={isyearly ? plans.advanced.yearly.rate + "/yr" : plans.advanced.monthly.rate + "/mo"}
                            msg={isyearly ? plans.advanced.yearly.msg : null}
                            name="plan"
                            value="advanced"
                            plan={plan}
                            setPlan={setPlan}
                        />
                        <Card
                            logo={prologo}
                            title="Pro"
                            rate={isyearly ? plans.pro.yearly.rate + "/yr" : plans.pro.monthly.rate + "/mo"}
                            msg={isyearly ? plans.pro.yearly.msg : null}
                            name="plan"
                            value="pro"
                            plan={plan}
                            setPlan={setPlan}
                        />
                    </div>
                    <div className='plan_type'>
                        <span className={'plan_type__option ' + (isyearly ? "" : "active")} onClick={() => setIsYearly(false)}>Monthly</span>
                        <ToggleButton
                            checked={isyearly}
                            onClick={() => setIsYearly(prev => !prev)}
                            name="isyearly"
                        />
                        <span className={'plan_type__option ' + (isyearly ? "active" : "")} onClick={() => setIsYearly(true)}>Yearly</span>
                    </div>
                </div>

            </FormBody>
            <FormFooter>
                <Button theme="back" onClick={() => setFormIdx(prev => prev - 1)}>Go Back</Button>
                <Button theme="next" type="submit">Next Step</Button>
            </FormFooter>
        </Form>
    )
}

export default PlanForm