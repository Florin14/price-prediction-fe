import React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { Theme } from "@mui/material/styles";
import useClasses from "../../../utils/useClasses";

interface StyledRadioButtonProps {
    label?: string;
    options: { value: string | number; label: string }[];
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    row?: boolean;
    labelClassName?: string;
    radioClassName?: string;
    groupClassName?: string;
    disabled?: boolean;
    radioButtonsOnRow?: boolean;
}

const useStyles = (theme: Theme) => ({
    radio: {
        color: "#49454F",
        "&.Mui-checked": {
            color: theme.palette.primary.main,
        },
        "&.Mui-focused": {
            color: undefined, // Prevent color change on focus
        },
    },
    group: {
        display: "flex",
        flexDirection: "column",
    },
    groupRow: {
        display: "flex",
        flexDirection: "row",
    },
    formControlLabel: {
        "& .MuiFormControlLabel-label": {
            color: "#49454F", // Consistent color for labels
            "&.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.38)",
            },
            "&.Mui-focused": {
                color: "#49454F", // Keep color consistent when focused
            },
        },
    },
});

const StyledRadioButton: React.FC<StyledRadioButtonProps> = ({
    label,
    options,
    value,
    onChange,
    row = false,
    labelClassName,
    radioClassName,
    groupClassName,
    radioButtonsOnRow = false,
    disabled = false,
}) => {
    const classes = useClasses(useStyles, { name: "StyledRadioButtonStyles" });

    return (
        <FormControl component="fieldset" className={groupClassName}>
            {label && (
                <FormLabel className={labelClassName || ""} focused={false}>
                    {label}
                </FormLabel>
            )}
            <RadioGroup row={row} value={value} onChange={onChange} className={groupClassName || radioButtonsOnRow ? classes.groupRow : classes.group}>
                {options?.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        className={classes.formControlLabel}
                        control={<Radio className={radioClassName || classes.radio} disabled={disabled} />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default StyledRadioButton;
