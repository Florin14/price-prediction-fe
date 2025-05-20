import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Drawer, Icon, List, ListItem, ListItemText, Typography } from "@mui/material";

import { RootState } from "../../../store";

import useClasses from "../../../utils/useClasses";
import { LanguageDataTypes } from "../../../assets/language/ro";
import { RouteModel } from "../../../models/generic/routes";

import sidebar_style, { SidebarStyle } from "../../../assets/css/sidebar_style";

interface Props {
    handleDrawerToggle?: () => void;
    routes: RouteModel[];
    open: boolean;
    menuMinHeight?: number;
    label?: string | null;
    children?: React.ReactNode;
}

export default function Sidebar(props: Props) {
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const classes = useClasses(sidebar_style, { name: "SidebarStyles" }) as SidebarStyle;
    const router = useRouter();

    const [mobileDevice, setMobileDevice] = useState(false);

    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName: string) {
        return routeName === "/dashboard" ? routeName === router.pathname : router.pathname.includes(routeName);
    }
    const { routes } = props;

    useEffect(() => {
        setMobileDevice(window?.innerWidth < 960);

        const handleResize = () => {
            setMobileDevice(window?.innerWidth < 960);
            if (window?.innerWidth >= 960 && props.open) {
                props.handleDrawerToggle && props.handleDrawerToggle();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize); // Cleanup event listener
        };
    }, []);

    const links = (device?: string) => {
        return (
            <List className={classes.list}>
                {routes
                    .filter((route) => route.isOnMenu)
                    .map((prop, key) => {
                        const isActive = activeRoute(prop.path);
                        const listItemClasses = classNames({
                            [" " + classes.activeRoute]: isActive,
                        });

                        // dacă avem label de grup, luăm varianta tradusă în languageData
                        const rawSection = prop?.section ?? "";
                        const translatedLabel = languageData?.[rawSection as keyof LanguageDataTypes];

                        // 2) Forțezi conversia la string (fallback pe rawSection dacă nu există traducere)
                        const sectionText = String(translatedLabel ?? rawSection).toUpperCase();

                        return (
                            <React.Fragment key={key}>
                                {rawSection && <Typography className={classes.section}>{sectionText}</Typography>}

                                <Link href={prop.path}>
                                    <div className={classes.item + listItemClasses} onClick={() => device === "mobile" && props.handleDrawerToggle?.()}>
                                        <ListItem className={classes.itemLink}>
                                            {typeof prop.icon === "string" ? (
                                                <Icon className={classes.itemIcon}>{prop.icon}</Icon>
                                            ) : (
                                                <prop.icon className={classes.itemIcon} />
                                            )}
                                            <ListItemText
                                                primary={(languageData && (languageData[prop.name as keyof LanguageDataTypes] as string)) || prop.name}
                                                className={classes.itemText}
                                                disableTypography
                                            />
                                            {prop.label && prop.label}
                                        </ListItem>
                                    </div>
                                </Link>
                            </React.Fragment>
                        );
                    })}
            </List>
        );
    };

    var brand = (
        <div className={classes.countyWrapper}>
            <div className={classes.county}>{languageData?.ClujCounty}</div>
            <div className={classes.city}>{languageData?.VadCity}</div>
        </div>
    );

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Flex container for layout */}
            <Drawer
                variant={mobileDevice ? "temporary" : "permanent"} // Adjust variant based on device
                anchor={"left"}
                open={mobileDevice ? props.open : true} // Always open for desktop
                classes={{
                    paper: classes.drawerPaper,
                }}
                onClose={mobileDevice ? props.handleDrawerToggle : undefined} // Close only for mobile
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {brand}
                <div className={classes.sidebarWrapper} style={{ minHeight: props.menuMinHeight }}>
                    {links(mobileDevice ? "mobile" : undefined)} {/* Render links based on device */}
                </div>
            </Drawer>
            <main
                style={{
                    flexGrow: 1,
                    overflow: "hidden",
                    marginLeft: mobileDevice ? "0" : "192px", // Adjust margin for large and small screens
                    width: mobileDevice ? "100%" : "calc(100% - 192px)", // Adjust width for large and small screens
                }}
            >
                {props.children} {/* Render the page content */}
            </main>
        </div>
    );
}
