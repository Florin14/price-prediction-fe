import React, { useEffect } from "react";
import CustomDrawer from "../../generic-components/CustomDrawer";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store"; // Import AppDispatch
import { Box, Typography, IconButton } from "@mui/material";
import StyledButton from "../../generic-components/StyledButton";
import FormTextInput from "../../generic-components/FormFields/FormTextInput";
import FormSingleSelect from "../../generic-components/FormFields/FormSingleSelect";
import { Formik, Form, FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import FormImageUpload from "../../generic-components/FormFields/FormImageUpload";
import { Location, Box as BoxInterface } from "../../../interfaces/LocationInterfaces";
import { Omit } from "utility-types";
import * as styles from "./styles";
import EditIcon from "../../icons/EditIcon";

type LocationWithoutId = Omit<Location, "id">;

interface LocationDrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
    locationId?: number; // Optional location ID
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({ isDrawerOpen, setIsDrawerOpen, locationId }) => {
    const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type
    const languageData = useSelector((state: RootState) => state.website.languageData);
    // const { lprCameras, karcherMachines } = useSelector((state: RootState) => state.location.resources);
    const [location, setLocation] = React.useState<Location | null>(null);
    const [isEditing, setIsEditing] = React.useState(!locationId);

    const handleCloseDrawer = () => {
        setTimeout(() => {
            setIsDrawerOpen(false);
        }, 300); // Delay to ensure the drawer fully closes
    };

    useEffect(() => {
        let isMounted = true; // Track if the component is still mounted

        // if (isDrawerOpen) {
        //     dispatch(fetchResources());
        //     if (locationId) {
        //         dispatch(fetchLocation(locationId)).then((action) => {
        //             if (isMounted && fetchLocation.fulfilled.match(action)) {
        //                 setLocation(action.payload);
        //             }
        //         });
        //     } else {
        //         setLocation(null);
        //     }
        // }

        return () => {
            isMounted = false; // Cleanup when the component unmounts
        };
    }, [isDrawerOpen, locationId, dispatch]);

    const handleSubmit = async (values: LocationWithoutId) => {
        handleCloseDrawer(); // Use delayed close
    };

    return (
        <>
            {isDrawerOpen && ( // Render CustomDrawer only when isDrawerOpen is true
                <Formik
                    initialValues={
                        {
                            image: location?.image || null,
                            name: location?.name || null,
                            address: location?.address || null,
                            link: location?.link || null,
                            boxes: location?.boxes || ([] as BoxInterface[]),
                        } as LocationWithoutId
                    }
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {({ values, resetForm }) => (
                        <CustomDrawer
                            anchor="right"
                            title={locationId ? languageData?.EditLocation : languageData?.AddLocation}
                            open={isDrawerOpen}
                            drawerWidth="40%"
                            setOpen={(open: boolean) => {
                                setIsDrawerOpen(open);
                                if (!open) {
                                    resetForm(); // Reset form when closing the drawer
                                    setLocation(null); // Clear location state when closing the drawer
                                    if (locationId) {
                                        setIsEditing(false); // Reset editing state when closing the drawer
                                    }
                                }
                            }}
                        >
                            <Form style={{ height: "100%" }}>
                                <Box sx={styles.drawerContainer}>
                                    <Box sx={styles.scrollableContent}>
                                        <Box sx={{ width: "100%" }}>
                                            <Typography sx={styles.sectionTitle}>{languageData?.Location}</Typography>
                                        </Box>
                                        <Box sx={styles.sectionContainer}>
                                            <FormImageUpload name="image" />
                                            <FormTextInput
                                                placeholder={languageData?.forms.inputPlaceholder}
                                                label={languageData?.forms.location.name ?? ""}
                                                name="name"
                                                required
                                                disabled={!isEditing}
                                            />
                                            <FormTextInput
                                                placeholder={languageData?.forms.inputPlaceholder}
                                                label={languageData?.forms.location.address ?? ""}
                                                name="address"
                                                required
                                                disabled={!isEditing}
                                            />
                                            <FormTextInput
                                                placeholder={languageData?.forms.inputPlaceholder}
                                                label={languageData?.forms.location.link ?? ""}
                                                name="link"
                                                required
                                                disabled={!isEditing}
                                            />
                                        </Box>
                                        <Box sx={{ width: "100%", borderTop: "1px solid #E5E7EB" }}>
                                            <Box sx={styles.boxesHeader}>
                                                <Typography sx={styles.sectionTitle}>{languageData?.Boxes}</Typography>
                                                {isEditing && (
                                                    <FieldArray
                                                        name="boxes"
                                                        render={(arrayHelpers) => (
                                                            <IconButton
                                                                onClick={() =>
                                                                    arrayHelpers.push({
                                                                        name: "",
                                                                        lprCamera: null,
                                                                        karcherMachine: null,
                                                                        status: null,
                                                                    })
                                                                }
                                                            >
                                                                <AddIcon />
                                                            </IconButton>
                                                        )}
                                                    />
                                                )}
                                            </Box>
                                            <FieldArray
                                                name="boxes"
                                                render={(arrayHelpers) => (
                                                    <>
                                                        {values.boxes.map((box, index) => (
                                                            <Box key={index} sx={styles.boxItem}>
                                                                <FormTextInput
                                                                    placeholder={languageData?.forms.inputPlaceholder}
                                                                    label={languageData?.forms.box.name ?? ""}
                                                                    name={`boxes[${index}].name`}
                                                                    required
                                                                    disabled={!isEditing}
                                                                />
                                                                {/* <FormSingleSelect
                                                                    options={lprCameras || []}
                                                                    placeholder={languageData?.forms.selectPlaceholder}
                                                                    name={`boxes[${index}].lprCamera`}
                                                                    label={languageData?.forms.box.cameraLPR ?? ""}
                                                                    required
                                                                    disabled={!isEditing}
                                                                />
                                                                <FormSingleSelect
                                                                    options={karcherMachines || []}
                                                                    placeholder={languageData?.forms.selectPlaceholder}
                                                                    name={`boxes[${index}].karcherMachine`}
                                                                    label={languageData?.forms.box.karcherMachine ?? ""}
                                                                    required
                                                                    disabled={!isEditing}
                                                                /> */}
                                                                <FormSingleSelect
                                                                    options={languageData?.LocationStates ?? []}
                                                                    placeholder={languageData?.forms.selectPlaceholder}
                                                                    name={`boxes[${index}].status`}
                                                                    label={languageData?.forms.box.status ?? ""}
                                                                    required
                                                                    disabled={!isEditing}
                                                                    sx={
                                                                        languageData?.LocationStates[index].id === "Active"
                                                                            ? styles.activeColor
                                                                            : styles.inActiveColor
                                                                    }
                                                                />
                                                            </Box>
                                                        ))}
                                                    </>
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                    {isEditing && (
                                        <Box sx={styles.actionButtons}>
                                            <StyledButton
                                                type="button"
                                                sx={{ maxWidth: "150px" }}
                                                variant="outlined"
                                                onClick={() => {
                                                    resetForm();
                                                    if (locationId) {
                                                        setIsEditing(false);
                                                    }
                                                    setLocation(null);

                                                    handleCloseDrawer();
                                                }}
                                            >
                                                {languageData?.forms.cancelButton}
                                            </StyledButton>
                                            <StyledButton sx={{ maxWidth: "150px" }} type="submit" variant="contained">
                                                {languageData?.forms.saveButton}
                                            </StyledButton>
                                        </Box>
                                    )}
                                    {!isEditing && (
                                        <Box sx={styles.actionButtons}>
                                            <StyledButton
                                                type="button"
                                                sx={{ maxWidth: "150px", justifyContent: "center", gap: "10px" }}
                                                variant="outlined"
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setLocation(null);
                                                }}
                                            >
                                                <EditIcon />
                                                <div>{languageData?.forms.editButton}</div>
                                            </StyledButton>
                                        </Box>
                                    )}
                                </Box>
                            </Form>
                        </CustomDrawer>
                    )}
                </Formik>
            )}
        </>
    );
};

export default LocationDrawer;
