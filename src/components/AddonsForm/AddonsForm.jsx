import React, { useContext, useState, useRef } from 'react';
import "./AddonsForm.css";
import { Form, FormHeader, FormBody, FormFooter } from '@components/Form';
import Button from "@components/Button";
import { DataContext } from '@/providers/DataProvider';

function Addon({
    checked = false,
    name,
    title,
    desc,
    rate,
}) {
    const [ischecked, setIsChecked] = useState(checked);
    const handleClick = (e) => {
        setIsChecked(prev => !prev);
    }
    return (
        <div className={'addon ' + (ischecked ? "checked" : "")} onClick={handleClick}>

            <div className='flex flex-row gap-1-5 align-center'>

                <input className='addon__checkbox' type="checkbox" readOnly={true} checked={ischecked} name={name} />
                <div className='flex flex-col'>
                    <span className='addon__title'>{title}</span>
                    <span className='addon__desc'>{desc}</span>
                </div>
            </div>
            <span className="addon__rate">{rate}</span>

        </div>
    );
}

function AddonsForm({
    setFormIdx,
}) {

    const { addons, allFormData, setAllFormData } = useContext(DataContext);
    const handleSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData(e.target);

        const data = {
            "online_service": formdata.has("online_service"),
            "larger_storage": formdata.has("larger_storage"),
            "customizable_profile": formdata.has("customizable_profile"),
        };

        setAllFormData((prev) => {
            return {
                ...prev,
                addons: data,
            }
        })
        // go to next step
        setFormIdx(prev => prev + 1);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormHeader
                title="Pick add-ons"
                description="Add-ons helps enhance your gaming experience."
            />
            <FormBody>
                <div className='addons'>
                    <Addon
                        title="Online service"
                        desc="Access to multiplayer games"
                        checked={allFormData.addons.online_service}
                        name="online_service"
                        rate={"+" + (allFormData.isyearly ? addons.online_service.yearly.rate + "/yr" : addons.online_service.monthly.rate + "/mo")}
                    />
                    <Addon
                        title="Larger storage"
                        desc="Extra 1TB of cloud save"
                        checked={allFormData.addons.larger_storage}
                        name="larger_storage"
                        rate={"+" + (allFormData.isyearly ? addons.larger_storage.yearly.rate + "/yr" : addons.larger_storage.monthly.rate + "/mo")}
                    />
                    <Addon
                        title="Customizable Profile"
                        desc="Custom theme on your profile"
                        checked={allFormData.addons.customizable_profile}
                        name="customizable_profile"
                        rate={"+" + (allFormData.isyearly ? addons.customizable_profile.yearly.rate + "/yr" : addons.customizable_profile.monthly.rate + "/mo")}
                    />
                </div>
            </FormBody>
            <FormFooter>
                <Button theme="back" onClick={() => setFormIdx(prev => prev - 1)}>Go Back</Button>
                <Button theme="next" type="submit">Next Step</Button>
            </FormFooter>
        </Form>
    )
}

export default AddonsForm