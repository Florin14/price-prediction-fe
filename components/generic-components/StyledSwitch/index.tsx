import React from "react";
import classNames from "classnames";
import { Switch, Typography } from "@mui/material";
import useClasses from "../../../utils/useClasses";
import { Theme } from "@mui/material/styles";

interface ClassNames {
    disabled: string;
    label: string;
    rotate: string;
    switchContainer: string;
    [key: string]: string;
}

const styles = (theme: Theme) => ({
    disabled: {
        opacity: "50%",
    },
    label: {
        color: theme.palette.grey["800"],
        height: "fit-content",
    },
    rotate: {
        transform: "rotateY(180deg)",
    },
    switchContainer: {
        display: "flex",
        height: "fit-content",
        width: "fit-content",
        alignItems: "center",

        "& input": {
            left: "0",
            width: "100%",
        },
        "& .Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#2196F3 !important",
        },
        "& .Mui-checked": {
            color: "#2196F3 !important",
        },
    },
});

interface StyledSwitchProps {
    disabled?: boolean;
    labelLeft?: string;
    labelRight?: string;
    checked?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    className?: string;
    switchedColorClass?: string;
    labelClassName?: string;
    switchBaseClassName?: string;
    rootClassName?: string;
    [key: string]: any;
}

const StyledSwitch: React.FC<StyledSwitchProps> = ({
    disabled,
    labelLeft,
    labelRight,
    checked,
    onChange,
    className,
    switchedColorClass,
    labelClassName,
    switchBaseClassName,
    rootClassName,
    ...rest
}) => {
    const classes = useClasses(styles, { name: "StyledSwitchStyles" }) as ClassNames;

    return (
        <div className={classNames(classes.switchContainer, { [className!]: className !== undefined })}>
            <Typography variant="body1" className={classNames(classes.label, { [classes.disabled]: disabled }, labelClassName)}>
                {labelLeft}
            </Typography>
            <Switch
                classes={{
                    switchBase: switchBaseClassName,
                    root: rootClassName,
                }}
                className={classNames(classes.rotate, switchedColorClass)}
                disabled={disabled}
                checked={checked !== undefined ? checked : true}
                onChange={onChange}
                {...rest}
            />
            <Typography variant="body1" className={classNames(classes.label, { [classes.disabled]: disabled }, labelClassName)}>
                {labelRight}
            </Typography>
        </div>
    );
};

export default StyledSwitch;
