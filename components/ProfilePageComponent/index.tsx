import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { User, Mail, Phone, Pencil, Check, X, Lock, ArrowRight } from "lucide-react";

import { getClient, updateClient } from "@/store/slices/client/thunks";
import { websiteActions } from "@/store/slices/website/website-slice";
import { RootState } from "@/store";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function getInitials(name?: string | null) {
    if (!name || typeof name !== "string") return "U";
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase() || "")
        .join("");
}

const ProfilePageComponent: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const dispatch = useDispatch();
    const [cookies] = useCookies(["id"]);
    const client = useSelector((s: RootState) => s.clients.client);

    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [profileData, setProfileData] = useState<{ name: string; email: string; phoneNumber: string }>({
        name: "",
        email: "",
        phoneNumber: "",
    });

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: languageData?.ProfilePage?.title || "Profile" }));
    }, [dispatch, languageData]);

    useEffect(() => {
        if (cookies["id"]) {
            dispatch(getClient({ id: cookies["id"] }) as any);
        }
    }, [cookies]);

    useEffect(() => {
        if (client) {
            setProfileData({
                name: (client as any)?.name || "",
                email: (client as any)?.email || "",
                phoneNumber: (client as any)?.phoneNumber || "",
            });
        }
    }, [client]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        dispatch(
            updateClient({
                id: cookies["id"],
                payload: {
                    name: profileData.name,
                    email: profileData.email,
                    phoneNumber: profileData.phoneNumber,
                },
            }) as any
        )
            .then((res: any) => {
                if (!res?.payload?.error) setIsEditing(false);
            })
            .finally(() => setSubmitting(false));
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (client) {
            setProfileData({
                name: (client as any)?.name || "",
                email: (client as any)?.email || "",
                phoneNumber: (client as any)?.phoneNumber || "",
            });
        }
    };

    return (
        <Container size="md" className="py-10 md:py-14">
            <div className="mb-8 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                    {languageData?.AccountKicker || "Account"}
                </span>
                <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                    {languageData?.ProfilePage?.title || "Profile"}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {languageData?.ProfileSubtitle ||
                        "Manage your personal information and account preferences."}
                </p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader className="flex-row items-center justify-between gap-6 border-b border-border">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14">
                                <AvatarFallback className="bg-primary/10 font-display text-lg font-medium text-primary">
                                    {getInitials(profileData.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg">
                                    {profileData.name || languageData?.Unnamed || "—"}
                                </CardTitle>
                                <CardDescription className="text-xs">{profileData.email}</CardDescription>
                            </div>
                        </div>
                        {!isEditing ? (
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                <Pencil />
                                {languageData?.Edit || "Edit"}
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={handleCancel} disabled={submitting}>
                                    <X />
                                    {languageData?.Cancel || "Cancel"}
                                </Button>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <Field label={languageData?.ProfilePage?.name || "Full name"} htmlFor="profile-name">
                                <Input
                                    id="profile-name"
                                    leftSlot={<User />}
                                    value={profileData.name}
                                    onChange={(e) => setProfileData((p) => ({ ...p, name: e.target.value }))}
                                    disabled={!isEditing}
                                />
                            </Field>
                            <Field label={languageData?.ProfilePage?.email || "Email"} htmlFor="profile-email">
                                <Input
                                    id="profile-email"
                                    type="email"
                                    leftSlot={<Mail />}
                                    value={profileData.email}
                                    onChange={(e) => setProfileData((p) => ({ ...p, email: e.target.value }))}
                                    disabled={!isEditing}
                                />
                            </Field>
                            <Field
                                label={languageData?.ProfilePage?.phoneNumber || "Phone number"}
                                htmlFor="profile-phone"
                            >
                                <Input
                                    id="profile-phone"
                                    type="tel"
                                    leftSlot={<Phone />}
                                    value={profileData.phoneNumber}
                                    onChange={(e) => setProfileData((p) => ({ ...p, phoneNumber: e.target.value }))}
                                    disabled={!isEditing}
                                />
                            </Field>

                            {isEditing && (
                                <>
                                    <Separator />
                                    <div className="flex justify-end gap-3">
                                        <Button type="button" variant="outline" onClick={handleCancel} disabled={submitting}>
                                            {languageData?.Cancel || "Cancel"}
                                        </Button>
                                        <Button type="submit" disabled={submitting}>
                                            <Check />
                                            {submitting
                                                ? languageData?.Loading || "Saving..."
                                                : languageData?.ProfilePage?.saveChanges || "Save changes"}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="border-b border-border">
                        <CardTitle className="text-base">{languageData?.SecuritySection || "Security"}</CardTitle>
                        <CardDescription>
                            {languageData?.SecurityHint ||
                                "Update your password regularly to keep your account safe."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Link
                            href="/customer/change-password"
                            className="group flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-4 py-3 transition-colors hover:bg-secondary"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-background text-muted-foreground">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <div>
                                    <div className="text-sm font-medium">
                                        {languageData?.ChangePassword || "Change password"}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {languageData?.ChangePasswordHint ||
                                            "8+ chars · upper + lower + digit + symbol"}
                                    </div>
                                </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
};

export default ProfilePageComponent;
