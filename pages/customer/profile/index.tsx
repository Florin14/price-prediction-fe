import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { Typography } from "@mui/material";

import { getClient, updateClient } from "../../../store/slices/client/thunks";
import { websiteActions } from "../../../store/slices/website/website-slice";
import { RootState } from "../../../store";

import StyledInput from "../../../components/generic-components/StyledInput";
import StyledButton from "../../../components/generic-components/StyledButton";

import { ProfileContainer, ProfileForm, FormGrid, PreferencesContainer } from "./ProfilePage.styles";

const Profile: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(["id"]);
    const client = useSelector((state: RootState) => state.clients.client);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<{
        name: string | null | number;
        email: string | null | number;
        phoneNumber: string | null | number;
    }>({
        name: null,
        email: null,
        phoneNumber: null,
    });

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: languageData?.Profile?.title || "Profile" }));
        // TODO: Fetch actual profile data here
    }, [dispatch, languageData]);

    useEffect(() => {
        if (cookies["id"] && cookies["id"] !== "") dispatch(getClient({ id: cookies["id"] }) as any).then((res: any) => {});
    }, [cookies]);

    useEffect(() => {
        if (client) {
            setProfileData({ name: client?.name, phoneNumber: client?.phoneNumber, email: client?.email });
        }
    }, [client]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement save functionality
        dispatch(
            updateClient({ id: cookies["id"], payload: { name: profileData?.name, email: profileData?.email, phoneNumber: profileData?.phoneNumber } }) as any
        ).then((res: any) => {
            if (!res?.payload?.error) {
                setIsEditing(false);
            }
        });
    };

    return (
        <ProfileContainer>
            <Typography variant="h1">{languageData?.ProfilePage?.title || "Profile"}</Typography>

            <ProfileForm onSubmit={handleSubmit}>
                <div className="form-section">
                    <Typography className="section-title" variant="h6">
                        {languageData?.ProfilePage?.personalInfo || "Personal Information"}
                    </Typography>
                    <FormGrid>
                        <StyledInput
                            label={languageData?.ProfilePage?.name || "Full Name"}
                            inputName="name"
                            value={profileData.name || ""}
                            onChange={(value) => {
                                setProfileData((prev) => ({
                                    ...prev,
                                    name: value,
                                }));
                            }}
                            width="100%"
                            disabled={!isEditing}
                        />

                        <StyledInput
                            label={languageData?.ProfilePage?.email || "Email"}
                            value={profileData.email}
                            type="email"
                            onChange={(value) => {
                                setProfileData((prev) => ({
                                    ...prev,
                                    email: value,
                                }));
                            }}
                            width="100%"
                            disabled={!isEditing}
                        />

                        <StyledInput
                            label={languageData?.ProfilePage?.phoneNumber || "Phone number"}
                            value={profileData.phoneNumber}
                            onChange={(value) => {
                                setProfileData((prev) => ({
                                    ...prev,
                                    phoneNumber: value,
                                }));
                            }}
                            width="100%"
                            disabled={!isEditing}
                        />
                    </FormGrid>
                </div>

                <div className="form-section">
                    <Typography className="section-title" variant="h6">
                        {languageData?.ProfilePage?.preferences || "Preferences"}
                    </Typography>
                    <PreferencesContainer>
                        <div className="preference-item">
                            <Typography variant="body1">TO DO</Typography>
                        </div>
                        {/* <div className="preference-item">
                            <Typography variant="body1">{languageData?.ProfilePage?.darkMode || "Dark Mode"}</Typography>
                            <Switch checked={isDarkMode} onChange={handleThemeChange} color="primary" />
                        </div>
                        <div className="preference-item">
                            <Typography variant="body1">{languageData?.ProfilePage?.language || "Language"}</Typography>
                            <StyledDropdown
                                value={{ value: currentLanguage, label: currentLanguage === "en" ? "English" : "Română" }}
                                onChange={(_, option) => option && handleLanguageChange(option.value)}
                                options={[
                                    { value: "en", label: "English" },
                                    { value: "ro", label: "Română" },
                                ]}
                                // fullWidth={false}
                                // style={{ width: 200 }}
                            />
                        </div> */}
                    </PreferencesContainer>
                </div>

                <div className="form-section">
                    {isEditing ? (
                        <StyledButton
                            type="submit"
                            children={languageData?.ProfilePage?.saveChanges || "Save Changes"}
                            variant="contained"
                            style={{ float: "right", width: "fit-content", marginBottom: 10 }}
                        />
                    ) : (
                        <StyledButton
                            children={languageData?.Edit || "Edit"}
                            variant="contained"
                            style={{ float: "right", width: "fit-content", marginBottom: 10 }}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEditing(true);
                            }}
                        />
                    )}
                </div>
            </ProfileForm>
        </ProfileContainer>
    );
};

export default Profile;
