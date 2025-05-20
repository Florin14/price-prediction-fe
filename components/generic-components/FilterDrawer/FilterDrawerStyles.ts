// customDrawerStyles.ts
import { Theme } from "@mui/material/styles";
import cssVariables from "../../../assets/css/variables";

interface FilterDrawerStylesParams {
    anchor: "left" | "right";
    drawerWidth: number;
    zIndex: number;
}

export interface FilterDrawerStylesModel {
    customDrawer: any;
    open: any;
    header: any;
    closeButton: any;
    content: any;
    backdropWrapper: any;
    divider: any;
    formContainer: any;
    scrollableContent: any;
    sectionContainer: any;
    actionButtons: any;
    clearFiltersContainer: any;
    clearFiltersButton: any;
    clearFiltersText: any;
}

const filterDrawerStyles = (theme: Theme, params: FilterDrawerStylesParams) => ({
    customDrawer: {
        position: "absolute",
        top: 0,
        [params.anchor]: -params.drawerWidth,
        minHeight: "calc(100% -  2px)",
        width: params.drawerWidth,
        backgroundColor: "#fff",
        transition: params.anchor === "left" ? "left 0.3s ease-in-out, visibility 0s linear 0.3s" : "right 0.3s ease-in-out, visibility 0s linear 0.3s",
        zIndex: params.zIndex + 1,
        margin: 1,
        visibility: "hidden",
        borderRadius: 5,
        boxShadow: "0px 2.84488px 4.74146px rgba(0, 0, 0, 0.05), 0px 4.74146px 7.58634px rgba(0, 0, 0, 0.05)",
        display: "grid",
        gridTemplateRows: "auto 1px 1fr",
        opacity: 0,
        transform: params.anchor === "left" ? "translateX(-10px)" : "translateX(10px)",
        minWidth: 285
    },
    open: {
        [params.anchor]: 0,
        visibility: "visible",
        transition:
            params.anchor === "left"
                ? "left 0.3s ease-in-out, transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0s"
                : "right 0.3s ease-in-out, transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0s",
        opacity: 1,
        transform: "translateX(0)",
        overflow: "auto",
        height: "100%",
    },
    header: {
        width: "100%",
        padding: "10px 20px 10px 20px ",
        color: "#000", // Corrected textColor to color
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "17px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5px 5px 0 0",
    },
    closeButton: {
        color: "#6B7280",
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        width: 32,
        height: 32,
    },
    content: {
        backgroundColor: "#fff",
        borderRadius: "0 0 5px 5px",
        overflow: "auto",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
    },
    scrollableContent: {
        overflow: "auto",
        padding: "10px 0",
        flex: 1,
    },
    sectionContainer: {
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    clearFiltersContainer: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 20px",
    },
    clearFiltersButton: {
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        justifyContent: "center",
        borderRadius: "4px",
        background: "#fff",
        boxShadow: "none",
        "&:hover": {
            background: "#f5f5f5",
            boxShadow: "none",
        },
    },
    clearFiltersText: {
        color: "#6B7280",
        marginLeft: "4px",
        fontSize: "12px",
        fontWeight: 500,
    },
    actionButtons: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "16px 20px",
        backgroundColor: "#fff",
    },
    [theme.breakpoints.down(600)]: {
        customDrawer: {
            width: "100%",
        },
    },
    backdropWrapper: {
        zIndex: params.zIndex,
    },
    divider: {
        margin: `0px ${cssVariables.defaultMargin}`,
    },
});

export default filterDrawerStyles;
