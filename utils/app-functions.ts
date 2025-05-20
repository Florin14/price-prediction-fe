import { NextRouter } from "next/router";

import adminRoutes from "./admin-routes";
import customerRoutes from "./customer-routes";

import guestRoutes from "./guest-routes";

interface Route {
    path: string;
}

export const checkRouteAccessibleOrRedirect = async (routes: Route[], router: NextRouter, path: string, except: string[]): Promise<void> => {
    if (router?.asPath === "/404") return;
    const accessible = routes.some((route) => path.includes(route.path)) || except.some((route) => route === path);
    if (!accessible) {
        await router.replace("/404");
    }
};

export const roundTwoDecimals = (number: number): number => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const deepComparison = (object1: any, object2: any): boolean => {
    if (Array.isArray(object1) && Array.isArray(object2)) {
        if (object1.length !== object2.length) {
            return false;
        }
        for (let [index, val] of object1) {
            if (!deepComparison(object1[index], object2[index])) {
                return false;
            }
        }
        return true;
    } else if (isObject(object1) && isObject(object2)) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = isObject(val1) && isObject(val2);
            if ((areObjects && !deepComparison(val1, val2)) || (!areObjects && val1 !== val2)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
};

export const isObject = (object: any): boolean => {
    return object != null && typeof object === "object";
};

export const deviceType = (): string => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

export const getRoleRoutes = (role: string | undefined) => {
    switch (role) {
        case "ADMIN":
            return adminRoutes;
        case "CITIZEN":
            return customerRoutes;
        default:
            return guestRoutes;
    }
};

export const inputHasValue = (field: any): boolean => !(field === "" || field === null || field === undefined);
