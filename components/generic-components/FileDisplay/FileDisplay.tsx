import React from "react";
import moment from "moment";
import classNames from "classnames";

import { Theme } from "@mui/material/styles";
import { Box, Typography, Tooltip } from "@mui/material";

import StyledButton from "../../generic-components/StyledButton";
import ViewIcon from "../../icons/ViewIcon";
import useClasses from "../../../utils/useClasses";
import DeleteIcon from "../../icons/DeleteIcon";
import pdfIcon from "../../../assets/images/pdf.png";

const useStyles = (theme: Theme) => ({
    button: {
        padding: 0,
        margin: 0,
        width: "36px !important",
        height: "29px",
        minWidth: 29,
        display: "flex",
        justifyContent: "flex-end",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    deleteButton: {
        borderRadius: "73px",
        width: "36px !important",
        height: "29px",
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "flex-start",
        gap: "0px",
        minWidth: "29px",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        padding: "0px 10px",
        border: "1px solid #E2E8F0",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        width: "100%",
        minWidth: "400px",
        height: "55px",
        gap: "10px",
    },
    text: {
        flexGrow: 1,
        fontStyle: "Inter",
        paddingTop: "10px",
        fontWeight: 500,
        fontSize: "12px",
        color: "#00000",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
});

interface CustomStyles {
    button: any;
    deleteButton: any;
    wrapper: any;
    text: any;
}

interface FileType {
    name: string;
    date: string;
    url?: string;
    data?: BlobPart;
}

const FileDisplay: React.FC<{
    file: FileType | null;
    onRemove?: () => void;
    onClick: () => void;
    canDelete?: boolean;
    isViewable?: boolean;
    customText?: string;
    customTextClassName?: any;
    wrapperClassName?: string;
    id?: string;
}> = ({ file, onRemove, canDelete = true, onClick, isViewable = false, customText, customTextClassName, wrapperClassName, id }) => {
    const classes = useClasses(useStyles, { name: "FileDisplayStyles" }) as CustomStyles;

    if (!file) {
        return;
    }

    return (
        <Box className={classNames(classes.wrapper, wrapperClassName)}>
            <img src={pdfIcon.src} alt="PDF Icon" style={{ width: 30, height: 30 }} />

            <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
                <Tooltip title={file?.name}>
                    <Typography variant="body2" className={classes.text}>
                        {file?.name}
                    </Typography>
                </Tooltip>
                <Typography
                    variant="body2"
                    style={{
                        fontWeight: 400,
                        color: "#B9BDC7",
                        fontSize: "12px",
                        paddingBottom: "10px",
                    }}
                >
                    {moment(file?.date).format("DD.MM.YYYY")}
                </Typography>
            </Box>

            {customText && <div className={customTextClassName}>{customText}</div>}

            {(isViewable || canDelete) && (
                <Box display="flex" alignItems="center" gap="5px">
                    {isViewable && (
                        <StyledButton id={`${id}-view-button`} className={classes.button} onClick={onClick}>
                            <ViewIcon />
                        </StyledButton>
                    )}
                    {canDelete && (
                        <StyledButton id={`${id}-delete-button`} onClick={onRemove} className={classes.deleteButton}>
                            <DeleteIcon />
                        </StyledButton>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default FileDisplay;
