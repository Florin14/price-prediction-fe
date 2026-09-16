import React, { useMemo, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Lock, AlertCircle, ArrowRight } from "lucide-react";

import { RootState } from "@/store";
import FormLayout from "@/containers/FormLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { PasswordRequirements } from "@/components/layout/PasswordRequirements";
import { allValid, validatePassword } from "@/lib/password";

const ResetPasswordForm: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [responseError, setResponseError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const languageData = useSelector((s: RootState) => s.website.languageData);

    const rules = useMemo(() => validatePassword(password), [password]);
    const rulesValid = allValid(rules);
    const mismatch = confirmPassword.length > 0 && password !== confirmPassword;
    const canSubmit = rulesValid && !!confirmPassword && !mismatch && !submitting;

    const handleSubmit = () => {
        if (!canSubmit) return;
        setSubmitting(true);
        Axios({
            url: "/account/reset-password",
            method: "PUT",
            data: {
                email: router.query.email,
                code: router.query.code,
                newPassword: password,
            },
        })
            .then(() => router.push("/login"))
            .catch(() => setResponseError(languageData?.InvalidResetCode || "Invalid or expired reset code"))
            .finally(() => setSubmitting(false));
    };

    return (
        <FormLayout
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="flex flex-col gap-5"
        >
            <Field label={languageData?.NewPassword || "New password"} htmlFor="new-password" required>
                <Input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftSlot={<Lock />}
                    required
                />
            </Field>

            <PasswordRequirements rules={rules} />

            <Field
                label={languageData?.ConfirmNewPassword || "Confirm new password"}
                htmlFor="confirm-password"
                required
                error={mismatch ? languageData?.PasswordsDontMatch || "Passwords don't match" : undefined}
            >
                <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    leftSlot={<Lock />}
                    invalid={mismatch}
                    required
                />
            </Field>

            {responseError && (
                <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{responseError}</span>
                </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
                {languageData?.ChangePassword || "Reset password"}
                <ArrowRight />
            </Button>
        </FormLayout>
    );
};

export default ResetPasswordForm;
