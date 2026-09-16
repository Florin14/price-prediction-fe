export interface PasswordRule {
    key: "upper" | "lower" | "digit" | "special" | "length";
    valid: boolean;
}

const RULES = {
    upper: /[A-Z]/,
    lower: /[a-z]/,
    digit: /[0-9]/,
    special: /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]/,
};

export function validatePassword(value: string): PasswordRule[] {
    return [
        { key: "length", valid: value.length >= 8 },
        { key: "upper", valid: RULES.upper.test(value) },
        { key: "lower", valid: RULES.lower.test(value) },
        { key: "digit", valid: RULES.digit.test(value) },
        { key: "special", valid: RULES.special.test(value) },
    ];
}

export function allValid(rules: PasswordRule[]): boolean {
    return rules.every((r) => r.valid);
}
