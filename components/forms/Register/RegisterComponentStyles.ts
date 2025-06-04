import cssVariables from "../../../assets/css/variables";

export interface StyleClasses {
    container: any;
    leftSection: any;
    rightSection: any;
    formCard: any;
    title: any;
    subtitle: any;
    titlesSection: any;
    loginMessage: any;
    wrapper: any;
    rightImage: any;
    radioGroup: any;
    radioOption: any;
    personTypeSelector: any;
    radio: any;
    [key: string]: any;
}

export const useStyles = (theme: any): StyleClasses => ({
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
        position: "relative", // <-- pentru poziționare absolută a imaginii
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
    subtitle: {
        fontSize: "33px",
        fontWeight: 700,
        lineHeight: "100%",
        color: "#5FBAFA",
        marginBottom: "38px",
    },
    loginMessage: {
        fontSize: "25px",
        fontWeight: 700,
        lineHeight: "20px",
        color: "#21272A",
        marginBottom: 16,
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "15px",
        width: "100%",
        gap: "16.8px",
    },
    radioOption: {
        border: "1px solid #D4D7E3",
        borderRadius: "8px",
        color: "#667085",
        padding: cssVariables.smallMargin,
        "&.Mui-checked": {
            borderColor: "#1E4AE9",
        },
        width: "calc(50% - 8.4px)",
        backgroundColor: "#FFFFFF",
        [theme.breakpoints.down(475)]: {
            width: "47%",
        },
    },
    personTypeSelector: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: "15px",
    },
    radio: {
        color: "#667085",
        padding: "0px 9px",
        "&.Mui-checked": {
            color: "#00306E",
        },
        "&.Mui-focused": {
            color: undefined, // Prevent color change on focus
        },
    },
    divider: {
        borderBottom: "1px solid #DDE1E6",
        margin: "40px 0",
    },

    [theme.breakpoints.down(1200)]: {
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
            marginTop: "80px",
            padding: "0 30px",
        },
        formCard: {
            padding: "0 30px",
        },
    },

    // [theme.breakpoints.down(900)]: {
    //     leftSection: {
    //         padding: "0 25px",
    //         paddingTop: cssVariables.defaultMargin,
    //     },
    //     titlesSection: {
    //         padding: "0 25px",
    //         paddingTop: cssVariables.defaultMargin,
    //     },
    //     formCard: {
    //         padding: "0 25px",
    //     },
    //     subtitle: {
    //         marginBottom: cssVariables.defaultMargin,
    //     },
    // },
    [theme.breakpoints.down(900)]: {
        container: {
            height: "100%",
            width: "100%",
            backgroundColor: "#F9FAFB",
            display: "flex",
            justifyContent: "center",
        },
        titlesSection: {
            width: "auto",
            textAlign: "center",
            marginBottom: 0, // spațiu între titluri și imagine
            paddingLeft: 0,
            paddingRight: 0,
        },

        rightSection: {
            position: "absolute",
            top: `calc(${cssVariables.defaultMargin} + 5em)`, // sub titlu + mic offset
            left: "50%",
            transform: "translateX(-50%)",
            width: 220, // ajustează după nevoie
            height: 220, // păstrează proporția
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            margin: 0,
            zIndex: 1,
            paddingRight: 0,
        },
        title: {
            fontSize: 20,
        },
        subtitle: {
            fontSize: 20,
        },
        formCard: {
            position: "relative",
            marginTop: 150 + parseInt(cssVariables.defaultMargin), // înălțime imagine + spațiu
            width: "100%",
            marginInline: "auto",
            padding: 0,
        },

        loginMessage: {
            textAlign: "center",
        },
    },
});
