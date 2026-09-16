import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import {
    setOverview,
    setCityStats,
    setHeatmapData,
    setPriceDistribution,
    setModelStats,
    setPriceTrend,
    setZoneComparison,
    setROIData,
    setAnalyticsLoading,
    setAnalyticsError,
    OverviewStats,
    CityStats,
    HeatmapPoint,
    PriceDistribution,
    ModelStats,
    PriceTrendResponse,
    ZoneComparisonItem,
    ROIEstimation,
} from "./analytics-slice";

export const fetchOverview = createAsyncThunk<OverviewStats, void>(
    "analytics/fetchOverview",
    async (_, { dispatch }) => {
        dispatch(setAnalyticsLoading(true));
        try {
            const response = await Axios.get<OverviewStats>("/listing/analytics/overview");
            dispatch(setOverview(response.data));
            dispatch(setAnalyticsLoading(false));
            return response.data;
        } catch (e: any) {
            dispatch(setAnalyticsError(e.message));
            dispatch(setAnalyticsLoading(false));
            throw e;
        }
    }
);

export const fetchCityStats = createAsyncThunk<CityStats[], { minListings?: number; forSale?: boolean }>(
    "analytics/fetchCityStats",
    async ({ minListings = 10, forSale }, { dispatch }) => {
        dispatch(setAnalyticsLoading(true));
        try {
            const params: Record<string, any> = { min_listings: minListings };
            if (forSale !== undefined) params.for_sale = forSale;
            const response = await Axios.get<CityStats[]>("/listing/analytics/city-stats", { params });
            dispatch(setCityStats(response.data));
            dispatch(setAnalyticsLoading(false));
            return response.data;
        } catch (e: any) {
            dispatch(setAnalyticsError(e.message));
            dispatch(setAnalyticsLoading(false));
            throw e;
        }
    }
);

export const fetchHeatmapData = createAsyncThunk<HeatmapPoint[], { city?: string; minRooms?: number; maxRooms?: number; forSale?: boolean }>(
    "analytics/fetchHeatmapData",
    async ({ city, minRooms, maxRooms, forSale }, { dispatch }) => {
        dispatch(setAnalyticsLoading(true));
        try {
            const params: Record<string, any> = {};
            if (city) params.city = city;
            if (minRooms) params.min_rooms = minRooms;
            if (maxRooms) params.max_rooms = maxRooms;
            if (forSale !== undefined) params.for_sale = forSale;
            const response = await Axios.get<HeatmapPoint[]>("/listing/analytics/heatmap", { params });
            dispatch(setHeatmapData(response.data));
            dispatch(setAnalyticsLoading(false));
            return response.data;
        } catch (e: any) {
            dispatch(setAnalyticsError(e.message));
            dispatch(setAnalyticsLoading(false));
            throw e;
        }
    }
);

export const fetchPriceDistribution = createAsyncThunk<PriceDistribution, string>(
    "analytics/fetchPriceDistribution",
    async (city, { dispatch }) => {
        dispatch(setAnalyticsLoading(true));
        try {
            const response = await Axios.get<PriceDistribution>("/listing/analytics/price-distribution", {
                params: { city },
            });
            dispatch(setPriceDistribution(response.data));
            dispatch(setAnalyticsLoading(false));
            return response.data;
        } catch (e: any) {
            dispatch(setAnalyticsError(e.message));
            dispatch(setAnalyticsLoading(false));
            throw e;
        }
    }
);

export const fetchModelStats = createAsyncThunk<ModelStats, void>(
    "analytics/fetchModelStats",
    async (_, { dispatch }) => {
        dispatch(setAnalyticsLoading(true));
        try {
            const response = await Axios.get<ModelStats>("/prediction/model-stats");
            dispatch(setModelStats(response.data));
            dispatch(setAnalyticsLoading(false));
            return response.data;
        } catch (e: any) {
            dispatch(setAnalyticsError(e.message));
            dispatch(setAnalyticsLoading(false));
            throw e;
        }
    }
);

export const fetchPriceTrend = createAsyncThunk<PriceTrendResponse, { city?: string; forSale?: boolean }>(
    "analytics/fetchPriceTrend",
    async ({ city, forSale }, { dispatch }) => {
        dispatch(setAnalyticsLoading(true));
        try {
            const params: Record<string, any> = {};
            if (city) params.city = city;
            if (forSale !== undefined) params.for_sale = forSale;
            const response = await Axios.get<PriceTrendResponse>("/listing/analytics/price-trend", { params });
            dispatch(setPriceTrend(response.data));
            dispatch(setAnalyticsLoading(false));
            return response.data;
        } catch (e: any) {
            dispatch(setAnalyticsError(e.message));
            dispatch(setAnalyticsLoading(false));
            throw e;
        }
    }
);

export const fetchZoneComparison = createAsyncThunk<ZoneComparisonItem[], string>(
    "analytics/fetchZoneComparison",
    async (cities, { dispatch }) => {
        dispatch(setAnalyticsLoading(true));
        try {
            const response = await Axios.get<{ zones: ZoneComparisonItem[] }>("/listing/analytics/compare-zones", {
                params: { cities },
            });
            dispatch(setZoneComparison(response.data.zones));
            dispatch(setAnalyticsLoading(false));
            return response.data.zones;
        } catch (e: any) {
            dispatch(setAnalyticsError(e.message));
            dispatch(setAnalyticsLoading(false));
            throw e;
        }
    }
);

export const fetchROIData = createAsyncThunk<ROIEstimation[], { cities?: string }>(
    "analytics/fetchROIData",
    async ({ cities }, { dispatch }) => {
        dispatch(setAnalyticsLoading(true));
        try {
            const params: Record<string, any> = {};
            if (cities) params.cities = cities;
            const response = await Axios.get<ROIEstimation[]>("/listing/analytics/roi", { params });
            dispatch(setROIData(response.data));
            dispatch(setAnalyticsLoading(false));
            return response.data;
        } catch (e: any) {
            dispatch(setAnalyticsError(e.message));
            dispatch(setAnalyticsLoading(false));
            throw e;
        }
    }
);
