import { Theme } from "@mui/material/styles";

export interface CitizenInformationStylesProps {
    wrapper: any;
    sideBySide: any;
    title: any;
    datePicker: any;
}

const CitizenInformationStyles = (theme: Theme): CitizenInformationStylesProps => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        border: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        padding: "29px 45px 29px 45px",
    },
    title: {
        fontSize: "12px",
        fontWeight: 600,
    },
    sideBySide: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        width: "100%",
        "& > *": {
            flex: 1,
            minWidth: 0, // Prevents flex items from growing beyond their container
        },
    },
    datePicker: {
        width: "100%",
    },
    [theme.breakpoints.down(525)]: {
        sideBySide: {
            flexDirection: "column",
        },
    },
});

export default CitizenInformationStyles;
