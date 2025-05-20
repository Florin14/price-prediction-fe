import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import { TableCell, TableRow, IconButton } from "@mui/material";
import { Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem } from "@mui/material";

import { AppDispatch, RootState } from "../../../../store";
import {
    fetchCommunicationComplaints,
    addCommunicationComplaints,
    editCommunicationComplaints,
    deleteCommunicationComplaints,
} from "../../../../store/slices/communication-complaints/thunks";

import StyledTable from "../../../generic-components/StyledTable";
import ActionsIcon from "../../../icons/ActionsIcon";
import StyledButton from "../../../generic-components/StyledButton";
import AddIconButton from "../../../icons/AddIconButton";
import AddEditModal from "../../../modals/AddEditModal/AddEditModal";
import DeleteModal from "../../../modals/DeleteModal/DeleteModal";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";
import StyledInput from "../../../generic-components/StyledInput";
import useClasses from "../../../../utils/useClasses";
import StyledDropdown from "../../../generic-components/StyledDropdown";
import { APPLICANT_TYPE } from "../../../../utils/constants";

import useStyles from "./ComplaintsTabStyles";
import ComplaintsFilterDrawer from "../../../drawers/ComplaintsFilterDrawer/ComplaintsFilterDrawer";

interface Modal {
    type: string | null;
    item: any | null;
}

const modalTypes = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
};

const ComplaintsTab: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const classes = useClasses(useStyles, { name: "ComplaintsTabStyles" });

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const [modal, setModal] = useState<Modal>({ type: null, item: null });
    const [openActionMenu, setOpenActionMenu] = useState<null | HTMLElement>(null);
    const [selectedComplaintId, setSelectedComplaintId] = useState<number | null>(null);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

    const communicationComplaints = useSelector((state: RootState) => state.communicationComplaint?.items);
    const quantity = useSelector((state: RootState) => state.communicationComplaint?.quantity);

    useEffect(() => {
        const { rows, page, sortBy, sortType } = router.query;
        if (router.query.tab == "1") {
            if (rows || page || sortBy || sortType) {
                dispatch(
                    fetchCommunicationComplaints({
                        limit: rows ? Number(rows) : 25,
                        offset: page ? Number(page) : 1,
                        sortBy: (sortBy || "name") as string,
                        sortType: (sortType || "asc") as string,
                    })
                );
            } else {
                dispatch(fetchCommunicationComplaints({}));
            }
        }
    }, [router.query, router.isReady, dispatch]);

    const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, complaintId: number) => {
        setOpenActionMenu(event.currentTarget);
        setSelectedComplaintId(complaintId);
    };

    const handleCloseActionMenu = () => {
        setOpenActionMenu(null);
        setSelectedComplaintId(null);
    };

    const handleDeleteComplaint = (id: number) => {
        dispatch(deleteCommunicationComplaints({ id })).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                setModal({ type: null, item: null });
            }
        });
    };
    const handleSubmit = (data: any) => {
        const payload = {
            name: data.name,
            applicantType: data.applicantType?.value || data.applicantType,
        };
        if (modal.type === modalTypes.ADD) {
            dispatch(addCommunicationComplaints({ payload: payload })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        } else if (modal.type === modalTypes.EDIT) {
            dispatch(editCommunicationComplaints({ id: modal.item.id, payload: payload })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModal({ type: null, item: null });
                }
            });
        }
    };

    const renderRow = (row: any) => (
        <TableRow key={row?.id} className={classes.clickableRow} data-testid={`communication-complaints-table-row-${row?.id}`}>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{row?.name}</TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>
                {languageData?.ApplicantType[row?.applicantType as keyof typeof languageData.ApplicantType as keyof typeof languageData.ApplicantType]}
            </TableCell>
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
                data-testid="communication-complaints-table"
                data={communicationComplaints || []}
                titles={languageData?.DefineComplaintsTable}
                excludedLabels={[]}
                renderRow={renderRow}
                hasFilters={true}
                className={classes.tableRootWithPagination}
                containerClassName={classes.tableContainer}
                tableComponentClass={classes.tableComponentClass}
                enablePagination={true}
                pageTotal={quantity || 0}
                pageSize={25}
                stickyHeader={"Actiuni"}
                handleFilterClick={() => {
                    setIsFilterDrawerOpen(true);
                }}
                headerComponent={
                    <div>
                        <StyledButton
                            id={"add-complaint-button"}
                            className={classes.button}
                            variant="contained"
                            onClick={() => setModal({ type: modalTypes.ADD, item: null })}
                        >
                            <AddIconButton />
                            {languageData?.AddComplaint}
                        </StyledButton>
                    </div>
                }
            />
            {openActionMenu && selectedComplaintId !== null && (
                <Popper
                    open={Boolean(openActionMenu)}
                    anchorEl={openActionMenu}
                    transition
                    style={{ zIndex: 100, background: "#FFFFFF" }}
                    placement="bottom-end"
                    data-testid="communication-complaint-action-menu"
                >
                    {({ TransitionProps }) => (
                        <ClickAwayListener onClickAway={handleCloseActionMenu}>
                            <Grow {...TransitionProps}>
                                <Paper style={{ background: "#FFFFFF" }}>
                                    <MenuList>
                                        <MenuItem
                                            id="edit-complaint-button"
                                            onClick={() => {
                                                const complaint = communicationComplaints?.find((c) => c.id === selectedComplaintId);
                                                const applicantType = APPLICANT_TYPE.find((item) => item.value === complaint?.applicantType);
                                                if (complaint) {
                                                    setModal({
                                                        type: modalTypes.EDIT,
                                                        item: {
                                                            ...complaint,
                                                            applicantType: applicantType
                                                                ? {
                                                                      ...applicantType,
                                                                      name: languageData?.ApplicantType[
                                                                          applicantType.value as keyof typeof languageData.ApplicantType
                                                                      ],
                                                                  }
                                                                : undefined,
                                                        },
                                                    });
                                                    handleCloseActionMenu();
                                                }
                                            }}
                                            className={classes.menuItem}
                                        >
                                            <EditIcon className={classes.menuIcon} />
                                            <span className={classes.menuText}>{languageData?.Edit}</span>
                                        </MenuItem>
                                        <MenuItem
                                            id="delete-complaint-button"
                                            onClick={() => {
                                                const complaint = communicationComplaints?.find((c) => c.id === selectedComplaintId);
                                                const applicantType = APPLICANT_TYPE.find((item) => item.value === complaint?.applicantType);
                                                if (complaint) {
                                                    setModal({
                                                        type: modalTypes.DELETE,
                                                        item: {
                                                            ...complaint,
                                                            applicantType: applicantType
                                                                ? {
                                                                      ...applicantType,
                                                                      name: languageData?.ApplicantType[
                                                                          applicantType.value as keyof typeof languageData.ApplicantType
                                                                      ],
                                                                  }
                                                                : undefined,
                                                        },
                                                    });
                                                    handleCloseActionMenu();
                                                }
                                            }}
                                            className={classes.deleteMenuItem}
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
                    title={modal.type === modalTypes.ADD ? languageData?.AddComplaint : modal.type === modalTypes.EDIT && languageData?.EditComplaint}
                    isOpen={modal.type === modalTypes.ADD || modal.type === modalTypes.EDIT}
                    message={
                        modal.type === modalTypes.ADD ? languageData?.AddComplaintMessage : modal.type === modalTypes.EDIT && languageData?.EditComplaintMessage
                    }
                    id="add-edit-communication-complaint-modal"
                    onClose={() => {
                        setModal({ type: null, item: null });
                    }}
                    item={modal.type === modalTypes.EDIT ? modal.item : modal.type === modalTypes.ADD && null}
                    onSubmit={() => handleSubmit(modal.item)}
                >
                    <div style={{ padding: 13, display: "flex", flexDirection: "column", gap: 15 }}>
                        <StyledInput
                            id="complaint-name-input"
                            label={languageData?.ComplaintName}
                            type="text"
                            required={true}
                            activeLabel={true}
                            value={modal.item?.name || ""}
                            onChange={(value: string | number | null) => {
                                setModal({ ...modal, item: { ...modal.item, name: value } });
                            }}
                        />
                        <StyledDropdown
                            id="complaint-applicant-type-dropdown"
                            options={APPLICANT_TYPE.map((item) => ({
                                ...item,
                                name: languageData?.ApplicantType[item.value as keyof typeof languageData.ApplicantType],
                            }))}
                            required
                            activeLabel={true}
                            label={languageData?.Applicant}
                            onChange={(e, value) => {
                                setModal({ ...modal, item: { ...modal.item, applicantType: value } });
                            }}
                            value={
                                modal?.item?.applicantType
                                    ? typeof modal.item.applicantType === "object"
                                        ? modal.item.applicantType
                                        : APPLICANT_TYPE.find((item) => item.value === modal.item.applicantType) || null
                                    : null
                            }
                        />
                    </div>
                </AddEditModal>
            )}
            {modal.type === modalTypes.DELETE && (
                <DeleteModal
                    title={languageData?.DeleteComplaintTitle || ""}
                    message={languageData?.DeleteComplaintMessage || ""}
                    isOpen={modal.type === modalTypes.DELETE}
                    id="delete-communication-complaint-modal"
                    onClose={() => {
                        setModal({ type: null, item: null });
                    }}
                    onDelete={() => {
                        handleDeleteComplaint(modal.item?.id);
                    }}
                />
            )}
            <ComplaintsFilterDrawer
                isDrawerOpen={isFilterDrawerOpen}
                setIsDrawerOpen={setIsFilterDrawerOpen}
                orderByOptions={["name", "applicantType"].map((value, index) => ({
                    id: index,
                    value: value,
                    name: languageData?.ComplaintsFilterDrawer?.[value as keyof typeof languageData.ComplaintsFilterDrawer] || value,
                }))}
            />
        </div>
    );
};

export default ComplaintsTab;
