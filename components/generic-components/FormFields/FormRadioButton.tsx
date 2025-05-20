import React from "react";
import { useField } from "formik";
import StyledRadioButton from "../StyledRadioButton";

interface FormRadioButtonProps {
    label?: string;
    name: string;
    options: { value: string | number; label: string }[];
    row?: boolean;
    disabled?: boolean;
    labelClassName?: string;
    radioClassName?: string;
    groupClassName?: string;
    radioButtonsOnRow?: boolean;
    required?: boolean;
}

const FormRadioButton: React.FC<FormRadioButtonProps> = ({
    label,
    name,
    options,
    row = false,
    disabled = false,
    labelClassName,
    radioClassName,
    groupClassName,
    radioButtonsOnRow,
    required,
}) => {
    const [field, meta, helpers] = useField(name);

    return (
        <StyledRadioButton
            label={label}
            options={options}
            value={field.value}
            disabled={disabled}
            row={row}
            labelClassName={labelClassName}
            radioClassName={radioClassName}
            groupClassName={groupClassName}
            radioButtonsOnRow
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                helpers.setValue(event.target.value);
            }}
        />
    );
};

export default FormRadioButton;
