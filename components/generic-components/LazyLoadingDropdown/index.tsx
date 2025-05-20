import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Autocomplete, FormControl, FormHelperText, InputLabel, TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Theme } from "@mui/material/styles";

import { RootState } from "../../../store";

import useClasses from "../../../utils/useClasses";

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
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "14px",
        color: "#b4b4b4",
        marginBottom: "5px",
    },
    textWrapper: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#000",
    },
    loadMoreWrapper: {
        width: "100%",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "14px",
        color: theme.palette.secondary.main,
        textAlign: "center",
        height: "15px",
    },
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            // Default transform is "translate(14px, 20px) scale(1)""
            // This lines up the label with the initial cursor position in the input
            // after changing its padding-left.
            transform: "translate(34px, 20px) scale(1);",
        },
    },
    inputRoot: {
        "& input": {
            fontSize: 12,
            fontFamily: "Inter",
            fontStyle: "normal",
            color: "#b4b4b4",
            fontWeight: "600",
            lineHeight: "15px",
        },
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            // Default left padding is 6px
            padding: "0 7px 0 7px",
        },
        "& .MuiAutocomplete-input": {
            width: "100%",
        },
        '&[class*="MuiOutlinedInput-root"]': {
            padding: 0,
            paddingRight: "65px !important",
        },
    },
    input: {
        fontSize: 12,
        fontFamily: "Inter",
        fontStyle: "normal",
        color: "#b4b4b4",
        fontWeight: "600",
        lineHeight: "15px",
        backgroundColor: "#fff",
    },
    disabledInput: {
        backgroundColor: "rgba(97, 97, 97, 0.1) !important",
    },
    smallButtonWrapper: {
        width: "25px",
        height: "25px",
        padding: 0,
        minWidth: "25px",
        borderRadius: 0,
        backgroundColor: "white",
        border: "1px solid #E4E4E4",
    },
    iconWrapper: {
        color: theme.palette.secondary.main,
        width: "22px",
        height: "22px",
    },
});

interface CustomStyles {
    error: any;
    label: any;
    textWrapper: any;
    loadMoreWrapper: any;
    root: any;
    inputRoot: any;
    input: any;
    disabledInput: any;
    smallButtonWrapper: any;
    iconWrapper: any;
}

interface Option {
    id: number;
    name?: string;
    [key: string]: any;
}

interface LazyLoadingDropdownProps {
    activeLabel?: boolean;
    label: string;
    required?: boolean;
    className?: string;
    value: Option | null;
    onChange: (event: React.ChangeEvent<{}>, value: Option | null) => void;
    width?: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
    inputClassName?: string;
    labelClassName?: string;
    displayField?: string;
    inputColorClass?: string;
    placeholder?: string;
    getResources: (offset: number, limit: number, filter: string | null, flag: boolean) => Promise<any>;
    minSearchLength?: number;
}

const LazyLoadingDropdown = forwardRef<HTMLDivElement, LazyLoadingDropdownProps>(
    (
        {
            activeLabel,
            label,
            required,
            className,
            value,
            onChange,
            width,
            error,
            helperText,
            disabled,
            inputClassName,
            labelClassName,
            displayField = "name",
            inputColorClass,
            placeholder = "Cauta...",
            getResources,
            minSearchLength = 3,
        },
        ref
    ) => {
        const classes = useClasses(useStyles, { name: "LazyLoadingDropdownStyles" }) as CustomStyles;
        const languageData = useSelector((state: RootState) => state.website.languageData);

        const [options, setOptions] = useState<Option[]>([]);
        const [nrOfEntities, setNrOfEntities] = useState<number>(0);
        const [offset, setOffset] = useState<number>(1);
        const limit: number = 25;

        const [inputValue, setInputValue] = useState<string | null>(null);
        const timer = useRef<NodeJS.Timeout | null>(null);

        useImperativeHandle(ref, (): any => ({
            resetSearch() {
                filterOptions(inputValue !== "" && inputValue?.length! >= minSearchLength ? inputValue : null);
            },
            triggerCustomGetResources(response: { items: any[]; quantity: number }) {
                setOptions(response.items || []);
                setNrOfEntities(response.quantity || 0);
            },
        }));

        useEffect(() => {
            if (value) {
                if (value[displayField]) {
                    setInputValue(value[displayField]);
                    getResources(offset, limit, value[displayField], false).then((response: any) => {
                        setOptions(response.items || []);
                        setNrOfEntities(response.quantity || 0);
                    });
                } else {
                    getResources(offset, limit, null, false).then((response: any) => {
                        setOptions(response.items || []);
                        setNrOfEntities(response.quantity || 0);
                    });
                }
            } else {
                getResources(offset, limit, null, false).then((response: any) => {
                    setOptions(response.items || []);
                    setNrOfEntities(response.quantity || 0);
                });
            }
        }, []);

        useEffect(() => {
            clearTimeout(timer.current!);
            if (inputValue !== value && inputValue !== value?.[displayField]) {
                timer.current = setTimeout(() => {
                    filterOptions(inputValue !== "" && inputValue?.length! >= minSearchLength ? inputValue : null);
                }, 1000);
            }
        }, [inputValue]);

        const loadMore = () => {
            const tmpData = [...options];
            getResources(offset + 1, limit, inputValue !== "" && inputValue?.length! >= minSearchLength ? inputValue : null, false).then((response: any) => {
                setOffset(offset + 1);
                if (response.items) {
                    setOptions([...tmpData, ...response.items]);
                    setNrOfEntities(response.quantity || 0);
                }
            });
        };

        const filterOptions = (filter: string | null) => {
            getResources(1, limit, filter, false).then((response: any) => {
                setOffset(1);
                if (response.items) {
                    setNrOfEntities(response.quantity || 0);
                    setOptions(response.items || []);
                }
            });
        };

        return (
            <div>
                {activeLabel && (
                    <InputLabel required={required} className={labelClassName ? labelClassName : classes.label}>
                        {label}
                    </InputLabel>
                )}
                <FormControl style={{ width: width }} className={className}>
                    <Autocomplete
                        disabled={!!disabled}
                        popupIcon={<KeyboardArrowDownIcon />}
                        value={value}
                        onChange={(e, value) => {
                            if (value && value?.id !== -1) {
                                onChange(e, value);
                            } else {
                                onChange(e, null);
                            }
                        }}
                        id="search-dropdown"
                        options={
                            options.length < nrOfEntities
                                ? options.some((el) => el.id === value?.referenceId || el.id === value?.id)
                                    ? [...options, { id: -1 }]
                                    : value
                                      ? [{ id: value?.referenceId, name: value?.name }, ...options, { id: -1 }]
                                      : [...options, { id: -1 }]
                                : options.some((el) => el.id === value?.referenceId || el.id === value?.id)
                                  ? options
                                  : value
                                    ? [{ id: value?.referenceId, name: value?.name }, ...options]
                                    : options
                        }
                        defaultValue={value?.referenceId ? { id: value.referenceId, [displayField]: value[displayField] } : value}
                        getOptionLabel={(option: Option) => option[displayField] || ""}
                        filterOptions={(options) => options}
                        onInputChange={(e, value, reason) => {
                            setInputValue(value);
                        }}
                        renderOption={(props, option) => {
                            return option.id !== -1 ? (
                                <span className={classes.textWrapper} {...props}>
                                    {(option as any)[displayField] || ""}
                                </span>
                            ) : (
                                <span
                                    className={classes.loadMoreWrapper}
                                    {...props}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (loadMore) {
                                            loadMore();
                                        }
                                    }}
                                >
                                    {languageData?.LoadMore}
                                </span>
                            );
                        }}
                        classes={{
                            root: classes.root,
                            inputRoot:
                                classes.inputRoot +
                                " " +
                                (inputClassName ? inputClassName : classes.input) +
                                " " +
                                (inputColorClass ? inputColorClass : "") +
                                " " +
                                (disabled ? classes.disabledInput : ""),
                        }}
                        className={className}
                        style={{ width: width }}
                        renderInput={(params) => (
                            <TextField
                                value={inputValue || ""}
                                required={!!required}
                                className={inputClassName}
                                {...params}
                                placeholder={placeholder}
                                variant="outlined"
                                disabled={!!disabled}
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
    }
);

export default LazyLoadingDropdown;
