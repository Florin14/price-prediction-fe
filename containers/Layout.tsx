import React from "react";
import { useSelector } from "react-redux";

import LoadingOverlay from "./LoadingOverlay";
import useClasses from "../utils/useClasses";

interface LayoutProps {
    children: React.ReactNode;
}

interface LayoutStyle {
    main: any;
    loading: any;
}

const useStyles = (_theme: any): LayoutStyle => ({
    main: {
        width: "100%",
        height: "100%",
    },
    loading: {
        boxShadow: "none",
        background: "transparent",
        overflow: "hidden",
    },
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const classes = useClasses(useStyles, { name: "layoutStyles" }) as LayoutStyle;
    const loading = useSelector((state: any) => state.loading.loading);

    return (
        <LoadingOverlay active={loading}>
            <main className={classes.main}>{children}</main>
        </LoadingOverlay>
    );
};

export default Layout;
