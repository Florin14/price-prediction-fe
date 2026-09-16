import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BrandProps extends React.HTMLAttributes<HTMLAnchorElement> {
    size?: "sm" | "md" | "lg";
    href?: string;
}

/**
 * Brand wordmark — "Domus" is a placeholder; rename the constant below to ship.
 */
export const BRAND_NAME = "Domus";

export function BrandMark({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
    const sizes = { sm: 18, md: 22, lg: 28 };
    const s = sizes[size];
    return (
        <svg
            width={s}
            height={s}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("shrink-0 text-primary", className)}
            aria-hidden="true"
        >
            <path
                d="M4 14L16 4L28 14V26C28 27.1 27.1 28 26 28H20V20H12V28H6C4.9 28 4 27.1 4 26V14Z"
                fill="currentColor"
                fillOpacity="0.12"
            />
            <path
                d="M4 14L16 4L28 14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 14V26C6 27.1 6.9 28 8 28H12V19C12 18.4 12.4 18 13 18H19C19.6 18 20 18.4 20 19V28H24C25.1 28 26 27.1 26 26V14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export const Brand = React.forwardRef<HTMLAnchorElement, BrandProps>(
    ({ className, size = "md", href = "/home", ...props }, ref) => {
        const textSize = { sm: "text-lg", md: "text-xl", lg: "text-2xl" }[size];
        return (
            <Link
                href={href}
                ref={ref}
                className={cn("group inline-flex items-center gap-2 select-none", className)}
                {...props}
            >
                <BrandMark size={size} />
                <span
                    className={cn(
                        "font-display font-medium tracking-tight text-foreground transition-colors group-hover:text-primary",
                        textSize
                    )}
                >
                    {BRAND_NAME}
                </span>
            </Link>
        );
    }
);
Brand.displayName = "Brand";
