import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import useStyles from "./CommunicationsTabStyles"; // Adjust the import path as necessary

const CommunicationsTab: React.FC = () => {
    const classes = useStyles();
    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <div className={classes.root}>
            {languageData?.CommunicationTabTitle}
        </div>
    );
};

export default CommunicationsTab;
