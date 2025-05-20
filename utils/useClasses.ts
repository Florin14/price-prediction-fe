import { useMemo } from "react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Theme } from "@emotion/react"; // Ensure this is correctly imported based on your setup

interface StyleObject {
    [key: string]: any;
}

interface Props {
    name?: string;
    params?: any;
}

function mergeMediaQuery(obj: StyleObject): StyleObject {
    for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith("@media") && typeof value === "object") {
            for (const [innerKey, innerValue] of Object.entries(value)) {
                obj[innerKey] = { ...obj[innerKey], [key]: { ...(innerValue as any) } };
            }
            delete obj[key];
        }
    }
    return obj;
}

const useClasses = (stylesElement: ((theme: Theme, params?: any) => StyleObject) | StyleObject, props: Props) => {
    const theme = useTheme();

    return useMemo(() => {
        const rawClasses = typeof stylesElement === "function" ? stylesElement(theme, props?.params) : stylesElement;
        const prepared: StyleObject = {};
        const rawClassesMerged = mergeMediaQuery(rawClasses);

        Object.entries(rawClassesMerged).forEach(([key, value = {}]) => {
            prepared[key] = css(value, process.env.NEXT_PUBLIC_SHOW_CLASSNAMES === "true" ? { label: (props?.name ? props.name + "-" : "") + key } : undefined);
        });

        return prepared;
    }, [props?.name, props?.params, stylesElement, theme]);
};

export default useClasses;
