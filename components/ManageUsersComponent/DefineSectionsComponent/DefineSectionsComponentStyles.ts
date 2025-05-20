import zIndex from "@mui/material/styles/zIndex";
import cssVariables from "../../../assets/css/variables";

export interface DefineSectionsPropStyles {
    button: any;
    tableContainer: any;
    tableRootWithPagination: any;
    actionsCell: any;
    cell: any;
    firstCell: any;
    menuItem: any;
    deleteMenuItem: any;
    menuIcon: any;
    menuText: any;
    deleteText: any;
    firstBreakWordCell: any;
    isDefaultCell: any;
    tableComponentClass: any;
}

const DefineSectionsComponentStyles = (_theme: any): DefineSectionsPropStyles => ({
    tableRootWithPagination: {
        width: "100%",
        height: "calc(100% - 100px) !important",
    },
    isDefaultCell: {
        color: "#667085 !important",
    },
    actionsCell: {
        position: "sticky",
        right: 0,
        zIndex: 1,
        borderBottom: "1px solid #E2E8F0",
        background: _theme.palette.common.white,
        padding: `0px 0px 0px 70px`,
        height: 20,
        width: "133px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: "22px",
        color: "#313A47",
    },
    cell: {
        borderBottom: "1px solid #E2E8F0",
        background: _theme.palette.common.white,
        width: "auto",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: "22px",
        color: "#313A47",
        padding: `${cssVariables.smallMargin} ${cssVariables.smallMargin}`,
        height: "auto",
        minHeight: "38px",
    },
    firstCell: {
        borderBottom: "1px solid #E2E8F0",
        background: _theme.palette.common.white,
        width: "auto",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: "22px",
        color: "#313A47",
        padding: `${cssVariables.smallMargin} ${cssVariables.defaultMargin}`,
        height: "auto",
        minHeight: "58px",
    },
    firstBreakWordCell: {
        padding: `0px 0px 0px ${cssVariables.defaultMargin}`,
        wordBreak: "break-word",
        maxWidth: "200px",
        color: "#313A47",
        height: 34,
    },
    tableContainer: {
        height: "calc(100% - 3px)",
        backgroundColor: "white",
    },
    menuItem: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        fontSize: "14px",
        color: "#313A47",
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
    },
    deleteMenuItem: {
        color: "#D92D20",
    },
    menuIcon: {
        width: "21px",
        height: "21px",
    },
    menuText: {
        fontWeight: 500,
    },
    deleteText: {
        fontWeight: 500,
        color: "#D92D20",
    },
    button: {
        width: 183,
        fontSize: 12,
        fontWeight: 500,
        padding: "10px 6px 10px 6px",
        fontFamily: "Inter",
        gap: 6,
        borderRadius: "5px",
        marginLeft: cssVariables.smallMargin,
    },
    tableComponentClass: {
        height: "calc(100% - 1px)",
    },
});

export default DefineSectionsComponentStyles;
