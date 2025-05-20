import React from "react";
import Loading from "react-loading-overlay-ts";

interface LoadingOverlayProps {
    active: boolean;
    children: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ active, children }) => {
    return (
        <Loading
            fadeSpeed={0}
            active={active}
            spinner
            text={"Loading..."}
            styles={{
                overlay: (base) => ({
                    ...base,
                    background: "rgba(0, 0, 0, 0.3)",
                    zIndex: 1500,
                }),
            }}
        >
            {children}
        </Loading>
    );
};

export default LoadingOverlay;
