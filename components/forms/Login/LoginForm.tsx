import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

import { RootState } from "@/store";
import FormLayout from "@/containers/FormLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [globalError, setGlobalError] = useState<string>("");
    const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();
    const [cookies, setCookie] = useCookies(["name", "role", "id"]);
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const isAuthenticated = !!cookies.id;

    useEffect(() => {
        if (router.isReady) {
            const { code, email: confirmEmail } = router.query;
            if (code && confirmEmail) {
                Axios({
                    url: "/account/confirm",
                    method: "PUT",
                    data: { email: confirmEmail, code },
                })
                    .then(() => router.push("/login"))
                    .catch(() => router.push("/login"));
            }
        }
    }, [router?.isReady, router?.query]);

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/customer/history");
        }
    }, [isAuthenticated]);

    const handleLogin = () => {
        setSubmitting(true);
        const data: any = { email, password };
        if (showCaptcha && captchaToken) {
            data.recaptchaToken = captchaToken;
            setShowCaptcha(false);
            setCaptchaToken(null);
        }
        Axios({ url: "/auth/login", method: "POST", data })
            .then((response) => {
                const rspData = response.data;
                setGlobalError("");
                const expires = new Date(Date.now() + 31536000000);
                setCookie("name", rspData["name"], { path: "/", expires });
                setCookie("role", rspData["role"], { path: "/", expires });
                setCookie("id", rspData["id"], { path: "/", expires });
                router.push("/customer/history");
            })
            .catch((err) => {
                const code = err?.response?.data?.code || err?.response?.code;
                if (code === "E0010" || code === "E0024") {
                    setGlobalError(languageData?.InvalidCredentials || "Invalid credentials");
                } else if (code === "E0011") {
                    setGlobalError(languageData?.CaptchaConfirm || "Please confirm you are not a robot");
                    setShowCaptcha(true);
                } else {
                    setGlobalError(languageData?.SomethingWentWrong || "Something went wrong");
                }
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <FormLayout
            onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
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

            <Field
                label={languageData?.Password || "Password"}
                htmlFor="password"
                required
                hint={
                    <Link
                        href="/forgot-password"
                        className="font-medium text-primary transition-colors hover:underline"
                    >
                        {languageData?.ForgotPassword || "Forgot password?"}
                    </Link>
                }
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftSlot={<Lock />}
                    placeholder="••••••••"
                    required
                />
            </Field>

            {globalError && (
                <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{globalError}</span>
                </div>
            )}

            <Button
                type="submit"
                size="lg"
                className="mt-1 w-full"
                disabled={(showCaptcha && !captchaToken) || submitting}
            >
                {submitting ? (languageData?.Loading || "Loading...") : languageData?.Login || "Sign in"}
                <ArrowRight />
            </Button>

            <div className="flex items-center gap-4 py-2">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {languageData?.Or || "or"}
                </span>
                <span className="h-px flex-1 bg-border" />
            </div>

            <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => router.push("/register")}>
                {languageData?.CreateAccount || "Create account"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
                <Link href="/home" className="font-medium transition-colors hover:text-foreground">
                    {languageData?.ContinueWithoutAccount || "Continue without account"}
                </Link>
            </p>
        </FormLayout>
    );
};

export default LoginForm;
