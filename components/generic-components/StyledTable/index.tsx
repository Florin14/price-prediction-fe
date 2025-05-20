import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import {
    Table as MuiTable,
    Skeleton,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    TableBody,
    TablePagination,
    Typography,
    TableSortLabel,
    Checkbox,
} from "@mui/material";

import { RootState } from "../../../store";

import useClasses from "../../../utils/useClasses";
import cssVariables from "../../../assets/css/variables";
import StyledButton from "../StyledButton";
import FilterIcon from "../../icons/FilterIcon";
import StyledTooltip from "../StyledTooltip";
import TableInfoIcon from "../../icons/TableInfoIcon";

interface StyledTableProps {
    renderRow: (item: any, isLast: boolean) => React.ReactNode;
    data: any[];
    titles?: { [key: string]: any };
    loadingElements?: React.ReactNode;
    className?: string;
    enablePagination?: boolean;
    onPageChange?: (page: number, size: number) => void;
    pageSize?: number;
    pageTotal?: number;
    button?: React.ReactNode;
    paginationLabel?: string;
    containerClassName?: string;
    paginationClassName?: string;
    excludedLabels?: string[];
    hasFilters?: boolean;
    hasHeaderSection?: boolean;
    startSortingDirection?: "asc" | "desc";
    headerComponent?: React.ReactNode;
    tableComponentClass?: string;
    stickyHeader?: string;
    handleFilterClick?: () => void;
    sortBy?: string;
    sortType?: string;
    rows?: string;
    page?: string;
    checkBoxClassname?: string;
    selectAllHandler?: () => void;
    allSelected?: boolean;
}

interface StyledTableStyles {
    root: any;
    container: any;
    searchButton: any;
    form: any;
    cell: any;
    tableBody: any;
    createOfferProduct: any;
    actionsWrapper: any;
    paginationWrapper: any;
    tableContainer: any;
    footer: any;
    tableRoot: any;
    noBorderCell: any;
    noResultsWrapper: any;
    firstElementWrapper: any;
    tableHeaderSection: any;
    filterButton: any;
    tooltipCell: any;
    headerComponentWrapper: any;
    stickyHeader: any;
    menuItem: any;
    listItemText: any;
}

const useStyles = (theme: any) => ({
    root: {
        width: "100%",
    },
    menuItem: {
        fontSize: "12px",
        fontWeight: 400,
        fontFamily: "Inter",
    },
    listItemText: {
        fontSize: "12px",
        fontWeight: 400,
        fontFamily: "Inter",
    },
    container: {
        height: "100%",
    },
    searchButton: {
        margin: 6,
    },
    form: {
        marginBottom: 8,
    },
    tooltipCell: {
        display: "flex",
        alignItems: "center",
        gap: cssVariables.smallMargin,
    },
    cell: {
        background: "#F8FAFC",
        borderTop: "1px solid #E2E8F0",
        padding: `0 ${cssVariables.smallMargin}`,
        height: "45px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "15px",
        color: theme.palette.grey.text,
        left: "unset",
        "&:first-child": {
            paddingLeft: cssVariables.defaultMargin,
        },
    },
    tableBody: {
        background: "white",
        "& td": {
            color: "#313A47",
            fontSize: "12px",
            fontWeight: 400,
            minHeight: "38px",
            height: "38px",
        },
        "& td:not(:first-of-type)": {
            paddingLeft: cssVariables.smallMargin,
        },
    },
    createOfferProduct: {
        width: "168px",
        backgroundColor: theme.palette.secondary.main,
        border: "1px solid #9a9a9a",
        color: "white",
        height: "40px",
        marginLeft: "20px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
        borderRadius: "3px",
    },
    actionsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "0px 0px 8px 8px",
    },
    paginationWrapper: {
        borderBottom: "none",
        padding: 0,
    },
    tableContainer: {
        position: "relative",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    tableComponentClass: {},
    tableRoot: {
        width: "100%",
        overflowX: "auto",
        height: `calc(100% - 50px)`,
        backgroundColor: "white",
        borderLeft: "1px solid #E2E8F0",
        borderRight: "1px solid #E2E8F0",
    },
    noBorderCell: {
        borderBottom: "none",
    },
    noResultsWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& .MuiTypography-body1": {
            color: theme.palette.grey.text,
            fontSize: "12px",
            fontWeight: "800",
            lineHeight: "15px",
        },
    },
    firstElementWrapper: {},
    tableHeaderSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        height: "50px",
        backgroundColor: "white",
        borderRadius: "8px 8px 0px 0px",
        borderTop: "1px solid #E2E8F0",
        borderLeft: "1px solid #E2E8F0",
        borderRight: "1px solid #E2E8F0",
    },
    filterButton: {
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        fontSize: "12px",
        cursor: "pointer",
        padding: "6px 12px",
        borderRadius: "8px",
        marginLeft: "auto",
        height: 35,
    },
    headerComponentWrapper: {
        display: "flex",
        alignItems: "center",
    },
    stickyHeader: {
        position: "sticky",
        right: 0,
    },
    [theme.breakpoints.down(410)]: {
        createOfferProduct: {
            marginLeft: 0,
            marginTop: "15px",
        },
    },
});

const RenderRow: React.FC<{ renderRow: (item: any, isLast: boolean) => React.ReactNode; item: any; isLast: boolean }> = ({ renderRow, item, isLast }) => {
    return renderRow(item, isLast);
};

const LoadingElement: React.FC<{ colSpan: number }> = ({ colSpan }) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan}>
                <Skeleton height={30} variant="rectangular" />
            </TableCell>
        </TableRow>
    );
};

const StyledTable = forwardRef<HTMLDivElement, StyledTableProps>(
    (
        {
            renderRow,
            data,
            titles,
            loadingElements,
            className,
            enablePagination,
            hasFilters,
            onPageChange,
            pageSize,
            pageTotal,
            button,
            paginationLabel,
            containerClassName,
            hasHeaderSection = true,
            paginationClassName,
            excludedLabels = [],
            headerComponent,
            tableComponentClass,
            stickyHeader,
            sortBy = "sortBy",
            sortType = "sortType",
            rows = "rows",
            page = "page",
            checkBoxClassname,
            selectAllHandler,
            allSelected,
            handleFilterClick = () => {},
        },
        ref
    ) => {
        const [order, setOrder] = useState<"asc" | "desc">("asc");
        const [orderBy, setOrderBy] = useState<string | null>(null);
        const [currentPage, setCurrentPage] = useState<number>(0);
        const [size, setSize] = useState<number>(pageSize || data.length);
        const languageData = useSelector((state: RootState) => state.website.languageData);
        const [initialRender, setInitialRender] = useState<boolean>(true);
        const firstElementRef = useRef<HTMLTableRowElement | null>(null);

        const classes = useClasses(useStyles, { name: "styledTableStyles" }) as StyledTableStyles;
        const router = useRouter();

        useImperativeHandle(ref, (): any => ({
            resetPage() {
                setCurrentPage(0);
            },
            scrollAtTheTop() {
                firstElementRef.current?.scrollIntoView();
            },
        }));

        useEffect(() => {
            if (router.isReady && titles) {
                setOrder((router.query?.[sortType] as "asc" | "desc") || "asc");
                setOrderBy((router.query?.[sortBy] as string) || Object.entries(titles)[0][0] || null);
            }
        }, [router, router.isReady, titles]);

        useEffect(() => {
            if (!initialRender) {
                const routerObj = { ...router.query };
                if (routerObj?.[page]) {
                    const pageItems = Number(routerObj[page]);
                    if (data && data.length === 0 && pageItems > 1) {
                        const newPage = pageItems - 1;
                        setCurrentPage(newPage - 1);
                        routerObj[page] = newPage.toString();
                        router.push({ pathname: router.pathname, query: routerObj }).then((_) => {});
                    }
                }
            } else {
                setInitialRender(false);
            }
        }, [data]);

        const requestSort = (property: string, event: React.MouseEvent) => {
            const isAsc = orderBy === property && order === "asc";

            const routerObj = { ...router.query };
            routerObj[sortBy] = property;
            routerObj[sortType] = isAsc ? "desc" : "asc";

            router.push({ pathname: router.pathname, query: routerObj }).then(() => {});

            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(property);
        };

        return (
            <div className={tableComponentClass} style={{ borderRadius: "8px" }}>
                {hasHeaderSection && (
                    <>
                        <div className={classes.tableHeaderSection}>
                            <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                                {hasFilters && (
                                    <StyledButton
                                        variant="outlined"
                                        size="small"
                                        startIcon={<FilterIcon />}
                                        className={classes.filterButton}
                                        onClick={handleFilterClick}
                                    >
                                        {languageData?.Filter}
                                    </StyledButton>
                                )}
                                <div className={classes.headerComponentWrapper}>{headerComponent}</div>
                            </div>
                        </div>
                    </>
                )}
                <div className={`${classes.tableContainer} ${containerClassName || ""}`} ref={ref}>
                    {data && data.length > 0 ? (
                        <TableContainer className={`${classes.tableRoot} ${className ? className : ""}`}>
                            <MuiTable size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {titles &&
                                            Object.entries(titles).map(([key, value], index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <TableCell
                                                            key={key}
                                                            className={classNames(classes.cell, {
                                                                [classes.stickyHeader]: stickyHeader?.includes(value?.title),
                                                            })}
                                                            id={key}
                                                        >
                                                            {key !== "actions" && key !== "selectAll" && !excludedLabels.includes(key) ? (
                                                                <TableSortLabel
                                                                    style={{ minWidth: 125, wordBreak: "break-word", fontFamily: "Inter", ...value?.style }}
                                                                    active={orderBy === key}
                                                                    direction={order}
                                                                    onClick={(event: any) => requestSort(key, event)}
                                                                >
                                                                    <div
                                                                        className={classNames(value?.className, {
                                                                            [classes.tooltipCell]: !!value?.tooltipTitle,
                                                                        })}
                                                                    >
                                                                        <span>{value?.title || value}</span>
                                                                        {value?.tooltipTitle && (
                                                                            <StyledTooltip
                                                                                title={value?.tooltipTitle}
                                                                                tooltipClassName={value?.tooltipClassName}
                                                                                placement={value?.tooltipPlacement ? value?.tooltipPlacement : "top"}
                                                                            >
                                                                                <span>
                                                                                    <TableInfoIcon />
                                                                                </span>
                                                                            </StyledTooltip>
                                                                        )}
                                                                    </div>
                                                                </TableSortLabel>
                                                            ) : key === "selectAll" ? (
                                                                <Checkbox
                                                                    id={`table-header-cell-select-all`}
                                                                    className={checkBoxClassname}
                                                                    onChange={selectAllHandler}
                                                                    checked={allSelected}
                                                                />
                                                            ) : (
                                                                <div
                                                                    style={{ minWidth: 125, wordBreak: "break-word", fontFamily: "Inter", ...value?.style }}
                                                                    className={classNames(value?.className, { [classes.tooltipCell]: !!value?.tooltipTitle })}
                                                                >
                                                                    {value?.title || value}
                                                                    {value?.tooltipTitle && (
                                                                        <StyledTooltip
                                                                            title={value?.tooltipTitle}
                                                                            tooltipClassName={value?.tooltipClassName}
                                                                            placement={value?.tooltipPlacement ? value?.tooltipPlacement : "top"}
                                                                        >
                                                                            <span>
                                                                                <TableInfoIcon />
                                                                            </span>
                                                                        </StyledTooltip>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                    </React.Fragment>
                                                );
                                            })}
                                    </TableRow>
                                </TableHead>
                                <TableBody className={classes.tableBody}>
                                    <tr ref={firstElementRef} className={classes.firstElementWrapper} />
                                    {data?.map((item, index) => (
                                        <RenderRow key={item.id} renderRow={renderRow} item={item} isLast={index === data.length - 1} />
                                    ))}
                                </TableBody>
                            </MuiTable>
                        </TableContainer>
                    ) : (
                        <div className={`${classes.tableRoot} ${classes.noResultsWrapper}`}>
                            <Typography>{languageData?.NoResultsFound}</Typography>
                        </div>
                    )}

                    <div className={`${classes.actionsWrapper} ${paginationClassName || ""}`}>
                        {enablePagination && (
                            <TablePagination
                                component="div"
                                labelDisplayedRows={({ from, to, count }) => {
                                    return `${from}-${to} of ${count} ${paginationLabel || ""}`;
                                }}
                                classes={{
                                    root: classes.paginationWrapper,
                                }}
                                labelRowsPerPage={languageData?.RowsPerPage}
                                count={pageTotal || 0}
                                page={(router?.query?.[page] && Number(router?.query?.[page]) - 1) || currentPage}
                                rowsPerPage={Number(router?.query?.[rows] || size)}
                                rowsPerPageOptions={[5, 25, 50, 75, 100]}
                                onRowsPerPageChange={(event) => {
                                    setSize(Number(event.target.value));
                                    setCurrentPage(0);

                                    const routerObj = { ...router.query };
                                    routerObj[rows] = event.target.value;
                                    delete routerObj[page];
                                    router.push({ pathname: router.pathname, query: routerObj }).then(() => {});
                                }}
                                onPageChange={(event, newPage) => {
                                    setCurrentPage(newPage);
                                    const routerObj = { ...router.query };
                                    routerObj[page] = (newPage + 1).toString();
                                    router.push({ pathname: router.pathname, query: routerObj }).then(() => {});
                                }}
                                showLastButton={true}
                                showFirstButton={true}
                            />
                        )}
                        {button && button}
                    </div>
                </div>
            </div>
        );
    }
);

export default StyledTable;
