import React, { useEffect, useRef } from "react";
import { useField } from "formik";
import { FormControl, FormHelperText } from "@mui/material";
import { styled } from "@mui/system";
import moment, { Moment } from "moment";
import StyledDatepicker, { DatePickerTypesEnum } from "../StyledDatepicker";

const StyledLabel = styled("label")({
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#667085",
    marginBottom: 3,
});

interface FormDateTimePickerProps {
    minDate?: string;
    maxDate?: string;
    label: string;
    name: string;
    disabled?: boolean;
    required?: boolean;
    datePickerClassName?: string;
    type?: typeof DatePickerTypesEnum;
}

const FormDateTimePicker: React.FC<FormDateTimePickerProps> = React.memo(
    ({ label, name, disabled, required, minDate, maxDate, datePickerClassName }) => {
        const [field, meta, helpers] = useField(name);
        const inputRef = useRef<HTMLInputElement>(null);
        const formattedMinDate = minDate ? moment(minDate, "DD.MM.YYYY") : undefined;
        const formattedMaxDate = maxDate ? moment(maxDate, "DD.MM.YYYY") : undefined;

        const handleDateTimeChange = (date: Moment | null) => {
            helpers.setValue(date);
        };

        const handleBlur = () => {
            const date = moment(field.value, "DD.MM.YYYY", true);
            if (field.value && (!date.isValid() || (formattedMinDate && date < formattedMinDate) || (formattedMaxDate && date > formattedMaxDate))) {
                helpers.setValue(null);
            }
        };

        useEffect(() => {
            if (inputRef.current) {
                const inputElement = inputRef.current as HTMLInputElement;
                inputElement.addEventListener("blur", handleBlur);

                return () => {
                    inputElement.removeEventListener("blur", handleBlur);
                };
            }
        }, [field.value]); // Re-run effect if field.value changes

        return (
            <FormControl fullWidth error={meta.touched && Boolean(meta.error)} data-testid={`form-date-time-picker-${name}`}>
                {label && (
                    <StyledLabel>
                        {label}
                        {required && <span>*</span>}
                    </StyledLabel>
                )}
                <StyledDatepicker
                    type={DatePickerTypesEnum.Date}
                    value={field.value}
                    onChange={handleDateTimeChange}
                    activeLabel={false} // Changed to false since we're handling the label separately
                    disabled={disabled}
                    required={required}
                    minDate={new Date(formattedMinDate ? formattedMinDate.format("YYYY-MM-DD") : "")}
                    maxDate={new Date(formattedMaxDate ? formattedMaxDate.format("YYYY-MM-DD") : "")}
                    inputComponent={true}
                    placeholder="DD.MM.YYYY"
                    format="DD.MM.YYYY"
                    mask="__.__.____"
                    datePickerClassName={datePickerClassName}
                    textFieldReadOnly={disabled}
                    width={"100%"}
                    inputRef={inputRef} // Attach the ref to the input element
                    {...(meta.touched && meta.error ? { error: true, helperText: meta.error } : {})}
                />
                {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
            </FormControl>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.label === nextProps.label &&
            prevProps.name === nextProps.name &&
            prevProps.disabled === nextProps.disabled &&
            prevProps.required === nextProps.required &&
            prevProps.minDate === nextProps.minDate &&
            prevProps.maxDate === nextProps.maxDate
        );
    }
);

export default FormDateTimePicker;
