import cssVariables from "../../../../assets/css/variables";

export interface LegalPersonPropStyle {
    formContainer?: any;
    inputField?: any;
    requiredMark?: any;
    fieldLabel?: any;
    confirmed?: any;
    unconfirmed?: any;
    forgotPassword?: any;
    button?: any;
    uploadButton?: any;
}

const LegalPersonStyles = (_theme: any): LegalPersonPropStyle => ({
    formContainer: {
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        [_theme.breakpoints.down(365)]: {
            margin: "5px auto",
        },
    },
    requiredMark: {
        color: "red",
    },
    fieldLabel: {
        fontSize: "12px !important",
        fontWeight: "400 !important",
        color: "#21272A !important",
        marginBottom: "8px",
        fontFamily: "'Inter', sans-serif",
    },
    confirmed: {
        color: "#34C759 !important",
        fontSize: 12,
        fontWeight: 500,
        fontStyle: "normal",
    },
    unconfirmed: {
        color: "#637381 !important",
        fontSize: 12,
        fontWeight: 500,
        fontStyle: "normal",
    },
    forgotPassword: {
        textAlign: "right",
        color: "#001D6C",
        width: "100%",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "120%",
    },

    button: {
        height: 40,
    },
    uploadButton: {
        maxWidth: "250px",
    },
});

export default LegalPersonStyles;
