import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useFormikContext } from "formik";
import { useRouter } from "next/router";

import { AppDispatch, RootState } from "../../../store";

import FilterDrawer from "../../generic-components/FilterDrawer/FilterDrawer";
import FormTextInput from "../../generic-components/FormFields/FormTextInput";
import FormDateTimePicker from "../../generic-components/FormFields/FormDatePicker";

interface Filters {
    orderBy: { id: number; name: string; value: string } | null;
    orderType: string;
    name: string;
    cnp: string;
    address: string;
    startDate: Date | null;
    endDate: Date | null;
}

interface NaturalPersonFilterDrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
    administratorId?: number;
    orderByOptions?: Array<{
        id: number;
        value: string;
        name: string;
    }>;
}

const DateRange: React.FC = () => {
    const { values } = useFormikContext<Filters>();

    return (
        <div style={{ display: "flex", gap: "5px", alignItems: "flex-end" }}>
            <FormDateTimePicker
                label={useSelector((state: RootState) => state.website.languageData)?.NaturalPersonFilterDrawer?.ciValability || "Valabilitate CI"}
                name="startDate"
                maxDate={values.endDate ? moment(values.endDate).format("DD.MM.YYYY") : undefined}
            />
            <FormDateTimePicker name="endDate" label={""} minDate={values.startDate ? moment(values.startDate).format("DD.MM.YYYY") : undefined} />
        </div>
    );
};

const NaturalPersonFilterDrawer: React.FC<NaturalPersonFilterDrawerProps> = ({ isDrawerOpen, setIsDrawerOpen, orderByOptions = [] }) => {
    const dispatch: AppDispatch = useDispatch();
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const router = useRouter();

    const [initialValues, setInitialValues] = useState<Filters>({
        orderBy: null,
        orderType: "asc",
        name: "",
        cnp: "",
        address: "",
        startDate: null,
        endDate: null,
    });

    useEffect(() => {
        if (router.isReady && Object.keys(router.query).length > 0) {
            const { sortBy, sortType, name, cnp, address, startDate, endDate } = router.query;

            const findOrderByOption = sortBy ? orderByOptions.find((option) => option.value === sortBy) || null : null;

            setInitialValues({
                orderBy: findOrderByOption,
                orderType: typeof sortType === "string" ? sortType : "asc",
                name: typeof name === "string" ? name : "",
                cnp: typeof cnp === "string" ? cnp : "",
                address: typeof address === "string" ? address : "",
                startDate: startDate ? moment(startDate as string, "DD.MM.YYYY").toDate() : null,
                endDate: endDate ? moment(endDate as string, "DD.MM.YYYY").toDate() : null,
            });
        }
    }, [router.isReady, router.query, orderByOptions]);

    const handleSubmit = async (values: Filters) => {
        const queryParams: any = router?.query;
        if (values?.orderBy) {
            queryParams.sortBy = values.orderBy.value;
        } else {
            delete queryParams.orderBy;
        }

        if (values?.orderBy) {
            queryParams.sortType = values.orderType;
        } else {
            delete queryParams.sortType;
        }

        if (values?.name) {
            queryParams.name = values.name;
        } else {
            delete queryParams.name;
        }

        if (values?.cnp) {
            queryParams.cnp = values.cnp;
        } else {
            delete queryParams.cnp;
        }

        if (values?.address) {
            queryParams.address = values.address;
        } else {
            delete queryParams.address;
        }

        if (values?.startDate) {
            queryParams.startDate = moment(values.startDate).format("DD.MM.YYYY");
        } else {
            delete queryParams.startDate;
        }

        if (values?.endDate) {
            queryParams.endDate = moment(values.endDate).format("DD.MM.YYYY");
        } else {
            delete queryParams.endDate;
        }

        router.push({
            pathname: router.pathname,
            query: { ...queryParams },
        });
    };

    return (
        <FilterDrawer
            anchor="right"
            open={isDrawerOpen}
            drawerWidth="25%"
            setOpen={setIsDrawerOpen}
            orderByOptions={orderByOptions}
            onSubmit={handleSubmit}
            initialValues={initialValues}
        >
            <FormTextInput placeholder={languageData?.Search} label={languageData?.NaturalPersonFilterDrawer?.name || "Nume si prenume"} name="name" />
            <FormTextInput placeholder={languageData?.Search} label={languageData?.NaturalPersonFilterDrawer?.cnp || "CNP"} name="cnp" />
            <FormTextInput placeholder={languageData?.Search} label={languageData?.NaturalPersonFilterDrawer?.address || "Domiciliu"} name="address" />
            <DateRange />
        </FilterDrawer>
    );
};

export default NaturalPersonFilterDrawer;
