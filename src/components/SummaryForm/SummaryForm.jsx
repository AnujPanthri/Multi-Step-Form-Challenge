import React, { useContext, useState } from 'react'
import "./SummaryForm.css";
import { Form, FormHeader, FormBody, FormFooter } from "@components/Form";
import Button from '@components/Button';
import ThankYou from "@components/ThankYou";
import { DataContext } from '@/providers/DataProvider';


function Addon({
    title,
    rate,
    visible = false,
}) {

    if (!visible) {
        return null;
    }

    return (

        <div className='summary__addon'>
            <span className="name">{title}</span>
            <span className="rate">{rate}</span>
        </div>
    )
}
function SummaryForm({
    setFormIdx,
}) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { allFormData, plans, addons } = useContext(DataContext);
    const toINT = (str) => {
        return parseInt(str.replace(/[^0-9]/g, ""));
    };
    const total_price = (() => {

        const plan_cost = allFormData.isyearly ? plans[allFormData.plan].yearly.rate : plans[allFormData.plan].monthly.rate;
        const online_service_cost = allFormData.isyearly ? addons.online_service.yearly.rate : addons.online_service.monthly.rate;
        const larger_storage_cost = allFormData.isyearly ? addons.larger_storage.yearly.rate : addons.larger_storage.monthly.rate;
        const customizable_profile_cost = allFormData.isyearly ? addons.customizable_profile.yearly.rate : addons.customizable_profile.monthly.rate;

        var total = toINT(plan_cost);
        if (allFormData.addons.online_service) {
            total += toINT(online_service_cost);
        }
        if (allFormData.addons.larger_storage) {
            total += toINT(larger_storage_cost);
        }
        if (allFormData.addons.customizable_profile) {
            total += toINT(customizable_profile_cost);
        }

        return total;
    })();

    const handleClick = () => {
        setIsSubmitted(true);
    };

    if(isSubmitted)
    {
        return <ThankYou />;
    }
    return (

        <Form>
            <FormHeader
                title="Finishing Up"
                description="Double-check everything looks OK before confirming."
            />
            <FormBody>

                <div className='summary'>
                    <div className="summary__plan">
                        <div className='flex flex-col'>
                            <span className="name">{allFormData.plan + ` (${allFormData.isyearly ? "Yearly" : "Monthly"})`}</span>
                            <span className='summary__plan_change' onClick={() => { setFormIdx(1) }}>Change</span>
                        </div>
                        <span className="rate">{allFormData.isyearly ? plans[allFormData.plan].yearly.rate + "/yr" : plans[allFormData.plan].monthly.rate + "/mo"}</span>
                    </div>
                    <hr className='summary__hr' />
                    <Addon
                        title="Online service"
                        rate={"+" + (allFormData.isyearly ? addons.online_service.yearly.rate + "/yr" : addons.online_service.monthly.rate + "/mo")}
                        visible={allFormData.addons.online_service}
                    />
                    <Addon
                        title="Larger storage"
                        rate={"+" + (allFormData.isyearly ? addons.larger_storage.yearly.rate + "/yr" : addons.larger_storage.monthly.rate + "/mo")}
                        visible={allFormData.addons.larger_storage}
                    />
                    <Addon
                        title="Customizable Profile"
                        rate={"+" + (allFormData.isyearly ? addons.customizable_profile.yearly.rate + "/yr" : addons.customizable_profile.monthly.rate + "/mo")}
                        visible={allFormData.addons.customizable_profile}
                    />
                </div>
                <div className='total'>
                    <span className='name'>{`Total (per ${allFormData.isyearly ? "year" : "month"})`}</span>
                    <span className='rate'>{`+$${total_price}${allFormData.isyearly ? "/yr" : "/mo"}`}</span>
                </div>
            </FormBody>
            <FormFooter>
                <Button theme="back" onClick={() => setFormIdx(prev => prev - 1)}>Go Back</Button>
                <Button theme="confirm" onClick={handleClick}>Confirm</Button>
            </FormFooter>

        </Form>

    );

}

export default SummaryForm