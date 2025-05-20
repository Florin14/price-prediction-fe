// customDrawerStyles.ts
import { Theme } from "@mui/material/styles";

interface CustomDrawerStylesParams {
    anchor: "left" | "right";
    drawerWidth: number;
    zIndex: number;
}

export interface CustomDrawerStylesModel {
    customDrawer: any;
    open: any;
    header: any;
    closeButton: any;
    content: any;
    backdropWrapper: any;
}

const customDrawerStyles = (theme: Theme, params: CustomDrawerStylesParams) => ({
    customDrawer: {
        position: "absolute",
        top: 0,
        [params.anchor]: -params.drawerWidth,
        minHeight: "calc(100% -  2px)",
        width: params.drawerWidth,
        backgroundColor: "#fff",
        transition: params.anchor === "left" ? "left 0.5s ease, visibility 0.5s ease" : "right 0.5s ease, visibility 0.5s ease",
        zIndex: params.zIndex + 1,
        margin: 1,
        visibility: "hidden",
        borderRadius: 5,
        boxShadow: "0px 2.84488px 4.74146px rgba(0, 0, 0, 0.05), 0px 4.74146px 7.58634px rgba(0, 0, 0, 0.05)",
        display: "grid",
        gridTemplateRows: "auto 1fr",
    },
    open: {
        [params.anchor]: 0,
        visibility: "visible",
        overflow: "auto",
        height: "100%",
    },
    header: {
        width: "100%",
        height: 52,
        padding: "10px 20px 10px 20px ",
        color: "#000", // Corrected textColor to color
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "21px",
        borderBottom: "1px solid rgba(229, 231, 235, 1)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5px 5px 0 0",
    },
    closeButton: {
        color: "rgba(107, 114, 128, 1)",
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
    [theme.breakpoints.down(600)]: {
        customDrawer: {
            width: "100%",
        },
    },
    backdropWrapper: {
        zIndex: params.zIndex,
    },
});

export default customDrawerStyles;
