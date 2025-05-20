import { Theme } from "@mui/material/styles";
import cssVariables from "./variables";

export interface SimpleTableCrudStyle {
    gridWrapper: any;
    cell: any;
    noBorderCell: any;
    actionsCell: any;
    pagination: any;
    leftSmallButton: any;
    iconButton: any;
    addButton: any;
    modalBody: any;
    modalField: any;
    error: any;
    tableWrapper: any;
    table: any;
    [key: string]: any; // For any additional class names
}

const simpleTableCrudStyle = (theme: Theme): SimpleTableCrudStyle => ({
    gridWrapper: {
        width: `calc(100% - ${cssVariables.smallMargin})`,
        margin: cssVariables.smallestMargin,
        height: `calc(100% - ${cssVariables.smallMargin})`,
        backgroundColor: theme.palette.common.white,
        padding: `calc(${cssVariables.smallMargin} + ${cssVariables.smallestMargin}) 0`,
        borderRadius: cssVariables.defaultBorderRadius,
        boxShadow: cssVariables.defaultBoxShadow,
    },
    cell: {
        background: theme.palette.common.white,
        padding: `0 ${cssVariables.smallMargin}`,
        height: 45,
        width: "auto",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#b4b4b4",
    },
    noBorderCell: {
        borderBottom: "none",
    },
    actionsCell: {
        background: theme.palette.common.white,
        padding: `0 ${cssVariables.smallMargin}`,
        height: "45px",
        width: "160px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#b4b4b4",
    },
    pagination: {
        borderBottomRightRadius: cssVariables.defaultBorderRadius,
        borderBottomLeftRadius: cssVariables.defaultBorderRadius,
        marginTop: cssVariables.defaultMargin,
    },
    leftSmallButton: {
        marginRight: cssVariables.smallMargin,
    },
    iconButton: {
        color: theme.palette.secondary.main,
        border: "1px solid #9a9a9a",
        "&:hover": {
            backgroundColor: "#eeeeee",
        },
        boxShadow: "0",
        borderRadius: "0px !important",
        width: "25px !important",
        height: "25px !important",
        minWidth: "25px !important",
        padding: 0,
        backgroundColor: theme.palette.common.white,
    },
    addButton: {
        width: "178px",
        backgroundColor: theme.palette.grey["200"],
        color: theme.palette.primary.main,
        border: "1px solid #9a9a9a",
        height: "40px",
        borderRadius: "3px",
        marginLeft: cssVariables.smallMargin,
    },
    modalBody: {
        width: "300px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#b4b4b4",
    },
    modalField: {
        marginBottom: cssVariables.defaultMargin,
    },
    error: {
        fontSize: 10,
        lineHeight: "12px",
        fontWeight: 500,
        fontStyle: "normal",
        color: "red",
    },
    tableWrapper: {
        height: "100%",
        background: theme.palette.common.white,
        borderRadius: cssVariables.defaultBorderRadius,
        minHeight: "300px",
    },
    table: {
        borderTopLeftRadius: cssVariables.defaultBorderRadius,
        borderTopRightRadius: cssVariables.defaultBorderRadius,
    },
});

export default simpleTableCrudStyle;
