import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { Dialog, DialogContent, IconButton, Theme } from "@mui/material";
import { Close } from "@mui/icons-material";

import { RootState } from "../../../store";

import StyledButton from "../../generic-components/StyledButton";
import useClasses from "../../../utils/useClasses";
import AttentionIcon from "../../icons/AttentionIcon";

interface InfoModalProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    paperClassName?: string;
}

interface InfoModalStyles {
    paperScrollPaper: any;
    infoModalActions: any;
    closeButton: any;
    confirmButton: any;
    horizontalGrid: any;
    verticalGrid: any;
    icon: any;
    modalBody: any;
    title: any;
    message: any;
    content: any;
}

const useStyles = (theme: Theme): InfoModalStyles => ({
    paperScrollPaper: {
        borderRadius: "8px",
        width: "500px",
        backgroundColor: "white",
    },
    modalBody: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "17px",
        textAlign: "center",
        color: theme.palette.grey,
    },
    confirmButton: {
        margin: "auto",
        marginTop: "15px",
        height: "48px"
    },
    infoModalActions: {
        display: "flex",
        flexDirection: "row",
        gap: 12,
        padding: "20px 24px 24px 24px",
        borderTop: "1px solid #E2E8F0",
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

const InfoModal: React.FC<InfoModalProps> = ({ id, isOpen, onClose, message, title = "Info", paperClassName }) => {
    const classes = useClasses(useStyles, { name: "InfoModalStyles" }) as InfoModalStyles;
    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <Dialog id={id} classes={{ paperScrollPaper: classNames(classes.paperScrollPaper, paperClassName) }} open={isOpen} onClose={onClose}>
            <DialogContent className={classes.content}>
                <IconButton className={classes.closeButton} onClick={onClose} id="info-modal-x-button">
                    <Close />
                </IconButton>
                <div>
                    <div className={classes.horizontalGrid}>
                        <div className={classes.icon}>
                            <AttentionIcon />
                        </div>
                        <div className={classes.verticalGrid}>
                            <div className={classes.title} id="info-modal-title">
                                {title}
                            </div>
                            <div className={classes.message} id="info-modal-message">
                                {message}
                            </div>
                        </div>
                    </div>
                    <div className={classes.infoModalActions}>
                        <StyledButton color="primary" variant="contained" onClick={onClose} className={classes.confirmButton}>
                            {languageData?.Ok.toLocaleUpperCase()}
                        </StyledButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InfoModal;
