import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton, Theme } from "@mui/material";
import DeleteIcon from "../../icons/DeleteIcon";
import StyledButton from "../../generic-components/StyledButton";
import useClasses from "../../../utils/useClasses";
import { RootState } from "../../../store";

interface DeleteModalProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    message: string;
    error?: string;
    paperClassName?: string;
}

interface DeleteModalStyles {
    paperScrollPaper: any;
    deleteCancelButton: any;
    deleteConfirmButton: any;
    deleteModalActions: any;
    error: any;
    closeButton: any;
    horizontalGrid: any;
    verticalGrid: any;
    icon: any;
    title: any;
    message: any;
    content: any;
}

const useStyles = (theme: Theme): DeleteModalStyles => ({
    paperScrollPaper: {
        borderRadius: "8px",
        width: "500px",
        backgroundColor: "white",
    },
    deleteCancelButton: {
        width: "50%",
        backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid rgb(208, 213, 221)",
        color: "#313A47",
        height: "48px",
        fontFamily: "Inter",
        lineHeight: "24px",
        fontSize: 14,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: "#e5e5e5",
        },
    },
    deleteConfirmButton: {
        width: "50%",
        backgroundColor: "rgb(217, 45, 32)",
        color: "white",
        height: "48px",
        fontFamily: "Inter",
        fontSize: 14,
        lineHeight: "24px",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: "#c3281c",
        },
    },
    deleteModalActions: {
        display: "flex",
        flexDirection: "row",
        gap: 12,
        padding: "20px 24px 24px 24px",
        borderTop: "1px solid #E2E8F0",
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
    },
    verticalGrid: {
        display: "flex",
        flexDirection: "column",
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
        fontSize: 18,
        fontWeight: 600,
        lineHeight: "28px",
        color: "rgb(49, 58, 71)",
        paddingRight: 25,
    },
    message: {
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: "20px",
        color: "rgb(107, 114, 128)",
    },
    content: {
        padding: 0,
    },
});

const DeleteModal: React.FC<DeleteModalProps> = ({ id, isOpen, onClose, onDelete, title, message, error, paperClassName }) => {
    const classes = useClasses(useStyles, { name: "DeleteModalStyles" }) as DeleteModalStyles;
    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <Dialog id={id} classes={{ paperScrollPaper: classNames(classes.paperScrollPaper, paperClassName) }} open={isOpen} onClose={onClose}>
            <DialogContent className={classes.content}>
                <IconButton className={classes.closeButton} onClick={onClose} id="delete-modal-x-button">
                    <Close />
                </IconButton>
                <div>
                    <div className={classes.horizontalGrid}>
                        <div className={classes.icon}>
                            <DeleteIcon />
                        </div>
                        <div className={classes.verticalGrid}>
                            <div className={classes.title} id="delete-modal-title">
                                {title}
                            </div>
                            <div className={classes.message} id="delete-modal-message">
                                {message}
                            </div>
                        </div>
                    </div>
                    <div className={classes.error}>{languageData && error}</div>
                    <div className={classes.deleteModalActions}>
                        <StyledButton
                            id="delete-modal-cancel-button"
                            color="primary"
                            variant="contained"
                            className={classes.deleteCancelButton}
                            onClick={onClose}
                        >
                            {languageData?.Cancel}
                        </StyledButton>
                        <StyledButton
                            id="delete-modal-delete-button"
                            color="primary"
                            variant="contained"
                            className={classes.deleteConfirmButton}
                            onClick={onDelete}
                        >
                            {languageData?.Delete}
                        </StyledButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
