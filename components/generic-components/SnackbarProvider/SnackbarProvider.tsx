import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Snackbar } from "@mui/material";
import { Theme } from "@mui/material/styles";

import { snackbarActions } from "../../../store/slices/snackbar/snackbar-slice";

import useClasses from "../../../utils/useClasses";
import { RootState } from "../../../store";

interface SnackbarProviderProps {
    children: ReactNode;
}

interface SnackbarStyles {
    wrapper: any;
}

const snackbarStyles = (theme: Theme): SnackbarStyles => ({
    wrapper: {
        height: "50px !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        left: 0,
        transform: "translateX(15px)",
        bottom: 20,
    },
});

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const classes = useClasses(snackbarStyles, { name: "SnackbarStyles" }) as SnackbarStyles;

    const open = useSelector((state: RootState) => state.snackbar.open);
    const type: any = useSelector((state: RootState) => state.snackbar.type);
    const message = useSelector((state: RootState) => state.snackbar.message);
    const hideDuration = useSelector((state: RootState) => state.snackbar.hideDuration);

    const dispatch = useDispatch();

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(snackbarActions.handleClose());
    };

    return (
        <>
            <Snackbar className={classes.wrapper} open={open} autoHideDuration={hideDuration} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type || "error"}>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </>
    );
};

export default SnackbarProvider;
