import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { AppBar, Tabs, Tab } from "@mui/material";

import { RootState } from "../../store";

import CommunicationsTab from "./tabs/CommunicationsTab";
import ComplaintsTab from "./tabs/ComplaintsTab";
import LabelsTab from "./tabs/LabelsTab";
import InputChannelsTab from "./tabs/InputChannelsTab";
import CategoriesTab from "./tabs/CategoriesTab";
import useClasses from "../../utils/useClasses";
import AddEditCommunicationType from "../AddEditCommunicationType/AddEditCommunicationType";

import ManageComStyles from "./ManageComComponentStyles";

interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
    className?: string;
    [key: string]: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, className, ...other } = props;
    return (
        <div className={className} role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
};
const ManageComComponent = () => {
    const classes = useClasses(ManageComStyles, { name: "ManageComStyles" });

    const languageData = useSelector((state: RootState) => state.website.languageData);

    const router = useRouter();

    const [currentTab, setCurrentTab] = useState(0);
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (router?.isReady) {
            if (!!router?.query?.tab) {
                setCurrentTab(Number(router?.query?.tab));
            }
            setInit(true);
        }
    }, [router?.isReady, router?.query]);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        router.replace({ pathname: router.pathname, query: { tab: newValue } }).then((_) => {});
    };

    return (
        <>
            <div id={`com-outer-wrapper-tabs`} className={classes.wrapper}>
                <AppBar id={`com-appbar-tabs`} classes={{ root: `${classes.appBar}` }}>
                    <Tabs id={`com-tabs`} classes={{ root: classes.tab }} value={currentTab} onChange={handleChangeTab} aria-label="simple tabs example">
                        <Tab
                            classes={{ root: classes.inactiveTab, selected: classes.selectedTab }}
                            label={languageData?.CommunicationTabTitle}
                            {...a11yProps(2)}
                        />
                        <Tab
                            classes={{ root: classes.inactiveTab, selected: classes.selectedTab }}
                            label={languageData?.ComplaintsTabTitle}
                            {...a11yProps(3)}
                        />
                        <Tab classes={{ root: classes.inactiveTab, selected: classes.selectedTab }} label={languageData?.LabelsTabTitle} {...a11yProps(4)} />
                        <Tab
                            classes={{ root: classes.inactiveTab, selected: classes.selectedTab }}
                            label={languageData?.InputChannelTabTitle}
                            {...a11yProps(5)}
                        />
                        <Tab
                            classes={{ root: classes.inactiveTab, selected: classes.selectedTab }}
                            label={languageData?.CategoriesTabTitle}
                            {...a11yProps(6)}
                        />
                    </Tabs>
                </AppBar>
                <TabPanel id={`com-tab-panel-0`} className={classes.tabPanel} value={currentTab} index={0}>
                    {init && !router?.query?.id && !router?.query?.mode ? (
                        <CommunicationsTab />
                    ) : (
                        init && (
                            <AddEditCommunicationType
                                mode={
                                    typeof router?.query?.mode === "string" && (router.query.mode === "add" || router.query.mode === "edit")
                                        ? router.query.mode
                                        : "add"
                                }
                                communicationTypeId={typeof router.query.id === "string" ? router.query.id : undefined}
                            />
                        )
                    )}
                </TabPanel>
                <TabPanel id={`com-tab-panel-1`} className={classes.tabPanel} value={currentTab} index={1}>
                    {init && <ComplaintsTab />}
                </TabPanel>
                <TabPanel id={`com-tab-panel-2`} className={classes.tabPanel} value={currentTab} index={2}>
                    {init && <LabelsTab />}
                </TabPanel>
                <TabPanel id={`com-tab-panel-3`} className={classes.tabPanel} value={currentTab} index={3}>
                    {init && <InputChannelsTab />}
                </TabPanel>
                <TabPanel id={`com-tab-panel-4`} className={classes.tabPanel} value={currentTab} index={4}>
                    {init && <CategoriesTab />}
                </TabPanel>
            </div>
        </>
    );
};

export default ManageComComponent;
