import cssVariables from "../../assets/css/variables";
import { Theme } from "@mui/material/styles";

const ManageComStyles = (theme: Theme) => ({
    wrapper: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        gap: 15,
        marginTop: "-19px",
        marginLeft: `-${cssVariables.defaultMargin}`,
        marginRight: `-${cssVariables.defaultMargin}`,
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
        marginLeft: cssVariables.defaultMargin,
        marginRight: cssVariables.defaultMargin,
        minHeight: "340px",
    },
    [theme.breakpoints.down(1415)]: {
        appBar: {
            width: "100%",
            "& .MuiTabs-flexContainer": {
                overflowY: "auto",
                justifyContent: "space-between",
                width: "100%",
            },
        },
        tab: {
            width: "100%",
            "& .MuiTabs-flexContainer": {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
            },
            "& .MuiTabs-scroller": {
                width: "100%",
            },
            "& .MuiButtonBase-root": {
                flexGrow: 1,
                maxWidth: "none",
            },
            "& .MuiTabs-indicator": {
                display: "flex",
                justifyContent: "center",
                backgroundColor: "transparent",
                "& > span": {
                    maxWidth: 100,
                    width: "100%",
                    backgroundColor: "#00306E",
                },
            },
        },
        inactiveTab: {
            color: "#6B7280 !important",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "Inter",
            minWidth: "unset",
            minHeight: "20px",
            textTransform: "none",
            height: 48,
            margin: 0,
            flexGrow: 1,
            width: "unset",
        },
        selectedTab: {
            color: "#00306E !important",
            fontWeight: 600,
            fontSize: "12px",
            height: 48,
            flexGrow: 1,
            borderBottom: "2.4px solid #00306E",
            width: "unset",
        },
    },
});

export default ManageComStyles;
