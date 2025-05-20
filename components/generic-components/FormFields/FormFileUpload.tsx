import React from "react";
import { useField } from "formik";

import { FormControl, FormHelperText } from "@mui/material";

import FileDisplay from "../FileDisplay/FileDisplay";
import FileUpload from "../FileUpload/FileUpload";

interface FormFileUploadProps {
    label?: string;
    name: string;
    date?: string;
    type?: string;
    buttonLabel?: string;
    disabled?: boolean;
    required?: boolean;
    docIcon?: any;
    value?: string;
    downloadHandler?: (file: any) => void;
    accept?: string;
    onChange?: (file: File | null) => void;
    isViewable?: boolean;
    canDelete?: boolean;
    customText?: string;
    customTextClassName?: any;
    buttonClassName?: string;
    wrapperClassName?: string;
    acceptAll?: boolean;
}

const FormFileUpload: React.FC<FormFileUploadProps> = ({
    name,
    buttonLabel,
    disabled = false,
    accept = ".pdf,.doc,.docx",
    onChange,
    isViewable = true,
    canDelete = true,
    customText,
    customTextClassName,
    buttonClassName,
    wrapperClassName,
    acceptAll,
}) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl fullWidth error={meta.touched && Boolean(meta.error)} data-testid={`form-text-input-${name}`}>
            <FileUpload
                id={"upload-file-button"}
                accept={accept}
                acceptAll={acceptAll}
                disabled={disabled}
                onChange={(file: File | null) => {
                    helpers.setValue(file);
                    if (onChange) {
                        onChange(file);
                    }
                }}
                buttonLabel={buttonLabel}
                buttonClassName={buttonClassName}
                file={field.value}
                onRemove={() => helpers.setValue(null)}
            />
            {field.value && (
                <FileDisplay
                    id={"file-display"}
                    file={field.value}
                    isViewable={isViewable}
                    canDelete={canDelete}
                    onRemove={() => helpers.setValue(null)}
                    onClick={() => {}}
                    customTextClassName={customTextClassName}
                    customText={customText}
                    wrapperClassName={wrapperClassName}
                />
            )}
            {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
        </FormControl>
    );
};

export default FormFileUpload;
