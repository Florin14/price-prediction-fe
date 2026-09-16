import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
    label: React.ReactNode;
    value: React.ReactNode;
    suffix?: React.ReactNode;
    hint?: React.ReactNode;
    trend?: "up" | "down" | "flat";
    display?: boolean;
}

export function Stat({ label, value, suffix, hint, trend, display, className, ...props }: StatProps) {
    return (
        <div className={cn("flex flex-col gap-1", className)} {...props}>
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
            <div className="flex items-baseline gap-1.5">
                <span
                    className={cn(
                        "tabular-nums leading-none",
                        display ? "font-display text-3xl font-medium tracking-tight md:text-4xl" : "text-xl font-semibold"
                    )}
                >
                    {value}
                </span>
                {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
            </div>
            {hint && (
                <span
                    className={cn(
                        "text-xs",
                        trend === "up" && "text-[hsl(var(--success))]",
                        trend === "down" && "text-destructive",
                        !trend && "text-muted-foreground"
                    )}
                >
                    {hint}
                </span>
            )}
        </div>
    );
}
