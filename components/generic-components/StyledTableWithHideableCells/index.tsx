import { useImperativeHandle, forwardRef, useEffect, useMemo, useState, useRef } from "react";
import { useMaterialReactTable, MaterialReactTable } from "material-react-table";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { MRT_Localization_RO } from "material-react-table/locales/ro";

import { makeStyles } from "@mui/styles";
import { TablePagination, TableSortLabel, Theme, Typography } from "@mui/material";

import cssVariables from "../../../assets/css/variables";
import simple_table_crud_style from "../../../assets/css/simple_table_crud_style";
import { RootState } from "../../../store";
import useClasses from "../../../utils/useClasses";

const useStyles = makeStyles(
    (theme: Theme) => ({
        actionsWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            position: "absolute",
            backgroundColor: "#fff",
            zIndex: 3,
            borderTop: `1px solid #D8D8D8`,
            right: 0,
            width: "100%",
            top: "calc(100% - 55px)",
        },
        paginationWrapper: {
            borderBottom: "none",
            padding: 0,
        },
        tableWrapper: {
            height: "calc(100% - 50px)",
        },

        tableContainer: {
            position: "relative",
            height: "calc(100% - 150px)",
            minHeight: "285px",
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
        },
        cell: {
            padding: `0 ${cssVariables.smallMargin}`,
        },
        flexCell: {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "fit-content",
        },
        noBorderCell: {
            border: "none",
        },
        iconButton: {
            color: "#fff",
            "&:hover": {
                backgroundColor: "#01662b",
            },
            boxShadow: "0",
            borderRadius: "3px !important",
            width: "25px !important",
            height: "25px !important",
            minWidth: "25px !important",
            padding: 0,
            backgroundColor: "#02933E",
        },
        noResultsWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: `calc(100% - 55px)`,
        },
    }),
    {
        name: "StyledHideableCellsTableStyles",
    }
);
interface HeaderCellInterface {
    index: number;
    orderBy: string;
    order: "asc" | "desc";
    tableCol: any;
    requestSort: (key: string, event: React.MouseEvent<HTMLElement>) => void;
    classes: any;
    titles: any;
    includedSortLabels: string[];
}

const HeaderCell: React.FC<HeaderCellInterface> = ({ index, orderBy, order, tableCol, requestSort, classes, titles, includedSortLabels }) =>
    tableCol.key && titles ? (
        includedSortLabels.includes(tableCol.key) ? (
            <TableSortLabel
                id={`styled-table-with-hideable-cells-header-cell-with-sort-${index}`}
                className={classes.breakWord}
                active={orderBy === tableCol.key}
                direction={order}
                onClick={(event) => requestSort(tableCol.key, event)}
            >
                <div>{titles[tableCol.key]}</div>
            </TableSortLabel>
        ) : (
            <div id={`styled-table-with-hideable-cells-header-cell-without-sort-${index}`} className={classes.breakWord}>
                {titles[tableCol.key]}
            </div>
        )
    ) : null;

interface StyledHideableCellsTableInterface {
    id: string;
    data: any;
    enablePagination: boolean;
    paginationClassName?: string;
    button: any;
    pageSize: number;
    pageTotal: number;
    paginationLabel?: any;
    onPageChange: (newPage: number, size: number) => void;
    titles: any;
    startSortingDirection?: "asc" | "desc";
    columnsFormatter: any;
    includedSortLabels: string[];
    rowAction: any;
    Cell: any;
    FooterCell: any;
    ref: any;
}

const StyledHideableCellsTable: React.FC<StyledHideableCellsTableInterface> = forwardRef(
    (
        {
            id,
            data,
            enablePagination,
            paginationClassName,
            button,
            pageSize,
            pageTotal,
            paginationLabel,
            onPageChange,
            titles,
            startSortingDirection,
            columnsFormatter,
            includedSortLabels = [],
            rowAction,
            Cell,
            FooterCell,
        },
        ref
    ) => {
        const languageData = useSelector((state: RootState) => state.website.languageData);
        const router = useRouter();
        const classes = useStyles();
        const tableClasses = useClasses(simple_table_crud_style, { name: "CustomTableStyles" });
        const [size, setSize] = useState<number>(pageSize);
        const [currentPage, setCurrentPage] = useState(0);
        const [orderBy, setOrderBy] = useState<string | null>(null);
        const [order, setOrder] = useState<"asc" | "desc">("asc");
        const [columnVisibility, setColumnVisibility] = useState({});
        const [initialRender, setInitialRender] = useState(true);

        useImperativeHandle(ref, () => ({
            resetPage() {
                setCurrentPage(0);
            },
        }));

        useEffect(() => {
            if (router.isReady && titles) {
                const sortType = router?.query?.sortType as "asc" | "desc" | null;
                const sortBy = router?.query?.sortBy as string | null;
                setOrder(sortType || "asc");
                setOrderBy(sortBy || Object.entries(titles)[0][0] || null);
            }
        }, [router, router.isReady, titles]);

        useEffect(() => {
            setOrder(startSortingDirection || "asc");
        }, [startSortingDirection]);

        useEffect(() => {
            if (!initialRender) {
                const routerObj = { ...router.query };

                if (routerObj?.page) {
                    const page = Number(routerObj.page);
                    if (data.length === 0 && page > 1) {
                        const newPage = page - 1;
                        setCurrentPage(newPage - 1);
                        onPageChange(newPage, size);

                        routerObj.page = newPage.toString();
                        router.push({ pathname: router.pathname, query: routerObj });
                    }
                }
            } else {
                setInitialRender(false);
            }
        }, [data]);

        const columns = useMemo(
            () =>
                columnsFormatter.map((tableCol: any, index: number) => ({
                    header: (tableCol.key && titles && titles[tableCol.key]) || "",
                    minSize: tableCol.minSize ?? "unset",
                    maxSize: tableCol.maxSize ?? "unset",
                    size: tableCol.size ?? "unset",
                    Header: (props: any) => (
                        <HeaderCell
                            {...props}
                            includedSortLabels={includedSortLabels}
                            index={index}
                            orderBy={orderBy}
                            order={order}
                            tableCol={tableCol}
                            requestSort={requestSort}
                            classes={classes}
                            titles={titles}
                        />
                    ),
                    Cell: (props: any) => <Cell {...props} tableClasses={tableClasses} index={index} tableCol={tableCol} />,
                    ...((tableCol.totalRowLabel || tableCol.totalRowValue) && {
                        Footer: () => <FooterCell tableCol={tableCol} />,
                    }),
                })),
            [columnsFormatter, orderBy, order, titles, includedSortLabels, classes, tableClasses]
        );
        const columnsData = useMemo(() => columns || [], [columns]);

        const requestSort = (property: string, event: React.MouseEvent<HTMLElement>) => {
            const isAsc = orderBy === property && order === "asc";

            const routerObj = { ...router.query };
            routerObj.sortBy = property;
            routerObj.sortType = isAsc ? "desc" : "asc";
            router.push({ pathname: router.pathname, query: routerObj }).then((_) => {});

            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(property);
        };

        const table = useMaterialReactTable({
            columns: columnsData,
            data,
            localization: MRT_Localization_RO,
            enableGlobalFilter: false,
            enableColumnFilters: false,
            // enableColumnVisibility: true,
            enableSorting: false,
            initialState: {
                columnVisibility: { firstName: false },
            },
            enablePagination: false,
            onColumnVisibilityChange: setColumnVisibility,
            state: { columnVisibility },
            muiTableHeadCellProps: {
                sx: {
                    fontFamily: "Inter",
                    fontWeight: "800",
                    fontSize: 12,
                },
            },
            muiTableHeadRowProps: {
                sx: {
                    position: "sticky",
                    top: 0,
                },
            },
            muiTableHeadProps: {
                sx: { zIndex: 999 },
            },
            enableBottomToolbar: false,
            muiTableContainerProps: { sx: { boxShadow: "none !important", height: "calc(100% - 60px)", position: "relative" } },
            muiTableBodyRowProps: ({ row }) => ({
                sx: { cursor: "pointer" },
                onClick: () => {
                    if (rowAction) rowAction(row.original.id);
                },
            }),
            muiTableBodyCellProps: {
                sx: {
                    background: "#fff",
                    padding: `0 ${cssVariables.smallMargin}`,
                    height: "45px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "#313131",
                    minWidth: "fit-content",
                    maxWidth: "unset",
                    whiteSpace: "nowrap",
                    left: "unset",
                    zIndex: 1,
                    textWrap: "wrap",
                    "&:first-of-type": {
                        paddingLeft: cssVariables.defaultMargin,
                    },
                },
            },
            muiTablePaperProps: {
                className: classes.tableWrapper,
            },
            muiTableFooterRowProps: {
                sx: {
                    position: "sticky",
                    bottom: 0,
                    zIndex: 2,
                    backgroundColor: "white",
                },
            },
            muiTableFooterCellProps: {
                sx: {
                    padding: 0,
                    border: 0,
                    height: 45,
                    "&:first-of-type": {
                        position: "absolute",
                        width: "auto",
                        zIndex: 10001,
                        paddingLeft: "20px !important",
                        fontWeight: "700",
                        fontSize: "12px",
                        color: "#313131",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                    },
                },
            },
        });

        return (
            <div id={id} className={classes.tableContainer}>
                {data && data.length > 0 ? (
                    <MaterialReactTable table={table} />
                ) : (
                    <div className={`${classes.tableWrapper} ${classes.noResultsWrapper}`}>
                        <Typography>{languageData?.NoResultsFound}</Typography>
                    </div>
                )}

                <div className={`${classes.actionsWrapper} ${paginationClassName || ""}`}>
                    {enablePagination && (
                        <TablePagination
                            component="div"
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to}/${count} ${paginationLabel || ""}`}
                            classes={{
                                root: classNames(classes.paginationWrapper),
                            }}
                            labelRowsPerPage={languageData?.RowsPerPage}
                            count={pageTotal}
                            page={(router?.query?.page && Number(router?.query?.page) - 1) || currentPage}
                            rowsPerPage={Number(router?.query?.rows || size)}
                            rowsPerPageOptions={[5, 25, 50, 75, 100]}
                            onRowsPerPageChange={(event) => {
                                setSize(parseInt(event.target.value));
                                setCurrentPage(0);
                                onPageChange(1, parseInt(event.target.value));

                                const routerObj = { ...router.query };
                                routerObj.rows = event.target.value;
                                delete routerObj.page;
                                router.push({ pathname: router.pathname, query: routerObj }).then((_) => {});
                            }}
                            onPageChange={(event, newPage) => {
                                setCurrentPage(newPage);
                                onPageChange(newPage + 1, size);
                                const routerObj = { ...router.query };
                                routerObj.page = (newPage + 1).toString();
                                router.push({ pathname: router.pathname, query: routerObj }).then((_) => {});
                            }}
                        />
                    )}
                    {button && button}
                </div>
            </div>
        );
    }
);
export default StyledHideableCellsTable;
