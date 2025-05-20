import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";

import { Close } from "@mui/icons-material";
import { Backdrop, Box, Divider, IconButton, Button, Typography } from "@mui/material";

import { RootState } from "../../../store";

import useClasses from "../../../utils/useClasses";
import FormSingleSelect from "../FormFields/FormSingleSelect";
import FormRadioButton from "../FormFields/FormRadioButton";
import StyledButton from "../StyledButton";

import filterDrawerStyles, { FilterDrawerStylesModel } from "./FilterDrawerStyles";

export interface FilterDrawerProps {
    zIndex?: number;
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    onClose?: () => void;
    drawerWidth: string | number;
    anchor?: "left" | "right";
    drawerClassName?: string;
    openDrawerClassName?: string;
    orderByOptions?: Array<{ id: number; value: string; name: string }>;
    onSubmit: (values: any) => void;
    initialValues?: any;
    onClear?: () => void; // add this line
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
    zIndex = 1101,
    children,
    open,
    setOpen,
    onClose,
    drawerWidth,
    anchor = "left",
    drawerClassName,
    openDrawerClassName,
    orderByOptions = [],
    onSubmit,
    initialValues = {
        orderBy: null,
        orderType: "asc",
    },
    onClear, // add this line
}) => {
    const classes = useClasses(filterDrawerStyles, { name: "filterDrawerStyles", params: { drawerWidth, anchor, zIndex } }) as FilterDrawerStylesModel;
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const closeDrawer = () => {
        setOpen(false);
        if (onClose) onClose();
    };

    const handleSubmit = (values: any) => {
        onSubmit(values);
    };

    return (
        <React.Fragment>
            <Backdrop className={classes.backdropWrapper} open={open} onClick={closeDrawer}>
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    className={classNames(classes.customDrawer, open ? classNames(classes.open, drawerClassName, openDrawerClassName) : drawerClassName)}
                >
                    <div className={classes.header}>
                        <div>{languageData?.Filters}</div>
                        <IconButton className={classes.closeButton} onClick={closeDrawer}>
                            <Close />
                        </IconButton>
                    </div>
                    <Divider className={classes.divider} />
                    <div className={classes.content}>
                        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
                            {({ resetForm }) => (
                                <Form style={{ height: "100%" }}>
                                    <Box className={classes.formContainer}>
                                        <Box className={classes.scrollableContent}>
                                            <Box className={classes.sectionContainer}>
                                                <FormSingleSelect label={languageData?.OrderBy || "Ordoneaza dupa"} name="orderBy" options={orderByOptions} />
                                                <FormRadioButton
                                                    name="orderType"
                                                    options={[
                                                        { value: "asc", label: languageData?.Ascending || "Crescator" },
                                                        { value: "desc", label: languageData?.Descending || "Descrescator" },
                                                    ]}
                                                    radioButtonsOnRow
                                                />
                                                {children}
                                            </Box>
                                            <Divider sx={{ margin: "0px 20px" }} />
                                            <Box className={classes.clearFiltersContainer}>
                                                <Button
                                                    onClick={() => {
                                                        resetForm();
                                                        if (onClear) onClear();
                                                    }}
                                                    className={classes.clearFiltersButton}
                                                >
                                                    <Close fontSize="small" sx={{ color: "#667085" }} />
                                                    <Typography variant="body2" className={classes.clearFiltersText}>
                                                        {languageData?.ClearFilters || "Sterge filtre"}
                                                    </Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Box className={classes.actionButtons}>
                                            <StyledButton sx={{ maxWidth: "120px" }} type="submit" variant="contained">
                                                {languageData?.Show || "Show"}
                                            </StyledButton>
                                        </Box>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Backdrop>
        </React.Fragment>
    );
};

export default FilterDrawer;
