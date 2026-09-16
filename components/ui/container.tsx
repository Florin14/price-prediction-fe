import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
    variants: {
        size: {
            sm: "max-w-3xl",
            md: "max-w-5xl",
            lg: "max-w-6xl",
            xl: "max-w-7xl",
            "2xl": "max-w-[88rem]",
            full: "max-w-none",
        },
    },
    defaultVariants: { size: "xl" },
});

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export function Container({ className, size, ...props }: ContainerProps) {
    return <div className={cn(containerVariants({ size }), className)} {...props} />;
}
