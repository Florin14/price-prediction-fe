import React, { useRef } from "react";
import classNames from "classnames";

import { Theme } from "@mui/material/styles";

import StyledButton from "../StyledButton";
import UploadIcon from "../../icons/UploadIcon";
import useClasses from "../../../utils/useClasses";

const useStyles = (theme: Theme) => ({
    button: {
        width: "auto",
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#5045E2",
        border: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        padding: "8px 16px",
        borderRadius: "8px",
        "&:hover": {
            backgroundColor: "#E8EBF0",
        },
    },
});

interface CustomStyles {
    button: any;
}

interface FileUploadProps {
    buttonLabel?: string;
    disabled?: boolean;
    accept?: string;
    onChange?: (file: File | null) => void;
    file?: File | null; // Added file prop
    onRemove?: () => void; // Added onRemove prop
    buttonClassName?: string;
    id?: string;
    acceptAll?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    buttonLabel = "Upload File",
    disabled = false,
    accept = ".pdf,.doc,.docx",
    onChange,
    file = null,
    onRemove,
    buttonClassName,
    id,
    acceptAll = false,
}) => {
    const classes = useClasses(useStyles, { name: "FileDisplayStyles" }) as CustomStyles;
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;

        if (onChange) {
            onChange(selectedFile);
        }
    };

    return (
        <>
            {!file && (
                <StyledButton id={id} onClick={handleButtonClick} disabled={disabled} className={classNames(classes.button, buttonClassName)}>
                    <UploadIcon />
                    <div
                        style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#313A47",
                            marginLeft: "8px",
                        }}
                    >
                        {buttonLabel}
                    </div>
                </StyledButton>
            )}
            <input type="file" accept={acceptAll ? undefined : accept} ref={fileInputRef} style={{ display: "none" }} onChange={handleFileSelect} />
        </>
    );
};

export default FileUpload;
