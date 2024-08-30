'use client'

import { Input } from "@/components/ui/input"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control } from "react-hook-form"
import { FormFieldType } from "./form/QueueForm"
import React from "react"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    children?: React.ReactNode,
}

const RenderField = ({ field, props }: {field: any, props: CustomProps}) => {
    const { fieldType, iconSrc, iconAlt, placeholder } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image 
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className="ml-2"
                        />
                    )}

                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <PhoneInput 
                    defaultCountry="SG"
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value}
                    onChange={field.onChange}
                    className="input-phone"
                />
            )
        break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, name, label } = props
    return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="flex-1">
                <FormLabel>{label}</FormLabel>
                <RenderField field={field} props={props} />
                <FormMessage className="shad-error" />
            </FormItem>
        )}
    />
    )
}

export default CustomFormField