import { NextRouter } from "next/router";

import adminRoutes from "./admin-routes";
import customerRoutes from "./customer-routes";

import guestRoutes from "./guest-routes";
import { Property } from "../store/slices/property/property-slice";

interface Route {
    path: string;
}

export const checkRouteAccessibleOrRedirect = async (routes: Route[], router: NextRouter, path: string, except: string[]): Promise<void> => {
    // if (router?.asPath === "/404") return;
    // const accessible = routes.some((route) => path.includes(route.path)) || except.some((route) => route === path);
    // if (!accessible) {
    //     await router.replace("/404");
    // }
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
// Helper functions for mock data
export const calculateMockPrice = (property: Property): number => {
    const basePrice = 150000;
    const locationMultiplier = property.city === "San Francisco" ? 3.5 : property.city === "New York" ? 3.2 : property.city === "Los Angeles" ? 2.8 : 1.2;
    const bedroomValue = 50000;
    const bathroomValue = 25000;
    const sqftValue = 100;
    const ageDeduction = 1000;

    const age = new Date().getFullYear() - property.yearBuilt;

    return (
        Math.round(basePrice + property.bedrooms * bedroomValue + property.bathrooms * bathroomValue + property.squareFeet * sqftValue - age * ageDeduction) *
        locationMultiplier
    );
};

export const generateMockSimilarProperties = (property: Property, basePrice: number) => {
    const streets = ["Maple", "Oak", "Pine", "Cedar", "Elm", "Willow"];
    const images = [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop",
    ];

    return Array(4)
        .fill(null)
        .map((_, index) => ({
            id: `similar-${index}`,
            address: `${123 + index} ${streets[index % streets.length]} St, ${property.city}`,
            price: Math.round(basePrice * (0.9 + Math.random() * 0.2)),
            distance: Math.round(0.5 + Math.random() * 2 * 10) / 10,
            imageUrl: images[index % images.length],
        }));
};

export const generateMockMarketTrends = (currentPrice: number) => {
    const now = new Date();
    const historicalPrices = [];
    const forecastPrices = [];

    // Generate historical prices (past 12 months)
    for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);

        // Random fluctuation between -5% and +8%
        const fluctuation = 0.95 + Math.random() * 0.13;
        const historicalPrice = Math.round(currentPrice * (1 - i * 0.01) * fluctuation);

        historicalPrices.push({
            date: date.toISOString().split("T")[0],
            price: historicalPrice,
        });
    }

    // Generate forecast prices (next 12 months)
    const yearlyGrowthRate = 0.03 + Math.random() * 0.04; // 3-7% yearly growth

    for (let i = 1; i <= 12; i++) {
        const date = new Date(now);
        date.setMonth(date.getMonth() + i);

        // Apply growth rate plus random fluctuation
        const monthlyGrowth = yearlyGrowthRate / 12;
        const fluctuation = 0.99 + Math.random() * 0.04;
        const forecastPrice = Math.round(currentPrice * (1 + i * monthlyGrowth) * fluctuation);

        forecastPrices.push({
            date: date.toISOString().split("T")[0],
            price: forecastPrice,
        });
    }

    return {
        historicalPrices,
        forecastPrices,
        yearlyGrowthRate: Math.round(yearlyGrowthRate * 100) / 100,
    };
};

export const generateMockFactors = () => {
    return [
        {
            name: "Location",
            impact: 0.35,
            description: "Neighborhood desirability and proximity to amenities",
        },
        {
            name: "Property Size",
            impact: 0.25,
            description: "Square footage and lot size",
        },
        {
            name: "Property Age",
            impact: -0.15,
            description: "Age and condition of the property",
        },
        {
            name: "Market Trends",
            impact: 0.18,
            description: "Current market conditions and growth projections",
        },
        {
            name: "Comparable Sales",
            impact: 0.22,
            description: "Recent sales of similar properties in the area",
        },
    ];
};
