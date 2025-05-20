import { Theme } from "@mui/material/styles";
import cssVariables from "../../assets/css/variables";

export interface ValidateAccountsComponentStyle {
    wrapper: any;
    appBar: any;
    tab: any;
    inactiveTab: any;
    selectedTab: any;
    tabPanel: any;
    [key: string]: any;
}

const ValidateAccountsComponentStyles = (theme: Theme): ValidateAccountsComponentStyle => ({
    wrapper: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        gap: 20,
        marginTop: "-16px",
    },
    appBar: {
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "none",
        position: "static",
        backgroundColor: "#FFF",
        zIndex: "1",
        "& .MuiTabs-flexContainer": {
            overflowY: "auto",
        },
    },
    tab: {
        minHeight: "25px",
        display: "flex",
        gap: 20,
    },
    inactiveTab: {
        color: "rgba(0, 0, 0, 0.40)",
        fontSize: "12px",
        fontWeight: 600,
        fontFamily: "Inter",
        minWidth: "0",
        minHeight: "20px",
        textTransform: "none",
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "7px",
        width: 222,
        height: 48,
        margin: `0 ${cssVariables.defaultMargin} 0 0`,
    },
    selectedTab: {
        color: "#1C1C1C",
        fontWeight: "600",
        fontSize: "12px",
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "7px",
        width: 222,
        height: 48,
    },
    tabPanel: {
        height: "calc(100% - 40px)",
        marginBottom: "-19px",
        minHeight: "340px",
    },
});

export default ValidateAccountsComponentStyles;
