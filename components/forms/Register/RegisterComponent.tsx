import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Form } from "formik";
import { User, Phone, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

import { registerNaturalPerson } from "@/store/slices/register/thunks";
import { AppDispatch, RootState } from "@/store";
import { RegisterInterface } from "@/interfaces/RegisterInterfaces";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { PasswordRequirements } from "@/components/layout/PasswordRequirements";
import { allValid, validatePassword } from "@/lib/password";

const RegisterComponent: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const dispatch: AppDispatch = useDispatch();
    const [cookies] = useCookies(["id"]);
    const router = useRouter();

    const [globalError, setGlobalError] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);

    const isAuthenticated = !!cookies.id;

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/customer/home");
        }
    }, [isAuthenticated]);

    const validate = (values: RegisterInterface) => {
        const errors: Partial<Record<keyof RegisterInterface, string>> = {};
        if (!values.name?.trim()) errors.name = languageData?.FieldRequired || "Required";
        if (!values.email?.trim()) errors.email = languageData?.FieldRequired || "Required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
            errors.email = languageData?.InvalidEmail || "Invalid email";
        if (!values.phoneNumber?.trim()) errors.phoneNumber = languageData?.FieldRequired || "Required";
        if (!values.password) errors.password = languageData?.FieldRequired || "Required";
        else if (!allValid(validatePassword(values.password)))
            errors.password = languageData?.PasswordRulesMissing || "Password doesn't meet requirements";
        if (values.password !== values.confirmPassword)
            errors.confirmPassword = languageData?.PasswordsDontMatch || "Passwords don't match";
        return errors;
    };

    return (
        <Formik<RegisterInterface>
            initialValues={{
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
            }}
            enableReinitialize
            validate={validate}
            onSubmit={(values) => {
                setSubmitting(true);
                setGlobalError("");
                dispatch(registerNaturalPerson(values))
                    .then((response: any) => {
                        const payload = response.payload;
                        if (!payload?.error) {
                            router.push("/waiting-validation");
                        } else if (payload?.fields && payload.fields.length > 0) {
                            setGlobalError(payload.fields[0]);
                        } else {
                            setGlobalError(languageData?.SomethingWentWrong || "Something went wrong");
                        }
                    })
                    .finally(() => setSubmitting(false));
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => {
                const rules = validatePassword(values.password);
                return (
                    <Form className="flex flex-col gap-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            <Field
                                label={languageData?.forms?.register?.naturalPerson?.name || "Full name"}
                                htmlFor="name"
                                required
                                error={touched.name && errors.name ? errors.name : undefined}
                            >
                                <Input
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    leftSlot={<User />}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    invalid={Boolean(touched.name && errors.name)}
                                />
                            </Field>

                            <Field
                                label={languageData?.forms?.register?.naturalPerson?.phoneNumber || "Phone number"}
                                htmlFor="phoneNumber"
                                required
                                error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
                            >
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    autoComplete="tel"
                                    leftSlot={<Phone />}
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    invalid={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                />
                            </Field>
                        </div>

                        <Field
                            label={languageData?.forms?.register?.naturalPerson?.email || "Email"}
                            htmlFor="email"
                            required
                            error={touched.email && errors.email ? errors.email : undefined}
                        >
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                leftSlot={<Mail />}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={Boolean(touched.email && errors.email)}
                            />
                        </Field>

                        <Field
                            label={languageData?.forms?.register?.naturalPerson?.password || "Password"}
                            htmlFor="password"
                            required
                        >
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                leftSlot={<Lock />}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        {values.password && <PasswordRequirements rules={rules} />}

                        {values.password && (
                            <Field
                                label={languageData?.forms?.register?.naturalPerson?.confirmPassword || "Confirm password"}
                                htmlFor="confirmPassword"
                                required
                                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                            >
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    leftSlot={<Lock />}
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                />
                            </Field>
                        )}

                        {globalError && (
                            <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
                                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                <span>{globalError}</span>
                            </div>
                        )}

                        <Button type="submit" size="lg" className="mt-2 w-full" disabled={submitting}>
                            {submitting
                                ? languageData?.Loading || "Creating account..."
                                : languageData?.CreateAccount || "Create account"}
                            <ArrowRight />
                        </Button>

                        <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
                            <span>
                                {languageData?.AlreadyHaveAccount || "Already have an account?"}{" "}
                                <Link href="/login" className="font-medium text-primary transition-colors hover:underline">
                                    {languageData?.Login || "Sign in"}
                                </Link>
                            </span>
                            <Link href="/home" className="transition-colors hover:text-foreground">
                                {languageData?.ContinueWithoutAccount || "Continue without account"}
                            </Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RegisterComponent;
