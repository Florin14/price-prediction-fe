import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { websiteActions } from "../../../../store/slices/website/website-slice";
import { RootState } from "../../../../store";
import NaturalPersonFilterDrawer from "../../../../components/drawers/NaturalPersonFilterDrawer/NaturalPersonFilterDrawer";

const ValidAccounts: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();
    const [filtersDrawerOpen, setFiltersDrawerOpen] = React.useState(false);

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: "ValidAccounts" }));
    }, [dispatch]);

    return (
        <div style={{ height: "100%" }}>
            <button
                onClick={() => {
                    setFiltersDrawerOpen(true);
                }}
            >
                Open filter drawer
            </button>
            <NaturalPersonFilterDrawer
                isDrawerOpen={filtersDrawerOpen}
                setIsDrawerOpen={() => {
                    setFiltersDrawerOpen(false);
                }}
                orderByOptions={["name", "address", "ciValability"].map((value, index) => ({
                    id: index,
                    value: value,
                    name: languageData?.NaturalPersonFilterDrawer?.[value as keyof typeof languageData.NaturalPersonFilterDrawer] || value,
                }))}
            />
        </div>
    );
};

export default ValidAccounts;
