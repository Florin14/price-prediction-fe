import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { Tooltip } from "@mui/material";
import { Theme } from "@mui/material/styles";

import useClasses from "../../../utils/useClasses";

interface ClassNames {
    fileName: any;
    name: any;
    clickable: any;
    extension: any;
}

const useStyles = (theme: Theme) => ({
    fileName: {
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
    },
    name: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    clickable: {
        color: "#1F43FF",
        textDecoration: "underline",
        cursor: "pointer",
    },
    extension: {
        minWidth: 25,
    }
});

interface StyledFileNameProps {
    value?: string | null;
    fileClassName?: string;
    nameClassName?: string;
    extensionClassName?: string;
    clickable?: boolean;
    onClick?: () => void;
    activeTooltip?: boolean;
    width?: string | number;
    [key: string]: any;
}

const StyledFileName: React.FC<StyledFileNameProps> = ({
    value = null,
    fileClassName,
    nameClassName,
    extensionClassName,
    clickable = false,
    onClick,
    activeTooltip = false,
    width,
    ...rest
}) => {
    const classes = useClasses(useStyles, { name: "CustomFileNameStyles" }) as ClassNames;

    const [fileName, setFileName] = useState<string>("");
    const [extension, setExtension] = useState<string>("");

    useEffect(() => {
        if (value) {
            const lastDotIndex = value.lastIndexOf(".");
            setExtension(value.substring(lastDotIndex));
            setFileName(value.substring(0, lastDotIndex));
        }
    }, [value]);

    return (
        <Tooltip title={activeTooltip ? value : ""} followCursor>
            <div
                className={classNames(classes.fileName, fileClassName, { [classes.clickable]: clickable })}
                onClick={clickable ? onClick : undefined}
                style={{ width }}
                {...rest}
            >
                <span className={classNames(classes.name, nameClassName)}>{fileName}</span>
                <span className={classNames(classes.extension, extensionClassName)}>{extension}</span>
            </div>
        </Tooltip>
    );
};

export default StyledFileName;
