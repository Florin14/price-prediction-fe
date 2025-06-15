import React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, FormControl, FormHelperText, InputLabel, SxProps, TextField } from "@mui/material";
import { Theme } from "@mui/material/styles";

import useClasses from "../../../utils/useClasses";

interface ClassNames {
    error: any;
    label: any;
    root: any;
    inputRoot: any;
    input: any;
    option: any;
    disabledInput: any;
    dropdownItem: any;
}

const useStyles = (theme: Theme) => ({
    error: {
        fontSize: 10,
        lineHeight: "12px",
        fontWeight: 400,
        fontStyle: "normal",
        fontFamily: "Inter, sans-serif",
    },
    label: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#667085",
        marginBottom: 3,
    },
    inputRoot: {
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            padding: "0 7px 0 7px",
        },
        "& .MuiAutocomplete-input": {
            width: "100%",
        },
        '&[class*="MuiOutlinedInput-root"]': {
            padding: "0 7px 0 7px",
            paddingRight: "65px !important",
            borderRadius: "4px", // 👈 Set border radius to 4px
        },
    },
});

interface Option {
    id?: string | number;
    name?: string;
    optionStyle?: React.CSSProperties;
    [key: string]: any;
}

interface StyledDropdownProps {
    id?: string;
    activeLabel?: boolean;
    label?: string;
    required?: boolean;
    className?: string;
    value: Option | null;
    onChange: (event: React.ChangeEvent<{}>, value: Option | null) => void;
    width?: string | number;
    error?: boolean;
    helperText?: string;
    options: Option[];
    disabled?: boolean;
    inputClassName?: string;
    displayField?: string;
    inputColorClass?: string;
    labelClassName?: string;
    placeholder?: string;
    sx?: SxProps<Theme>;
}

const StyledDropdown: React.FC<StyledDropdownProps> = ({
    id,
    activeLabel,
    label,
    required,
    className,
    value,
    onChange,
    width = "100%",
    error,
    helperText,
    options,
    disabled,
    inputClassName,
    displayField,
    inputColorClass,
    labelClassName,
    placeholder = "Selecteaza...",
}) => {
    const classes = useClasses(useStyles, { name: "CustomDropdownStyles" }) as ClassNames;

    return (
        <div id={id} style={{ width: width }}>
            {activeLabel && (
                <InputLabel required={required} className={labelClassName ? labelClassName : classes.label}>
                    {label}
                </InputLabel>
            )}
            <FormControl id={id} style={{ width }} className={className}>
                <Autocomplete
                    disabled={!!disabled}
                    popupIcon={<KeyboardArrowDownIcon />}
                    value={value}
                    onChange={(event, newValue) => onChange(event, newValue as Option | null)}
                    id="search-dropdown"
                    options={options}
                    defaultValue={value}
                    disablePortal
                    isOptionEqualToValue={(o, v) => {
                        if (!o || !v) return false; // Handle null or undefined values
                        if (o.id && v.id) return o.id === v.id; // Compare by id if available
                        return o === v; // Fallback to strict equality
                    }}
                    getOptionLabel={(option) => {
                        return displayField ? option[displayField] || "" : option?.name || "";
                    }}
                    classes={{
                        root: classes.root,
                        inputRoot: `${classes.inputRoot} ${inputClassName || classes.input} ${inputColorClass || ""}`, // Apply custom styles to dropdown items
                    }}
                    style={{
                        width: width,
                    }}
                    sx={{
                        width: width,
                    }}
                    renderOption={(props, option) => (
                        <li
                            {...props}
                            style={{
                                ...option.optionStyle, // Apply the optionStyle dynamically
                            }}
                        >
                            {displayField ? option[displayField] || "" : option?.name || ""}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            required={!!required}
                            className={inputClassName}
                            {...params}
                            placeholder={placeholder}
                            variant="outlined"
                            disabled={!!disabled}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 52,
                                    borderRadius: 1, // 8px
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "grey.200",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "error.main",
                                    },
                                    "&.Mui-disabled": {
                                        backgroundColor: "grey.100",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "grey.200",
                                        },
                                    },
                                },
                                "& .MuiAutocomplete-input": {
                                    padding: "0 12px",
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    fontFamily: "Inter, sans-serif",
                                    width: "100%",
                                    ...(value?.optionStyle || {}),
                                },
                                "& .MuiAutocomplete-popupIndicator": {
                                    color: "grey.500",
                                },
                                "& .MuiAutocomplete-option": {
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    fontFamily: "Inter, sans-serif",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                    '&[aria-selected="true"]': {
                                        backgroundColor: "background.paper",
                                    },
                                },
                            }}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                    className: labelClassName,
                                    sx: {
                                        transform: "translate(0px, -8px) scale(1)", // ⬅ Adjust transform to fix overflow
                                        padding: "0 14px", // ⬅ Add more padding to prevent overflow
                                        zIndex: 100,
                                        lineHeight: "1.2", // ⬅ Ensure proper line height for visibility
                                        whiteSpace: "nowrap", // ⬅ Prevent wrapping
                                        color: "inherit !important",
                                    },
                                },
                            }}
                        />
                    )}
                />
                {helperText && (
                    <FormHelperText classes={{ error: classes.error }} error={error}>
                        {helperText}
                    </FormHelperText>
                )}
            </FormControl>
        </div>
    );
};

export default StyledDropdown;
