import React from "react";
import classNames from "classnames";
import { InputLabel, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/material/styles";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import roLocale from "date-fns/locale/ro";
import "moment/locale/ro";
import Calendar from "../../../components/icons/Calendar";

import { inputHasValue } from "../../../utils/app-functions";
import useClasses from "../../../utils/useClasses";

export interface StyledDatepickerStyle {
    datePicker: any;
    input: any;
    inputAdornment: any;
    dateInput: any;
    calendarButton: any;
    label: any;
}

const useStyles = (_theme: any) => ({
    label: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#667085",
        marginBottom: 3,
    },
    datePicker: {
        minWidth: "fit-content",
        minHeight: 35,
        "& .MuiInputLabel-root": {
            fontSize: "12px",
            minHeight: 35,

            fontFamily: "Inter, sans-serif",
            fontWeight: "600",
            transform: "translate(0px, -8px) scale(1)", // Adjust translate values for better spacing
            padding: "0 12px",
            zIndex: 100,
            lineHeight: "1.2", // ⬅ Ensure proper line height for visibility
            whiteSpace: "nowrap",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "inherit !important", // Keep the original color when focused
        },
    },
    inputAdornment: {
        position: "absolute",
        right: 0,
    },
    calendarButton: {
        "& button": {
            padding: 2,
        },
        "& svg": {
            height: "0.7em",
            width: "0.7em",
        },
    },
});

export const DatePickerTypesEnum = {
    Date: "date",
    Time: "time",
    DateTime: "datetime",
    Month: "month",
} as const;

const DatePickerTypes = {
    Date: "date",
    Time: "time",
    DateTime: "datetime",
    Month: "month",
} as const;

type DatePickerType = (typeof DatePickerTypes)[keyof typeof DatePickerTypes];

interface StyledDatePickerProps {
    value: any;
    type?: DatePickerType;
    placeholder?: string;
    format?: string;
    mask?: string;
    activeLabel?: boolean;
    label?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    datePickerClassName?: string;
    inputClassName?: string;
    rootClassName?: string;
    positionEndClassName?: string;
    viewMode?: boolean;
    viewModeClassName?: string;
    onChange: (value: any) => void;
    onError?: (reason: any, value: any) => void;
    allowKeyboardControl?: boolean;
    disableFuture?: boolean;
    autoOk?: boolean;
    invalidDateMessage?: string;
    inputVariant?: "outlined" | "filled" | "standard";
    variant?: "inline" | "dialog" | "static";
    required?: boolean;
    requiredLabel?: boolean;
    minDate?: any;
    minDateMessage?: string;
    maxDate?: any;
    maxDateMessage?: string;
    ampm?: boolean;
    textFieldEditable?: boolean;
    dropdownIconPosition?: "start" | "end";
    textFieldReadOnly?: boolean;
    dropdownIcon?: React.ElementType;
    formatDate?: (date: any) => string;
    inputComponent?: boolean;
    [key: string]: any;
}

interface CustomDateTimePickerProps {
    [key: string]: any;
}

const CustomDateTimePicker = styled(DateTimePicker)<CustomDateTimePickerProps>(({ theme }) => ({}));

interface CustomTimePickerProps {
    [key: string]: any;
}

const CustomTimePicker = styled(TimePicker)<CustomTimePickerProps>(({ theme }) => ({}));

interface CustomDesktopDatePickerProps {
    [key: string]: any;
}

const CustomDesktopDatePicker = styled(DesktopDatePicker)<CustomDesktopDatePickerProps>(({ theme }) => ({}));

const StyledDatePicker: React.FC<StyledDatePickerProps> = ({
    value,
    type = DatePickerTypes.Date,
    placeholder = type === DatePickerTypes.DateTime
        ? "YYYY-MM-DD HH:MM"
        : type === DatePickerTypes.Month
          ? "YYYY-MM"
          : type === DatePickerTypes.Time
            ? "HH:mm"
            : "YYYY-MM-DD",
    format = type === DatePickerTypes.DateTime
        ? "yyyy-MM-dd HH:mm"
        : type === DatePickerTypes.Month
          ? "yyyy-MM"
          : type === DatePickerTypes.Time
            ? "HH:mm"
            : "yyyy-MM-dd",
    mask = type === DatePickerTypes.DateTime
        ? "____-__-__ __:__"
        : type === DatePickerTypes.Month
          ? "____-__"
          : type === DatePickerTypes.Time
            ? "__:__"
            : "____-__-__",
    activeLabel,
    label,
    wrapperClassName,
    labelClassName,
    datePickerClassName,
    inputClassName,
    rootClassName,
    positionEndClassName,
    viewMode,
    viewModeClassName,
    onChange,
    onError,
    allowKeyboardControl = false,
    disableFuture = false,
    autoOk = true,
    invalidDateMessage = "Data incorecta",
    inputVariant = "outlined",
    variant = "inline",
    required,
    requiredLabel = true,
    minDate,
    minDateMessage = minDate ? "Data prea mica" : undefined,
    maxDate,
    maxDateMessage = maxDate ? "Data prea mare" : undefined,
    ampm = false,
    textFieldEditable = false,
    dropdownIconPosition = "end",
    textFieldReadOnly = false,
    dropdownIcon,
    formatDate,
    inputComponent = false,
    inputRef = null,
    ...rest
}) => {
    const classes = useClasses(useStyles, { name: "CustomDatePickerStyles" }) as StyledDatepickerStyle;

    return (
        <div className={wrapperClassName}>
            {activeLabel && (
                <InputLabel required={!!required && !!requiredLabel} className={classNames(classes.label, labelClassName)}>
                    {label}
                </InputLabel>
            )}
            {!viewMode ? (
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={roLocale as any}>
                    {type === DatePickerTypes.DateTime ? (
                        <CustomDateTimePicker
                            inputRef={inputRef}
                            showToolbar
                            className={classNames(classes.datePicker, datePickerClassName)}
                            placeholder={placeholder}
                            autoOk={autoOk}
                            slotProps={{ textField: { InputProps: { readOnly: textFieldReadOnly }, InputLabelProps: { shrink: activeLabel } } }}
                            inputFormat={format}
                            invalidDateMessage={invalidDateMessage}
                            InputProps={{
                                classes: {
                                    input: classNames(classes.input, inputClassName),
                                    root: classNames(rootClassName),
                                },
                            }}
                            InputAdornmentProps={{
                                classes: {
                                    positionEnd: classNames(classes.calendarButton, positionEndClassName),
                                },
                            }}
                            inputVariant={inputVariant}
                            required={!!required}
                            variant={variant}
                            value={value || null}
                            onChange={(value) => onChange(value)}
                            allowKeyboardControl={allowKeyboardControl}
                            disableFuture={disableFuture}
                            mask={mask}
                            onError={onError}
                            minDate={minDate}
                            minDateMessage={minDateMessage}
                            maxDate={maxDate}
                            maxDateMessage={maxDateMessage}
                            ampm={ampm}
                            slots={{ openPickerIcon: Calendar }}
                            {...rest}
                        />
                    ) : type === DatePickerTypes.Time ? (
                        <CustomTimePicker
                            inputRef={inputRef}
                            showToolbar
                            className={classNames(classes.datePicker, datePickerClassName)}
                            placeholder={placeholder}
                            autoOk={autoOk}
                            inputFormat={format}
                            invalidDateMessage={invalidDateMessage}
                            slotProps={{ textField: { InputProps: { readOnly: textFieldReadOnly }, InputLabelProps: { shrink: activeLabel } } }}
                            InputProps={{
                                classes: {
                                    input: classNames(classes.input, inputClassName),
                                    root: classNames(rootClassName),
                                },
                            }}
                            InputAdornmentProps={{
                                classes: {
                                    positionEnd: classNames(classes.calendarButton, positionEndClassName),
                                },
                            }}
                            inputVariant={inputVariant}
                            required={!!required}
                            variant={variant}
                            value={value || null}
                            onChange={(value) => onChange(value)}
                            allowKeyboardControl={allowKeyboardControl}
                            disableFuture={disableFuture}
                            mask={mask}
                            onError={onError}
                            minDate={minDate}
                            minDateMessage={minDateMessage}
                            maxDate={maxDate}
                            maxDateMessage={maxDateMessage}
                            ampm={ampm}
                            slots={{ openPickerIcon: Calendar }}
                            {...rest}
                        />
                    ) : (
                        <CustomDesktopDatePicker
                            inputRef={inputRef}
                            InputAdornmentProps={{
                                position: dropdownIconPosition,
                            }}
                            className={classNames(classes.datePicker, datePickerClassName)}
                            placeholder={placeholder}
                            autoOk={autoOk}
                            inputFormat={format}
                            invalidDateMessage={invalidDateMessage}
                            components={{
                                OpenPickerIcon: dropdownIcon,
                            }}
                            slots={{ openPickerIcon: Calendar }}
                            InputProps={{
                                classes: {
                                    input: classNames(classes.input, inputClassName),
                                    root: classNames(rootClassName),
                                },
                            }}
                            slotProps={{ textField: { InputProps: { readOnly: textFieldReadOnly }, InputLabelProps: { shrink: activeLabel } } }}
                            inputVariant={inputVariant}
                            required={!!required}
                            variant={variant}
                            value={formatDate ? formatDate(value) : value}
                            onChange={onChange}
                            allowKeyboardControl={allowKeyboardControl}
                            disableFuture={disableFuture}
                            mask={mask}
                            onError={onError}
                            openTo={type === DatePickerTypes.Month ? "month" : undefined}
                            views={type === DatePickerTypes.Month ? ["year", "month"] : undefined}
                            minDate={minDate}
                            minDateMessage={minDateMessage}
                            maxDate={maxDate}
                            maxDateMessage={maxDateMessage}
                            {...rest}
                        />
                    )}
                </LocalizationProvider>
            ) : (
                <Typography variant={"h6"} className={classNames(viewModeClassName)}>
                    {inputHasValue(value) ? value : "-"}
                </Typography>
            )}
        </div>
    );
};

export default StyledDatePicker;
