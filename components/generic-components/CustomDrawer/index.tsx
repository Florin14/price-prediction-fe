import React from "react";
import classNames from "classnames";

import { Close } from "@mui/icons-material";
import { Backdrop, IconButton } from "@mui/material";

import useClasses from "../../../utils/useClasses";
import customDrawerStyles, { CustomDrawerStylesModel } from "./CustomDrawerStyles";

export interface CustomDrawerProps {
    zIndex?: number;
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    onClose?: () => void;
    drawerWidth: string | number;
    title: React.ReactNode;
    anchor?: "left" | "right";
    drawerClassName?: string;
    openDrawerClassName?: string;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
    zIndex = 1101,
    children,
    open,
    setOpen,
    onClose,
    drawerWidth,
    title,
    anchor = "left",
    drawerClassName,
    openDrawerClassName,
}) => {
    const classes = useClasses(customDrawerStyles, { name: "customDrawerStyles", params: { drawerWidth, anchor, zIndex } }) as CustomDrawerStylesModel;

    const closeDrawer = () => {
        setOpen(false);
        if (onClose) onClose();
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
                        <div>{title}</div>
                        <IconButton className={classes.closeButton} onClick={closeDrawer}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className={classes.content}>{children}</div>
                </div>
            </Backdrop>
        </React.Fragment>
    );
};

export default CustomDrawer;
