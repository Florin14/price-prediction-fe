import { Theme } from "@mui/material/styles";
import cssVariables from "../../../assets/css/variables";

export interface StarterComponentWithTableStyle {
    wrapper: any;
    tableWrapper: any;
    [key: string]: any;
}

const StarterComponentWithTableStyles = (theme: Theme): StarterComponentWithTableStyle => ({
    wrapper: {
        height: "100%",
        display: "grid",
        gridTemplateRows: "55px calc(100% - 75px)",
        gap: cssVariables.defaultMargin,
    },
    tableWrapper: {
        marginTop: cssVariables.defaultMargin,
        marginBottom: cssVariables.defaultMargin,
        height: "calc(100% - 150px)",
    },
    [theme.breakpoints.down(1200)]: {
        tableWrapper: {
            height: "calc(100% - 150px)",
        },
    },
    [theme.breakpoints.down(750)]: {
        wrapper: {
            gridTemplateRows: "130px calc(100% - 150px)",
        },
        tableWrapper: {
            height: "calc(100% - 150px)",
        },
    },
    [theme.breakpoints.down(500)]: {
        wrapper: {
            gridTemplateRows: "270px calc(100% - 250px)",
        },
        tableWrapper: {
            height: "calc(100% - 150px)",
        },
    },
});

export default StarterComponentWithTableStyles;
