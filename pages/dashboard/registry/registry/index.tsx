import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { websiteActions } from "../../../../store/slices/website/website-slice";
import { RootState } from "../../../../store";

const Registry: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: "Registry" }));
    }, [dispatch]);

    return <div style={{ height: "100%" }}>{"Registry"}</div>;
};

export default Registry;
