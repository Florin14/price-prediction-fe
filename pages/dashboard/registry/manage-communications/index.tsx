import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { websiteActions } from "../../../../store/slices/website/website-slice";
import { RootState } from "../../../../store";
import ManageComComponent from "../../../../components/ManageComComponent";

const ManageCommunications: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: "ManageCommunications" }));
    }, [dispatch]);

    return <ManageComComponent></ManageComComponent>;
};

export default ManageCommunications;
