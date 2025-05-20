import { Tooltip, TooltipProps } from "@mui/material";

import useClasses from "../../../utils/useClasses";

interface TooltipStyles {
    customTooltip: any;
}

const useStyles = (theme: any): TooltipStyles => ({
    customTooltip: {
        backgroundColor: "black",
        fontSize: 12,
        fontWeight: 400,
        padding: 10,
        width: "100%",
        minWidth: 50,
        maxWidth: 400,
    },
});

interface StyledTooltipProps extends Omit<TooltipProps, "classes"> {
    tooltipClassName?: string;
}

const StyledTooltip: React.FC<StyledTooltipProps> = ({ title, children, placement = "bottom", tooltipClassName }) => {
    const classes = useClasses(useStyles, { name: "styledTooltipStyles" }) as TooltipStyles;

    return (
        <Tooltip
            color="rgba(10, 10, 10, 0.8)"
            title={title}
            classes={{ tooltip: tooltipClassName ? tooltipClassName : classes.customTooltip }}
            placement={placement}
        >
            {children}
        </Tooltip>
    );
};

export default StyledTooltip;
