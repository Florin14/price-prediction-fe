import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

import { Theme } from "@mui/material/styles";
import { useTheme, useMediaQuery } from "@mui/material";
import { Box, Typography } from "@mui/material";

import { RootState } from "../store";

import StyledButton from "../components/generic-components/StyledButton";
import useClasses from "../utils/useClasses";

// Interface for the class names
interface WaitingValidationStyle {
    container: any;
    contentBox: any;
    imageContainer: any;
    title: any;
    message: any;
    buttonContainer: any;
}

const useStyles = (theme: Theme): WaitingValidationStyle => ({
    container: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    contentBox: {
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    },
    imageContainer: {
        marginBottom: "10px",
    },
    title: {
        fontWeight: 700,
        fontSize: 18,
        color: "#313A47",
        marginBottom: "13px",
    },
    message: {
        fontWeight: 500,
        fontSize: 12,
        color: "#667085",
        marginBottom: "40px",
        maxWidth: "600px",
    },
    buttonContainer: {
        width: "510px",
    },
    [theme.breakpoints.down(680)]: {
        buttonContainer: {
            width: "250px",
        },
    },
});

const WaitingValidation: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(680));
    const classes = useClasses(useStyles, { name: "WaitingValidation_page" }) as WaitingValidationStyle;

    return (
        <Box className={classes.container}>
            <Box className={classes.contentBox}>
                <Box className={classes.imageContainer}>
                    <Image src="/images/waiting-validation.png" alt="Waiting Validation" width={isMobile ? 300 : 433} height={isMobile ? 300 : 368} />
                </Box>
                <Typography className={classes.title}>{languageData?.WaitingValidationTitle}</Typography>
                <Typography className={classes.message}>{languageData?.WaitingValidationMessage}</Typography>
                <Box className={classes.buttonContainer}>
                    <StyledButton id={"back-to-login-button"} color="primary" variant="contained" onClick={() => router.push("/login")}>
                        {languageData?.BackToAuthentication}
                    </StyledButton>
                </Box>
            </Box>
        </Box>
    );
};

export default WaitingValidation;
