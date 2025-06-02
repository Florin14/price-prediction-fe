export const PLATFORM_NAME: string = "Predict Real Estate Prices";

export const upperCaseRegex = new RegExp("(?=.*[A-Z])");
export const lowerCaseRegex = new RegExp("(?=.*[a-z])");
export const digitRegex = new RegExp("(?=.*[0-9])");
export const specialCharRegex = new RegExp("(?=.*[~`!@#$%^&*()_\\-+={\\[}\\]|:;\"'<,>.?/])");

interface ValidationItem {
    valid: boolean;
    message: string;
}

export interface ValidationState {
    upperCaseValidation: ValidationItem;
    lowerCaseValidation: ValidationItem;
    digitValidation: ValidationItem;
    specialCharValidation: ValidationItem;
    lengthValidation: ValidationItem;
}
