import cssVariables from "../../../assets/css/variables";

export interface NaturalPersonsPropStyles {
    tableContainer: any;
    tableRootWithPagination: any;
    actionsCell: any;
    cell: any;
    firstCell: any;
    firstBreakWordCell: any;
    isDefaultCell: any;
    validateButton: any;
}

const NaturalPersonsComponentStyles = (_theme: any): NaturalPersonsPropStyles => ({
    tableRootWithPagination: {
        width: "100%",
        height: "calc(100% - 54px) !important",
        borderRadius: "8px",
        "& .MuiTable-root": {
            borderRadius: "8px !important",
        },
        "& .TableRoot": {
            borderRadius: "8px !important",
        }
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
        height: "calc(100vh - 133px)",
        backgroundColor: "white",
    },
    validateButton: {
        width: "86px",
        height: "24px"
    },
});

export default NaturalPersonsComponentStyles;