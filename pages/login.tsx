import React from "react";
import { useSelector } from "react-redux";

import LoginForm from "@/components/forms/Login/LoginForm";
import AuthShell from "@/components/layout/AuthShell";
import { PLATFORM_NAME } from "@/assets/language/constants";
import { RootState } from "@/store";

const Login: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);

    return (
        <AuthShell
            pageTitle={`${PLATFORM_NAME} | ${languageData?.Login || "Sign in"}`}
            kicker={languageData?.WelcomeBack || "Welcome back"}
            title={languageData?.SignInTitle || languageData?.LoginAction || "Sign in to your account"}
            subtitle={
                languageData?.SignInSubtitle ||
                "Access your prediction history and save new estimates to your account."
            }
        >
            <LoginForm />
        </AuthShell>
    );
};

export const getServerSideProps = async () => ({ props: {} });

export default Login;
