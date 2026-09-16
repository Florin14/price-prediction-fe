import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
    active: boolean;
    children: React.ReactNode;
    label?: string;
}

export default function LoadingOverlay({ active, children, label = "Loading..." }: LoadingOverlayProps) {
    return (
        <div className="relative h-full w-full">
            {children}
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 z-[1500] flex items-center justify-center bg-background/50 backdrop-blur-sm transition-opacity duration-200",
                    active ? "opacity-100 pointer-events-auto" : "opacity-0"
                )}
                aria-hidden={!active}
            >
                <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-6 py-5 shadow-lift">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </div>
            </div>
        </div>
    );
}
