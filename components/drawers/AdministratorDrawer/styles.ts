import { SxProps, Theme } from "@mui/material";

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
    gap: "20px",
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #E5E7EB",
};

export const boxesHeader: SxProps<Theme> = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 20px",
};

export const boxItem: SxProps<Theme> = {
    padding: "20px",
    gap: "20px",
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #E5E7EB",
};

export const actionButtons: SxProps<Theme> = {
    position: "sticky",
    marginTop: "auto",
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    padding: "20px",
    borderTop: "1px solid #E5E7EB",
    backgroundColor: "#fff",
    zIndex: 100,
};

export const activeColor: SxProps<Theme> = {
    "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
        color: "green",
    },
};

export const inActiveColor: SxProps<Theme> = {
    "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
        color: "red",
    },
};
