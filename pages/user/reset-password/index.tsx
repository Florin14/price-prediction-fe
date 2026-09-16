import React from "react";
import { useSelector } from "react-redux";

import AuthShell from "@/components/layout/AuthShell";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm/ResetPasswordForm";
import { PLATFORM_NAME } from "@/assets/language/constants";
import { RootState } from "@/store";

const ResetPassword: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);

    return (
        <AuthShell
            pageTitle={`${PLATFORM_NAME} | ${languageData?.ResetPassword || "Reset password"}`}
            kicker={languageData?.Recovery || "Password recovery"}
            title={languageData?.ResetPassword || "Reset your password"}
            subtitle={
                languageData?.ResetPasswordSubtitle ||
                "Choose a new, secure password. Follow the checklist below to keep your account protected."
            }
            backHref="/login"
            backLabel={languageData?.BackToAuthentication || "Back to sign in"}
        >
            <ResetPasswordForm />
        </AuthShell>
    );
};

export const getServerSideProps = async () => ({ props: {} });

export default ResetPassword;
