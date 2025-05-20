import { Theme } from "@mui/material/styles";
import cssVariables from "../../assets/css/variables";

export interface AddEditCommunicationStylesProps {
    wrapper: any;
    sideBySideWrapper: any;
    uploadButton: any;
    label: any;
    labelInstructions: any;
    editor: any;
    buttonsWrapper: any;
    button: any;
    wrapperClassName: any;
}

const AddEditCommunicationTypeStyles = (theme: Theme): AddEditCommunicationStylesProps => ({
    wrapper: {
        height: "calc(100% + 19px)",
        border: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        padding: "20px 30px",
        display: "grid",
        gridTemplateRows: "52px 52px 72px 14px calc(100% - 52px - 52px - 72px - 14px - 35px - 60px - 16px) 35px",
        flexDirection: "column",
        gap: "15px",
    },
    sideBySideWrapper: {
        display: "grid",
        gridTemplateColumns: "minmax(200px, 50%) minmax(200px, 50%)",
        gap: "15px",
    },
    uploadButton: {
        width: "135px !important",
    },
    label: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "14px",
        marginBottom: 3,
        color: "#667085",
    },
    labelInstructions: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#313A47",
    },
    editor: {
        height: "calc(100% - 42px)",
        "& .ql-editor": {
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            minHeight: "200px",
            fontWeight: 600,
            minWidth: 300,
        },
        "& .ql-toolbar": {
            fontFamily: "'Inter', sans-serif",
        },
        "& .ql-snow": {
            backgroundColor: "white",
        },
    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "row",
        gap: cssVariables.smallMargin,
        justifyContent: "flex-end",
    },
    button: {
        width: "225px",
    },
    wrapperClassName: {
        minWidth: "unset !important",
    },
    [theme.breakpoints.down(610)]: {
        wrapper: {
            overflowX: "auto",
        },
    },
});

export default AddEditCommunicationTypeStyles;
