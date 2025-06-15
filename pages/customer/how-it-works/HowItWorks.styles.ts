import { styled } from "@mui/material/styles";

// Reuse the same styled containers you already have
export const HowItWorksContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),

  "& h1": {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },

  "& section": {
    "& h3": {
      marginBottom: theme.spacing(1),
    },
    "& p": {
      margin: 0,
      lineHeight: 1.6,
    },
    "& ul": {
      listStyle: "disc",
      paddingLeft: theme.spacing(4),
      margin: `${theme.spacing(1)} 0`,
    },
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