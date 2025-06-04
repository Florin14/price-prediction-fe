import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useClasses from "../../utils/useClasses";


import { Box, Tab, Tabs } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import UsersComponent from "./UsersComponent";

import { RootState } from "../../store";

import ManageUsersComponentStyles from "./ManageUsersComponentStyles";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    id?: string;
    className?: string;
}


const ManageUsersComponent = () => {
    const classes = useClasses(ManageUsersComponentStyles, { name: "manageUsersComponentStyles" });
    const languageData = useSelector(
        (state: RootState) => state.website.languageData,
    );

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

    const handleChangeTab = (event: any, newValue: any) => {
        router.replace({ pathname: router.pathname, query: { tab: newValue } }).then((_) => { });
    };

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`employer-tabpanel-${index}`}
                aria-labelledby={`employer-tab-${index}`}
                {...other}
                style={{ height: "calc(100% - 49px)", overflow: "hidden" }}
            >
                {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `manage-users-tab-${index}`,
            "aria-controls": `manage-users-tabpanel-${index}`,
        };
    }

    return (
        <>
            <div id={`manage-users-outer-wrapper-tabs`} className={classes.wrapper}>
                <AppBar id={`manage-users-appbar-tabs`} classes={{ root: `${classes.appBar}` }} style={{ height: 48 }}>
                    <Tabs id={`manage-users-tabs`} classes={{ root: classes.tab }} value={currentTab} onChange={handleChangeTab} aria-label="simple tabs example">
                        <Tab
                            classes={{ root: classes.inactiveTab, selected: classes.selectedTab }}
                            label={languageData?.Users}
                            {...a11yProps(0)}
                        />
                        <Tab
                            classes={{ root: classes.inactiveTab, selected: classes.selectedTab }}
                            label={languageData?.DefineSections}
                            {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel id={`manage-users-tab-panel-1`} className={classes.tabPanel} value={currentTab} index={0}>
                    {init && <UsersComponent />}
                </TabPanel>
                
            </div>
        </>
    );
};

export default ManageUsersComponent;
