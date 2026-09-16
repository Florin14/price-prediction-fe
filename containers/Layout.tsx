import React from "react";
import { useSelector } from "react-redux";

import LoadingOverlay from "@/components/layout/LoadingOverlay";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const loading = useSelector((s: any) => s.loading.loading);

    return (
        <LoadingOverlay active={loading}>
            <main className="h-full w-full bg-background text-foreground">{children}</main>
        </LoadingOverlay>
    );
};

export default Layout;
