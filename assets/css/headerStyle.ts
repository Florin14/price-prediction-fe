import {
    container,
    dangerColor,
    defaultBoxShadow,
    defaultFont,
    grayColor,
    infoColor,
    primaryColor,
    successColor,
    warningColor,
    whiteColor,
} from "./material-dashboard-react";

export interface HeaderStyles {
    appBar: any;
    container: any;
    flex: any;
    title: any;
    appResponsive: any;
    primary: any;
    info: any;
    success: any;
    warning: any;
    danger: any;
    navbar: any;
    [key: string]: any;
}

const headerStyle = (): HeaderStyles => ({
    appBar: {
        backgroundColor: whiteColor,
        boxShadow: "none",
        borderBottom: "0",
        marginBottom: "0",
        position: "absolute",
        width: "100%",
        zIndex: "1029",
        color: grayColor[7],
        border: "0",
        borderRadius: "0",
        transition: "all 150ms ease 0s",
        minHeight: "60px",
        display: "block",
    },
    container: {
        ...container,
        minHeight: "60px",
        display: "flex",
        justifyContent: "space-between",
    },
    flex: {
        flex: 1,
    },
    title: {
        ...defaultFont,
        letterSpacing: "unset",
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        margin: "0",
        "&:hover,&:focus": {
            background: "transparent",
        },
    },
    appResponsive: {
        top: "8px",
    },
    primary: {
        backgroundColor: primaryColor[0],
        color: whiteColor,
        ...defaultBoxShadow,
    },
    info: {
        backgroundColor: infoColor[0],
        color: whiteColor,
        ...defaultBoxShadow,
    },
    success: {
        backgroundColor: successColor[0],
        color: whiteColor,
        ...defaultBoxShadow,
    },
    warning: {
        backgroundColor: warningColor[0],
        color: whiteColor,
        ...defaultBoxShadow,
    },
    danger: {
        backgroundColor: dangerColor[0],
        color: whiteColor,
        ...defaultBoxShadow,
    },
    navbar: {
        width: "100%",
    },
});

export default headerStyle;
