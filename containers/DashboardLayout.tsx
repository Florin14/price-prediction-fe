import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

import Navbar from "../components/generic-components/Navbar/Navbar";
import { RootState } from "../store";

import adminRoutes from "../utils/admin-routes";
import customerRoutes from "../utils/customer-routes";
import guestRoutes from "../utils/guest-routes";
import LoadingOverlay from "./LoadingOverlay";
import useClasses from "../utils/useClasses";

import appStyle from "../assets/css/dashboard_style";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const classes = useClasses(appStyle, { name: "DashboardStyles" });
    const [cookies] = useCookies(["name", "role"]);
    const loading = useSelector((state: any) => state.loading.loading);
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const getRoleRoutes = (role: string | undefined) => {
        switch (role) {
            case languageData?.Roles.ADMIN:
                return adminRoutes;
            case languageData?.Roles.CLIENT:
                return customerRoutes;
            default:
                return guestRoutes;
        }
    };

    return (
        <LoadingOverlay active={loading}>
            <div className={classes.wrapper}>
                <div className={classes.mainPanel}>
                    <Navbar routes={getRoleRoutes(cookies?.role)} />
                    <div className={classes.content} id="root">
                        {children}
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    );
};

export default DashboardLayout;
