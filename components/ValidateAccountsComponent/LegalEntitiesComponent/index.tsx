import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import { TableCell, TableRow } from "@mui/material";

import { RootState } from "../../../store";
import useClasses from "../../../utils/useClasses";
import { fetchLegalEntities } from "../../../store/slices/validation/legal-entities/thunks";

import { TruncateText } from "../../generic-components/TruncateText/TruncateText";
import StyledButton from "../../generic-components/StyledButton";
import StyledTable from "../../generic-components/StyledTable";
import StyledFileName from "../../generic-components/StyledFileName";
import LegalEntitiesComponentStyles from "./LegalEntitiesComponentStyles";


const LegalEntitiesComponent = () => {
     const classes = useClasses(LegalEntitiesComponentStyles, { name: "LegalEntitiesComponentStyles" });
     const dispatch = useDispatch<any>();
    const router = useRouter();

    const users = useSelector((state: RootState) => state.legalEntity.items);
    const quantity = useSelector((state: RootState) => state.legalEntity.quantity);

    const languageData = useSelector((state: RootState) => state.website.languageData);

    useEffect(() => {
        const { filter, rows, page, sortBy, sortType } = router.query;
        if (router.isReady && router.query) {
            dispatch(fetchLegalEntities({}));
        }
    }, [dispatch, router.query]);

    const handleFileDownload = async (file: any) => {
        const url = `/file-operations/${file?.folderName}/files/${file?.fileId}`;
        const options = {
            url: url,
            method: "GET",
            responseType: "blob" as const,
        };
        // const response = await Axios(options);
        // const windowUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        // link.href = windowUrl;
        link.setAttribute("download", file?.fileName);
        document.body.appendChild(link);
        link.click();
    };

    const renderRow = (data: any) => (
        <TableRow key={data.id} className={classes.clickableRow}>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>
                <TruncateText text={data.companyName} maxLines={2} />
            </TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{data.cui}</TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{data.name}</TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>{data.phoneNumber}</TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>
                <TruncateText text={data.email} maxLines={2} />
            </TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>
                <StyledFileName
                    activeTooltip={true}
                    clickable={true}
                    value={data?.taxCertificate.fileName || ""}
                    onClick={() => handleFileDownload(data?.taxCertificate.fileId)}
                    id={`tax-certificate-file`}
                    fileClassName={classes.file}
                />
            </TableCell>
            <TableCell className={classNames(classes.cell, classes.firstBreakWordCell)}>
                {data.isNewAccount ? languageData?.NewAccount : languageData?.AccountUpdate}
            </TableCell>
            <TableCell className={classes.actionsCell} style={{ position: "sticky", right: 0, paddingLeft: 40, background: "#FFFFFF", zIndex: 1 }}>
                <StyledButton className={classes.validateButton} variant="contained" onClick={() => { }}>
                    {languageData?.Validate}
                </StyledButton>
            </TableCell>
        </TableRow>
    );

    return (
        <>
            <StyledTable
                data={users || []}
                titles={languageData?.LegalEntitiesTable}
                excludedLabels={["email", "phoneNumber", "cui", "copyTaxCertificate", "actions"]}
                renderRow={renderRow}
                hasFilters={false}
                hasHeaderSection={false}
                className={classes.tableRootWithPagination}
                containerClassName={classes.tableContainer}
                enablePagination={true}
                pageTotal={quantity || 0}
                pageSize={25}
                stickyHeader={"Actiuni"}
            />
        </>
    );
};

export default LegalEntitiesComponent;
