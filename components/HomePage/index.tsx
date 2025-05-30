import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Typography, Divider } from "@mui/material";

import { RootState } from "../../store";

import LegalEntitiesIcon from "../icons/LegalEntitiesIcon";
import NaturalPersonsIcon from "../icons/NaturalPersonsIcon";
import StyledButton from "../generic-components/StyledButton";

import cssVariables from "../../assets/css/variables";
import useClasses from "../../utils/useClasses";

interface StyleClasses {
    container: any;
    leftSection: any;
    rightSection: any;
    form: any;
    buttonsWrapper: any;
    legalEntitiesButton: any;
    naturalPersonsButton: any;
    formCard: any;
    button: any;
    title: any;
    subtitle: any;
    text: any;
    titlesSection: any;
    [key: string]: any;
}

const useStyles = (theme: any): StyleClasses => ({
    container: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "#F9FAFB",
        display: "flex",
        justifyContent: "center",
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "80%",
        position: "relative",
        justifyContent: "center",
    },
    leftSection: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0px",
        paddingLeft: 60,
        width: "100%",
    },
    formCard: {
        textAlign: "left",
        width: "100%",
        padding: "0 60px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: cssVariables.smallMargin,
        maxWidth: 500,
    },
    rightSection: {
        flex: 1,
        paddingRight: 60,
        width: "100%",
    },
    rightImage: {
        width: "100%",
        height: "100%",
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    titlesSection: {
        textAlign: "left",
        width: "100%",
        padding: "0 60px",
    },
    title: {
        fontSize: "33px",
        fontWeight: 700,
        lineHeight: "45px",
        color: "#21272A",
    },
    text: {
        width: "calc(100% - 50px)",
        color: "#697077",
    },
    subtitle: {
        fontSize: "33px",
        fontWeight: 700,
        lineHeight: "100%",
        color: "#5FBAFA",
        marginBottom: "38px",
    },
    buttonsWrapper: {
        display: "flex",
        gap: 17,
        paddingTop: 38,
    },
    button: {
        height: 40,
    },
    legalEntitiesButton: {
        height: 175,
        width: 243,
        display: "grid",
        alignContent: "center",
    },
    naturalPersonsButton: {
        height: 175,
        width: 243,
        display: "grid",
        alignContent: "center",
    },
    createAccountButton: {
        height: 40,
        backgroundColor: "white",
    },
    [theme.breakpoints.down(1200)]: {
        legalEntitiesButton: {
            width: "auto",
        },
        naturalPersonsButton: {
            width: "auto",
        },
        buttonsWrapper: {
            display: "grid",
            gridTemplateColumns: "50% 50%",
        },
        wrapper: {
            width: "90%",
        },
        leftSection: {
            padding: "0 30px",
        },
        rightSection: {
            paddingRight: 30,
        },
        titlesSection: {
            padding: "0 30px",
        },
        formCard: {
            padding: "0 30px",
        },
    },

    [theme.breakpoints.down(815)]: {
        leftSection: {
            padding: "0 25px",
            paddingTop: cssVariables.defaultMargin,
            paddingBottom: cssVariables.defaultMargin,
        },
        titlesSection: {
            padding: "0px",
            paddingTop: cssVariables.defaultMargin,
        },
        form: {
            maxWidth: "100%",
        },
        formCard: {
            padding: "0px",
        },
        wrapper: {
            flexDirection: "column-reverse",
            display: "flex",
        },
        subtitle: {
            marginBottom: cssVariables.defaultMargin,
        },
    },
    [theme.breakpoints.down(600)]: {
        container: {
            flexDirection: "column",
            alignItems: "center",
        },
        text: {
            width: "100%",
        },
        wrapper: {
            display: "grid",
            gridTemplateRows: "100% 0%",
        },
        rightSection: {
            width: "100%",
            height: "auto",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            marginBottom: "20px",
        },
        titlesSection: {
            width: "100%",
        },
        leftSection: {
            width: "100%",
            padding: "0 10px",
            textAlign: "center",
            paddingBottom: cssVariables.defaultMargin,
        },
        rightImage: {
            display: "none",
        },
    },
});

const HomePage: React.FC = () => {
    const router = useRouter();

    const languageData = useSelector((state: RootState) => state.website.languageData);

    const classes = useClasses(useStyles, { name: "HomePageStyles" }) as StyleClasses;

    return (
        <div className={classes.container} data-testid="home-page-container">
            <div className={classes.wrapper}>
                <div className={classes.leftSection} data-testid="home-page-left-section">
                    <div className={classes.titlesSection} data-testid="home-page-titles-section">
                        <Typography className={classes.title} data-testid="home-page-title">
                            {languageData?.PredictRealEstatePrices || "Predict Real Estate Prices"}
                        </Typography>
                        <Typography className={classes.text}>{languageData?.HomePageMessage}</Typography>
                        <br></br>
                        <Typography className={classes.text}>{languageData?.RegisterToPlatform}</Typography>
                    </div>
                    <div className={classes.formCard} data-testid="home-page-card">
                        <div className={classes.form}>
                            <div className={classes.buttonsWrapper}>
                                <StyledButton
                                    variant="contained"
                                    onClick={() => {}}
                                    className={classes.naturalPersonsButton}
                                    data-testid="home-page-submit-button"
                                >
                                    <NaturalPersonsIcon />
                                    <div style={{ paddingBottom: 12 }}>{languageData?.NaturalPeople || "Persoane fizice"}</div>
                                </StyledButton>
                                <StyledButton
                                    variant="contained"
                                    onClick={() => {}}
                                    className={classes.legalEntitiesButton}
                                    data-testid="home-page-submit-button"
                                >
                                    <LegalEntitiesIcon />
                                    <div style={{ paddingTop: 15 }}>{languageData?.LegalPeople || "Persoane juridice"}</div>
                                </StyledButton>
                            </div>
                            <Divider style={{ margin: "35px 0", borderColor: "#DDE1E6" }} data-testid="home-page-divider" />
                            <StyledButton
                                variant="contained"
                                onClick={() => {
                                    router.push("/login").then((r) => {});
                                }}
                                fullWidth
                                className={classes.button}
                                data-testid="home-page-submit-button"
                            >
                                {languageData?.ToLogin || "Autentifica-te"}
                            </StyledButton>
                            <StyledButton
                                variant="outlined"
                                fullWidth
                                onClick={() => {
                                    router.push("/register").then((r) => {});
                                }}
                                className={classes.createAccountButton}
                                data-testid="home-page-create-account-button"
                            >
                                {languageData?.CreateAccount || "Creeaza cont"}
                            </StyledButton>
                        </div>
                    </div>
                </div>
                <div className={classes.rightSection} data-testid="home-page-right-section">
                    <div className={classes.rightImage} data-testid="home-page-right-image-section"></div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
