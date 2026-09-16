import * as React from "react";
import { useSelector } from "react-redux";
import { Brain, Database, MapPin, Loader2 } from "lucide-react";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";

interface PredictionLoadingOverlayProps {
    active: boolean;
}

const STEP_KEYS = [
    { icon: Database, key: "AnalyzingData" },
    { icon: MapPin, key: "LocatingComparables" },
    { icon: Brain, key: "RunningModels" },
];

export default function PredictionLoadingOverlay({ active }: PredictionLoadingOverlayProps) {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const [step, setStep] = React.useState(0);

    React.useEffect(() => {
        if (!active) return;
        setStep(0);
        const id = setInterval(() => setStep((s) => (s + 1) % STEP_KEYS.length), 1100);
        return () => clearInterval(id);
    }, [active]);

    if (!active) return null;

    return (
        <div className="fixed inset-0 z-[1600] flex items-center justify-center bg-background/70 backdrop-blur-md">
            <div className="flex w-full max-w-md flex-col items-center gap-7 rounded-2xl border border-border bg-card px-8 py-10 shadow-lift">
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                    <span className="absolute inset-2 rounded-full bg-primary/10" />
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>

                <div className="text-center">
                    <h3 className="font-display text-xl font-medium tracking-tight">
                        {(languageData as any)?.PredictionLoading?.title || "Computing your estimate"}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {(languageData as any)?.PredictionLoading?.subtitle ||
                            "Cross-referencing 117K+ listings and running the ensemble model."}
                    </p>
                </div>

                <ul className="flex w-full flex-col gap-2">
                    {STEP_KEYS.map((s, i) => {
                        const Icon = s.icon;
                        const done = i < step;
                        const active = i === step;
                        return (
                            <li
                                key={s.key}
                                className={cn(
                                    "flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm transition-colors",
                                    active && "border-border bg-secondary/60",
                                    done && "opacity-60"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "h-4 w-4 shrink-0 transition-colors",
                                        active ? "text-primary" : done ? "text-muted-foreground" : "text-muted-foreground/60"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "transition-colors",
                                        active ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {(languageData as any)?.PredictionLoading?.[s.key] || s.key}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
