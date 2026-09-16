import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingOverlay from "@/components/layout/LoadingOverlay";
import { RootState } from "@/store";
import { websiteActions } from "@/store/slices/website/website-slice";
import adminRoutes from "@/utils/admin-routes";
import customerRoutes from "@/utils/customer-routes";
import guestRoutes from "@/utils/guest-routes";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [cookies] = useCookies(["name", "role"]);
    const router = useRouter();
    const loading = useSelector((s: any) => s.loading.loading);
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const theme = useSelector((s: RootState) => s.website.theme);
    const dispatch = useDispatch();

    const role = cookies?.role;
    const routes =
        role === languageData?.Roles?.ADMIN
            ? adminRoutes
            : role === languageData?.Roles?.CLIENT
            ? customerRoutes
            : guestRoutes;

    const handleToggleTheme = () => {
        dispatch(websiteActions.changeTheme());
    };

    const isLanding = router.pathname === "/home" || router.pathname === "/";

    return (
        <LoadingOverlay active={loading}>
            <div className="flex min-h-full flex-col bg-background text-foreground">
                <Navbar routes={routes} onToggleTheme={handleToggleTheme} isDarkMode={theme === "dark"} />
                <main id="main-content" className="flex-1">
                    {children}
                </main>
                {isLanding && <Footer />}
            </div>
        </LoadingOverlay>
    );
};

export default DashboardLayout;
