import * as React from "react";
import { cn } from "@/lib/utils";

interface HeroIllustrationProps extends React.SVGAttributes<SVGSVGElement> {
    className?: string;
}

/**
 * Stylized Romanian neighbourhood skyline — matte editorial feel.
 * Uses design-system tokens: forest (sky), cream (facade), terracotta (lit windows),
 * gold (pin accents). Fully responsive via preserveAspectRatio.
 */
export function HeroIllustration({ className, ...props }: HeroIllustrationProps) {
    return (
        <svg
            viewBox="0 0 400 500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className={cn("block h-full w-full", className)}
            aria-hidden="true"
            {...props}
        >
            <defs>
                <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
                    <stop offset="55%" stopColor="hsl(var(--terracotta))" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="heroGround" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--card))" stopOpacity="0" />
                    <stop offset="100%" stopColor="hsl(var(--card))" stopOpacity="1" />
                </linearGradient>
                <pattern id="grain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                    <rect width="3" height="3" fill="hsl(var(--foreground))" fillOpacity="0.015" />
                </pattern>
            </defs>

            {/* Warm sky */}
            <rect width="400" height="500" fill="hsl(var(--card))" />
            <rect width="400" height="500" fill="url(#heroSky)" />

            {/* Soft sun */}
            <circle cx="310" cy="120" r="58" fill="hsl(var(--gold))" fillOpacity="0.18" />
            <circle cx="310" cy="120" r="30" fill="hsl(var(--gold))" fillOpacity="0.22" />

            {/* Topographic contour lines — subtle depth */}
            <g stroke="hsl(var(--primary))" strokeOpacity="0.14" fill="none" strokeWidth="1">
                <path d="M0 220 Q 100 200 200 215 T 400 210" />
                <path d="M0 250 Q 120 232 220 248 T 400 240" />
                <path d="M0 278 Q 140 265 240 275 T 400 268" />
            </g>

            {/* Back building row — pale */}
            <g fill="hsl(var(--primary))" fillOpacity="0.16">
                <rect x="10" y="295" width="52" height="150" />
                <rect x="70" y="270" width="46" height="175" />
                <rect x="320" y="285" width="60" height="160" />
                <rect x="258" y="310" width="48" height="135" />
            </g>

            {/* Foreground apartment block — Romanian bloc silhouette */}
            <g>
                <rect x="120" y="230" width="130" height="215" fill="hsl(var(--primary))" fillOpacity="0.85" />
                {/* Flat roof lip */}
                <rect x="116" y="226" width="138" height="6" fill="hsl(var(--primary))" />
                {/* Window grid 4 cols × 6 rows */}
                {Array.from({ length: 6 }).map((_, row) =>
                    Array.from({ length: 4 }).map((_, col) => {
                        const x = 132 + col * 28;
                        const y = 246 + row * 28;
                        const lit = (row + col) % 3 === 0;
                        return (
                            <rect
                                key={`w-${row}-${col}`}
                                x={x}
                                y={y}
                                width="18"
                                height="18"
                                rx="1"
                                fill={lit ? "hsl(var(--terracotta))" : "hsl(var(--card))"}
                                fillOpacity={lit ? 0.9 : 0.25}
                            />
                        );
                    })
                )}
                {/* Entrance */}
                <rect x="175" y="410" width="20" height="35" fill="hsl(var(--card))" fillOpacity="0.6" />
            </g>

            {/* Side villa — pitched roof */}
            <g fill="hsl(var(--foreground))" fillOpacity="0.7">
                <polygon points="60,310 95,285 130,310" />
                <rect x="65" y="310" width="60" height="135" />
                {/* Villa windows */}
                <rect x="75" y="330" width="16" height="20" fill="hsl(var(--gold))" fillOpacity="0.9" />
                <rect x="99" y="330" width="16" height="20" fill="hsl(var(--card))" fillOpacity="0.35" />
                <rect x="75" y="360" width="16" height="20" fill="hsl(var(--card))" fillOpacity="0.35" />
                <rect x="99" y="360" width="16" height="20" fill="hsl(var(--terracotta))" fillOpacity="0.9" />
                <rect x="87" y="400" width="16" height="45" fill="hsl(var(--card))" fillOpacity="0.45" />
            </g>

            {/* Right low-rise */}
            <g fill="hsl(var(--foreground))" fillOpacity="0.5">
                <rect x="258" y="325" width="60" height="120" />
                <rect x="268" y="340" width="10" height="14" fill="hsl(var(--terracotta))" fillOpacity="0.85" />
                <rect x="285" y="340" width="10" height="14" fill="hsl(var(--card))" fillOpacity="0.35" />
                <rect x="302" y="340" width="10" height="14" fill="hsl(var(--card))" fillOpacity="0.35" />
                <rect x="268" y="362" width="10" height="14" fill="hsl(var(--card))" fillOpacity="0.35" />
                <rect x="285" y="362" width="10" height="14" fill="hsl(var(--terracotta))" fillOpacity="0.85" />
                <rect x="302" y="362" width="10" height="14" fill="hsl(var(--card))" fillOpacity="0.35" />
                <rect x="268" y="384" width="10" height="14" fill="hsl(var(--card))" fillOpacity="0.35" />
                <rect x="285" y="384" width="10" height="14" fill="hsl(var(--card))" fillOpacity="0.35" />
                <rect x="302" y="384" width="10" height="14" fill="hsl(var(--gold))" fillOpacity="0.85" />
            </g>

            {/* Trees — minimal */}
            <g fill="hsl(var(--primary))" fillOpacity="0.5">
                <circle cx="44" cy="420" r="18" />
                <rect x="42" y="420" width="4" height="25" />
                <circle cx="330" cy="425" r="14" />
                <rect x="329" y="425" width="3" height="20" />
                <circle cx="348" cy="430" r="10" />
                <rect x="347" y="430" width="2" height="15" />
            </g>

            {/* Ground line */}
            <rect x="0" y="445" width="400" height="55" fill="url(#heroGround)" />
            <line x1="0" y1="445" x2="400" y2="445" stroke="hsl(var(--border))" strokeWidth="1" />

            {/* Floating map pins with dots */}
            <g>
                <circle cx="185" cy="175" r="4" fill="hsl(var(--terracotta))" />
                <circle cx="185" cy="175" r="10" fill="hsl(var(--terracotta))" fillOpacity="0.2" />
                <circle cx="90" cy="200" r="3" fill="hsl(var(--gold))" />
                <circle cx="90" cy="200" r="8" fill="hsl(var(--gold))" fillOpacity="0.25" />
                <circle cx="295" cy="165" r="3" fill="hsl(var(--primary))" />
                <circle cx="295" cy="165" r="8" fill="hsl(var(--primary))" fillOpacity="0.22" />
            </g>

            {/* Subtle grain overlay */}
            <rect width="400" height="500" fill="url(#grain)" />
        </svg>
    );
}

export default HeroIllustration;
