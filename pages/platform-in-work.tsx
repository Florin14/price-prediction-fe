import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";

import { Theme } from "@mui/material/styles";

import useClasses from "../utils/useClasses";

import { RootState } from "../store";

interface PlatformInWorkStyle {
    outerWrapper: any;
    wrapper: any;
    image: any;
    title: any;
    subtitle: any;
}

const useStyles = (theme: Theme): PlatformInWorkStyle => ({
    outerWrapper: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
    },
    wrapper: {
        height: "auto",
        width: "451px",
        minHeight: "400px",
        minWidth: "451px",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontFamily: "Inter",
        fontSize: "18px",
        lineHeight: "13.49px",
        fontWeight: 800,
        textAlign: "center",
        marginTop: "50px",
        color: theme.palette.primary.dark,
    },
    subtitle: {
        fontFamily: "Inter",
        fontSize: "18px",
        lineHeight: "13.49px",
        fontWeight: 600,
        textAlign: "center",
        marginTop: "10px",
        color: theme.palette.primary.dark,
    },
    [theme.breakpoints.down(480)]: {
        outerWrapper: {
            minHeight: "300px",
        },
        wrapper: {
            width: "339px",
            minWidth: "339px",
            minHeight: "300px",
        },
        title: {
            fontSize: "15px",
            marginTop: "30px",
        },
        subtitle: {
            fontSize: "15px",
        },
    },
});

const PlatformInWork: React.FC = () => {
    const classes = useClasses(useStyles, { name: "platformInWorkStyles" }) as PlatformInWorkStyle;

    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <React.Fragment>
            <Head>
                <title>Primaria Vad | {languageData?.WebsiteInWork}</title>
            </Head>
            <div className={classes.outerWrapper}>
                <div className={classes.wrapper}>
                    <img className={classes.image} alt="platforma in lucru" src="/images/platform_in_work.png" />
                    <h2 className={classes.title}>{languageData?.WebsiteInWorkTitle}</h2>
                    <h4 className={classes.subtitle}>{languageData?.WebsiteInWorkMessage}</h4>
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

export default PlatformInWork;
