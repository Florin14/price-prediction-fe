import { transition, container } from "./material-dashboard-react";
import cssVariables from "./variables";

export interface DashboardStyles {
    wrapper: any;
    mainPanel: any;
    content: any;
    container: any;
    map: any;
    loading: any;
    [key: string]: any;
}

const appStyle = (theme: any): DashboardStyles => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100%",
        margin: "auto",
        backgroundColor: theme.palette.grey[300],
        display: "flex", // Ensure flex layout for Sidebar and mainPanel
        flexDirection: "row",
    },
    mainPanel: {
        overflow: "hidden",
        position: "relative",
        float: "right",
        ...transition,
        maxHeight: "100%",
        height: "100%",
        width: `100%`, // Default width for larger screens
        marginLeft: "0", // Remove the margin to eliminate the gap
        overflowScrolling: "touch",
        [theme.breakpoints.down(960)]: {
            width: "100%", // Full width for small screens
            marginLeft: "0", // Ensure no gap on small screens
        },
    },
    content: {
        marginTop: cssVariables.headerHeight,
        height: `calc(100% - ${cssVariables.headerHeight})`,
        padding: 15,
        backgroundColor: theme.palette.grey[100],
        overflowX: "hidden",
    },
    container,
    map: {
        marginTop: "70px",
    },
    loading: {
        height: "100%",
        width: "100vw",
        position: "absolute",
        backgroundColor: "#000000",
        opacity: 0.4,
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    [theme.breakpoints.up(960)]: {
        mainPanel: {
            width: `100%`,
        },
    },
});

export default appStyle;
