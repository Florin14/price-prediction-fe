import { Tooltip, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const TruncateText = ({ text, maxLines }: { text: string; maxLines: number }) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIfTruncated = () => {
            if (textRef.current) {
                const isOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight;
                setIsTruncated(isOverflowing);
            }
        };

        checkIfTruncated();
    }, [text, maxLines]);

    return (
        <Tooltip title={isTruncated ? text : ""} arrow>
            <Typography
                ref={textRef}
                style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: maxLines,
                    WebkitBoxOrient: "vertical",
                    lineHeight: "1.2em",
                    maxHeight: `${maxLines * 1.2}em`,
                }}
            >
                {text}
            </Typography>
        </Tooltip>
    );
};