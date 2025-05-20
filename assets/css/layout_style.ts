import { container, drawerWidth, transition } from "./material-dashboard-react";

export interface LayoutStyles {
    wrapper: any;
    mainPanel: any;
    content: any;
    container: any;
    map: any;
    loading: any;
    [key: string]: any;
}

const appStyle = (theme: any): LayoutStyles => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100%",
        // maxWidth: "1366px",
        margin: "auto",
        backgroundColor: "#f8f8f8",
    },
    mainPanel: {
        overflow: "auto",
        position: "relative",
        float: "right",
        ...transition,
        height: "100%",
        width: "100%",
        overflowScrolling: "touch",
    },
    content: {
        marginTop: "60px",
        padding: 0,
        height: "calc(100% - 60px)",
        backgroundColor: "#f8f8f8",
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
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
});

export default appStyle;
