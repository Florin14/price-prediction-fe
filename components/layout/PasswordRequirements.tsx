import * as React from "react";
import { Check, Minus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PasswordRule } from "@/lib/password";
import { cn } from "@/lib/utils";

const LABEL_KEY: Record<PasswordRule["key"], keyof Record<string, string>> = {
    length: "LengthMessage",
    upper: "UpperCaseMessage",
    lower: "LowerCaseMessage",
    digit: "DigitMessage",
    special: "SpecialCharMessage",
};

export function PasswordRequirements({ rules, className }: { rules: PasswordRule[]; className?: string }) {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    return (
        <ul className={cn("grid gap-1.5", className)}>
            {rules.map((r) => {
                const label = (languageData as any)?.[LABEL_KEY[r.key]] || r.key;
                return (
                    <li
                        key={r.key}
                        className={cn(
                            "flex items-center gap-2 text-xs transition-colors",
                            r.valid ? "text-[hsl(var(--success))]" : "text-muted-foreground"
                        )}
                    >
                        <span
                            className={cn(
                                "flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors",
                                r.valid
                                    ? "border-[hsl(var(--success))] bg-[hsl(var(--success))]/10"
                                    : "border-border bg-transparent"
                            )}
                        >
                            {r.valid ? <Check className="h-2.5 w-2.5" /> : <Minus className="h-2 w-2" />}
                        </span>
                        <span>{label}</span>
                    </li>
                );
            })}
        </ul>
    );
}
