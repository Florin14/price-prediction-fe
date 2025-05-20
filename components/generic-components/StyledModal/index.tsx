import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Theme } from "@mui/material/styles";

import cssVariables from "../../../assets/css/variables";
import useClasses from "../../../utils/useClasses";
import { LanguageDataTypes } from "../../../assets/language/ro";

import { RootState } from "../../../store";

interface ClassNames {
    modalTitle: any;
    modalSubtitle: any;
    closeButton: any;
    children: any;
    topWrapper: any;
    paperScrollPaper: any;
    icon: any;
    iconButton: any;
    [key: string]: any;
}

const useStyles = (theme: Theme) => ({
    modalTitle: {
        color: "#404040",
        textAlign: "left",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        lineHeight: "22px",
        letterSpacing: "0.01em",
        marginRight: 15,
    },
    modalSubtitle: {
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: 400,
        color: "#6B7280",
    },
    closeButton: {
        position: "absolute",
        top: "5px",
        right: "5px",
        color: "#6B7280",
    },
    children: {
        padding: "0px 10px",
        width: "100%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    topWrapper: {
        paddingTop: "50px",
        backgroundColor: "#fff",
    },
    paperScrollPaper: {
        boxShadow: "0px 2.84488px 4.74146px rgba(0, 0, 0, 0.05), 0px 4.74146px 7.58634px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        minWidth: 300,
        maxWidth: "calc(100% - 60px)",
    },
    icon: { position: "absolute", top: 15, left: 24 },
    iconButton: {
        border: "1px solid #E2E8F0",
        borderRadius: cssVariables.smallMargin,
        width: "48px !important",
        height: "48px !important",
    },
    [theme.breakpoints.down(500)]: {
        children: {
            padding: "0px 20px 20px 20px",
        },
    },
});

interface StyledModalProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    childrenClass?: string;
    noTitle?: boolean;
    noClose?: boolean;
    paperClassName?: string;
    topWrapperTitleClassname?: string;
    topWrapperClass?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    contentClassName?: string;
}

const StyledModal: React.FC<StyledModalProps> = ({
    id,
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    icon,
    childrenClass,
    noTitle = true,
    noClose = true,
    paperClassName,
    topWrapperTitleClassname,
    topWrapperClass,
    titleClassName,
    subtitleClassName,
    contentClassName,
}) => {
    const classes = useClasses(useStyles, { name: "CustomModalStyles" }) as ClassNames;

    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <Dialog
            id={id}
            classes={{ paperScrollPaper: classNames(classes.paperScrollPaper, paperClassName) }}
            open={isOpen}
            onClose={noClose ? onClose : undefined}
        >
            {icon && (
                <div className={classes.icon}>
                    <IconButton className={classes.iconButton}>{icon}</IconButton>
                </div>
            )}
            <DialogTitle className={classNames(topWrapperTitleClassname)}>
                <div className={classNames({ [classes.topWrapper]: !noTitle }, topWrapperClass)}>
                    {!noClose && (
                        <IconButton className={classes.closeButton} onClick={onClose}>
                            <Close />
                        </IconButton>
                    )}
                    <div className={classNames(classes.modalTitle, titleClassName)}>
                        {languageData && title && (languageData[title as keyof LanguageDataTypes] as string)}
                    </div>
                    <div className={classNames(classes.modalSubtitle, subtitleClassName)}>
                        {languageData && subtitle && (languageData[subtitle as keyof LanguageDataTypes] as string)}
                    </div>
                </div>
            </DialogTitle>
            <DialogContent className={contentClassName}>
                <div className={classNames(classes.children, childrenClass)}>{children}</div>
            </DialogContent>
        </Dialog>
    );
};

export default StyledModal;
