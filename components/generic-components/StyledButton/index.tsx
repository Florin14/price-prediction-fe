import { styled, Theme } from "@mui/material/styles";
import Button from "@mui/material/Button";

interface StyledButtonProps {
    theme?: Theme;
}

const StyledButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
    fontStyle: "normal",
    height: 35,
    boxShadow: "none",
    textTransform: "none",
    fontSize: 12,
    fontWeight: 500,
    padding: "10.5px auto",
    lineHeight: "14px",
    width: "100%",
    "&:hover": {
        boxShadow: "none",
    },
    "&:active": {
        boxShadow: "none",
    },
    "&:focus": {
        boxShadow: "none",
    },
    "&:disabled": {
        background: "#E3E3E4",
        color: "#BEC2C7",
    },
}));

export default StyledButton;
