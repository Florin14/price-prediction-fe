import React from "react";
import { useSelector } from "react-redux";
import { Theme } from "@mui/material/styles";

import DashboardLayout from "../containers/DashboardLayout";
import NotFoundIcon from "../components/icons/NotFoundIcon";
import useClasses from "../utils/useClasses";

import { RootState } from "../store";

// Interface for the class names
interface Custom404Style {
    center: any;
}

const useStyles = (theme: Theme): Custom404Style => ({
    center: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "-50px",

        "& h1": {
            margin: "0",
            marginTop: "-30px",
            fontSize: "106px",
            lineHeight: "130px",
            fontFamily: "Inter",
            fontWeight: "700",
            color: "#0F3656",
        },

        "& h6": {
            margin: "0",
            fontSize: "12px",
            lineHeight: "15px",
            fontFamily: "Inter",
            fontWeight: "700",
            color: "#0F3656",
        },
    },
});

const Custom404: React.FC = () => {
    const classes = useClasses(useStyles, { name: "custom404Styles" }) as Custom404Style;
    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <DashboardLayout>
            <div className={classes.center}>
                <NotFoundIcon />
                <h1>404</h1>
                <h6>{languageData?.PageNotFound.toLowerCase()}</h6>
            </div>
        </DashboardLayout>
    );
};

export default Custom404;
