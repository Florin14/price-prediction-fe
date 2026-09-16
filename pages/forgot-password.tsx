import React from "react";
import { useSelector } from "react-redux";

import AuthShell from "@/components/layout/AuthShell";
import ForgotPasswordForm from "@/components/forms/ForgotPassword/ForgotPassword";
import { PLATFORM_NAME } from "@/assets/language/constants";
import { RootState } from "@/store";

const ForgotPassword: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);

    return (
        <AuthShell
            pageTitle={`${PLATFORM_NAME} | ${languageData?.ForgotPassword || "Forgot password"}`}
            kicker={languageData?.Recovery || "Password recovery"}
            title={languageData?.ForgotPasswordTitle || languageData?.ForgotPassword || "Forgot your password?"}
            subtitle={
                languageData?.ForgotPasswordSubtitle ||
                "Enter the email associated with your account and we'll send a link to reset it."
            }
            backHref="/login"
            backLabel={languageData?.BackToAuthentication || "Back to sign in"}
        >
            <ForgotPasswordForm />
        </AuthShell>
    );
};

export const getServerSideProps = async () => ({ props: {} });

export default ForgotPassword;
