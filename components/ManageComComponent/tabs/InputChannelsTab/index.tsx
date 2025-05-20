import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import { TableCell, TableRow, IconButton } from "@mui/material";
import { Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem } from "@mui/material";

import { AppDispatch, RootState } from "../../../../store";
import {
    fetchInputChannels,
    addInputChannels,
    editInputChannels,
    deleteInputChannels,
} from "../../../../store/slices/input-channels/thunks";

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

import InputChannelsTabStyles from "./InputChannelsStyles";

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

const InputChannelsTab: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const classes = useClasses(InputChannelsTabStyles, { name: "InputChannelsTabStyles" });

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const [modal, setModal] = useState<Modal>({ type: null, item: null });
    const [openActionMenu, setOpenActionMenu] = useState<null | HTMLElement>(null);
    const [selectedInputChannelId, setSelectedInputChannelId] = useState<number | null>(null);

    const inputChannels = useSelector((state: RootState) => state.inputChannels.items);
    const quantity = useSelector((state: RootState) => state.inputChannels.quantity);

    useEffect(() => {
        const { rows, page, sortBy, sortType } = router.query;
        if (router.query.tab == "3") {
            if (rows || page || sortBy || sortType) {
                dispatch(
                    fetchInputChannels({
                        limit: rows ? Number(rows) : 25,
                        offset: page ? Number(page) : 1,
                        sortBy: (sortBy || "name") as string,
                        sortType: (sortType || "asc") as string,
                    })
                );
            } else {
                dispatch(fetchInputChannels({}));
            }
        }
    }, [router.query, router.isReady, dispatch]);

    const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, channelId: number) => {
        setOpenActionMenu(event.currentTarget);
        setSelectedInputChannelId(channelId);
    };

    const handleCloseActionMenu = () => {
        setOpenActionMenu(null);
        setSelectedInputChannelId(null);
    };

    const handleDeleteInputChannel = (id: number) => {
        dispatch(deleteInputChannels({ id })).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                setModal({ type: null, item: null });
            }
        });
    };

    const handleSubmit = (data: any) => {
        if (modal.type === modalTypes.ADD) {
            dispatch(addInputChannels({ payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        } else if (modal.type === modalTypes.EDIT) {
            dispatch(editInputChannels({ id: modal.item.id, payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        }
    };

    const renderRow = (row: any) => (
        <TableRow key={row?.id} className={classes.clickableRow} data-testid={`input-channels-table-row-${row?.id}`}>
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
                data-testid="input-channels-table"
                data={inputChannels || []}
                titles={languageData?.DefineInputChannelsTable}
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
                            {languageData?.AddInputChannel}
                        </StyledButton>
                    </div>
                }
            />
            {openActionMenu && selectedInputChannelId !== null && (
                <Popper
                    open={Boolean(openActionMenu)}
                    anchorEl={openActionMenu}
                    transition
                    style={{ zIndex: 100, background: "#FFFFFF" }}
                    placement="bottom-end"
                    data-testid="input-channel-action-menu"
                >
                    {({ TransitionProps }) => (
                        <ClickAwayListener onClickAway={handleCloseActionMenu}>
                            <Grow {...TransitionProps}>
                                <Paper style={{ background: "#FFFFFF" }}>
                                    <MenuList>
                                        <MenuItem
                                            className={classes.menuItem}
                                            onClick={() => {
                                                const selectedInputChannel = inputChannels?.find((a) => a.id === selectedInputChannelId);
                                                if (selectedInputChannel) setModal({ type: modalTypes.EDIT, item: selectedInputChannel });
                                                handleCloseActionMenu();
                                            }}
                                            data-testid="input-channel-edit-menu"
                                        >
                                            <EditIcon className={classes.menuIcon} />
                                            <span className={classes.menuText}>{languageData?.Edit}</span>
                                        </MenuItem>
                                        <MenuItem
                                            className={classNames(classes.menuItem, classes.deleteMenuItem)}
                                            onClick={() => {
                                                const selectedInputChannel = inputChannels?.find((a) => a.id === selectedInputChannelId);
                                                if (selectedInputChannel) setModal({ type: modalTypes.DELETE, item: selectedInputChannel });
                                                handleCloseActionMenu();
                                            }}
                                            data-testid="input-channel-delete-menu"
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
                title={modal.type === modalTypes.ADD ? languageData?.AddInputChannel : modal.type === modalTypes.EDIT && languageData?.EditInputChannel}
                isOpen={modal.type === modalTypes.ADD || modal.type === modalTypes.EDIT}
                message={
                    modal.type === modalTypes.ADD
                        ? languageData?.AddInputChannelMessage
                        : modal.type === modalTypes.EDIT && languageData?.EditInputChannelMessage
                }
                id="add-edit-input-channel-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                item={modal.type === modalTypes.EDIT ? modal.item : modal.type === modalTypes.ADD && null}
                onSubmit={() => handleSubmit(modal.item)}
            >
                <div style={{ padding: 13 }}>
                    <StyledInput
                        label={languageData?.InputChannelName}
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
                title={languageData?.DeleteInputChannelTitle || ""}
                message={languageData?.DeleteInputChannelMessage || ""}
                isOpen={modal.type === modalTypes.DELETE}
                id="delete-input-channel-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                onDelete={() => {
                    handleDeleteInputChannel(modal.item?.id);
                }}
            />
        </div>
    );
};

export default InputChannelsTab;
