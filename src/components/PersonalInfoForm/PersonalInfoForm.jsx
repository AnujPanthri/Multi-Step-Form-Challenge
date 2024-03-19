import React, { useContext, useState } from 'react';
import "./PersonalInfoForm.css";
import { Form, FormHeader, FormBody, FormFooter } from '@components/Form';
import Button from "@components/Button";
import { PersonalInfoSchema } from "@/schemas";
import { DataContext } from '@/providers/DataProvider';

function InputContainer({
    label,
    placeholder,
    name,
    error,
    value,
}) {
    return (
        <div className='form__input_container'>
            <div className='flex flex-row justify-space-between w-full'>
                <span className='form__input_label'>{label}</span>
                <span className="form__input_error">{error}</span>
            </div>
            <input className='form__input' type="text" placeholder={placeholder} name={name} value={value} />
        </div>
    );
}

function PersonalInfoForm({
    setFormIdx,
}) {

    const [errors, setErrors] = useState({});
    const { allFormData, setAllFormData } = useContext(DataContext);

    const handleSumbit = (e) => {
        e.preventDefault();
        setErrors({});

        const formdata = new FormData(e.target);
        const parsedData = PersonalInfoSchema.safeParse({
            name: formdata.get("name"),
            email: formdata.get("email"),
            phone: formdata.get("phone"),
        });
        if (!parsedData.success) {
            setErrors(parsedData.error.flatten().fieldErrors);
            return false;
        }

        const { name, email, phone } = parsedData.data;
        // submit the parsedData
        setAllFormData((prev) => {
            return {
                ...prev,
                name,
                email,
                phone,
            }
        })

        // go to next page
        setFormIdx((prev) => prev + 1);

    }
    return (
        <Form onSubmit={handleSumbit}>
            <FormHeader
                title="Personal info"
                description="Please provide your name, email address, and phone number."
            />
            <FormBody>

                <div className='form__inputs'>
                    <InputContainer
                        label="Name"
                        placeholder="e.g. Stephen King"
                        name="name"
                        error={errors.name && errors.name[0]}
                        value={allFormData.name}
                    />
                    <InputContainer
                        label="Email Address"
                        placeholder="e.g. stephenking@lorem.com"
                        name="email"
                        error={errors.email && errors.email[0]}
                        value={allFormData.email}
                    />
                    <InputContainer
                        label="Phone Number"
                        placeholder="e.g. +1 234 567 890"
                        name="phone"
                        error={errors.phone && errors.phone[0]}
                        value={allFormData.phone}
                    />
                </div>

            </FormBody>
            <FormFooter>

                <div></div>
                <Button theme="next" type="submit">Next Step</Button>
            </FormFooter>
        </Form>
    )
}

export default PersonalInfoForm