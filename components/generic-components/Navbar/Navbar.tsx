import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import classNames from "classnames";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";

import { Button, Tooltip, Popper, ClickAwayListener, Grow, Paper, MenuList, MenuItem, AppBar, Toolbar, IconButton, Icon, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Menu from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TranslateIcon from "@mui/icons-material/Translate";
import HomeIcon from "../../icons/HomeIcon";

import useClasses from "../../../utils/useClasses";
import { RootState } from "../../../store";
import ro from "../../../assets/language/ro";
import en from "../../../assets/language/en";
// import { setLanguageData } from "../../../store/slices/website/website-slice";

import PersonIcon from "../../icons/PersonIcon";
import LockIcon from "../../icons/LockIcon";
import ArrowDownIcon from "../../icons/ArrowDownIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import StyledButton from "../StyledButton";
import { LanguageDataTypes } from "../../../assets/language/ro";
import { RouteModel } from "../../../models/generic/routes";

import navbar_style, { NavbarStyle } from "../../../assets/css/navbar_style";
import { websiteActions } from "../../../store/slices/website/website-slice";
import { loadingActions } from "../../../store/slices/loading/loading-slice";

export function AccountData() {
    const isDarkMode = useSelector((state: RootState) => state.website.isDarkMode);
    const classes = useClasses(navbar_style, { name: "NavbarStyle" }) as NavbarStyle;
    const [cookies, setCookie] = useCookies(["name", "role", "id", "language"]);
    const dispatch = useDispatch();

    const [openProfile, setOpenProfile] = useState<HTMLElement | null>(null);
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const router = useRouter();

    useEffect(() => {
        // Set default language to Romanian if not set
        if (!cookies.language) {
            setCookie("language", "ro", { path: "/" });
            dispatch(websiteActions.setLanguageData({ languageData: ro }));
        } else {
            dispatch(websiteActions.setLanguageData({ languageData: cookies.language === "ro" ? ro : en }));
        }
    }, []);

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
            {(router.pathname.includes("guest") || router.pathname.includes("home")) && !cookies["name"] ? (
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
                <Tooltip title={cookies["name"]} className={classes.tooltipWrapper} followCursor>
                    <Button
                        aria-owns={openProfile ? "profile-menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleClickProfile}
                        classes={{ root: classes.accountButtonWrapper }}
                    >
                        <div className={classes.accountIcon}>
                            <PersonIcon />
                        </div>
                        <p className={isDarkMode ? classes.linkTextLight : classes.linkText}>{cookies["name"]}</p>
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
                                            router.push("/customer/profile").then((_) => {
                                                handleCloseProfile();
                                            });
                                        }}
                                        className={classes.dropdownItem}
                                    >
                                        <PersonIcon fill={"#393939"} className={classes.accountDropdownIcon} />
                                        <div>{languageData?.Profile}</div>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            router.push("/customer/change-password").then((_) => {
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

const Header = (props: { routes: RouteModel[]; onToggleTheme: () => void; isDarkMode: boolean }) => {
    const classes = useClasses(navbar_style, { name: "NavbarStyle" }) as NavbarStyle;
    const router = useRouter();
    const theme = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cookies, setCookie] = useCookies(["language"]);

    const languageData = useSelector((state: RootState) => state.website.languageData);
    const goBack = useSelector((state: any) => state.website.goBack);
    const dispatch = useDispatch();

    const menuItems = props.routes.filter((route) => route.isOnMenu);
    const handleLanguageToggle = () => {
        dispatch(loadingActions.setLoading({ loading: true }));
        setTimeout(() => {
            const newLanguage = cookies.language === "ro" ? "en" : "ro";
            setCookie("language", newLanguage, { path: "/" });
            dispatch(websiteActions.setLanguageData({ languageData: newLanguage === "ro" ? ro : en }));
            dispatch(loadingActions.setLoading({ loading: false }));
        }, 300);
    };

    const renderMenuItems = (isMobile: boolean = false) =>
        menuItems.map((route, index) => (
            <Button
                key={index}
                onClick={() => {
                    router.push(route.path);
                    if (isMobile) setMobileMenuOpen(false);
                }}
                className={isMobile ? classes.mobileMenuItem : classes.menuButton}
                style={{
                    color: router.pathname.includes(route.path) ? theme.palette.primary.main : theme.palette.text.secondary,
                }}
            >
                {typeof route.icon === "string" ? (
                    <Icon style={{ marginRight: "8px" }}>{route.icon}</Icon>
                ) : (
                    <route.icon
                        style={{
                            marginRight: "8px",
                            width: 20,
                            height: 20,
                            fill: router.pathname.includes(route.path) ? "#1E88E5" : props.isDarkMode ? "rgb(209, 213, 219)" : "rgb(75, 85, 99)",
                        }}
                    />
                )}
                <span style={{ fontWeight: 500 }}>{(languageData && (languageData[route.name as keyof LanguageDataTypes] as string)) || route.name}</span>
            </Button>
        ));

    return (
        <AppBar className={classes.navbarWrapper}>
            <Toolbar className={classes.toolbarWrapper}>
                <Grid container className={classes.gridStyle} component="div">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={classes.mobileMenuButton}
                    >
                        <Menu />
                    </IconButton>

                    <div style={{ width: "auto", display: "flex", alignItems: "center" }}>
                        {goBack && (
                            <Button className={classes.backButton} onClick={() => router.push(goBack)}>
                                <ArrowBackIosIcon className={classes.backIcon} />
                            </Button>
                        )}
                        {/* <div className={classes.titleWrapper}>{languageData ? (languageData[title as keyof LanguageDataTypes] as string) || title : ""}</div> */}
                    </div>

                    {/* Desktop Navigation Menu */}
                    <div className={classes.desktopMenu}>{renderMenuItems()}</div>

                    {/* Right side items */}
                    <div className={classes.accountWrapper}>
                        <IconButton onClick={props.onToggleTheme} className={classes.themeToggle} color="inherit">
                            {props.isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <AccountData />
                        <Tooltip
                            title={cookies["language"] === "ro" ? languageData?.TranslateInEnglish : languageData?.TranslateInRomanian}
                            className={classes.tooltipWrapper}
                            followCursor
                        >
                            <IconButton onClick={handleLanguageToggle} className={classes.languageToggle} color="inherit">
                                <TranslateIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Grid>
            </Toolbar>

            {/* Mobile Menu */}
            {mobileMenuOpen && <div className={classes.mobileMenu}>{renderMenuItems(true)}</div>}
        </AppBar>
    );
};

export default Header;
