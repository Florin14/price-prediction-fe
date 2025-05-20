import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

import { Theme } from "@mui/material/styles";

import cssVariables from "../../../assets/css/variables";
import { websiteActions } from "../../../store/slices/website/website-slice";
import { PLATFORM_NAME } from "../../../assets/language/constants";
import useClasses from "../../../utils/useClasses";

import { RootState } from "../../../store";

interface WelcomePageStyle {
    wrapper: any;
    sectionWrapper: any;
    label: any;
    bigLabel: any;
    smallLabel: any;
    logoWrapper: any;
}

const useStyles = (theme: Theme): WelcomePageStyle => ({
    wrapper: {
        width: "100%",
        height: `calc(100% - ${cssVariables.headerHeight} - 100px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    label: {
        fontFamily: "Inter",
        fontStyle: "normal",
        color: theme.palette.grey[500],
        fontWeight: "bold",
    },
    bigLabel: {
        fontSize: "22px",
        lineHeight: "27px",
        marginBottom: "25px",
    },
    smallLabel: {
        fontSize: "10px",
        lineHeight: "13px",
        marginBottom: "13px",
    },
    logoWrapper: {
        width: "200px",
        height: "auto",
    },
});

const WelcomePage: React.FC = (props) => {
    const dispatch = useDispatch();
    const classes = useClasses(useStyles, { name: "welcomePageStyles" }) as WelcomePageStyle;

    const languageData = useSelector((state: RootState) => state.website.languageData);

    useEffect(() => {
        dispatch(websiteActions.setTitle({ title: "" }));
        dispatch(websiteActions.setGoBack({ goBack: null }));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Head>
                <title>
                    {PLATFORM_NAME} | {languageData?.Dashboard}
                </title>
            </Head>
            <div className={classes.wrapper}>
                <div></div>
                <div className={classes.sectionWrapper}>
                    <div className={`${classes.label} ${classes.smallLabel}`}>{languageData?.SoftwareBy}</div>
                    <a href="" target="_blank" rel="noreferrer">
                        {/* <img src="/images/" alt="" /> */}
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
};

export default WelcomePage;
