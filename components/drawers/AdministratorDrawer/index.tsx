import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";

import { RootState, AppDispatch } from "../../../store";
import { Administrator } from "../../../models/generic/administrators/administrators";
import { addAdministrators, editAdministrators } from "../../../store/slices/administrator/thunks";

import CustomDrawer from "../../generic-components/CustomDrawer";
import StyledButton from "../../generic-components/StyledButton";
import { Formik, Form } from "formik";
import { Omit } from "utility-types";
import FormTextInput from "../../generic-components/FormFields/FormTextInput";

import * as styles from "./styles";

type AdministratorWithoutId = Omit<Administrator, "id">;

interface AdministratorDrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
    administratorId?: number;
}

const AdministratorDrawer: React.FC<AdministratorDrawerProps> = ({ isDrawerOpen, setIsDrawerOpen, administratorId }) => {
    const dispatch: AppDispatch = useDispatch();
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const [administrator, setAdministrator] = React.useState<Administrator | null>(null);
    const administrators = useSelector((state: RootState) => state.administrator.items);

    const handleCloseDrawer = () => {
        setTimeout(() => {
            setIsDrawerOpen(false);
        }, 300);
    };

    useEffect(() => {
        if (isDrawerOpen && administratorId && administrators) {
            const administrator = administrators.find((c) => c.id === administratorId);
            if (administrator) {
                setAdministrator(administrator);
            }
        } else {
            setAdministrator(null);
        }
    }, [isDrawerOpen, administratorId, administrators]);

    const handleSubmit = async (values: AdministratorWithoutId) => {
        if (administratorId) {
            await dispatch(editAdministrators({ id: administratorId, payload: values })).then((res) => {
                if (!(res?.payload as any)?.error) {
                    handleCloseDrawer();
                }
            });
        } else {
            await dispatch(addAdministrators({ payload: values })).then((res) => {
                if (!(res?.payload as any)?.error) {
                    handleCloseDrawer();
                }
            });
        }
    };

    return (
        <>
            {isDrawerOpen && (
                <Formik
                    initialValues={
                        {
                            name: administrator?.name || "",
                            email: administrator?.email || "",
                            phoneNumber: administrator?.phoneNumber || "",
                        } as AdministratorWithoutId
                    }
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {({ resetForm }) => (
                        <CustomDrawer
                            anchor="right"
                            title={administratorId ? languageData?.EditAdministrator : languageData?.AddAdministrator}
                            open={isDrawerOpen}
                            drawerWidth="40%"
                            setOpen={(open: boolean) => {
                                setIsDrawerOpen(open);
                                if (!open) {
                                    resetForm();
                                    setAdministrator(null);
                                }
                            }}
                        >
                            <Form style={{ height: "100%" }}>
                                <Box sx={styles.drawerContainer}>
                                    <Box sx={styles.scrollableContent}>
                                        <Box sx={styles.sectionContainer}>
                                            <FormTextInput
                                                placeholder={languageData?.forms.inputPlaceholder}
                                                label={languageData?.forms.administrators.name ?? ""}
                                                name="name"
                                                required
                                            />
                                            <div>
                                                <FormTextInput
                                                    placeholder={languageData?.forms.inputPlaceholder}
                                                    label={languageData?.forms.administrators.email ?? ""}
                                                    name="email"
                                                    type="email"
                                                    required
                                                    disabled={!!administratorId}
                                                />
                                                <div style={{ color: "#007AFF", paddingLeft: 10, paddingTop: 2, fontWeight: 400, fontSize: 12 }}>
                                                    {languageData?.EmailInfo}
                                                </div>
                                            </div>
                                            <FormTextInput
                                                placeholder={languageData?.forms.inputPlaceholder}
                                                label={languageData?.forms.administrators.phone ?? ""}
                                                name="phoneNumber"
                                                required
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={styles.actionButtons}>
                                        <StyledButton
                                            type="button"
                                            sx={{ maxWidth: "150px" }}
                                            variant="outlined"
                                            onClick={() => {
                                                resetForm();
                                                setAdministrator(null);
                                                handleCloseDrawer();
                                            }}
                                        >
                                            {languageData?.forms.cancelButton}
                                        </StyledButton>
                                        <StyledButton sx={{ maxWidth: "150px" }} type="submit" variant="contained">
                                            {languageData?.forms.saveButton}
                                        </StyledButton>
                                    </Box>
                                </Box>
                            </Form>
                        </CustomDrawer>
                    )}
                </Formik>
            )}
        </>
    );
};

export default AdministratorDrawer;
