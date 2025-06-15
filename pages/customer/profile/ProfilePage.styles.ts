import { styled } from "@mui/material/styles";

export const ProfileContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    padding: theme.spacing(3),

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

export const ProfileForm = styled("form")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    animation: "fadeIn 0.5s ease",

    "& .form-section": {
        padding: theme.spacing(3),
        borderBottom: `1px solid ${theme.palette.divider}`,

        "&:last-child": {
            borderBottom: "none",
        },

        "& .section-title": {
            marginBottom: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: 600,
        },
    },
}));

export const FormGrid = styled("div")(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: theme.spacing(3),
}));

export const PreferencesContainer = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),

    "& .preference-item": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(["background-color", "box-shadow"]),

        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));
