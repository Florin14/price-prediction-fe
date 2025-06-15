import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Autocomplete, Checkbox, FormControl, FormHelperText, InputLabel, TextField } from "@mui/material";
import CheckBox from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useClasses from "../../../utils/useClasses";
import { RootState } from "../../../store";

const icon = <CheckBoxOutlineBlankOutlinedIcon fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export interface Option {
    id: number;
    [key: string]: any;
}

interface LazyLoadingMultiDropdownProps {
    label?: string;
    required?: boolean;
    className?: string;
    value: Option[];
    onChange: (event: React.ChangeEvent<{}>, value: Option[]) => void;
    width?: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
    inputClassName?: string;
    displayField: string;
    inputColorClass?: string;
    placeholder?: string;
    getResources: (offset: number, limit: number, filter: string | null, flag: boolean) => Promise<{ items: Option[]; quantity: number }>;
}

export interface StyleProps {
    error: any;
    inputTextWrapper: any;
    row: any;
    label: any;
    root: any;
    inputRoot: any;
    input: any;
    disabledInput: any;
    tag: any;
    loadMoreWrapper: any;
}

const useStyles = (theme: any): StyleProps => ({
    error: {
        fontSize: 10,
        lineHeight: "12px",
        fontWeight: 500,
        fontStyle: "normal",
    },
    inputTextWrapper: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontSize: "12px",
        fontWeight: "600",
        lineHeight: "15px",
        color: "#fff",
        padding: "2px",
        backgroundColor: theme.palette.secondary.main,
        marginLeft: "7px",
        marginRight: "10px",
    },
    row: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "14px",
        color: "#000",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "14px",
        color: theme.palette.grey.text,
        marginBottom: "5px",
    },
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            transform: "translate(34px, 20px) scale(1);",
        },
    },
    inputRoot: {
        "& input": {
            fontSize: 12,
            fontFamily: "Inter",
            fontStyle: "normal",
            color: theme.palette.grey.text,
            fontWeight: "600",
            lineHeight: "15px",
        },
        flexWrap: "nowrap !important",
        overflow: "hidden",
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            padding: "0 7px 0 7px",
        },
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
            padding: "0",
            width: "100%",
        },
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-endAdornment': {
            paddingRight: "9px",
            right: 0,
            backgroundColor: "#fff",
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
    input: {
        fontSize: 12,
        fontFamily: "Inter",
        fontStyle: "normal",
        color: theme.palette.grey.text,
        fontWeight: "600",
        lineHeight: "15px",
        backgroundColor: "#fff",
        paddingRight: "65px !important",
    },
    disabledInput: {
        backgroundColor: "rgba(97, 97, 97, 0.1) !important",
    },
    tag: {
        backgroundColor: "#FF6600",
        color: "#fff",
        height: 14,
        position: "relative",
        zIndex: 0,
        "& .MuiChip-label": {
            color: "#fff",
        },
        "& .MuiChip-deleteIcon": {
            color: "#fff",
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
});

const LazyLoadingMultiDropdown: React.FC<LazyLoadingMultiDropdownProps> = ({
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
    displayField = "name",
    inputColorClass,
    placeholder = "Cauta...",
    getResources,
}) => {
    const classes = useClasses(useStyles, { name: "LazyLoadingMultiDropdownStyles" }) as StyleProps;
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const [options, setOptions] = useState<Option[]>([]);
    const [nrOfEntities, setNrOfEntities] = useState<number>(0);
    const [offset, setOffset] = useState<number>(1);
    const limit: number = 25;

    const [inputValue, setInputValue] = useState<string>("");
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Aici era ceva logica care nu mi se parea corecta, nu stiu de ce a fost adaugata
        // Primeam erori de tip de la typescript asa ca am scos-o, in viitor cand se va utiliza
        // compoennat aceasta se va testa bine componenta sa se vada daca lipseste ceva
        // daca da se va reimplementa partea aceasta (se poate cauta ce era aici de pe un proiect mai vechi)
        // astfel incat sa functioneze si sa nu se primeasca erori de typescript
        getResources(offset, limit, null, false).then((response) => {
            setOptions(response.items || []);
            setNrOfEntities(response.quantity || 0);
        });
    }, []);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            filterOptions(inputValue !== "" && inputValue.length > 2 ? inputValue : null);
        }, 1000);
    }, [inputValue]);

    const loadMore = () => {
        const tmpData = [...options];
        getResources(offset + 1, limit, inputValue !== "" && inputValue.length > 2 ? inputValue : null, false).then((response) => {
            setOffset(offset + 1);
            if (response.items) {
                setOptions([...tmpData, ...response.items]);
                setNrOfEntities(response.quantity || 0);
            }
        });
    };

    const filterOptions = (filter: string | null) => {
        getResources(1, limit, filter, false).then((response) => {
            setOffset(1);
            if (response.items) {
                setNrOfEntities(response.quantity || 0);
                setOptions(response.items || []);
            }
        });
    };

    return (
        <div>
            {label && (
                <InputLabel required={!!required} className={classes.label}>
                    {label}
                </InputLabel>
            )}
            <FormControl style={{ width: width }} className={className}>
                <Autocomplete
                    disabled={!!disabled}
                    popupIcon={<KeyboardArrowDownIcon />}
                    value={value}
                    limitTags={0}
                    renderTags={(value) => {
                        return <div className={classes.inputTextWrapper}>+{value.length}</div>;
                    }}
                    multiple
                    id="checkboxes"
                    options={
                        options.length < nrOfEntities
                            ? [
                                  {
                                      id: 0,
                                      name: languageData?.SelectAll,
                                  },
                                  ...options,
                                  { id: -1 },
                              ]
                            : [
                                  {
                                      id: 0,
                                      name: languageData?.SelectAll,
                                  },
                                  ...options,
                              ]
                    }
                    filterOptions={(options) => options}
                    disableCloseOnSelect
                    getOptionLabel={(option: Option) => option[displayField!] || ""}
                    onInputChange={(e, value, reason) => {
                        setInputValue(value);
                    }}
                    onChange={(e, dropdownValue) => {
                        if (dropdownValue.some((el) => el.id === 0)) {
                            onChange(e, options);
                        } else if (!dropdownValue.some((el) => el.id === -1)) {
                            onChange(e, dropdownValue);
                        }
                    }}
                    renderOption={(props, option) => {
                        return option.id !== -1 ? (
                            <span className={classes.row} {...props}>
                                {option.id !== 0 && (
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={value.some((el) => el.id === option.id)}
                                    />
                                )}
                                {option[displayField!]}
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
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            value={inputValue}
                            required={!!required}
                            className={inputClassName}
                            placeholder={placeholder}
                            variant="outlined"
                            disabled={!!disabled}
                        />
                    )}
                    classes={{
                        root: classes.root,
                        tag: classes.tag,
                        inputRoot:
                            classes.inputRoot +
                            " " +
                            (inputClassName ? inputClassName : classes.input) +
                            " " +
                            (inputColorClass ? inputColorClass : "") +
                            " " +
                            (disabled ? classes.disabledInput : ""),
                    }}
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

export default LazyLoadingMultiDropdown;
