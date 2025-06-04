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
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: theme.shadows[3],
    transition: theme.transitions.create("box-shadow"),

    "&:hover": {
        boxShadow: theme.shadows[6],
    },

    "& h3": {
        marginBottom: theme.spacing(3),
        color: theme.palette.text.primary,
        fontSize: "1.5rem",
        fontWeight: theme.typography.fontWeightBold,
        position: "relative",
        paddingBottom: theme.spacing(1),

        "&:after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 60,
            height: 3,
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius,
        },
    },

    "& .validation-errors": {
        marginTop: theme.spacing(2),
        "& .error-message": {
            color: theme.palette.error.main,
            fontSize: theme.typography.body2.fontSize,
            marginBottom: theme.spacing(1),
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
            "&:before": {
                content: '"•"',
                color: theme.palette.error.main,
            },
        },
    },

    "& .form-actions": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: theme.spacing(4),
        gap: theme.spacing(2),
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
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: theme.shadows[8],
    padding: theme.spacing(4),
    transition: theme.transitions.create(["box-shadow", "transform"], {
        duration: theme.transitions.duration.standard,
    }),

    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: theme.shadows[16],
    },

    "& .prediction-header": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(3),

        "& h3": {
            margin: 0,
            fontSize: "1.8rem",
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightBold,
        },

        "& .confidence": {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.dark,
            padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
            borderRadius: theme.shape.borderRadius * 2,
            fontSize: theme.typography.subtitle1.fontSize,
            fontWeight: theme.typography.fontWeightMedium,
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),

            "& svg": {
                fontSize: "1.2rem",
            },
        },
    },

    "& .predicted-price": {
        fontSize: "3.5rem",
        fontWeight: theme.typography.fontWeightBold,
        // color: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: "text",
        color: "blue",
        // WebkitTextFillColor: "transparent",
        textAlign: "center",
        margin: `20px 0`,
        // animation: "pulse 2s infinite, fadeIn 0.5s ease-in",
        textShadow: "0 2px 4px rgba(0,0,0,0.1)",

        // "@keyframes pulse": {
        //     "0%": {
        //         transform: "scale(1)",
        //     },
        //     "50%": {
        //         transform: "scale(1.02)",
        //     },
        //     "100%": {
        //         transform: "scale(1)",
        //     },
        // },

        // "@keyframes fadeIn": {
        //     "0%": {
        //         opacity: 0,
        //         transform: "translateY(20px)",
        //     },
        //     "100%": {
        //         opacity: 1,
        //         transform: "translateY(0)",
        //     },
        // },
    },

    "& .factors-grid": {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: theme.spacing(2),
        margin: `${theme.spacing(4)} 0`,
    },

    "& .factor-card": {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create("transform"),

        "&:hover": {
            transform: "translateY(-2px)",
        },

        "& h4": {
            margin: 0,
            marginBottom: theme.spacing(1),
            color: theme.palette.text.primary,
        },

        "& .impact": {
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
            color: theme.palette.text.secondary,
            fontSize: "0.875rem",

            "& .impact-bar": {
                flex: 1,
                height: 4,
                backgroundColor: theme.palette.grey[200],
                borderRadius: theme.shape.borderRadius,
                overflow: "hidden",

                "& .impact-value": {
                    height: "100%",
                    backgroundColor: theme.palette.primary.main,
                    transition: "width 1s ease-out",
                },
            },
        },
    },

    "& .result-actions": {
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(2),
        marginTop: theme.spacing(4),
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
