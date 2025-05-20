import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import useClasses from "../../utils/useClasses";

import { Box, Tab, Tabs } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import LegalEntitiesComponent from "./LegalEntitiesComponent";
import NaturalPersonsComponent from "./NaturalPersonsComponent";

import { RootState } from "../../store";

import ValidateAccountsComponentStyles from "./ValidateAccountsComponentStyles";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    id?: string;
    className?: string;
}

const ValidateAccountsComponent = () => {
    const classes = useClasses(ValidateAccountsComponentStyles, { name: "validateAccountsComponentStyles" });

    const dispatch = useDispatch<any>();
    const [cookies, setCookie] = useCookies(["validationNaturalPersons", "validationLegalEntities"]);

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

    useEffect(() => {
        const options = {
            url: "/account",
            method: "GET",
        };
        Axios(options)
    }, [dispatch]);

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
            id: `validate-accounts-tab-${index}`,
            "aria-controls": `validate-accounts-tabpanel-${index}`,
        };
    }

    return (
        <>
            <div id={`validate-accounts-outer-wrapper-tabs`} className={classes.wrapper}>
                <AppBar id={`validate-accounts-appbar-tabs`} classes={{ root: `${classes.appBar}` }} style={{ height: 48 }}>
                    <Tabs id={`validate-accounts-tabs`} classes={{ root: classes.tab }} value={currentTab} onChange={handleChangeTab} aria-label="simple tabs example">
                        <Tab
                            classes={{ root: classes.inactiveTab, selected: classes.selectedTab }}
                            label={`${languageData?.NaturalPersons} (${cookies["validationNaturalPersons"]})`}
                            {...a11yProps(0)}
                        />
                        <Tab
                            classes={{ root: classes.inactiveTab, selected: classes.selectedTab }}
                            label={`${languageData?.LegalEntities} (${cookies["validationLegalEntities"]})`}
                            {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel id={`validate-accounts-tab-panel-1`} className={classes.tabPanel} value={currentTab} index={0}>
                    {init && <NaturalPersonsComponent />}
                </TabPanel>
                <TabPanel id={`validate-accounts-tab-panel-2`} className={classes.tabPanel} value={currentTab} index={1}>
                    {init && <LegalEntitiesComponent />}
                </TabPanel>
            </div>
        </>
    );
};

export default ValidateAccountsComponent;
