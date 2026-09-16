import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, leftSlot, rightSlot, invalid, ...props }, ref) => {
        if (leftSlot || rightSlot) {
            return (
                <div
                    className={cn(
                        "group flex h-11 items-center rounded-md border border-input bg-card px-3 text-sm transition-colors",
                        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background focus-within:border-ring",
                        invalid && "border-destructive focus-within:ring-destructive",
                        className
                    )}
                >
                    {leftSlot && (
                        <span className="mr-2 flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">
                            {leftSlot}
                        </span>
                    )}
                    <input
                        ref={ref}
                        type={type}
                        className="flex-1 bg-transparent py-2 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        {...props}
                    />
                    {rightSlot && (
                        <span className="ml-2 flex shrink-0 items-center text-muted-foreground [&_svg]:size-4">
                            {rightSlot}
                        </span>
                    )}
                </div>
            );
        }

        return (
            <input
                type={type}
                ref={ref}
                className={cn(
                    "flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm transition-colors",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:border-ring",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    invalid && "border-destructive focus-visible:ring-destructive",
                    className
                )}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
