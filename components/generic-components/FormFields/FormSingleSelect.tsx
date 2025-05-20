import React from "react";
import { useField } from "formik";
import { SxProps, Theme } from "@mui/material";
import StyledDropdown from "../StyledDropdown";

interface FormSingleSelectProps<T> {
    label: string;
    name: string;
    options: any[];
    value?: T | null;
    required?: boolean;
    disabled?: boolean;
    displayField?: string | undefined;
    placeholder?: string | undefined;
    sx?: SxProps<Theme>;
    onChange?: (event: T) => void;
}

const FormSingleSelect = React.memo(
    <T,>({
        label,
        name,
        options,
        required,
        disabled = false,
        value,
        displayField = "name",
        onChange = () => {},
        placeholder = "Select an option",
    }: FormSingleSelectProps<T>) => {
        const [field, meta, helpers] = useField<T>(name);

        return (
            <StyledDropdown
                {...field}
                label={label}
                value={value ?? (field.value as any)}
                activeLabel={!!label}
                options={options}
                required={required}
                placeholder={placeholder}
                displayField={displayField}
                disabled={disabled}
                error={meta.touched && Boolean(meta.error)}
                onChange={(event: any, value: any) => {
                    helpers.setValue(value);
                    onChange(value); // Call the onChange prop with the selected value
                }}
            />
        );
    },
    (prevProps: FormSingleSelectProps<any>, nextProps: FormSingleSelectProps<any>) => {
        return (
            prevProps.label === nextProps.label &&
            prevProps.name === nextProps.name &&
            prevProps.disabled === nextProps.disabled &&
            prevProps.placeholder === nextProps.placeholder &&
            prevProps.displayField === nextProps.displayField &&
            prevProps.required === nextProps.required &&
            prevProps.options.length === nextProps.options.length &&
            JSON.stringify(prevProps.value) === JSON.stringify(nextProps.value)
        );
    }
);

export default FormSingleSelect;
