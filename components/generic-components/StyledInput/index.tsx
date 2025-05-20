import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";

import { FormControl, FormHelperText, InputLabel, TextField, IconButton, Typography, InputAdornment } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Theme } from "@mui/material/styles";

import useClasses from "../../../utils/useClasses";
import StyledTooltip from "../StyledTooltip";

interface ClassNames {
    error: any;
    label: any;
    disabledInput: any;
    rightAlignPadding: any;
    disabledRightAlignClassname: any;
    input: any;
    multilineInput: any;
    showHidePasswordIcon: any;
    outlinedInput: any;
}

const useStyles = (theme: Theme) => ({
    error: {
        fontSize: 10,
        lineHeight: "12px",
        fontWeight: 500,
        fontStyle: "normal",
        color: "red",
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
    rightAlignPadding: {
        paddingRight: "15px !important",
    },
    disabledRightAlignClassname: {
        paddingRight: "15px !important",
        paddingTop: "5px !important",
    },
    input: {
        minHeight: "35px",
        "&[type=number]": {
            MozAppearance: "textfield",
        },
        "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
    },
    multilineInput: {
        borderRadius: 8,
        fontSize: "12px",
        fontFamily: "Inter",
        fontWight: 400,
        lineHeight: "12px",
        minHeight: "35px",
        "&[type=number]": {
            MozAppearance: "textfield",
        },
        "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
        "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
        },
    },
    showHidePasswordIcon: {
        margin: `0 4px 0 0`,
        backgroundColor: "transparent",
        width: "16px",
        height: "16px",
        color: "#667085",
    },
});

interface StyledInputProps {
    id?: string;
    activeLabel?: boolean;
    labelClassName?: string;
    label?: string;
    value?: string | number | null;
    onChange: (value: string | number | null) => void;
    onBlur?: (e: any) => void;
    className?: string;
    inputClassName?: string;
    type?: string;
    helperText?: string;
    error?: boolean;
    borderError?: boolean;
    step?: number | string;
    width?: string | number;
    required?: boolean;
    disabled?: boolean;
    textAlign?: "center" | "right" | "left";
    placeholder?: string;
    endAdornment?: React.ReactNode;
    showHidePassword?: boolean;
    min?: number | null;
    max?: number;
    format?: any;
    inputColorClass?: string;
    inputName?: string;
    maxLength?: number;
    autoComplete?: string;
    onKeyUp?: (event: any) => void;
    viewMode?: boolean;
    viewModeClassName?: string;
    variant?: "standard" | "outlined" | "filled";
    multilineDisabledClassname?: string;
    tooltipClassName?: string;
    rows?: number;
    trailingIcon?: React.ReactNode;
    tooltip?: React.ReactElement;
    onTrailingIconClick?: () => void;
}

const StyledInput: React.FC<StyledInputProps> = 
    ({
        id,
        activeLabel,
        labelClassName,
        label,
        value,
        onChange,
        className,
        inputClassName,
        type = "text",
        helperText,
        error,
        borderError,
        step,
        width = "100%",
        required,
        disabled,
        textAlign,
        placeholder = "Scrie",
        endAdornment,
        showHidePassword,
        min = type === "number" ? 0 : null,
        max,
        format,
        inputColorClass,
        inputName = "input",
        maxLength,
        autoComplete = "off",
        onKeyUp,
        viewMode,
        viewModeClassName,
        variant = "outlined",
        multilineDisabledClassname,
        tooltipClassName,
        trailingIcon,
        onTrailingIconClick,
        rows,
        onBlur,
        tooltip,
        ...rest
    }) => {
        const classes = useClasses(useStyles, { name: "styledInputStyles" }) as ClassNames;
        const [currentType, setCurrentType] = useState(type);

        useEffect(() => {
            setCurrentType(type);
        }, [type]);

        const changeCurrentType = (newType: string) => {
            setCurrentType(newType);
        };

        const inputHasValue = (value: any) => value !== undefined && value !== null && value !== "";

        return (
            <div id={id} style={{ width: width }} {...rest}>
                {activeLabel && (
                    <InputLabel required={!!required} className={classNames(classes.label, labelClassName)}>
                        {label}
                    </InputLabel>
                )}
                {!viewMode ? (
                    <FormControl required={required} id="formControl" style={{ width, minWidth: 0 }} className={className}>
                        {tooltip ? (
                            <StyledTooltip title={tooltip}>
                                <TextField
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    name={inputName}
                                    value={value}
                                    rows={rows || 1}
                                    multiline={!!rows}
                                    onChange={(e) => (e.target.value.trim() === "" ? onChange(null) : onChange(e.target.value))}
                                    onBlur={(e) => {
                                        const initialValue = e.target.value;
                                        const changedValue = initialValue.trim();
                                        if (initialValue !== changedValue && onChange) {
                                            onChange(changedValue);
                                        }
                                        if (onBlur) {
                                            onBlur(e);
                                        }
                                    }}
                                    type={currentType}
                                    classes={{}}
                                    slotProps={{
                                        input: {
                                            classes: {
                                                input: `${rows ? classes.multilineInput : classes.input} ${inputClassName} ${textAlign === "right" && rows ? classes.disabledRightAlignClassname : classes.rightAlignPadding}`,
                                                root: classNames(classes.outlinedInput, inputClassName, multilineDisabledClassname),
                                                ...(inputColorClass && { notchedOutline: inputColorClass }),
                                            },
                                            inputProps: {
                                                maxLength: maxLength !== null && maxLength,
                                                min: min !== null ? min : undefined,
                                                max: type === "date" ? moment().format("YYYY-MM-DD") : type === "number" ? max : undefined,
                                                step: step || "any",
                                                style: { textAlign: textAlign || "left" },
                                            },
                                            endAdornment: showHidePassword && (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => changeCurrentType(currentType === "password" ? "text" : "password")}
                                                        edge="end"
                                                        className={classes.showHidePasswordIcon}
                                                    >
                                                        {currentType === "password" ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
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
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: borderError ? "red" : undefined,
                                            },
                                            "&:hover fieldset": {
                                                borderColor: borderError ? "red" : undefined,
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: borderError ? "red" : "#00308E",
                                            },
                                        },
                                    }}
                                    required={!!required}
                                    variant={variant}
                                    autoComplete={autoComplete}
                                    onKeyUp={onKeyUp}
                                />
                            </StyledTooltip>
                        ) : (
                            <TextField
                                placeholder={placeholder || ""}
                                disabled={disabled}
                                name={inputName}
                                value={value}
                                rows={rows || 1}
                                multiline={!!rows}
                                onChange={(e) => (e.target.value.trim() === "" ? onChange(null) : onChange(e.target.value))}
                                onBlur={(e) => {
                                    const initialValue = e.target.value;
                                    const changedValue = initialValue.trim();
                                    if (initialValue !== changedValue && onChange) {
                                        onChange(changedValue);
                                    }
                                    if (onBlur) {
                                        onBlur(e);
                                    }
                                }}
                                type={currentType}
                                classes={{}}
                                slotProps={{
                                    input: {
                                        classes: {
                                            input: `${rows ? classes.multilineInput : classes.input} ${inputClassName} ${textAlign === "right" && rows ? classes.disabledRightAlignClassname : classes.rightAlignPadding}`,
                                            root: classNames(classes.outlinedInput, inputClassName, multilineDisabledClassname),
                                            ...(inputColorClass && { notchedOutline: inputColorClass }),
                                        },
                                        inputProps: {
                                            maxLength: maxLength !== null && maxLength,
                                            min: min !== null ? min : undefined,
                                            max: type === "date" ? moment().format("YYYY-MM-DD") : type === "number" ? max : undefined,
                                            step: step || "any",
                                            style: { textAlign: textAlign || "left" },
                                        },
                                        endAdornment: showHidePassword && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => changeCurrentType(currentType === "password" ? "text" : "password")}
                                                    edge="end"
                                                    className={classes.showHidePasswordIcon}
                                                >
                                                    {currentType === "password" ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
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
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: borderError ? "red" : undefined,
                                        },
                                        "&:hover fieldset": {
                                            borderColor: borderError ? "red" : undefined,
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: borderError ? "red" : "#00308E",
                                        },
                                    },
                                }}
                                required={!!required}
                                variant={variant}
                                autoComplete={autoComplete}
                                onKeyUp={onKeyUp}
                            />
                        )}

                        {helperText && (
                            <FormHelperText classes={{ root: classes.error }} error={error}>
                                {helperText}
                            </FormHelperText>
                        )}
                    </FormControl>
                ) : (
                    <Typography variant="h6" className={viewModeClassName}>
                        {inputHasValue(value) ? value : "-"}
                    </Typography>
                )}
            </div>
        );
    }

export default StyledInput;
