import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

import Sidebar from "../components/generic-components/Sidebar/Sidebar";
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cookies] = useCookies(["name", "role"]);
    const loading = useSelector((state: any) => state.loading.loading);
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getRoleRoutes = (role: string | undefined) => {
        switch (role) {
            case languageData?.Roles.ADMIN:
                return adminRoutes;
            case languageData?.Roles.CUSTOMER:
                return customerRoutes;
            default:
                return guestRoutes; //asta trebuie modificata in guestRoutes in momentul in care se adauga rolurile pe backend!!!!
        }
    };

    return (
        <LoadingOverlay active={loading}>
            <div className={classes.wrapper}>
                <Sidebar routes={getRoleRoutes(cookies?.role)} handleDrawerToggle={handleDrawerToggle} open={mobileOpen} />
                <div className={classes.mainPanel}>
                    <Navbar handleDrawerToggle={handleDrawerToggle} />
                    <div className={classes.content} id="root">
                        {children}
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    );
};

export default DashboardLayout;
