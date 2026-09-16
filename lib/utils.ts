import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(value: number | null | undefined, currency: "EUR" | "RON" = "EUR"): string {
    if (value === null || value === undefined || isNaN(value)) return "—";
    const symbol = currency === "EUR" ? "€" : "lei";
    const formatted = new Intl.NumberFormat("ro-RO", {
        maximumFractionDigits: 0,
    }).format(value);
    return `${formatted} ${symbol}`;
}

export function formatNumber(value: number | null | undefined, digits: number = 0): string {
    if (value === null || value === undefined || isNaN(value)) return "—";
    return new Intl.NumberFormat("ro-RO", {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
    }).format(value);
}

export function formatArea(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) return "—";
    return `${formatNumber(value, 0)} m²`;
}
