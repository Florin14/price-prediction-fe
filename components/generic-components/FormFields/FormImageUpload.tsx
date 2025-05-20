import React, { useState } from "react";
import { useField } from "formik";
import { Box } from "@mui/material";
import { FormControl, FormHelperText } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface FormImageUploadProps {
    name: string;
    accept?: string;
}

const FormImageUpload: React.FC<FormImageUploadProps> = ({ name, accept = "image/*" }) => {
    const [field, meta, helpers] = useField(name);
    const [imageSrc, setImageSrc] = useState<string>("/images/image_placeholder.png");
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                helpers.setValue(base64String);
            };
            reader.readAsDataURL(file);
        } else {
            helpers.setValue(null);
        }
    };

    const handleButtonClick = () => {
        document.getElementById("fileInput")?.click();
    };

    return (
        <FormControl fullWidth error={meta.touched && Boolean(meta.error)} data-testid={`form-text-input-${name}`}>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
                <img
                    src={field.value || imageSrc}
                    alt="Location Image"
                    style={{
                        maxHeight: "150px",
                        width: "auto",
                        cursor: "pointer",
                        borderRadius: "8px",
                    }}
                    onClick={handleButtonClick}
                />
                <input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileSelect} />
            </Box>
            {meta.touched && meta.error ? <FormHelperText>{meta.error}</FormHelperText> : null}
        </FormControl>
    );
};

export default FormImageUpload;
