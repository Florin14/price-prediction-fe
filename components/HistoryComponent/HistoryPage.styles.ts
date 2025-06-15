import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

// Container for the whole history page
export const HistoryContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(6), // xl
}));

// Header section
export const HistoryHeader = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4), // lg
    "& h1": {
        marginBottom: theme.spacing(1), // xs
    },
    "& p": {
        color: theme.palette.text.secondary,
    },
}));

// List of prediction history items
export const PredictionHistoryList = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3), // md
}));

// Single prediction history item
export const PredictionHistoryItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius * 2, // lg
    boxShadow: theme.shadows[4], // md
    padding: theme.spacing(4), // lg
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto",
    gap: theme.spacing(3), // md
    transition: `transform ${theme.transitions.duration.shortest}ms`,
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: theme.shadows[8], // lg
    },
    "& .prediction-date": {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.subtitle2.fontSize,
    },
    "& .prediction-price": {
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
        textAlign: "right",
    },
    "& .property-details": {
        fontSize: 14,
        "& .property-base-address": {
          color: theme.palette.primary.main,
          marginBottom: 5,
          fontSize: 16, 
          fontStyle: "italic"
        },
    },

    "& .prediction-confidence": {
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`, // xs, sm
        borderRadius: theme.shape.borderRadius,
        display: "inline-block",
    },
    "& .prediction-range": {
        textAlign: "right",
        color: theme.palette.text.secondary,
    },
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        "& .prediction-price, & .prediction-range": {
            textAlign: "left",
        },
    },
}));

// Empty state for when there are no predictions
export const EmptyState = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(8), // xxl
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius * 2, // lg
    boxShadow: theme.shadows[4], // md
    textAlign: "center",
    "& .empty-icon": {
        fontSize: "4rem",
        marginBottom: theme.spacing(4), // lg
    },
    "& h3": {
        marginBottom: theme.spacing(3), // md
    },
    "& p": {
        color: theme.palette.text.secondary,
    },
}));
