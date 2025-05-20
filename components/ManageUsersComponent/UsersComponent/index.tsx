import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import classNames from "classnames";

import { TableCell, TableRow, IconButton, Table } from "@mui/material";
import { Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem } from "@mui/material";

import { RootState } from "../../../store";
import useClasses from "../../../utils/useClasses";
import { fetchUsers, addUsers, editUsers, deleteUsers } from "../../../store/slices/user/thunks";

import StyledButton from "../../generic-components/StyledButton";
import StyledTable from "../../generic-components/StyledTable";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import ActionsIcon from "../../icons/ActionsIcon";
import AddIconButton from "../../icons/AddIconButton";
import DeleteModal from "../../modals/DeleteModal/DeleteModal";
import AddEditModal from "../../modals/AddEditModal/AddEditModal";
import StyledInput from "../../generic-components/StyledInput";
import StyledSwitch from "../../generic-components/StyledSwitch";
import StyledDropdown from "../../generic-components/StyledDropdown";

import UsersComponentStyles from "./UsersComponentStyles";

interface Modal {
    type: string | null;
    item: any | null;
}

const modalTypes = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
};

const UsersComponent = () => {
    const classes = useClasses(UsersComponentStyles, { name: "UsersComponentStyles" });

    const dispatch = useDispatch<any>();
    const router = useRouter();

    const [cookies] = useCookies(["id"]);

    const users = useSelector((state: RootState) => state.user.items);
    const quantity = useSelector((state: RootState) => state.user.quantity);

    const languageData = useSelector((state: RootState) => state.website.languageData);

    const sections = [
        { id: 1, name: "Registratura" },
        { id: 2, name: "Secretariat" },
        { id: 3, name: "Taxe si impozite" },
    ];

    const [modal, setModal] = useState<Modal>({ type: null, item: { name: null, phoneNumber: null, email: null, sectionId: null } });
    const [openActionMenu, setOpenActionMenu] = useState<null | HTMLElement>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    useEffect(() => {
        const { filter, rows, page, sortBy, sortType } = router.query;
        if (router.isReady && router.query) {
            dispatch(fetchUsers({}));
        }
    }, [dispatch, router.query]);

    const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, userId: number) => {
        setOpenActionMenu(event.currentTarget);
        setSelectedUserId(userId);
    };

    const handleCloseActionMenu = () => {
        setOpenActionMenu(null);
        setSelectedUserId(null);
    };

    const handleDeleteSection = (id: number) => {
        dispatch(deleteUsers({ id })).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                setModal({ type: null, item: null });
            }
        });
    };

    const handleSubmit = (data: any) => {
        if (modal.type === modalTypes.ADD) {
            dispatch(addUsers({ payload: data })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        } else if (modal.type === modalTypes.EDIT) {
            dispatch(editUsers({ id: modal.item.id, payload: { ...modal.item, data } })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        }
    };

    const renderRow = (data: any) => (
        <TableRow key={data.id} className={classes.clickableRow}>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{data.name}</TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{data.email}</TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{data.phoneNumber}</TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>
                <StyledSwitch
                    labelLeft={languageData?.Active}
                    labelRight={languageData?.Inactive}
                    checked={data.isActive}
                    onChange={(e) => {
                        dispatch(editUsers({ id: data.id, payload: { ...data, isActive: !data.isActive } }));
                    }}
                ></StyledSwitch>
            </TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{data?.section?.name}</TableCell>
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
                data={users || []}
                titles={languageData?.UsersTable}
                excludedLabels={["email", "phoneNumber", "state", "actions"]}
                renderRow={renderRow}
                hasFilters={false}
                className={classes.tableRootWithPagination}
                containerClassName={classes.tableContainer}
                enablePagination={true}
                pageTotal={quantity || 0}
                pageSize={25}
                stickyHeader={"Actiuni"}
                headerComponent={
                    <div>
                        <StyledButton className={classes.button} variant="contained" onClick={() => setModal({ type: modalTypes.ADD, item: null })}>
                            <AddIconButton />
                            {languageData?.AddUser}
                        </StyledButton>
                    </div>
                }
            />

            {openActionMenu && selectedUserId !== null && (
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
                                                const selectedUser = users.find((a) => a.id === selectedUserId);
                                                if (selectedUser) setModal({ type: modalTypes.EDIT, item: selectedUser });
                                                handleCloseActionMenu();
                                            }}
                                        >
                                            <EditIcon className={classes.menuIcon} />
                                            <span className={classes.menuText}>{languageData?.Edit}</span>
                                        </MenuItem>
                                        <MenuItem
                                            className={classNames(classes.menuItem, classes.deleteMenuItem)}
                                            onClick={() => {
                                                const selectedUser = users.find((a) => a.id === selectedUserId);
                                                if (selectedUser) setModal({ type: modalTypes.DELETE, item: selectedUser });
                                                handleCloseActionMenu();
                                            }}
                                            disabled={users.find((a) => a.id === selectedUserId)?.isActive === true || cookies["id"] === selectedUserId}
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
                title={modal.type === modalTypes.ADD ? languageData?.AddUser : modal.type === modalTypes.EDIT && languageData?.EditUser}
                isOpen={modal.type === modalTypes.ADD || modal.type === modalTypes.EDIT}
                message={modal.type === modalTypes.ADD ? languageData?.AddUserMessage : modal.type === modalTypes.EDIT && languageData?.EditUserMessage}
                id="add-edit-users-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                item={modal.type === modalTypes.EDIT ? modal.item : modal.type === modalTypes.ADD && null}
                onSubmit={() => handleSubmit(modal.item)}
            >
                <div style={{ padding: 13, gap: 10, display: "grid" }}>
                    <StyledInput
                        label={languageData?.UserName}
                        type="text"
                        required={true}
                        activeLabel={true}
                        value={modal.item?.name || ""}
                        onChange={(value: string | number | null) => {
                            setModal((prevModal) => ({ ...prevModal, item: { ...prevModal.item, name: value } }));
                        }}
                    />
                    <StyledInput
                        label={languageData?.UserEmail}
                        type="email"
                        required={true}
                        activeLabel={true}
                        disabled={modal.type === modalTypes.EDIT}
                        value={modal.item?.email || ""}
                        onChange={(value: string | number | null) => {
                            setModal((prevModal) => ({ ...prevModal, item: { ...prevModal.item, email: value } }));
                        }}
                    />
                    <StyledInput
                        label={languageData?.UserPhoneNumber}
                        type="text"
                        required={true}
                        activeLabel={true}
                        value={modal.item?.phoneNumber || ""}
                        onChange={(value: string | number | null) => {
                            setModal((prevModal) => ({ ...prevModal, item: { ...prevModal.item, phoneNumber: value } }));
                        }}
                    />
                    <StyledDropdown
                        label={languageData?.UserSection}
                        required={true}
                        activeLabel={true}
                        value={sections.find((section) => section.id === modal.item?.section?.id) || null}
                        options={sections || []}
                        onChange={(e, value: any | null) => {
                            setModal((prevModal) => ({ ...prevModal, item: { ...prevModal.item, section: value } }));
                        }}
                    ></StyledDropdown>
                </div>
            </AddEditModal>
            <DeleteModal
                title={languageData?.DeleteUserTitle || ""}
                message={languageData?.DeleteUserMessage || ""}
                isOpen={modal.type === modalTypes.DELETE}
                id="delete-section-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                onDelete={() => {
                    handleDeleteSection(modal.item?.id);
                }}
            />
        </>
    );
};

export default UsersComponent;
