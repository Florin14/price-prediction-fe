import React from "react";
import { useSelector } from "react-redux";

import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton, Theme } from "@mui/material";

import { RootState } from "../../../store";

import classNames from "classnames";
import AddIcon from "../../icons/AddIcon";
import FormLayout from "../../../containers/FormLayout";
import StyledButton from "../../generic-components/StyledButton";
import useClasses from "../../../utils/useClasses";
import EditIcon from "../../icons/EditIcon";

interface AddEditModalProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    title?: any;
    children: any;
    message?: any;
    childrenClass?: string;
    item?: any;
    paperClassName?: string;
}

interface AddEditModalStyles {
    paperScrollPaper: any;
    addEditCancelButton: any;
    addEditConfirmButton: any;
    addEditModalActions: any;
    error: any;
    closeButton: any;
    horizontalGrid: any;
    verticalGrid: any;
    icon: any;
    topWrapper: any;
    children: any;
    title: any;
    message: any;
    content: any;
}

const useStyles = (theme: Theme): AddEditModalStyles => ({
    paperScrollPaper: {
        borderRadius: "8px",
        width: "500px",
        backgroundColor: "white",
    },
    addEditCancelButton: {
        width: "50%",
        backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid #D0D5DD",
        color: "#313A47",
        height: "40px",
        fontSize: 14,
        fontWeight: 500,
        "&:hover": {
            backgroundColor: "#e5e5e5",
        },
    },
    addEditConfirmButton: {
        width: "50%",
        color: "white",
        height: "40px",
        fontFamily: "Inter",
        fontSize: 14,
        lineHeight: "24px",
        fontWeight: 600,
    },
    addEditModalActions: {
        display: "flex",
        flexDirection: "row",
        gap: 12,
        padding: "20px 24px 24px 24px",
        borderTop: "1px solid #E2E8F0",
        justifyContent: "flex-end",
    },
    error: {
        fontSize: 10,
        lineHeight: "12px",
        fontWeight: 500,
        fontStyle: "normal",
        color: "red",
    },
    closeButton: {
        position: "absolute",
        top: "7px",
        right: "7px",
        color: "rgb(107, 114, 128)",
    },
    horizontalGrid: {
        display: "grid",
        gridTemplateColumns: "48px auto",
        gap: "10px",
        padding: "24px 24px 20px 24px",
        width: "100%",
        borderBottom: "1px solid #E2E8F0",

    },
    verticalGrid: {
        display: "flex",
        flexDirection: "column",
    },
    topWrapper: {
        paddingTop: "50px",
        backgroundColor: "#fff",
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: "8px",
        border: "1px solid rgb(226, 232, 240)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: "Inter",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "28px",
        color: "rgb(49, 58, 71)",
        paddingRight: 25,
    },
    message: {
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: "20px",
        color: "#667085",
    },
    children: {
        padding: "0px 10px",
        width: "100%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    content: {
        padding: 0,
    },
});

const AddEditModal: React.FC<AddEditModalProps> = ({ id, isOpen, onClose, onSubmit, title, message, item, children, childrenClass, paperClassName }) => {
    const classes = useClasses(useStyles, { name: "DeleteModalStyles" }) as AddEditModalStyles;
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const handleSave = () => {
        if (onSubmit) {
            onSubmit();
        }
    };

    return (
        <Dialog id={id} classes={{ paperScrollPaper: classNames(classes.paperScrollPaper, paperClassName) }} open={isOpen} onClose={onClose}>
            <DialogContent className={classes.content}>
                <IconButton className={classes.closeButton} onClick={onClose} id="delete-modal-x-button">
                    <Close />
                </IconButton>
                <div>
                    <div className={classes.horizontalGrid}>
                        <div className={classes.icon}>
                            {isOpen && (item ? <EditIcon /> : <AddIcon />)}
                        </div>
                        <div className={classes.verticalGrid}>
                            <div className={classes.title} id="add-edit-modal-title">
                                {title}
                            </div>
                            <div className={classes.message} id="add-edit-modal-message">
                                {message}
                            </div>
                        </div>
                    </div>
                    <FormLayout onSubmit={(e: any) => { e.preventDefault(); handleSave(); }}>
                        <div className={classNames(classes.children, childrenClass)}>{children}</div>
                        <div className={classes.addEditModalActions}>
                            <StyledButton
                                id="add-edit-modal-cancel-button"
                                color="primary"
                                variant="contained"
                                className={classes.addEditCancelButton}
                                onClick={onClose}
                            >
                                {languageData?.Cancel}
                            </StyledButton>
                            <StyledButton
                                id="add-edit-modal-save-button"
                                color="primary"
                                variant="contained"
                                className={classes.addEditConfirmButton}
                                type="submit"
                            >
                                {languageData?.Save}
                            </StyledButton>
                        </div>
                    </FormLayout>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default AddEditModal;
