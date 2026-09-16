import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Lock, AlertCircle, CheckCircle2 } from "lucide-react";

import { RootState } from "@/store";
import { websiteActions } from "@/store/slices/website/website-slice";
import { LanguageDataTypes } from "@/assets/language/ro";

import FormLayout from "@/containers/FormLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PasswordRequirements } from "@/components/layout/PasswordRequirements";
import { allValid, validatePassword } from "@/lib/password";
import { Container } from "@/components/ui/container";

const ChangePassword: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [responseError, setResponseError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        dispatch(websiteActions.setTitle({ title: "ChangePassword" }));
    }, [dispatch]);

    const rules = useMemo(() => validatePassword(password), [password]);
    const rulesValid = allValid(rules);
    const mismatch = confirmPassword.length > 0 && password !== confirmPassword;
    const canSubmit = !!oldPassword && rulesValid && !!confirmPassword && !mismatch && !submitting;

    const handleSubmit = () => {
        if (!canSubmit) return;
        setSubmitting(true);
        setResponseError("");
        Axios({
            url: "/account/change-password",
            method: "POST",
            data: { currentPassword: oldPassword, newPassword: password },
        })
            .then(() => {
                setSuccess(true);
                setPassword("");
                setOldPassword("");
                setConfirmPassword("");
                setTimeout(() => setSuccess(false), 4000);
            })
            .catch((err) => {
                const msg = err?.response?.data?.message;
                if (msg) {
                    setResponseError((languageData?.[msg as keyof LanguageDataTypes] as string) || msg);
                } else {
                    setResponseError(languageData?.SomethingWentWrong || "Something went wrong");
                }
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <Container size="sm" className="py-10 md:py-16">
            <div className="mb-8 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                    {languageData?.AccountKicker || "Account"}
                </span>
                <h1 className="font-display text-3xl font-medium tracking-tight md:text-[40px]">
                    {languageData?.ChangePassword || "Change password"}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {languageData?.ChangePasswordSubtitle ||
                        "Update your password regularly. Use a unique combination you don't use elsewhere."}
                </p>
            </div>

            <Card>
                <CardHeader className="border-b border-border">
                    <CardTitle className="text-base">{languageData?.SecuritySection || "Security"}</CardTitle>
                    <CardDescription>
                        {languageData?.ChangePasswordHint || "Minimum 8 characters · upper + lower + digit + symbol"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <FormLayout
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="flex flex-col gap-5"
                    >
                        <Field label={languageData?.CurrentPassword || "Current password"} htmlFor="current-password" required>
                            <Input
                                id="current-password"
                                type="password"
                                autoComplete="current-password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                leftSlot={<Lock />}
                                required
                            />
                        </Field>

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

                        {success && (
                            <div className="flex items-start gap-2 rounded-md border border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/5 px-3 py-2.5 text-xs text-[hsl(var(--success))]">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                <span>{languageData?.PasswordChanged || "Password updated successfully."}</span>
                            </div>
                        )}

                        <div className="flex justify-end pt-2">
                            <Button type="submit" size="lg" disabled={!canSubmit}>
                                {submitting
                                    ? languageData?.Loading || "Saving..."
                                    : languageData?.ChangePassword || "Update password"}
                            </Button>
                        </div>
                    </FormLayout>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ChangePassword;
