import { Theme } from "@mui/material/styles";
import cssVariables from "../../assets/css/variables";

export interface LegalEntityStylesProps {
    wrapper: any;
    rightSideWrapper: any;
    buttonsWrapper: any;
    button: any;
}

const LegalEntityStyles = (theme: Theme): LegalEntityStylesProps => ({
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
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "10px",
            backgroundColor: "#fff",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            marginTop: "auto",
        },
    },
});

export default LegalEntityStyles;
