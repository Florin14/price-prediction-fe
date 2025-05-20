import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import { websiteActions } from "../../../../store/slices/website/website-slice";
import { RootState } from "../../../../store";

import { PLATFORM_NAME } from "../../../../assets/language/constants";
import useClasses from "../../../../utils/useClasses";

interface UserProfileProps {}

interface UserProfileStyles {
    gridWrapper: any;
    gridChildWrapper: any;
}

const useStyles = (theme: any): UserProfileStyles => ({
    gridWrapper: {
        width: "100%",
        height: "100%",
    },
    gridChildWrapper: {
        width: "100%",
        height: "100%",
        margin: "5px",
        backgroundColor: "#fff",
    },
});

const UserProfile: React.FC<UserProfileProps> = (props) => {
    const classes = useClasses(useStyles, { name: "userProfileStyles" }) as UserProfileStyles;
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();

    useEffect(() => {
        // setBackPath("/");
        // setGoToLogin(true);
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: "MyProfile" }));
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>
                    {PLATFORM_NAME} | {languageData?.MyProfile}
                </title>
            </Head>
            <div style={classes.gridWrapper}>
                <Grid container></Grid>
            </div>
        </React.Fragment>
    );
};

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

export default UserProfile;
