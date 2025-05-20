import { Theme } from "@mui/material/styles";
import cssVariables from "../../../assets/css/variables";

export interface DocumentsStylesProps {
    wrapper: any;
    title: any;
    fileDisplayWrapper: any;
    uploadButton: any;
}

const DocumentsStyles = (theme: Theme): DocumentsStylesProps => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        border: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        padding: "29px 16px 29px 16px",
    },
    title: {
        fontSize: "12px",
        fontWeight: 600,
    },
    fileDisplayWrapper: {
        width: "100% !important",
        minWidth: "100% !important",
    },
    uploadButton: {
        width: "135px !important",
    },
});

export default DocumentsStyles;
