import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { RootState } from "../../../store";

import FilterDrawer from "../../generic-components/FilterDrawer/FilterDrawer";
import FormTextInput from "../../generic-components/FormFields/FormTextInput";
import FormSingleSelect from "../../generic-components/FormFields/FormSingleSelect";
import { APPLICANT_TYPE } from "../../../utils/constants";

interface Filters {
    orderBy: { id: number; name: string; value: string } | null;
    orderType: string;
    name: string;
    applicantType: { id?: number; name?: string; value?: string } | null;
}

interface ComplaintsFilterDrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
    administratorId?: number;
    orderByOptions?: Array<{
        id: number;
        value: string;
        name: string;
    }>;
}

const ComplaintsFilterDrawer: React.FC<ComplaintsFilterDrawerProps> = ({ isDrawerOpen, setIsDrawerOpen, orderByOptions = [] }) => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const router = useRouter();

    const [initialValues, setInitialValues] = useState<Filters>({
        orderBy: null,
        orderType: "asc",
        name: "",
        applicantType: null,
    });

    useEffect(() => {
        if (router.isReady && Object.keys(router.query).length > 0) {
            const { sortBy, sortType, name, applicantType } = router.query;

            const findOrderByOption = sortBy ? orderByOptions.find((option) => option.value === sortBy) || null : null;

            const findApplicantTypeOption = applicantType ? APPLICANT_TYPE.find((item) => item.value === applicantType) || null : null;

            setInitialValues({
                orderBy: findOrderByOption,
                orderType: typeof sortType === "string" ? sortType : "asc",
                name: typeof name === "string" ? name : "",
                applicantType:
                    typeof applicantType === "string"
                        ? { ...findApplicantTypeOption, name: languageData?.ApplicantType[applicantType as keyof typeof languageData.ApplicantType] }
                        : null,
            });
        }
    }, [router.isReady, router.query, orderByOptions]);

    const handleSubmit = async (values: Filters) => {
        const queryParams: any = router?.query;
        if (values?.orderBy) {
            queryParams.sortBy = values.orderBy.value;
        } else {
            delete queryParams.sortBy;
        }

        if (values?.orderType) {
            queryParams.sortType = values.orderType;
        } else {
            delete queryParams.sortType;
        }

        if (values?.name) {
            queryParams.name = values.name;
        } else {
            delete queryParams.name;
        }

        if (values?.applicantType) {
            queryParams.applicantType = values.applicantType?.value;
        } else {
            delete queryParams.applicantType;
        }
        queryParams.page = 1;

        router.push({
            pathname: router.pathname,
            query: { ...queryParams },
        });
        setIsDrawerOpen(false);
    };

    return (
        <FilterDrawer
            anchor="right"
            open={isDrawerOpen}
            drawerWidth="25%"
            setOpen={setIsDrawerOpen}
            orderByOptions={orderByOptions}
            onSubmit={handleSubmit}
            onClear={() => {
                setInitialValues({
                    orderBy: null,
                    orderType: "asc",
                    name: "",
                    applicantType: null,
                });
            }}
            initialValues={initialValues}
        >
            <FormTextInput placeholder={languageData?.Search} label={languageData?.ComplaintsFilterDrawer?.name || "Sesizare"} name="name" />
            <FormSingleSelect
                options={APPLICANT_TYPE.map((item) => ({
                    ...item,
                    name: languageData?.ApplicantType[item.value as keyof typeof languageData.ApplicantType],
                }))}
                placeholder={languageData?.Select}
                name={`applicantType`}
                label={languageData?.ComplaintsFilterDrawer?.applicantType || "Solicitant"}
            />
        </FilterDrawer>
    );
};

export default ComplaintsFilterDrawer;
