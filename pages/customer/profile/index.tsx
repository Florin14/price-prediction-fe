import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { websiteActions } from "../../../store/slices/website/website-slice";
import { RootState } from "../../../store";
import { Typography, useTheme, Switch } from "@mui/material";
import StyledInput from "../../../components/generic-components/StyledInput";
import StyledDropdown from "../../../components/generic-components/StyledDropdown";
import StyledButton from "../../../components/generic-components/StyledButton";
import { ProfileContainer, ProfileForm, FormGrid, PreferencesContainer } from "./ProfilePage.styles";

const Profile: React.FC = () => {
    const theme = useTheme();
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.website.isDarkMode);
    const currentLanguage = useSelector((state: RootState) => state.website.currentLanguage);

    const [profileData, setProfileData] = useState<{
        firstName: string | null | number;
        lastName: string | null | number;
        email: string | null | number;
        phoneNumber: string | null | number;
    }>({
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
    });

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: languageData?.Profile?.title || "Profile" }));
        // TODO: Fetch actual profile data here
    }, [dispatch, languageData]);

    const handleThemeChange = () => {
        dispatch(websiteActions.setIsDarkMode({ isDarkMode: !isDarkMode }));
    };

    const handleLanguageChange = (value: string) => {
        dispatch(websiteActions.setCurrentLanguage({ currentLanguage: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement save functionality
        console.log("Saving profile:", profileData);
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
                            label={languageData?.ProfilePage?.lastName || "Last Name"}
                            inputName="lastName"
                            value={profileData.lastName || ""}
                            onChange={(value) => {
                                setProfileData((prev) => ({
                                    ...prev,
                                    lastName: value,
                                }));
                            }}
                            width="100%"
                        />
                        <StyledInput
                            label={languageData?.ProfilePage?.firstName || "First Name"}
                            inputName="firstName"
                            value={profileData.firstName || ""}
                            onChange={(value) => {
                                setProfileData((prev) => ({
                                    ...prev,
                                    firstName: value,
                                }));
                            }}
                            width="100%"
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
                        />
                    </FormGrid>
                </div>

                <div className="form-section">
                    <Typography className="section-title" variant="h6">
                        {languageData?.ProfilePage?.preferences || "Preferences"}
                    </Typography>
                    <PreferencesContainer>
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
                    <StyledButton
                        type="submit"
                        children={languageData?.ProfilePage?.saveChanges || "Save Changes"}
                        variant="contained"
                        style={{ float: "right", width: "fit-content", marginBottom: 10 }}
                    />
                </div>
            </ProfileForm>
        </ProfileContainer>
    );
};

export default Profile;
