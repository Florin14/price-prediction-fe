import { styled, Theme } from "@mui/material/styles";
import Button from "@mui/material/Button";

interface StyledButtonProps {
    theme?: Theme;
}

const StyledButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
    fontStyle: "normal",
    height: 44,
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 24px",
    lineHeight: "20px",
    width: "auto",
    borderRadius: 10,
    letterSpacing: "0.01em",
    transition: "all 0.2s ease",
    "&:hover": {
        boxShadow: "none",
        transform: "translateY(-1px)",
    },
    "&:active": {
        boxShadow: "none",
        transform: "translateY(0)",
    },
    "&:focus": {
        boxShadow: "none",
    },
    "&:disabled": {
        background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "#F1F5F9",
        color: theme.palette.text.disabled,
    },
}));

export default StyledButton;
