import React from "react";
import { FastField, useField } from "formik";
import StyledInput from "../StyledInput";

interface FormTextInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    borderError?: boolean;
    inputColorClass?: any;
    helperText?: string;
}

const FormTextInput: React.FC<FormTextInputProps> = ({ label, name, type = "text", placeholder, required, disabled, helperText, borderError }) => {
    return (
        <FastField name={name} key={`${name}-${borderError}`}>
            {({ field, meta, form }: import("formik").FieldProps) => {
                return (
                    <StyledInput
                        {...field}
                        type={type}
                        label={label}
                        activeLabel={true}
                        placeholder={placeholder}
                        disabled={disabled}
                        required={required}
                        onChange={(value) => {
                            form.setFieldValue(name, value ?? "");
                        }}
                        helperText={helperText}
                        borderError={borderError}
                        error={meta.touched && Boolean(meta.error)}
                    />
                );
            }}
        </FastField>
    );
};
export default FormTextInput;
