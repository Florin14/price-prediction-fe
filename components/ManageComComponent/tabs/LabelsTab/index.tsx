import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import { TableCell, TableRow, IconButton } from "@mui/material";
import { Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem } from "@mui/material";

import { AppDispatch, RootState } from "../../../../store";
import { fetchLabels, addLabels, editLabels, deleteLabels } from "../../../../store/slices/labels/thunks";

import StyledTable from "../../../generic-components/StyledTable";
import ActionsIcon from "../../../icons/ActionsIcon";
import StyledButton from "../../../generic-components/StyledButton";
import AddIconButton from "../../../icons/AddIconButton";
import AddEditModal from "../../../modals/AddEditModal/AddEditModal";
import StyledInput from "../../../generic-components/StyledInput";
import DeleteModal from "../../../modals/DeleteModal/DeleteModal";
import EditIcon from "../../../icons/EditIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import useClasses from "../../../../utils/useClasses";

import LabelsTabStyles from "./LabelsStyles";

interface Modal {
    type: string | null;
    item: any | null;
}

const modalTypes = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
    WARNING: "WARNING",
};

const LabelsTab: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const classes = useClasses(LabelsTabStyles, { name: "LabelsStyles" });

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const [modal, setModal] = useState<Modal>({ type: null, item: null });
    const [openActionMenu, setOpenActionMenu] = useState<null | HTMLElement>(null);
    const [selectedLabelId, setSelectedLabelId] = useState<number | null>(null);

    const labels = useSelector((state: RootState) => state.labels.items);
    const quantity = useSelector((state: RootState) => state.labels.quantity);

    useEffect(() => {
        const { rows, page, sortBy, sortType } = router.query;
        if (router.query.tab == "2") {
            dispatch(
                fetchLabels({
                    limit: rows ? Number(rows) : 25,
                    offset: page ? Number(page) : 1,
                    sortBy: (sortBy || "name") as string,
                    sortType: (sortType || "asc") as string,
                })
            );

        }
    }, [router.query, router.isReady, dispatch]);

    const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, labelId: number) => {
        setOpenActionMenu(event.currentTarget);
        setSelectedLabelId(labelId);
    };

    const handleCloseActionMenu = () => {
        setOpenActionMenu(null);
        setSelectedLabelId(null);
    };

    const handleDeleteLabel = (id: number) => {
        dispatch(deleteLabels({ id })).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                setModal({ type: null, item: null });
            }
        });
    };

    const handleSubmit = (data: any) => {
        if (modal.type === modalTypes.ADD) {
            dispatch(addLabels({ payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        } else if (modal.type === modalTypes.EDIT) {
            dispatch(editLabels({ id: modal.item.id, payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        }
    };

    const renderRow = (row: any) => (
        <TableRow key={row?.id} className={classes.clickableRow} data-testid={`labels-table-row-${row?.id}`}>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{row?.name}</TableCell>
            <TableCell className={classes.actionsCell} style={{ position: "sticky", right: 0, paddingLeft: 80, background: "#FFFFFF", zIndex: 1 }}>
                <IconButton onClick={(e) => handleOpenActionMenu(e, row?.id)} className={classes.actionButton}>
                    <ActionsIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );

    return (
        <div className={classes.root}>
            <StyledTable
                data-testid="labels-table"
                data={labels || []}
                titles={languageData?.DefineLabelsTable}
                excludedLabels={[]}
                renderRow={renderRow}
                hasFilters={false}
                className={classes.tableRootWithPagination}
                containerClassName={classes.tableContainer}
                tableComponentClass={classes.tableComponentClass}
                enablePagination={true}
                pageTotal={quantity || 0}
                pageSize={25}
                stickyHeader={"Actiuni"}
                headerComponent={
                    <div>
                        <StyledButton className={classes.button} variant="contained" onClick={() => setModal({ type: modalTypes.ADD, item: null })}>
                            <AddIconButton />
                            {languageData?.AddLabel}
                        </StyledButton>
                    </div>
                }
            />
            {openActionMenu && selectedLabelId !== null && (
                <Popper
                    open={Boolean(openActionMenu)}
                    anchorEl={openActionMenu}
                    transition
                    style={{ zIndex: 100, background: "#FFFFFF" }}
                    placement="bottom-end"
                    data-testid="label-action-menu"
                >
                    {({ TransitionProps }) => (
                        <ClickAwayListener onClickAway={handleCloseActionMenu}>
                            <Grow {...TransitionProps}>
                                <Paper style={{ background: "#FFFFFF" }}>
                                    <MenuList>
                                        <MenuItem
                                            className={classes.menuItem}
                                            onClick={() => {
                                                const selectedLabel = labels?.find((a: any) => a.id === selectedLabelId);
                                                if (selectedLabel) setModal({ type: modalTypes.EDIT, item: selectedLabel });
                                                handleCloseActionMenu();
                                            }}
                                            data-testid="label-edit-menu"
                                        >
                                            <EditIcon className={classes.menuIcon} />
                                            <span className={classes.menuText}>{languageData?.Edit}</span>
                                        </MenuItem>
                                        <MenuItem
                                            className={classNames(classes.menuItem, classes.deleteMenuItem)}
                                            onClick={() => {
                                                const selectedLabel = labels?.find((a: any) => a.id === selectedLabelId);
                                                if (selectedLabel) setModal({ type: modalTypes.DELETE, item: selectedLabel });
                                                handleCloseActionMenu();
                                            }}
                                            data-testid="label-delete-menu"
                                        >
                                            <DeleteIcon className={classes.menuIcon} />
                                            <span className={classes.deleteText}>{languageData?.Delete}</span>
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                            </Grow>
                        </ClickAwayListener>
                    )}
                </Popper>
            )}
            <AddEditModal
                title={modal.type === modalTypes.ADD ? languageData?.AddLabel : modal.type === modalTypes.EDIT && languageData?.EditLabel}
                isOpen={modal.type === modalTypes.ADD || modal.type === modalTypes.EDIT}
                message={
                    modal.type === modalTypes.ADD
                        ? languageData?.AddLabelMessage
                        : modal.type === modalTypes.EDIT && languageData?.EditLabelMessage
                }
                id="add-edit-label-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                item={modal.type === modalTypes.EDIT ? modal.item : modal.type === modalTypes.ADD && null}
                onSubmit={() => handleSubmit(modal.item)}
            >
                <div style={{ padding: 13 }}>
                    <StyledInput
                        label={languageData?.LabelName}
                        type="text"
                        required={true}
                        activeLabel={true}
                        value={modal.item?.name || ""}
                        onChange={(value: string | number | null) => {
                            setModal({ ...modal, item: { ...modal.item, name: value } });
                        }}
                    />
                </div>
            </AddEditModal>
            <DeleteModal
                title={languageData?.DeleteLabelTitle || ""}
                message={languageData?.DeleteLabelMessage || ""}
                isOpen={modal.type === modalTypes.DELETE}
                id="delete-label-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                onDelete={() => {
                    handleDeleteLabel(modal.item?.id);
                }}
            />
        </div>
    );
};

export default LabelsTab;