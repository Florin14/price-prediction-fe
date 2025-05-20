/*!

 =========================================================
 * Material LocationsMap React - v1.9.0 based on Material LocationsMap - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2020 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

export interface MaterialDashboardStyle {
    [key: string]: any;
}

// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
export const hexToRgb = (input: string): string => {
    input = input + "";
    input = input.replace("#", "");
    const hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error("input is not a valid hex color.");
    }
    if (input.length === 3) {
        const first = input[0];
        const second = input[1];
        const last = input[2];
        input = first + first + second + second + last + last;
    }
    input = input.toUpperCase();
    const first = input[0] + input[1];
    const second = input[2] + input[3];
    const last = input[4] + input[5];
    return parseInt(first, 16) + ", " + parseInt(second, 16) + ", " + parseInt(last, 16);
};

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

export const drawerWidth = 192;

export const transition: MaterialDashboardStyle = {
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
};

export const container: MaterialDashboardStyle = {
    padding: 0,
    marginRight: "auto",
    marginLeft: "auto",
};

export const defaultFont: MaterialDashboardStyle = {
    fontFamily: '"Inter", sans-serif',
    fontWeight: "500",
    lineHeight: "1.5em",
};

export const primaryColor = ["#9c27b0", "#ab47bc", "#8e24aa", "#af2cc5"];
export const warningColor = ["#ff9800", "#ffa726", "#fb8c00", "#ffa21a"];
export const dangerColor = ["#f44336", "#ef5350", "#e53935", "#f55a4e"];
export const successColor = ["#4caf50", "#66bb6a", "#43a047", "#5cb860"];
export const infoColor = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee"];
export const roseColor = ["#e91e63", "#ec407a", "#d81b60", "#eb3573"];
export const grayColor = ["#999", "#777", "#3C4858", "#AAAAAA", "#D2D2D2", "#DDD", "#b4b4b4", "#555555", "#333", "#a9afbb", "#eee", "#e7e7e7"];
export const blackColor = "#000";
export const whiteColor = "#FFF";

export const boxShadow: MaterialDashboardStyle = {
    boxShadow:
        "0 10px 30px -12px rgba(" +
        hexToRgb(blackColor) +
        ", 0.42), 0 4px 25px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(blackColor) +
        ", 0.2)",
};

export const primaryBoxShadow: MaterialDashboardStyle = {
    boxShadow: "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(primaryColor[0]) + ",.4)",
};
export const infoBoxShadow: MaterialDashboardStyle = {
    boxShadow: "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(infoColor[0]) + ",.4)",
};
export const successBoxShadow: MaterialDashboardStyle = {
    boxShadow: "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(successColor[0]) + ",.4)",
};
export const warningBoxShadow: MaterialDashboardStyle = {
    boxShadow: "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(warningColor[0]) + ",.4)",
};
export const dangerBoxShadow: MaterialDashboardStyle = {
    boxShadow: "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(dangerColor[0]) + ",.4)",
};
export const roseBoxShadow: MaterialDashboardStyle = {
    boxShadow: "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(roseColor[0]) + ",.4)",
};

export const warningCardHeader: MaterialDashboardStyle = {
    background: "linear-gradient(60deg, " + warningColor[1] + ", " + warningColor[2] + ")",
    ...warningBoxShadow,
};
export const successCardHeader: MaterialDashboardStyle = {
    background: "linear-gradient(60deg, " + successColor[1] + ", " + successColor[2] + ")",
    ...successBoxShadow,
};
export const dangerCardHeader: MaterialDashboardStyle = {
    background: "linear-gradient(60deg, " + dangerColor[1] + ", " + dangerColor[2] + ")",
    ...dangerBoxShadow,
};
export const infoCardHeader: MaterialDashboardStyle = {
    background: "linear-gradient(60deg, " + infoColor[1] + ", " + infoColor[2] + ")",
    ...infoBoxShadow,
};
export const primaryCardHeader: MaterialDashboardStyle = {
    background: "linear-gradient(60deg, " + primaryColor[1] + ", " + primaryColor[2] + ")",
    ...primaryBoxShadow,
};
export const roseCardHeader: MaterialDashboardStyle = {
    background: "linear-gradient(60deg, " + roseColor[1] + ", " + roseColor[2] + ")",
    ...roseBoxShadow,
};

export const cardActions: MaterialDashboardStyle = {
    margin: "0 20px 10px",
    paddingTop: "10px",
    borderTop: "1px solid " + grayColor[10],
    height: "auto",
    ...defaultFont,
};

export const cardHeader: MaterialDashboardStyle = {
    margin: "-20px 15px 0",
    borderRadius: "3px",
    padding: "15px",
};

export const card: MaterialDashboardStyle = {
    display: "inline-block",
    position: "relative",
    width: "100%",
    margin: "25px 0",
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
    borderRadius: "3px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    background: whiteColor,
};

export const defaultBoxShadow: MaterialDashboardStyle = {
    border: "0",
    borderRadius: "3px",
    boxShadow:
        "0 10px 20px -12px rgba(" +
        hexToRgb(blackColor) +
        ", 0.42), 0 3px 20px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(blackColor) +
        ", 0.2)",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
};

export const title: MaterialDashboardStyle = {
    color: grayColor[2],
    textDecoration: "none",
    fontWeight: "300",
    marginTop: "30px",
    marginBottom: "25px",
    minHeight: "32px",
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
    "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1",
    },
};

export const cardTitle: MaterialDashboardStyle = {
    ...title,
    marginTop: "0",
    marginBottom: "3px",
    minHeight: "auto",
    "& a": {
        ...title,
        marginTop: ".625rem",
        marginBottom: "0.75rem",
        minHeight: "auto",
    },
};

export const cardSubtitle: MaterialDashboardStyle = {
    marginTop: "-.375rem",
};

export const cardLink: MaterialDashboardStyle = {
    "& + $cardLink": {
        marginLeft: "1.25rem",
    },
};
