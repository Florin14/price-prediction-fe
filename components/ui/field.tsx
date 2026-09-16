import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
    required?: boolean;
    htmlFor?: string;
    children: React.ReactNode;
}

export function Field({ label, hint, error, required, htmlFor, children, className, ...props }: FieldProps) {
    return (
        <div className={cn("flex flex-col gap-1.5", className)} {...props}>
            {label && (
                <Label htmlFor={htmlFor} required={required}>
                    {label}
                </Label>
            )}
            {children}
            {error ? (
                <span className="text-xs text-destructive">{error}</span>
            ) : hint ? (
                <span className="text-xs text-muted-foreground">{hint}</span>
            ) : null}
        </div>
    );
}
