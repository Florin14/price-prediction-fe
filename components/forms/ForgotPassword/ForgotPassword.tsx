import React, { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

import { RootState } from "@/store";
import FormLayout from "@/containers/FormLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [sent, setSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const languageData = useSelector((s: RootState) => s.website.languageData);

    const handleSubmit = () => {
        setSubmitting(true);
        Axios({
            url: "/account/reset-password",
            method: "POST",
            headers: { "X-Loading": false },
            data: { email },
        })
            .finally(() => {
                setSubmitting(false);
                setSent(true);
            });
    };

    if (sent) {
        return (
            <div className="flex flex-col items-start gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]">
                    <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                    <p className="text-sm leading-relaxed text-foreground">
                        {languageData?.ResetPasswordEmailSentConfirm ||
                            "If an account exists for this email, a reset link is on its way. Check your inbox (and spam)."}
                    </p>
                </div>
                <Button size="lg" className="w-full" onClick={() => router.push("/login")}>
                    {languageData?.BackToAuthentication || "Back to sign in"}
                </Button>
            </div>
        );
    }

    return (
        <FormLayout
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="flex flex-col gap-5"
        >
            <Field label={languageData?.EmailAddress || "Email address"} htmlFor="email" required>
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftSlot={<Mail />}
                    placeholder="you@example.com"
                    required
                />
            </Field>

            <Button type="submit" size="lg" className="w-full" disabled={submitting || !email}>
                {languageData?.Reset || "Send reset link"}
                <ArrowRight />
            </Button>
        </FormLayout>
    );
};

export default ForgotPasswordForm;
