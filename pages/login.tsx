import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { Theme } from "@mui/material/styles";

import LoginForm from "../components/forms/Login/LoginForm";
import { PLATFORM_NAME } from "../assets/language/constants";
import useClasses from "../utils/useClasses";

import { RootState } from "../store";

// Interface for the class names
interface LoginStyle {
    background: any;
    wrapper: any;
    left: any;
    gradient: any;
    right: any;
    consentWrapper: any;
    textFrom: any;
}

const useStyles = (theme: Theme, _params: { color: string }): LoginStyle => ({
    background: {
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minWidth: "300px",
    },
    wrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "100%",
    },
    left: {
        background: "url(/images/background.jpg)",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "relative",
        "& .image-wrapper": {
            paddingTop: 100,
            zIndex: 10,
            background: "white",
        },
    },
    gradient: {
        position: "absolute",
        background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
        filter: "drop-shadow(0px 1.9275px 3.2125px rgba(0, 0, 0, 0.05)) drop-shadow(0px 3.2125px 5.14px rgba(0, 0, 0, 0.05))",
        height: "100%",
        width: "100%",
    },
    right: {
        background: theme.palette.common.white,
        boxShadow: "0px 1.9275px 3.2125px rgba(0, 0, 0, 0.05), 0px 3.2125px 5.14px rgba(0, 0, 0, 0.05)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    consentWrapper: {
        position: "absolute",
        bottom: 20,
        fontSize: "12px",
        lineHeight: "15px",
        fontWeight: 400,
        fontFamily: "'Inter', sans-serif",
        "& a": {
            fontWeight: 700,
        },
        textAlign: "center",
    },
    textFrom: {
        position: "absolute",
        left: "20px",
        bottom: "20px",
        color: "white",
    },
    [theme.breakpoints.down(1100)]: {
        wrapper: {
            gridTemplateColumns: "100%",
            gridTemplateRows: "auto auto",
        },
    },
    [theme.breakpoints.down(375)]: {
        left: {
            "& .image-wrapper": {
                width: "100%",
            },
        },
    },
});

const Login: React.FC = (props) => {
    const classes = useClasses(useStyles, { name: "Login_page", params: { color: "red" } }) as LoginStyle;
    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <React.Fragment>
            <Head>
                <title>{PLATFORM_NAME} | Login</title>
            </Head>
            <div className={classes.background}>
                <div className={classes.wrapper}>
                    <div className={classes.right}>
                        <LoginForm {...props} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

export default Login;
