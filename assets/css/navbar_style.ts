import { Theme } from "@mui/material/styles";
import { drawerWidth } from "./material-dashboard-react";
import cssVariables from "./variables";

export interface NavbarStyle {
    titleWrapper: any;
    rightCompWrapper: any;
    wrapper: any;
    navbarWrapper: any;
    drawerWrapper: any;
    toolbarWrapper: any;
    link: any;
    backButton: any;
    backIcon: any;
    accountName: any;
    accountIcon: any;
    accountButtonWrapper: any;
    linkText: any;
    linkTextLight: any;

    dropdownItem: any;
    accountDropdownIcon: any;
    popperClose: any;
    popperNav: any;
    tooltipWrapper: any;
    gridStyle: any;
    buttonContent: any;
    buttonIcon: any;
    inputWrapper: any;
    sectionTitle: any;
    menuButton: any;
    [key: string]: any; // For dynamic class names based on breakpoints
}

const navbarStyle = (theme: Theme): NavbarStyle => ({
    titleWrapper: {
        fontFamily: '"Inter", sans-serif',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "100%",
        color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#21272A",
        transition: "color 0.3s ease",
    },
    rightCompWrapper: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    themeToggle: {
        width: "30px",
        height: "30px",
        borderRadius: "8px",
        backgroundColor: "transparent",
        marginRight: 10,
        "&:hover": {
            backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
        },
        "& svg": {
            color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
            transition: "color 0.3s ease",
        },
    },
    languageToggle: {
        width: "30px",
        height: "30px",
        borderRadius: "8px",
        backgroundColor: "transparent",
        marginLeft: 10,
        "&:hover": {
            backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
        },
        "& svg": {
            color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
            transition: "color 0.3s ease",
        },
    },

    wrapper: {
        height: cssVariables.headerHeight,
        width: "100%",
        display: "flex",
        backgroundColor: theme.palette.common.white,
    },
    navbarWrapper: {
        boxShadow: "0 2px 12px rgba(0,0,0,0.08) !important",
        height: cssVariables.headerHeight,
        display: "flex",
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.common.white,
        borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[800] : "#E5E7EB"}`,
        transition: "background-color 0.3s ease, border-color 0.3s ease",
    },
    mobileMenuButton: {
        display: "none",
        color: "black",
        height: 40,
        width: 40,
        [theme.breakpoints.down("md")]: {
            display: "block",
            marginRight: theme.spacing(2),
        },
    },
    desktopMenu: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    mobileMenu: {
        display: "none",
        [theme.breakpoints.down("md")]: {
            display: "block",
            position: "fixed",
            top: cssVariables.headerHeight,
            left: 0,
            right: 0,
            backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.common.white,
            borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[800] : "#E5E7EB"}`,
            zIndex: 1000,
            padding: theme.spacing(2),
        },
    },
    mobileMenuItem: {
        width: "100%",
        justifyContent: "flex-start",
        padding: theme.spacing(1.5),
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
    accountWrapper: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            marginLeft: "auto",
        },
    },
    registrationButtonsWrapper: {
        display: "flex",
        gap: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            "& > button": {
                padding: theme.spacing(1),
                minWidth: "auto",
                "& span": {
                    display: "none",
                },
            },
        },
    },
    drawerWrapper: {
        color: theme.palette.grey[200],
    },
    toolbarWrapper: {
        height: cssVariables.headerHeight,
        padding: 15,
        minHeight: cssVariables.headerHeight,
    },
    link: {
        textDecoration: "none",
    },
    backButton: {
        height: 44,
        width: 44,
        minWidth: 44,
        margin: 0,
        padding: "5px 0",
        backgroundColor: "#FFFFFF",
        borderRadius: "3px",
        border: "1px solid #E4E4E4",
    },
    backIcon: {
        height: 24,
        width: 24,
        marginLeft: "7px",
        color: "#b4b4b4",
        transform: "scale(0.75)",
    },
    accountName: {
        width: "856px",
        height: "60px",
        marginLeft: "140px",
        marginTop: "0px",
    },
    accountIcon: {
        height: "38px",
        width: "38px",
        minWidth: "38px",
        backgroundColor: "#F2F4F8",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        margin: "0 5px",
        marginRight: "15px",
        textTransform: "uppercase",
    },
    navbarButton: {
        width: 130,
    },
    accountButtonWrapper: {
        padding: "0px",
        height: cssVariables.headerHeight,
        margin: "0 14px",
        width: 160,
        marginLeft: "auto", // Push the account data to the right
        display: "flex",
        alignItems: "center",
    },
    linkText: {
        fontFamily: '"Inter", sans-serif',

        fontWeight: 500,
        fontSize: theme.typography.pxToRem(12),
        lineHeight: "15px",
        maxHeight: "15px",
        maxWidth: "130px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textTransform: "none",
        whiteSpace: "nowrap",
        color: "#212121",
        paddingRight: "10px",
    },
    linkTextLight: {
        fontFamily: '"Inter", sans-serif',

        fontWeight: 500,
        fontSize: theme.typography.pxToRem(12),
        lineHeight: "15px",
        maxHeight: "15px",
        maxWidth: "130px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textTransform: "none",
        whiteSpace: "nowrap",
        color: "white",
        paddingRight: "10px",
    },
    dropdownItem: {
        fontSize: theme.typography.pxToRem(13),
        padding: "10px 16px",
        borderRadius: "2px",
        WebkitTransition: "all 150ms linear",
        MozTransition: "all 150ms linear",
        OTransition: "all 150ms linear",
        MsTransition: "all 150ms linear",
        transition: "all 150ms linear",
        clear: "both",
        fontWeight: 400,
        lineHeight: "1.42857143",
        color: theme.palette.grey[600],
        whiteSpace: "nowrap",
        height: "unset",
        minHeight: "unset",
        "&:hover": {
            backgroundColor: "hsla(0,0%,78%,.2)",
        },
        display: "flex",
        flexDirection: "row",
    },
    accountDropdownIcon: {
        padding: 0,
        color: theme.palette.grey[600],
        marginRight: "5px",
    },
    popperClose: {
        pointerEvents: "none",
    },
    popperNav: {},
    tooltipWrapper: {
        cursor: "pointer",
    },
    gridStyle: {
        margin: "0", // Remove extra margins
        width: "100%", // Ensure the grid spans the full width of the AppBar
        display: "flex",
        justifyContent: "space-between", // Ensure space between elements
        alignItems: "center",
    },
    buttonContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonIcon: {
        color: theme.palette.secondary.main,
        marginRight: "5px",
    },
    inputWrapper: {
        background: "#fff",
        height: 25,
        minHeight: 25,
        width: "240px",
    },
    sectionTitle: {
        margin: 0,
        fontFamily: '"Inter", sans-serif',
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: "12px",
        lineHeight: "15px",
        color: "#b4b4b4",
    },
    menuButton: {
        textTransform: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        "&:hover": {
            backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
        },
    },
    [theme.breakpoints.down(1425)]: {
        inputWrapper: {
            width: "100%",
        },
    },
    [theme.breakpoints.down(600)]: {
        registrationButtonsWrapper: {
            gap: cssVariables.smallestMargin,
        },
        navbarButton: {
            width: "fit-content",
        },
        popperNav: {
            position: "static !important",
            left: "unset !important",
            top: "unset !important",
            transform: "none !important",
            willChange: "unset !important",
            "& > div": {
                boxShadow: "none !important",
                marginLeft: "0rem",
                marginRight: "0rem",
                transition: "none !important",
                marginTop: "0px !important",
                marginBottom: "0px !important",
                padding: "0px !important",
                backgroundColor: "white !important",
                "& ul li": {
                    color: `${theme.palette.grey[200]} !important`,
                    margin: "10px 15px 0!important",
                    padding: "10px 15px !important",
                    "&:hover": {
                        backgroundColor: "hsla(0,0%,78%,.2)",
                        boxShadow: "none",
                    },
                },
            },
        },
    },
    [theme.breakpoints.down(420)]: {
        accountButtonWrapper: {
            width: "auto",
        },
        linkText: {
            display: "none",
        },
        linkTextLight: {
            display: "none",
        },
    },
    [theme.breakpoints.down(330)]: {
        titleWrapper: {
            display: "none",
        },
    },
});

export default navbarStyle;
