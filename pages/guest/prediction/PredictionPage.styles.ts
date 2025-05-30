import { styled } from "@mui/material/styles";

export const PredictionContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),

    "& h1": {
        marginBottom: theme.spacing(2),
    },

    "& .error-message": {
        padding: theme.spacing(2),
        backgroundColor: "rgba(244, 67, 54, 0.1)",
        border: `1px solid ${theme.palette.error.main}`,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.error.main,
        marginBottom: theme.spacing(2),
    },
}));

export const StepIndicator = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),

    "& .step": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "& .step-icon": {
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(1),
            transition: theme.transitions.create("all"),
            border: `2px solid ${theme.palette.text.disabled}`,
        },

        "& .step-label": {
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.text.secondary,
            transition: theme.transitions.create("color", {
                duration: theme.transitions.duration.shortest,
            }),
        },

        "&.active": {
            "& .step-icon": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                borderColor: theme.palette.primary.main,
            },

            "& .step-label": {
                color: theme.palette.primary.main,
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
    },

    "& .connector": {
        flex: 1,
        height: 2,
        backgroundColor: theme.palette.text.disabled,
        margin: `0 ${theme.spacing(2)}`,
        maxWidth: 100,
    },
}));

export const PredictionForm = styled("form")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    animation: "fadeIn 0.5s ease",
}));

export const FormSection = styled("div")(({ theme }) => ({
    padding: theme.spacing(3),

    "& h3": {
        marginBottom: theme.spacing(2),
        color: theme.palette.text.primary,
    },

    "& .form-actions": {
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing(3),
    },
}));

export const FormRow = styled("div")(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

export const PredictionResults = styled("div")(({ theme }) => ({
    animation: "fadeIn 0.5s ease",

    "& h2": {
        marginBottom: theme.spacing(2),
    },
}));

export const ResultCard = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    padding: theme.spacing(3),

    "& .prediction-header": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(2),

        "& h3": {
            margin: 0,
        },

        "& .confidence": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
            borderRadius: theme.shape.borderRadius / 2,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.fontWeightMedium,
        },
    },

    "& .predicted-price": {
        fontSize: "2.5rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
        textAlign: "center",
        margin: `${theme.spacing(3)} 0`,
        animation: "pulse 2s infinite",
    },

    "& .result-actions": {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(3),
    },
}));

export const PriceRange = styled("div")(({ theme }) => ({
    margin: `${theme.spacing(3)} 0`,

    "& .range-label": {
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(1),
    },

    "& .range-bar": {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
    },

    "& .range-min, & .range-max": {
        fontWeight: theme.typography.fontWeightMedium,
    },
}));

export const SimilarProperties = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(3),

    "& h4": {
        marginBottom: theme.spacing(2),
    },

    "& .similar-properties-grid": {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: theme.spacing(2),
    },
}));

export const PropertyCard = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    transition: theme.transitions.create("transform"),

    "&:hover": {
        transform: "translateY(-5px)",
    },

    "& .property-image": {
        height: 150,
        overflow: "hidden",

        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },

    "& .property-address": {
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(0.5),
        padding: theme.spacing(2),
        paddingBottom: 0,
    },

    "& .property-price": {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(0.5),
        padding: `0 ${theme.spacing(2)}`,
    },

    "& .property-distance": {
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.text.secondary,
        padding: `0 ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
    },
}));
