import { Theme } from "@mui/material/styles";
import cssVariables from "../../assets/css/variables";

export interface NaturalPersonStylesProps {
    wrapper: any;
    rightSideWrapper: any;
    buttonsWrapper: any;
    button: any;
    container: any;
}

const NaturalPersonStyles = (theme: Theme): NaturalPersonStylesProps => ({
    container: {
        position: "relative",
    },
    wrapper: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "calc(65% - 15px) 35%",
        gap: "15px",
    },
    rightSideWrapper: {
        display: "grid",
        gridTemplateRows: "calc(100% - 56px) 40px",
        gap: "16px",
    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "row",
        gap: cssVariables.smallMargin,
    },
    button: {
        height: "40px",
    },
    [theme.breakpoints.down(900)]: {
        wrapper: {
            gridTemplateColumns: "100%",
            gridTemplateRows: "auto",
        },
    },
    [theme.breakpoints.down(525)]: {
        buttonsWrapper: {
            position: "sticky",
            bottom: 0,
        },
    },
});

export default NaturalPersonStyles;
