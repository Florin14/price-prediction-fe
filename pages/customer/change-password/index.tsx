import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

import { websiteActions } from "@/store/slices/website/website-slice";
import { RootState } from "@/store";

import ChangePasswordForm from "@/components/forms/ChangePasswordForm/ChangePasswordForm";
import { PLATFORM_NAME } from "@/assets/language/constants";

const ChangePassword: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: "ChangePassword" }));
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>
                    {PLATFORM_NAME} | {languageData?.ChangePassword || "Change password"}
                </title>
            </Head>
            <ChangePasswordForm />
        </>
    );
};

export const getServerSideProps = async () => ({ props: {} });

export default ChangePassword;
