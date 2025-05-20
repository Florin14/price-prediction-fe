import { createTheme, Theme } from "@mui/material/styles";

// Fluid typography helper
const fluid = (
  fsMin: number,
  fsMax: number,
  vwMin: number = 460,
  vwMax: number = 2120
): string => {
  const x = (1 / (vwMax - vwMin)) * (fsMax - fsMin);
  const formula = `${fsMin - vwMin * x}px + ${x * 100}vw`;
  return `max(${fsMin}px, min(calc(${formula}), ${fsMax}px))`;
};

declare module "@mui/material/styles" {
  interface TypeText {
    hint?: string;
  }
}

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#FFFFFF', paper: '#F9FAFB' },
    primary: { main: '#00308E', dark: '#002578', light: '#4B6FC1' },
    secondary: { main: '#1096F7', light: '#4BA1FF', dark: '#0C7EDD' },
    error: { main: '#D92D20', light: '#EF723A', dark: '#BD2020' },
    warning: { main: '#DE7421', light: '#FAA86C', dark: '#F48C24' },
    success: { main: '#0CB753', light: '#7FD2A6', dark: '#0C9B51' },
    info: { main: '#3470C2', light: '#4BA1FF', dark: '#1096F7' },
    text: { primary: '#313A47', secondary: '#667085', disabled: '#BEC2C7', hint: '#BEC2C7' },
    grey: { 100: '#F9FAFB', 200: '#ECECEC', 300: '#E5EAFF', 400: '#BEC2C7', 500: '#667085', 600: '#393939' }
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    allVariants: { color: undefined /* palette text.primary set via theme */ },
    h1: { fontSize: fluid(16, 24), lineHeight: '24px', fontWeight: 600 },
    body1: { fontSize: fluid(12, 16), lineHeight: '16px', fontWeight: 400 },
    subtitle2: { fontSize: fluid(12, 14), lineHeight: '14px', fontWeight: 500 },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1366, xl: 1920 }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {}
      }
    },
    MuiFormControlLabel: { styleOverrides: { root: { marginLeft: 0, marginRight: 0, '& .MuiFormControlLabel-label': { fontSize: '12px', fontFamily: 'Inter', fontWeight: 600 } } } },
    MuiInputLabel: { styleOverrides: { root: { fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '14px', '&.Mui-disabled': {} } } },
    MuiOutlinedInput: {
      defaultProps: { notched: false },
      styleOverrides: {
        root: { borderRadius: 8, background: 'white', '& .MuiOutlinedInput-notchedOutline': {}, '&:hover .MuiOutlinedInput-notchedOutline': {}, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {}, '&.Mui-error .MuiOutlinedInput-notchedOutline': {}, '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {}, '&.Mui-disabled': {} },
        input: { padding: '0 12px', height: 35, fontSize: 12, fontFamily: '"Inter", sans-serif', '&::placeholder': {} },
      }
    },
    MuiMenu: { styleOverrides: { paper: { borderRadius: 8, boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' } } },
    MuiMenuItem: { styleOverrides: { root: { fontSize: 12, fontFamily: '"Inter", sans-serif', '&:hover': {}, '&.Mui-selected': {} } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8, fontWeight: 500, fontSize: '12px', lineHeight: '16px', padding: '6px 16px', '&.Mui-disabled': {} }, containedPrimary: {}, outlinedPrimary: {}, textPrimary: {}, containedError: {}, outlinedError: {}, textError: {}, containedSuccess: {}, outlinedSuccess: {}, textSuccess: {} } },
  }
});

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#121212', paper: '#1E1E1E' },
    primary: { main: '#738BFF', dark: '#6C64E8', light: '#A1A9FF' },
    secondary: { main: '#6C64E8', light: '#8A82F7', dark: '#5A52D4' },
    error: { main: '#EF5350', light: '#FF867C', dark: '#C62828' },
    warning: { main: '#FFA726', light: '#FFB954', dark: '#F57C00' },
    success: { main: '#66BB6A', light: '#98E09C', dark: '#2E7D32' },
    info: { main: '#70D7FF', light: '#A0E7FF', dark: '#0093C4' },
    text: { primary: '#FFFFFF', secondary: '#B0B0B0', disabled: '#6E6E6E', hint: '#6E6E6E' },
    grey: { 100: '#1E1E1E', 200: '#2E2E2E', 300: '#424242', 400: '#616161', 500: '#757575', 600: '#9E9E9E', 700: '#B0B0B0', 800: '#E0E0E0', 900: '#F8F9FA' }
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    allVariants: { color: undefined /* palette text.primary set via theme */ },
    h1: { fontSize: fluid(16, 24), lineHeight: '24px', fontWeight: 600 },
    body1: { fontSize: fluid(12, 16), lineHeight: '16px', fontWeight: 400 },
    subtitle2: { fontSize: fluid(12, 14), lineHeight: '14px', fontWeight: 500 },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1366, xl: 1920 }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {}
      }
    },
    MuiFormControlLabel: { styleOverrides: { root: { marginLeft: 0, marginRight: 0, '& .MuiFormControlLabel-label': { fontSize: '12px', fontFamily: 'Inter', fontWeight: 600 } } } },
    MuiInputLabel: { styleOverrides: { root: { fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '14px', '&.Mui-disabled': {} } } },
    MuiOutlinedInput: {
      defaultProps: { notched: false },
      styleOverrides: {
        root: { borderRadius: 8, background: 'white', '& .MuiOutlinedInput-notchedOutline': {}, '&:hover .MuiOutlinedInput-notchedOutline': {}, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {}, '&.Mui-error .MuiOutlinedInput-notchedOutline': {}, '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {}, '&.Mui-disabled': {} },
        input: { padding: '0 12px', height: 35, fontSize: 12, fontFamily: '"Inter", sans-serif', '&::placeholder': {} },
      }
    },
    MuiMenu: { styleOverrides: { paper: { borderRadius: 8, boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' } } },
    MuiMenuItem: { styleOverrides: { root: { fontSize: 12, fontFamily: '"Inter", sans-serif', '&:hover': {}, '&.Mui-selected': {} } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8, fontWeight: 500, fontSize: '12px', lineHeight: '16px', padding: '6px 16px', '&.Mui-disabled': {} }, containedPrimary: {}, outlinedPrimary: {}, textPrimary: {}, containedError: {}, outlinedError: {}, textError: {}, containedSuccess: {}, outlinedSuccess: {}, textSuccess: {} } },
  }
});