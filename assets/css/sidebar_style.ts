import { Theme } from "@mui/material/styles";
import { drawerWidth, transition, defaultFont, whiteColor, blackColor } from "./material-dashboard-react";
import cssVariables from "./variables";

export interface SidebarStyle {
    drawerPaper: any;
    list: any;
    item: any;
    itemLink: any;
    itemIcon: any;
    itemText: any;
    whiteFont: any;
    sidebarWrapper: any;
    activeRoute: any;
    countyWrapper: any;
    city: any;
    county: any;
    section: any;
    [key: string]: any; // For dynamic class names based on breakpoints
}

const sidebarStyle = (theme: Theme): SidebarStyle => ({
    drawerPaper: {
        overflowX: "hidden",
        border: "none",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: 0,
        zIndex: "1",
        boxShadow: "none",
        width: "192px", // Ensure consistent Sidebar width
        backgroundColor: theme.palette.primary.main, // Updated to match the dark background
    },
    countyWrapper: {
        width: "100%", // Adjusted width for better alignment
        height: "auto",
        margin: "15px auto", // Centered logo
        marginBottom: "35px",
        display: "block",
    },
    city: {
        fontWeight: 900,
        fontSize: "20px",
        lineHeight: "26px",
        textAlign: "center",
        color: "#ffffff", // White text
    },
    county: {
        fontWeight: 700,
        fontSize: 16,
        lineHeight: "26px",
        textAlign: "center",
        color: "#ffffff", // White text
    },
    list: {
        marginTop: "0",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0",
        listStyle: "none",
        position: "unset",
        height: `calc(100% - 120px)`, // Adjusted height to account for logo and footer
        overflow: "auto",
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        margin: "0 7px",
        marginBottom: 10,
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        position: "relative",
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: "12px",
        color: theme.palette.mode === "dark" ? "#ffffff" : theme.palette.text.primary,
        padding: "6px 7px",
        "&:hover,&:focus": {
            backgroundColor: theme.palette.mode === "dark" ? "rgba(16, 152, 247, 0.2)" : theme.palette.action.hover,
            borderRadius: "8px",
        },
    },
    itemIcon: {
        fontSize: theme.typography.pxToRem(20),
        width: 20,
        marginRight: cssVariables.smallestMargin, // Spacing between icon and text
        color: "inherit", // This will inherit from itemLink
        display: "flex",
        alignItems: "center",
        "& svg": {
            width: "100%",
            height: "100%",
            stroke: "currentColor",
            strokeWidth: 2,
        },
    },
    section: {
        fontSize: "12px",
        fontWeight: 700,
        color: "rgba(255, 255, 255, 0.5)", // White text
        marginLeft: "10px",
        padding: "10px 10px 5px 10px",
    },
    itemText: {
        ...defaultFont,
        margin: "0",
        fontSize: "13px", // Updated font size
        fontWeight: 400, // Updated font weight
        color: "#ffffff", // White text
    },
    whiteFont: {
        color: "inherit",
        "& path": {
            fill: "currentColor",
        },
        "& svg": {
            color: "inherit",
        },
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100% - 50px)",
        overflow: "auto",
        width: "192px", // Match the Sidebar width
        zIndex: "4",
        overflowScrolling: "touch",
    },
    activeRoute: {
        backgroundColor: "#1098F7", // Hover effect
        borderRadius: "8px",
    },
    [theme.breakpoints.down(960)]: {
        drawerPaper: {
            left: 0,
        },
    },
    [theme.breakpoints.up(960)]: {
        drawerPaper: {
            width: "192px", // Ensure consistent Sidebar width for larger screens
            position: "fixed",
            height: "100%",
        },
    },
    [theme.breakpoints.down(600)]: {
        drawerPaper: {
            width: "192px", // Ensure consistent Sidebar width for smaller screens
            boxShadow: "none",
            position: "fixed",
            // display: "block",
            top: "0",
            height: "100%",
            right: "0",
            left: "0",
            zIndex: "1032",
            visibility: "visible",
            overflowY: "visible",
            borderTop: "none",
            textAlign: "left",
            paddingRight: "0px",
            paddingLeft: "0",
            transform: `translate3d(${drawerWidth}px, 0, 0)`,
            ...transition,
        },
    },
});

export default sidebarStyle;
