import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import { TableCell, TableRow, IconButton } from "@mui/material";
import { Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem } from "@mui/material";

import { RootState } from "../../../store";
import { fetchSections, addSections, editSections, deleteSections } from "../../../store/slices/section/thunks";

import StyledButton from "../../generic-components/StyledButton";
import StyledTable from "../../generic-components/StyledTable";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import ActionsIcon from "../../icons/ActionsIcon";
import AddIconButton from "../../icons/AddIconButton";
import DeleteModal from "../../modals/DeleteModal/DeleteModal";
import AddEditModal from "../../modals/AddEditModal/AddEditModal";
import StyledInput from "../../generic-components/StyledInput";
import InfoModal from "../../modals/InfoModal/InfoModal";
import useClasses from "../../../utils/useClasses";

import DefineSectionsComponentStyles from "./DefineSectionsComponentStyles";

interface Modal {
    type: string | null;
    item: any | null;
}

const modalTypes = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
    WARNING_DELETE: "WARNING_DELETE",
};

const DefineSectionsComponent = () => {
    const classes = useClasses(DefineSectionsComponentStyles, { name: "DefineSectionsComponentStyles" });

    const dispatch = useDispatch<any>();
    const router = useRouter();

    const sections = useSelector((state: RootState) => state.section.items);
    const quantity = useSelector((state: RootState) => state.section.quantity);

    const languageData = useSelector((state: RootState) => state.website.languageData);

    const [modal, setModal] = useState<Modal>({ type: null, item: null });
    const [openActionMenu, setOpenActionMenu] = useState<null | HTMLElement>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);

    useEffect(() => {
        const { rows, page, sortBy, sortType } = router.query;
        if (router.query.tab == "1") {
            if (rows || page || sortBy || sortType) {
                dispatch(
                    fetchSections({
                        limit: rows ? Number(rows) : 25,
                        offset: page ? Number(page) : 1,
                        sortBy: (sortBy || "name") as string,
                        sortType: (sortType || "asc") as string,
                    })
                );
            } else {
                dispatch(fetchSections({}));
            }
        }
    }, [router.query, router.isReady, dispatch]);

    const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, sectionId: number) => {
        setOpenActionMenu(event.currentTarget);
        setSelectedSectionId(sectionId);
    };

    const handleCloseActionMenu = () => {
        setOpenActionMenu(null);
        setSelectedSectionId(null);
    };

    const handleDeleteSection = (id: number) => {
        dispatch(deleteSections({ id })).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                setModal({ type: null, item: null });
            }
        });
    };

    const handleSubmit = (data: any) => {
        if (modal.type === modalTypes.ADD) {
            dispatch(addSections({ payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        } else if (modal.type === modalTypes.EDIT) {
            dispatch(editSections({ id: modal.item.id, payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        }
    };

    const renderRow = (data: any) => (
        <TableRow key={data.id} className={classes.clickableRow}>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell, { [classes.isDefaultCell]: data?.isDefault })}>{data.name}</TableCell>
            <TableCell className={classes.actionsCell} style={{ position: "sticky", right: 0, paddingLeft: 80, background: "#FFFFFF", zIndex: 1 }}>
                <IconButton onClick={(e) => handleOpenActionMenu(e, data.id)} className={classes.actionButton}>
                    <ActionsIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );

    return (
        <>
            <StyledTable
                data={sections || []}
                titles={languageData?.DefineSectionsTable}
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
                            {languageData?.AddSection}
                        </StyledButton>
                    </div>
                }
            />

            {openActionMenu && selectedSectionId !== null && (
                <Popper
                    open={Boolean(openActionMenu)}
                    anchorEl={openActionMenu}
                    transition
                    style={{ zIndex: 100, background: "#FFFFFF" }}
                    placement="bottom-end"
                >
                    {({ TransitionProps }) => (
                        <ClickAwayListener onClickAway={handleCloseActionMenu}>
                            <Grow {...TransitionProps}>
                                <Paper style={{ background: "#FFFFFF" }}>
                                    <MenuList>
                                        <MenuItem
                                            className={classes.menuItem}
                                            onClick={() => {
                                                const selectedSection = sections.find((a) => a.id === selectedSectionId);
                                                if (selectedSection) setModal({ type: modalTypes.EDIT, item: selectedSection });
                                                handleCloseActionMenu();
                                            }}
                                            disabled={sections.find((a) => a.id === selectedSectionId)?.isDefault === true}
                                        >
                                            <EditIcon className={classes.menuIcon} />
                                            <span className={classes.menuText}>{languageData?.Edit}</span>
                                        </MenuItem>
                                        <MenuItem
                                            className={classNames(classes.menuItem, classes.deleteMenuItem)}
                                            onClick={() => {
                                                const selectedSection = sections.find((a) => a.id === selectedSectionId);
                                                if (selectedSection) {
                                                    setModal({
                                                        type: selectedSection.canBeDeleted ? modalTypes.DELETE : modalTypes.WARNING_DELETE,
                                                        item: selectedSection,
                                                    });
                                                }
                                                handleCloseActionMenu();
                                            }}
                                            disabled={sections.find((a) => a.id === selectedSectionId)?.isDefault === true}
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
            {(modal.type === modalTypes.ADD || modal.type === modalTypes.EDIT) && (
                <AddEditModal
                    title={modal.type === modalTypes.ADD ? languageData?.AddSection : modal.type === modalTypes.EDIT && languageData?.EditSection}
                    isOpen={modal.type === modalTypes.ADD || modal.type === modalTypes.EDIT}
                    message={
                        modal.type === modalTypes.ADD ? languageData?.AddSectionMessage : modal.type === modalTypes.EDIT && languageData?.EditSectionMessage
                    }
                    id="add-edit-section-modal"
                    onClose={() => {
                        setModal({ type: null, item: null });
                    }}
                    item={modal.type === modalTypes.EDIT ? modal.item : modal.type === modalTypes.ADD && null}
                    onSubmit={() => handleSubmit(modal.item)}
                >
                    <div style={{ padding: 13 }}>
                        <StyledInput
                            label={languageData?.SectionName}
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
            )}
            {modal.type === modalTypes.DELETE && (
                <DeleteModal
                    title={languageData?.DeleteSectionTitle || ""}
                    message={languageData?.DeleteSectionMessage || ""}
                    isOpen={modal.type === modalTypes.DELETE}
                    id="delete-section-modal"
                    onClose={() => {
                        setModal({ type: null, item: null });
                    }}
                    onDelete={() => {
                        handleDeleteSection(modal.item?.id);
                    }}
                />
            )}
            {modal.type === modalTypes.WARNING_DELETE && (
                <InfoModal
                    isOpen={modal.type === modalTypes.WARNING_DELETE}
                    onClose={() => setModal({ type: null, item: null })}
                    message={languageData?.WarningDeleteSection || ""}
                    title={languageData?.Attention || ""}
                />
            )}
        </>
    );
};

export default DefineSectionsComponent;
