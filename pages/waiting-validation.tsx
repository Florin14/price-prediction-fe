import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MailCheck } from "lucide-react";

import { RootState } from "@/store";
import { PLATFORM_NAME } from "@/assets/language/constants";
import AuthShell from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";

const WaitingValidation: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const router = useRouter();

    return (
        <AuthShell
            pageTitle={`${PLATFORM_NAME} | ${languageData?.WaitingValidationTitle || "Awaiting validation"}`}
            kicker={languageData?.AlmostThere || "Almost there"}
            title={languageData?.WaitingValidationTitle || "Check your inbox"}
            subtitle={
                languageData?.WaitingValidationMessage ||
                "We've sent a verification email. Click the link inside to activate your account."
            }
        >
            <div className="flex flex-col items-start gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MailCheck className="h-7 w-7" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    {languageData?.WaitingValidationHint ||
                        "If you don't see the email within a few minutes, check your spam folder or resend the verification link from the login page."}
                </p>
                <Button size="lg" className="w-full" onClick={() => router.push("/login")}>
                    {languageData?.BackToAuthentication || "Back to sign in"}
                </Button>
            </div>
        </AuthShell>
    );
};

export default WaitingValidation;
