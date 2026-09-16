import React from "react";
import { useSelector } from "react-redux";

import AuthShell from "@/components/layout/AuthShell";
import RegisterComponent from "@/components/forms/Register/RegisterComponent";
import { PLATFORM_NAME } from "@/assets/language/constants";
import { RootState } from "@/store";

const Register: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);

    return (
        <AuthShell
            pageTitle={`${PLATFORM_NAME} | ${languageData?.CreateAccount || "Create account"}`}
            kicker={languageData?.GetStarted || "Get started"}
            title={languageData?.RegisterTitle || languageData?.CreateAccount || "Create your account"}
            subtitle={
                languageData?.RegisterSubtitle ||
                "Save estimates, build a history and unlock analytics tailored to your searches."
            }
        >
            <RegisterComponent />
        </AuthShell>
    );
};

export const getServerSideProps = async () => ({ props: {} });

export default Register;
