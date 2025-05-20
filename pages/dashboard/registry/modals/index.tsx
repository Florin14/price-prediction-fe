import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import { TableCell, TableRow, IconButton } from "@mui/material";
import { Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem } from "@mui/material";

import { fetchAdministrators, deleteAdministrators } from "../../../../store/slices/administrator/thunks";
import { RootState } from "../../../../store";
import useClasses from "../../../../utils/useClasses";

import StyledButton from "../../../../components/generic-components/StyledButton";
import ActionsIcon from "../../../../components/icons/ActionsIcon";
import AddEditModal from "../../../../components/modals/AddEditModal/AddEditModal";
import DeleteModal from "../../../../components/modals/DeleteModal/DeleteModal";
import InfoModal from "../../../../components/modals/InfoModal/InfoModal";
import StyledInput from "../../../../components/generic-components/StyledInput";

interface Modal {
    type: string | null;
    item: any | null;
}

const modalTypes = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
};

const AdministratorComponent = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();

    const administrators = useSelector((state: RootState) => state.administrator.items);
    const quantity = useSelector((state: RootState) => state.administrator.quantity);
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const [modal, setModal] = useState<Modal>({ type: null, item: null });
    const [openActionMenu, setOpenActionMenu] = useState<null | HTMLElement>(null);
    const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);

    useEffect(() => {
        const { filter, rows, page, sortBy, sortType } = router.query;
        if (router.isReady && router.query) {
            dispatch(
                fetchAdministrators({
                    filter: (filter as string) || undefined,
                    limit: rows ? Number(rows) : 25,
                    offset: page ? Number(page) : 1,
                    sortBy: (sortBy as string) || "name",
                    sortType: (sortType as string) || "asc",
                })
            );
        }
    }, [dispatch, router.query]);

    const handleSubmit = () => {
    }


    const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, adminId: number) => {
        setOpenActionMenu(event.currentTarget);
        setSelectedAdminId(adminId);
    };

    const handleCloseActionMenu = () => {
        setOpenActionMenu(null);
        setSelectedAdminId(null);
    };

    const handleDeleteAdministrator = (id: number) => {
        dispatch(deleteAdministrators({ id }));
        setModal({ type: null, item: null });
    };


    return (
        <>
            <StyledButton onClick={() => setIsOpenAdd(true)}>Adaugare</StyledButton>
            <StyledButton onClick={() => setIsOpenDelete(true)}>Delete</StyledButton>
            <StyledButton onClick={() => setIsOpenError(true)}>Info</StyledButton>

            <DeleteModal
                title={languageData?.DeleteAdministratorTitle || ""}
                message={languageData?.DeleteAdministratorMessage || ""}
                isOpen={modal.type === modalTypes.DELETE}
                id="delete-client-modal"
                onClose={() => {
                    setModal({ type: null, item: null });
                }}
                onDelete={() => {
                    handleDeleteAdministrator(modal.item?.id);
                }}
            />
            <AddEditModal
                isOpen={isOpenAdd}
                onClose={() => setIsOpenAdd(false)}
                message="Caption"
                item={null}
                title="Title"
                onSubmit={() => {
                    handleSubmit();
                }}
            >
                <div style={{ display: "flex", marginTop: 20, marginBottom: 20 }}>
                    <StyledInput
                        value={null}
                        label={languageData?.NewPassword}
                        activeLabel
                        onChange={(value: any) => { }}
                        inputName="password"
                        type="password"
                        required={true}
                        showHidePassword={true}
                    />
                </div>

            </AddEditModal >
            <InfoModal
                isOpen={isOpenError}
                onClose={() => setIsOpenError(false)}
                message="Caption"
                title="Title"></InfoModal>
            <DeleteModal
                isOpen={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                message="Caption"
                title="Title"
                onDelete={() => setIsOpenDelete(false)}></DeleteModal>
        </>
    );
};

export default AdministratorComponent;
