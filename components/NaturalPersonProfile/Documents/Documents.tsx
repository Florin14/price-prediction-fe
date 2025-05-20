import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { Typography } from "@mui/material";

import { RootState } from "../../../store";

import FileUpload from "../../generic-components/FileUpload/FileUpload";
import FileDisplay from "../../generic-components/FileDisplay/FileDisplay";
import useClasses from "../../../utils/useClasses";

import DocumentsStyles from "./DocumentsStyles";

interface FileType {
    name: string;
    size: number;
    type: string;
    folder: string;
    id: string;
    date: string;
}

interface DocumentsComponentProps {
    citizenData?: any;
    setFieldValue: (field: string, value: any) => void;
}

const DocumentsComponent: React.FC<DocumentsComponentProps> = ({ citizenData, setFieldValue }) => {
    const classes = useClasses(DocumentsStyles, { name: "DocumentsStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const handleFileUpload = (file: File | null) => {
        if (file) {
            const newDocument: FileType = {
                name: file.name,
                size: file.size,
                type: file.type,
                folder: "",
                id: "",
                date: moment().format("YYYY-MM-DD"),
                // Add other necessary properties
            };
            // Update Formik's otherDocuments field
            setFieldValue("otherDocuments", [...(citizenData?.otherDocuments || []), newDocument]);
        }
    };

    return (
        <div className={classes.wrapper}>
            <Typography className={classes.title}>{languageData?.Documents}</Typography>
            <FileUpload
                id={"upload-file-button"}
                buttonLabel={languageData?.UploadFile}
                buttonClassName={classes.uploadButton}
                onChange={(file: File | null) => {
                    handleFileUpload(file);
                }}
            ></FileUpload>{" "}
            <FileDisplay
                file={citizenData?.identityCard}
                isViewable={true}
                onClick={() => { }}
                canDelete={false}
                wrapperClassName={classes.fileDisplayWrapper}
                id={"identity-card"}
            />
            {citizenData?.otherDocuments?.length > 0 &&
                citizenData?.otherDocuments?.map((document: FileType, index: number) => {
                    const handleDeleteDocument = () => {
                        const updatedDocuments = citizenData.otherDocuments.filter((_: any, i: number) => i !== index);
                        setFieldValue("otherDocuments", updatedDocuments);
                    };

                    return (
                        <FileDisplay
                            id={`document-${index}`}
                            key={`${document.name}-${index}`}
                            file={document}
                            isViewable={true}
                            onClick={() => { }}
                            canDelete={true}
                            onRemove={handleDeleteDocument}
                            wrapperClassName={classes.fileDisplayWrapper}
                        />
                    );
                })}
        </div>
    );
};

export default DocumentsComponent;
