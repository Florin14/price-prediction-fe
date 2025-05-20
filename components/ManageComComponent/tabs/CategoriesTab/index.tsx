import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import { TableCell, TableRow, IconButton } from "@mui/material";
import { Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem } from "@mui/material";

import { AppDispatch, RootState } from "../../../../store";
import {
    fetchCommunicationCategories,
    addCommunicationCategories,
    editCommunicationCategories,
    deleteCommunicationCategories,
} from "../../../../store/slices/communication-categories/thunks";

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

import CategoriesTabStyles from "./CategoriesTabStyles"; // Adjust the import path as necessary

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

const CategoriesTab: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const classes = useClasses(CategoriesTabStyles, { name: "CategoriesTabStyles" });

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const [modal, setModal] = useState<Modal>({ type: null, item: null });
    const [openActionMenu, setOpenActionMenu] = useState<null | HTMLElement>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const communicationCategories = useSelector((state: RootState) => state.communicationCategory.items);
    const quantity = useSelector((state: RootState) => state.communicationCategory.quantity);

    useEffect(() => {
        const { rows, page, sortBy, sortType } = router.query;
        if (router.query.tab == "4") {
            if (rows || page || sortBy || sortType) {
                dispatch(
                    fetchCommunicationCategories({
                        limit: rows ? Number(rows) : 25,
                        offset: page ? Number(page) : 1,
                        sortBy: (sortBy || "name") as string,
                        sortType: (sortType || "asc") as string,
                    })
                );
            } else {
                dispatch(fetchCommunicationCategories({}));
            }
        }
    }, [router.query, router.isReady, dispatch]);

    const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, categoryId: number) => {
        setOpenActionMenu(event.currentTarget);
        setSelectedCategoryId(categoryId);
    };

    const handleCloseActionMenu = () => {
        setOpenActionMenu(null);
        setSelectedCategoryId(null);
    };

    const handleDeleteCategory = (id: number) => {
        dispatch(deleteCommunicationCategories({ id })).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                setModal({ type: null, item: null });
            }
        });
    };

    const handleSubmit = (data: any) => {
        if (modal.type === modalTypes.ADD) {
            dispatch(addCommunicationCategories({ payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        } else if (modal.type === modalTypes.EDIT) {
            dispatch(editCommunicationCategories({ id: modal.item.id, payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        }
    };

    const renderRow = (row: any) => (
        <TableRow key={row?.id} className={classes.clickableRow} data-testid={`communication-categories-table-row-${row?.id}`}>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell, { [classes.isDefaultCell]: row?.isDefault })}>{row?.name}</TableCell>
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
                data-testid="communication-categories-table"
                data={communicationCategories || []}
                titles={languageData?.DefineCommunicationCategoriesTable}
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
                            {languageData?.AddCommunicationCategory}
                        </StyledButton>
                    </div>
                }
            />
            {openActionMenu && selectedCategoryId !== null && (
                <Popper
                    open={Boolean(openActionMenu)}
                    anchorEl={openActionMenu}
                    transition
                    style={{ zIndex: 100, background: "#FFFFFF" }}
                    placement="bottom-end"
                    data-testid="communication-category-action-menu"
                >
                    {({ TransitionProps }) => (
                        <ClickAwayListener onClickAway={handleCloseActionMenu}>
                            <Grow {...TransitionProps}>
                                <Paper style={{ background: "#FFFFFF" }}>
                                    <MenuList>
                                        <MenuItem
                                            className={classes.menuItem}
                                            onClick={() => {
                                                const selectedCategory = communicationCategories?.find((a) => a.id === selectedCategoryId);
                                                if (selectedCategory) setModal({ type: modalTypes.EDIT, item: selectedCategory });
                                                handleCloseActionMenu();
                                            }}
                                            disabled={communicationCategories?.find((a) => a.id === selectedCategoryId)?.isDefault === true}
                                            data-testid="communication-category-edit-menu"
                                        >
                                            <EditIcon className={classes.menuIcon} />
                                            <span className={classes.menuText}>{languageData?.Edit}</span>
                                        </MenuItem>
                                        <MenuItem
                                            className={classNames(classes.menuItem, classes.deleteMenuItem)}
                                            onClick={() => {
                                                const selectedCategory = communicationCategories?.find((a) => a.id === selectedCategoryId);
                                                if (selectedCategory) setModal({ type: modalTypes.DELETE, item: selectedCategory });
                                                handleCloseActionMenu();
                                            }}
                                            disabled={communicationCategories?.find((a) => a.id === selectedCategoryId)?.isDefault === true}
                                            data-testid="communication-category-delete-menu"
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
                title={modal.type === modalTypes.ADD ? languageData?.AddCommunicationCategory : modal.type === modalTypes.EDIT && languageData?.EditCategory}
                isOpen={modal.type === modalTypes.ADD || modal.type === modalTypes.EDIT}
                message={
                    modal.type === modalTypes.ADD
                        ? languageData?.AddCommunicationCategoryMessage
                        : modal.type === modalTypes.EDIT && languageData?.EditCategoryMessage
                }
                id="add-edit-communication-category-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                item={modal.type === modalTypes.EDIT ? modal.item : modal.type === modalTypes.ADD && null}
                onSubmit={() => handleSubmit(modal.item)}
            >
                <div style={{ padding: 13 }}>
                    <StyledInput
                        label={languageData?.CategoryName}
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
                title={languageData?.DeleteCategoryTitle || ""}
                message={languageData?.DeleteCategoryMessage || ""}
                isOpen={modal.type === modalTypes.DELETE}
                id="delete-communication-category-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                onDelete={() => {
                    handleDeleteCategory(modal.item?.id);
                }}
            />
        </div>
    );
};

export default CategoriesTab;
