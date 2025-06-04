import React, { useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import classNames from "classnames";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

import { Button, Tooltip, Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem, AppBar, Toolbar, IconButton, Icon } from "@mui/material";
import Grid from "@mui/material/Grid";
import Menu from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import useClasses from "../../../utils/useClasses";
import { RootState } from "../../../store";

import PersonIcon from "../../icons/PersonIcon";
import LockIcon from "../../icons/LockIcon";
import ArrowDownIcon from "../../icons/ArrowDownIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import StyledButton from "../StyledButton";
import { LanguageDataTypes } from "../../../assets/language/ro";

import navbar_style, { NavbarStyle } from "../../../assets/css/navbar_style";
import { RouteModel } from "../../../models/generic/routes";

export function AccountData() {
    const classes = useClasses(navbar_style, { name: "NavbarStyle" }) as NavbarStyle;
    const [cookies, setCookie] = useCookies(["name", "role", "id"]);

    const [openProfile, setOpenProfile] = useState<HTMLElement | null>(null);
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const router = useRouter();

    const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
        if (openProfile && openProfile.contains(event.target as Node)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };

    const handleCloseProfile = () => {
        setOpenProfile(null);
    };

    const handleLogout = () => {
        const options = {
            url: "/auth/logout",
            method: "POST",
        };
        Axios(options)
            .then((_) => {
                setCookie("name", "", { path: "/" });
                setCookie("role", "", { path: "/" });
                setCookie("id", "", { path: "/" });
                router.push("/login").then((r) => {});
                handleCloseProfile();
            })
            .catch((_) => {
                setCookie("name", "", { path: "/" });
                setCookie("role", "", { path: "/" });
                setCookie("id", "", { path: "/" });
                router.push("/login").then((r) => {});
                handleCloseProfile();
            });
    };

    return (
        <div>
            {router.pathname.includes("guest") && !cookies['name']? (
                
                <div className={classes.registrationButtonsWrapper}>
                        <StyledButton
                            className={classes.navbarButton}
                            variant="contained"
                            onClick={() => {
                                router.push("/login");
                            }}
                        >
                            {languageData?.SignIn}
                        </StyledButton>
                        <StyledButton
                            className={classes.navbarButton}
                            variant="outlined"
                            onClick={() => {
                                router.push("/register");
                            }}
                        >
                            {languageData?.CreateAccount}
                        </StyledButton>
                    </div>
            ) : (
                <Tooltip title={cookies["name"]} className={classes.tooltipWrapper}>
                    <Button
                        aria-owns={openProfile ? "profile-menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleClickProfile}
                        classes={{ root: classes.accountButtonWrapper }}
                    >
                        <div className={classes.accountIcon}>
                            <PersonIcon />
                        </div>
                        <p className={classes.linkText}>{cookies["name"]}</p>
                        <div>
                            <ArrowDownIcon />
                        </div>
                    </Button>
                </Tooltip>
            )}
            <Popper open={Boolean(openProfile)} anchorEl={openProfile} transition disablePortal className={classNames({ [classes.popperClose]: !openProfile })}>
                {({ TransitionProps, placement }) => (
                    <ClickAwayListener onClickAway={handleCloseProfile}>
                        <Grow
                            {...TransitionProps}
                            id="profile-menu-list-grow"
                            style={{
                                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                            }}
                        >
                            <Paper>
                                <MenuList role="menu">
                                    <MenuItem
                                        onClick={() => {
                                            router.push("/citizen/change-password").then((_) => {
                                                handleCloseProfile();
                                            });
                                        }}
                                        className={classes.dropdownItem}
                                    >
                                        <LockIcon className={classes.accountDropdownIcon} />
                                        <div>{languageData?.ChangePassword}</div>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout} className={classes.dropdownItem}>
                                        <LogoutIcon className={classes.accountDropdownIcon} />
                                        <div>{languageData?.Logout}</div>
                                    </MenuItem>
                                </MenuList>
                            </Paper>
                        </Grow>
                    </ClickAwayListener>
                )}
            </Popper>
        </div>
    );
}

const Header = (props: { routes: RouteModel[] }) => {
    const classes = useClasses(navbar_style, { name: "NavbarStyle" }) as NavbarStyle;
    const router = useRouter();

    const languageData = useSelector((state: RootState) => state.website.languageData);
    const title = useSelector((state: any) => state.website.title);
    const goBack = useSelector((state: any) => state.website.goBack);

    return (
        <AppBar className={classes.navbarWrapper}>
            <Toolbar className={classes.toolbarWrapper}>
                <Grid container className={classes.gridStyle} component="div">
                    <div style={{ width: "auto", display: "flex", alignItems: "center" }}>
                        {goBack && (
                            <Button className={classes.backButton} onClick={() => router.push(goBack)}>
                                <ArrowBackIosIcon className={classes.backIcon} />
                            </Button>
                        )}
                        <div className={classes.titleWrapper}>{languageData ? (languageData[title as keyof LanguageDataTypes] as string) || title : ""}</div>
                    </div>

                    {/* Navigation Menu */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        {props.routes
                            .filter((route) => route.isOnMenu)
                            .map((route, index) => (
                                <Button
                                    key={index}
                                    onClick={() => router.push(route.path)}
                                    style={{
                                        color: router.pathname.includes(route.path) ? "#primary" : "#666",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    {typeof route.icon === "string" ? <Icon>{route.icon}</Icon> : <route.icon />}
                                    <span>{(languageData && (languageData[route.name as keyof LanguageDataTypes] as string)) || route.name}</span>
                                </Button>
                            ))}
                    </div>

                    <div className={classes.rightCompWrapper}>
                        <AccountData />
                    </div>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
