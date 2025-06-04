import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

import { websiteActions } from "../../../store/slices/website/website-slice";
import { RootState } from "../../../store";

import ChangePasswordForm from "../../../components/forms/ChangePasswordForm/ChangePasswordForm";
import { PLATFORM_NAME } from "../../../assets/language/constants";
import useClasses from "../../../utils/useClasses";

interface ChangePasswordProps {}

interface ChangePasswordStyles {
    gridWrapper: any;
}

const useStyles = (theme: any): ChangePasswordStyles => ({
    gridWrapper: {
        width: "100%",
        height: "100vh",
        paddingTop: "5%",
        background: "linear-gradient(135deg,rgb(6, 21, 93) 0%, #6dd5ed 100%)",
    },
});

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
    const classes = useClasses(useStyles, { name: "changePasswordStyles" }) as ChangePasswordStyles;
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();

    useEffect(() => {
        // setBackPath("/");
        // setGoToLogin(true);
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: "ChangePassword" }));
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>
                    {PLATFORM_NAME} | {languageData?.MyProfile}
                </title>
            </Head>
            <div className={classes.gridWrapper}>
                <ChangePasswordForm {...props} />
            </div>
        </React.Fragment>
    );
};

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

export default ChangePassword;
