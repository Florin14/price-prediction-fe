import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import { TableRow, TableCell } from "@mui/material";

import FormLayout from "../../../containers/FormLayout";
import StyledButton from "../../generic-components/StyledButton";
import StyledTable from "../../generic-components/StyledTable";
import useClasses from "../../../utils/useClasses";

import simple_table_crud_style from "../../../assets/css/simple_table_crud_style";
import StarterComponentWithTableStyles from "./StarterComponentWithTableStyles";
import { RootState } from "../../../store";

interface CustomFiltersProps {
    classes: Record<string, string>;
}

interface FilterState {
    example: string | null;
    exampleIds: string[];
}

const CustomFilters: React.FC<CustomFiltersProps> = ({ classes }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const resources = useSelector(
        (
            state: any /** This needs to be replaced with RootState type after new slice will be declared in store and cand be accessed by replacing exampleSlice with the slice name */
        ) => state.exampleSlice.resources
    );
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const [filters, setFilters] = useState<FilterState>({
        example: null,
        exampleIds: [],
    });

    useEffect(() => {
        if (router.isReady) {
            const { rows, page, sortBy, sortType, example, exampleIds } = router.query;
            if (rows || page || sortBy || sortType || example || exampleIds) {
                // example of how a thunk method or async thunk method needs to be called
                // dispatch(exampleFetchCall({
                //     page: (page as string | undefined) ? parseInt(page as string) - 1 : 0,
                //     rows: rows || 25,
                //     sortBy: sortBy,
                //     sortType: sortType,
                //     exampleNameFromBackend: example,
                //     exampleIdsNameFromBackend: exampleIds,
                // }));
            } else {
                // example of how a thunk method or async thunk method needs to be called
                // dispatch(exampleFetchCall({}));
            }
        }
    }, [router?.query, router?.isReady]);

    useEffect(() => {
        if (router?.isReady && resources.exampleOne.length > 0 && resources.exampleTwo.length > 0) {
            populateFields();
        }
    }, [router?.query, router?.isReady, resources]);

    const setMultipleFilters = (newFilters: Partial<FilterState>) => {
        const tmpData = { ...filters, ...newFilters };
        setFilters(tmpData);
    };

    const populateFields = () => {
        /* Implement logic */
    };
    const onSubmitFilter = () => {
        /* Implement logic */
    };

    return (
        <FormLayout
            className={classes.filtersWrapper}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitFilter();
            }}
        >
            {/* inputs, dropdowns, switches, filters in general */}
            <StyledButton type="submit" variant="contained" color="primary">
                {languageData?.Filter.toUpperCase()}
            </StyledButton>
        </FormLayout>
    );
};

interface CustomTableProps {
    classes: Record<string, string>;
}

const CustomTable: React.FC<CustomTableProps> = ({ classes }) => {
    const tableClasses = useClasses(simple_table_crud_style, { name: "CustomTableStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const router = useRouter();
    const dispatch = useDispatch();
    const data = useSelector(
        (
            state: any /** This needs to be replaced with RootState type after new slice will be declared in store and cand be accessed by replacing exampleSlice with the slice name */
        ) => state.exampleSimple.exampleData
    );

    const renderRow = (item: any, isLast: boolean) => {
        return (
            <TableRow key={item?.id}>
                <TableCell className={classNames(tableClasses.cell)}>{item?.example || "-"}</TableCell>
            </TableRow>
        );
    };

    return (
        <StyledTable
            data={data || []}
            titles={languageData?.ExampleTitlesObject}
            renderRow={renderRow}
            containerClassName={classes.tableWrapper}
            excludedLabels={["actions"]}
        />
    );
};

const StarterComponentWithTable: React.FC = (props) => {
    const classes = useClasses(StarterComponentWithTableStyles, { name: "StarterComponentWithTableStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            // Example of how a slice action should be called
            // dispatch(exampleActions.setToEmpty({}));
        };
    }, []);

    return (
        <div className={classes.wrapper}>
            <CustomFilters classes={classes} />
            <CustomTable classes={classes} />
        </div>
    );
};

export default StarterComponentWithTable;
