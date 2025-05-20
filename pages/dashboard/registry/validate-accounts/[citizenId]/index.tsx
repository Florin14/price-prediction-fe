import Head from "next/head";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { websiteActions } from "../../../../../store/slices/website/website-slice";
import { RootState } from "../../../../../store";

import NaturalPersonProfileComponent from "../../../../../components/NaturalPersonProfile/NaturalPersonProfile";
import LegalEntityProfileComponent from "../../../../../components/LegalEntityProfile/LegalEntityProfile";
import { PLATFORM_NAME } from "../../../../../assets/language/constants";

const ValidateAccountProfile = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const dispatch = useDispatch();
    const router = useRouter();
    const citizenId = Array.isArray(router.query.citizenId) ? router.query.citizenId[0] : router.query.citizenId;
    const type = router.query.type;

    useEffect(() => {
        dispatch(websiteActions.setTitle({ title: "ValidateAccounts" }));
    }, []);

    useEffect(() => {
        if (router.isReady) {
            if (type !== "legal" && type !== "natural") {
                router.replace("/404");
            }
        }
    }, [router.isReady, type]);

    return (
        <React.Fragment>
            <Head>
                <title>
                    {PLATFORM_NAME} | {languageData?.ValidateAccounts}
                </title>
            </Head>
            {type === "legal" ? (
                <LegalEntityProfileComponent citizenId={citizenId} />
            ) : (
                type === "natural" && <NaturalPersonProfileComponent citizenId={citizenId} />
            )}
        </React.Fragment>
    );
};

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

export default ValidateAccountProfile;
