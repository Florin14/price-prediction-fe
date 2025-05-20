import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableRow, TableCell, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import StyledButton from "../../../../components/generic-components/StyledButton";
import StyledDropdown from "../../../../components/generic-components/StyledDropdown";
import StyledDatePicker from "../../../../components/generic-components/StyledDatepicker";
import StyledInput from "../../../../components/generic-components/StyledInput";
import StyledMultiDropdown from "../../../../components/generic-components/StyledMultiDropdown";
import StyledTable from "../../../../components/generic-components/StyledTable";
import { websiteActions } from "../../../../store/slices/website/website-slice";
import { RootState } from "../../../../store";
import StyledSwitch from "../../../../components/generic-components/StyledSwitch";
import StyledRadioButton from "../../../../components/generic-components/StyledRadioButton";
import FileUpload from "../../../../components/generic-components/FileUpload/FileUpload";
import FileDisplay from "../../../../components/generic-components/FileDisplay/FileDisplay";
import { Formik, Form } from "formik";
import FormFileUpload from "../../../../components/generic-components/FormFields/FormFileUpload";

interface Documents {
    file: any | null;
}

interface DocumentsToDelete {
    file: any | null;
    type: string | null;
}

const Components: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: "Generic components" }));
    }, [dispatch]);

    const dropdownOptions = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 5, name: "Option 5" },
        { id: 6, name: "Option 6" },
    ];

    const tableColumns = {
        column1: { title: "Column 1", tooltipTitle: "Tooltip for Column 1" },
        column2: "Column 2",
        column3: "Column 3",
        column4: "Column 4",
        column5: "Column 5",
        column6: "Column 6",
    };

    const tableData = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        column1: `Row ${index + 1} - Data 1`,
        column2: `Row ${index + 1} - Data 2`,
        column3: `Row ${index + 1} - Data 3`,
        column4: `Row ${index + 1} - Data 4`,
        column5: `Row ${index + 1} - Data 5`,
        column6: `Row ${index + 1} - Data 6`,
    }));

    const [dropdownValue, setDropdownValue] = useState<{ id: number; name: string } | null>(null);
    const [disabledDropdownValue, setDisabledDropdownValue] = useState(null);
    const [datePickerValue, setDatePickerValue] = useState(null);
    const [disabledDatePickerValue, setDisabledDatePickerValue] = useState(null);
    const [textInputValue, setTextInputValue] = useState("");
    const [multiDropdownValue, setMultiDropdownValue] = useState<{ id: number; name: string }[]>([]);
    const [switchValue, setSwitchValue] = useState(false); // State for StyledSwitch
    const [radioValue, setRadioValue] = useState<string>("option1"); // State for StyledRadioButton
    const [documents, setDocuments] = useState<Documents>({
        file: null,
    });
    const [documentToDelete, setDocumentToDelete] = useState<DocumentsToDelete>({
        file: null,
        type: null,
    });

    const initialValues = {
        file: null,
    };

    const radioOptions = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
    ];

    const isViewableInline = (mimeType: string): boolean => {
        return ["application/pdf", "image/png", "image/jpeg", "image/svg+xml"].includes(mimeType);
    };

    const getMimeType = (filename: string): string => {
        const ext = filename.split(".").pop()?.toLowerCase();
        switch (ext) {
            case "pdf":
                return "application/pdf";
            case "png":
                return "image/png";
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "svg":
                return "image/svg+xml";
            default:
                return "application/octet-stream"; // generic binary
        }
    };

    const downloadFile = async (doc: { id: string; name: string; folder: string }) => {
        const mimeType = getMimeType(doc.name);
        // const fileBlob = new Blob([doc?.data || ""], { type: mimeType });
        // const blobUrl = window.URL.createObjectURL(fileBlob);

        // if (isViewableInline(mimeType)) {
        //     window.open(blobUrl, "_blank");
        // } else {
        //     const link = document.createElement("a");
        //     link.href = blobUrl;
        //     link.setAttribute("download", doc?.name);
        //     document.body.appendChild(link);
        //     link.click();
        //     link.remove();
        // }
    };

    const downloadHandler = (file: any) => {
        downloadFile({ id: file.id!, name: file.name, folder: file.folder! });
    };

    return (
        <Box sx={{ height: "100%", padding: "20px", display: "flex", flexDirection: "column" }}>
            <Grid container spacing={5} sx={{ width: "100%", alignItems: "flex-end" }}>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledButton variant="contained">Variant button</StyledButton>
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledButton disabled variant="contained">
                        Disabled Variant button
                    </StyledButton>
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledButton variant="outlined">Outlined button</StyledButton>
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledButton disabled variant="outlined">
                        Disabled Outlined button
                    </StyledButton>
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledButton variant="contained" color="error">
                        Error button
                    </StyledButton>
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <FileUpload
                        buttonLabel={"Incarca fisier"}
                        onChange={(file) => setDocuments({ ...documents, file })} // Update documents.file when a file is uploaded
                        id={""}
                    ></FileUpload>
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <FileDisplay
                        file={documents.file}
                        isViewable={true}
                        onRemove={() => setDocuments({ ...documents, file: null })}
                        onClick={() => {}}
                        canDelete={true}
                        id={""}
                    />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
                        {({ setFieldValue, errors, touched }) => (
                            <Form>
                                <FormFileUpload name="file" required buttonLabel="Incarca fisier" downloadHandler={downloadHandler} />
                            </Form>
                        )}
                    </Formik>
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}></Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}></Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledDropdown
                        activeLabel={true}
                        label="Long longDropdown"
                        width="100%"
                        value={dropdownValue}
                        onChange={(_, value) => setDropdownValue(value as any)}
                        options={dropdownOptions}
                        displayField="name"
                    />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledDropdown
                        activeLabel={true}
                        disabled
                        label="Long longDropdown"
                        width="100%"
                        value={disabledDropdownValue}
                        onChange={(value) => setDisabledDropdownValue(value as any)}
                        options={dropdownOptions}
                        displayField="name"
                    />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledDatePicker
                        activeLabel={true}
                        label="Long Long Datepicker"
                        value={datePickerValue}
                        minDate={new Date()}
                        onChange={(value) => setDatePickerValue(value)}
                    />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledDatePicker
                        disabled
                        activeLabel={true}
                        label="Long Long Datepicker"
                        value={disabledDatePickerValue}
                        onChange={(value) => setDisabledDatePickerValue(value)}
                    />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledInput label="Long Long Text Input" value={textInputValue} activeLabel onChange={(value) => setTextInputValue(value as string)} />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledInput disabled label="Long Long Text Input" value="" activeLabel onChange={() => {}} />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledMultiDropdown
                        label="Multi-Select Dropdown"
                        options={dropdownOptions}
                        value={multiDropdownValue}
                        onChange={(_, value) => setMultiDropdownValue(value as any[])}
                        displayField="name"
                        hasSelectAll
                    />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledMultiDropdown label="Multi-Select Dropdown" options={dropdownOptions} value={[]} onChange={() => {}} displayField="name" disabled />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledSwitch
                        disabled={false} // Set to true to disable the switch
                        checked={switchValue} // Bind state to the switch
                        onChange={(event) => setSwitchValue(event.target.checked)} // Update state on toggle
                    />
                </Grid>
                <Grid size={3} sx={{ display: "flex", justifyContent: "left" }}>
                    <StyledRadioButton
                        disabled={false} // Set to true to disable the radio button
                        label="Select an Option"
                        options={radioOptions}
                        value={radioValue}
                        onChange={(event) => setRadioValue(event.target.value)}
                    />
                </Grid>
            </Grid>
            <div style={{ marginTop: "20px" }}>
                <StyledTable
                    renderRow={(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.column1}</TableCell>
                            <TableCell>{item.column2}</TableCell>
                            <TableCell>{item.column3}</TableCell>
                            <TableCell>{item.column4}</TableCell>
                            <TableCell>{item.column5}</TableCell>
                            <TableCell>{item.column6}</TableCell>
                        </TableRow>
                    )}
                    excludedLabels={["column1", "column2"]}
                    headerComponent={<div></div>}
                    data={tableData}
                    titles={tableColumns}
                    enablePagination={true}
                    pageSize={25}
                />
            </div>
        </Box>
    );
};

export default Components;
