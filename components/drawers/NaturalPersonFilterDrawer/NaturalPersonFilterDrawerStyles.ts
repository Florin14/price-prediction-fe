import { SxProps, Theme } from "@mui/material";
import cssVariables from "../../../assets/css/variables";

export const drawerContainer: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
};

export const scrollableContent: SxProps<Theme> = {
    flex: 1,
    overflowY: "auto",
};

export const sectionTitle: SxProps<Theme> = {
    color: "#111827",
    fontWeight: "600",
    fontFamily: "Inter",
    fontSize: "14px",
    padding: "8px 20px",
};

export const sectionContainer: SxProps<Theme> = {
    padding: "20px",
    gap: "15px",
    display: "flex",
    flexDirection: "column",
};

export const actionButtons: SxProps<Theme> = {
    position: "sticky",
    marginTop: "auto",
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    padding: "20px",
    backgroundColor: "#fff",
    zIndex: 100,
};
