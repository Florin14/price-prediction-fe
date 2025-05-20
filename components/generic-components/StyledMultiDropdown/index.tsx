import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { CheckBox, CheckBoxOutlineBlankOutlined, KeyboardArrowDown } from "@mui/icons-material";
import { Checkbox, FormControl, FormHelperText, TextField, Autocomplete, Chip, InputLabel } from "@mui/material";

import cssVariables from "../../../assets/css/variables";
import useClasses from "../../../utils/useClasses";
import { Theme } from "@mui/material/styles";
import { RootState } from "../../../store";

const icon = <CheckBoxOutlineBlankOutlined fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

interface ClassNames {
    error: string;
    inputTextWrapper: string;
    row: string;
    rowText: string;
    label: string;
    root: string;
    inputRoot: string;
    input: string;
    disabledInput: string;
    tag: string;
    option: string;
    [key: string]: string;
}

const useStyles = (theme: Theme) => ({
    error: {
        fontSize: 10,
        lineHeight: "12px",
        fontWeight: 500,
        fontStyle: "normal",
    },
    label: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#21272A",
        marginBottom: 3,
    },
    inputTextWrapper: {
        fontSize: "12px",
        fontFamily: "Inter",
        fontWeight: "600",
        color: "#1D1E21",
        lineHeight: "16px",
        padding: "2px",
        backgroundColor: theme.palette.primary.main,
        marginLeft: "7px",
        borderRadius: "4px",
        marginRight: cssVariables.smallMargin,
    },
    selectAllIcon: {
        display: "inline-block",
        width: 15,
        height: 15,
        borderRadius: "50%",
        marginRight: 8,
        marginLeft: 2,
        boxSizing: "border-box",
    },
    row: {
        fontSize: "12px",
        fontFamily: "Inter",
        fontWeight: "600",
        lineHeight: "16px",
        color: "#1D1E21",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    rowText: {
        fontSize: 12,
    },
    inputRoot: {
        flexWrap: "nowrap !important",
        overflow: "hidden",
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            padding: "0 7px 0 7px",
        },
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
            padding: "0",
        },
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-endAdornment': {
            paddingRight: "9px",
            right: 0,
            backgroundColor: "transparent",
            position: "absolute",
        },
        "& .MuiAutocomplete-input": {
            width: "100%",
        },
        '&[class*="MuiOutlinedInput-root"]': {
            padding: 0,
            paddingRight: "65px !important",
        },
    },
    tag: {
        minWidth: "100px !important",
        backgroundColor: "transparent",
        color: "#1D1E21",
        height: 14,
        display: "flex",
        justifyContent: "start",
        position: "relative",
        zIndex: 0,
        "& .MuiChip-label": {
            color: "#1D1E21",
        },
        "& .MuiChip-deleteIcon": {
            color: "#1D1E21",
        },
        "&:after": {
            content: '""',
            right: 10,
            top: 6,
            height: 12,
            width: 12,
            position: "absolute",
            zIndex: -1,
        },
    },
});

interface OptionType {
    id: number | string;
    name?: string;
    [key: string]: any;
}

interface StyledMultiDropdownProps {
    options: OptionType[];
    label?: string;
    labelClassName?: string;
    rowClassName?: string;
    className?: string;
    helperText?: string;
    placeholder?: string;
    width?: string | number;
    required?: boolean;
    inputClassName?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<{}>, value: OptionType[]) => void;
    value: OptionType[];
    inputColorClass?: string;
    displayField?: string;
    customOptionLabel?: (props: any, option: OptionType) => React.ReactNode;
    wrapperClassName?: string;
    hasSelectAll?: boolean;
    reset?: boolean;
    valueFromQuery?: boolean;
    [key: string]: any;
}

const StyledMultiDropdown: React.FC<StyledMultiDropdownProps> = ({
    options,
    label,
    labelClassName,
    rowClassName,
    className,
    helperText,
    placeholder = "Selectie multipla",
    width = "100%",
    required,
    inputClassName,
    disabled,
    onChange,
    value,
    inputColorClass,
    displayField,
    customOptionLabel,
    wrapperClassName,
    hasSelectAll,
    ...rest
}) => {
    const classes = useClasses(useStyles, { name: "styledMultidropdownStyles" }) as ClassNames;
    const languageData = useSelector((state: RootState) => state.website.languageData);

    let selectAll: OptionType = {
        id: 0,
    };
    selectAll[displayField ? displayField : "name"] = languageData?.SelectAll;

    const effectivePlaceholder = Array.isArray(value) && value.length > 0 ? "" : placeholder;

    const testId = label ? `search-input-${label.toLowerCase().replace(/\s+/g, "-")}` : "search-input";

    return (
        <div data-testid={testId} className={wrapperClassName ? wrapperClassName : undefined} style={{ width: width }}>
            {label && (
                <InputLabel required={!!required} className={labelClassName ? labelClassName : classes.label}>
                    {label}
                </InputLabel>
            )}
            <FormControl style={{ width: width }} className={className}>
                <Autocomplete
                    disabled={!!disabled}
                    multiple
                    renderTags={() => [
                        <Chip
                            key="count"
                            label={`+${value.length}`}
                            size="small"
                            sx={{
                                backgroundColor: "primary.main",
                                color: "primary.contrastText",
                                fontSize: "12px",
                                lineHeight: "16px",
                                fontFamily: "Inter, sans-serif",
                                marginLeft: "15px",
                                borderRadius: "4px",
                                height: 16,
                            }}
                        />,
                    ]}
                    sx={{
                        maxLines: 1,
                        "& .MuiAutocomplete-input": {
                            opacity: value && value.length > 0 ? "0" : "1",
                        },
                    }}
                    popupIcon={<KeyboardArrowDown />}
                    id="checkboxes"
                    options={hasSelectAll ? [selectAll, ...options] : options}
                    disableCloseOnSelect
                    getOptionLabel={(option) => {
                        return displayField ? option[displayField] || "" : option?.name || "";
                    }}
                    isOptionEqualToValue={(o, v) => (o?.id && v?.id ? o?.id === v?.id : o === v)}
                    onChange={(e, dropdownValue) => {
                        if (dropdownValue.some((el) => el?.id === 0)) {
                            onChange(e, options);
                        } else {
                            onChange(e, dropdownValue);
                        }
                    }}
                    value={Array.isArray(value) ? value : []} // Ensure value is always an array
                    renderOption={(props: any, option, { selected }) => {
                        const { key, ...props1 } = props;
                        const isSelectAll = option.id === 0;
                        const allSelected = value.length === options.length && options.length > 0;

                        return (
                            <div
                                key={option.id}
                                className={classNames(classes.row)}
                                {...props1}
                                style={isSelectAll ? { borderBottom: "1px solid rgba(0, 0, 0, 0.2)" } : {}}
                            >
                                {isSelectAll ? (
                                    <span
                                        className={classes.selectAllIcon}
                                        style={{
                                            border: `2px solid ${allSelected ? "#00306E" : "#667085"}`,
                                            background: allSelected ? "#00306E" : "transparent",
                                        }}
                                    ></span>
                                ) : (
                                    <Checkbox
                                        key={option.id}
                                        color="primary"
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8, padding: 0 }}
                                        checked={selected}
                                    />
                                )}
                                {customOptionLabel ? (
                                    customOptionLabel(props, option)
                                ) : (
                                    <div className={classNames(classes.rowText, rowClassName)}>
                                        {displayField ? option[displayField] || "" : option?.name || ""}
                                    </div>
                                )}
                            </div>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            required={!!required}
                            {...params}
                            className={inputClassName}
                            placeholder={effectivePlaceholder}
                            variant="outlined"
                            disabled={!!disabled}
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
                                        color: disabled ? "rgba(0, 0, 0, 0.38) !important" : "inherit !important", // Apply disabled color when disabled
                                        opacity: disabled ? 0.8 : 1, // Optional: reduce opacity when disabled
                                    },
                                },
                            }}
                        />
                    )}
                    className={className}
                    classes={{
                        tag: classes.tag,
                        inputRoot: classNames(classes.inputRoot, inputClassName ? inputClassName : "", inputColorClass ? inputColorClass : ""),
                    }}
                    {...rest}
                />
                {helperText && (
                    <FormHelperText classes={{ error: classes.error }} error={Boolean(helperText)}>
                        {helperText}
                    </FormHelperText>
                )}
            </FormControl>
        </div>
    );
};

export default StyledMultiDropdown;
