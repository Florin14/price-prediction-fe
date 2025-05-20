import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

import { RootState } from "../../../store";

import { LanguageDataTypes } from "../../../assets/language/ro";
import useClasses from "../../../utils/useClasses";

interface StyledModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

interface StyleClasses {
    modalTitle: any;
    closeButton: any;
    children: any;
    topWrapper: any;
    paperScrollPaper: any;
    [key: string]: any;
}

const useStyles = (theme: any): StyleClasses => ({
    modalTitle: {
        color: theme.palette.grey.text,
        textAlign: "center",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "20px",
        lineHeight: "24px",
        letterSpacing: "0.01em",
    },
    closeButton: {
        position: "absolute",
        top: "5px",
        right: "5px",
        color: "#9F9F9F",
    },
    children: {
        padding: "0px 80px 30px 80px",
        width: "100%",
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
    },
    topWrapper: {
        paddingTop: "50px",
        backgroundColor: "#fff",
    },
    paperScrollPaper: {
        maxHeight: "calc(100% - 20px)",
        boxShadow: "0px 2.84488px 4.74146px rgba(0, 0, 0, 0.05), 0px 4.74146px 7.58634px rgba(0, 0, 0, 0.05)",
    },
    [theme.breakpoints.down(650)]: {
        children: {
            padding: "0px 20px 10px 20px",
        },
    },
});

const StyledModal: React.FC<StyledModalProps> = ({ isOpen, onClose, title, children }) => {
    const classes = useClasses(useStyles, { name: "CustomModalStyles" }) as StyleClasses;

    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <Dialog classes={{ paperScrollPaper: classes.paperScrollPaper }} open={isOpen} onClose={onClose}>
            <DialogTitle>
                <div className={classes.topWrapper}>
                    <IconButton className={classes.closeButton} onClick={onClose}>
                        <Close />
                    </IconButton>
                    <div className={classes.modalTitle}>{languageData && (languageData[title as keyof LanguageDataTypes] as string)?.toLocaleUpperCase()}</div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className={classes.children}>{children}</div>
            </DialogContent>
        </Dialog>
    );
};

export default StyledModal;
