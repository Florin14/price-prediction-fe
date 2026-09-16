import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HeatmapPoint {
    latitude: number;
    longitude: number;
    price_per_sqm: number;
    city?: string;
    num_rooms?: number;
    property_type?: string;
}

export interface CityStats {
    city: string;
    count: number;
    avg_price_per_sqm: number;
    median_price_per_sqm?: number;
    min_price_per_sqm: number;
    max_price_per_sqm: number;
    avg_price: number;
    avg_useful_area: number;
}

export interface PriceRange {
    range_label: string;
    count: number;
    percentage: number;
}

export interface PriceDistribution {
    city: string;
    total_listings: number;
    avg_price_per_sqm: number;
    ranges: PriceRange[];
}

export interface OverviewStats {
    total_listings: number;
    total_cities: number;
    avg_price_per_sqm: number;
    for_sale_count: number;
    for_rent_count: number;
    top_cities: CityStats[];
}

export interface ModelPerformance {
    model_name: string;
    mae: number;
    rmse: number;
    r2: number;
    created_at?: string;
}

export interface ModelStats {
    current_best: string | null;
    models: ModelPerformance[];
    last_trained: string | null;
}

export interface PriceTrendPoint {
    period: string;
    avg_price_per_sqm: number;
    avg_price: number;
    listing_count: number;
}

export interface PriceTrendResponse {
    city: string | null;
    points: PriceTrendPoint[];
}

export interface ZoneComparisonItem {
    city: string;
    count: number;
    avg_price_per_sqm: number;
    avg_price: number;
    avg_useful_area: number;
    avg_rooms: number;
    for_sale_pct: number;
    dominant_property_type: string | null;
}

export interface ROIEstimation {
    city: string;
    avg_sale_price: number;
    avg_monthly_rent: number;
    annual_yield_pct: number;
    payback_years: number;
    listing_count_sale: number;
    listing_count_rent: number;
}

interface AnalyticsState {
    overview: OverviewStats | null;
    cityStats: CityStats[];
    heatmapData: HeatmapPoint[];
    priceDistribution: PriceDistribution | null;
    modelStats: ModelStats | null;
    priceTrend: PriceTrendResponse | null;
    zoneComparison: ZoneComparisonItem[];
    roiData: ROIEstimation[];
    selectedCity: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    overview: null,
    cityStats: [],
    heatmapData: [],
    priceDistribution: null,
    modelStats: null,
    priceTrend: null,
    zoneComparison: [],
    roiData: [],
    selectedCity: null,
    loading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        setOverview: (state, action: PayloadAction<OverviewStats>) => {
            state.overview = action.payload;
        },
        setCityStats: (state, action: PayloadAction<CityStats[]>) => {
            state.cityStats = action.payload;
        },
        setHeatmapData: (state, action: PayloadAction<HeatmapPoint[]>) => {
            state.heatmapData = action.payload;
        },
        setPriceDistribution: (state, action: PayloadAction<PriceDistribution | null>) => {
            state.priceDistribution = action.payload;
        },
        setModelStats: (state, action: PayloadAction<ModelStats>) => {
            state.modelStats = action.payload;
        },
        setSelectedCity: (state, action: PayloadAction<string | null>) => {
            state.selectedCity = action.payload;
        },
        setAnalyticsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setAnalyticsError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setPriceTrend: (state, action: PayloadAction<PriceTrendResponse | null>) => {
            state.priceTrend = action.payload;
        },
        setZoneComparison: (state, action: PayloadAction<ZoneComparisonItem[]>) => {
            state.zoneComparison = action.payload;
        },
        setROIData: (state, action: PayloadAction<ROIEstimation[]>) => {
            state.roiData = action.payload;
        },
    },
});

export const {
    setOverview,
    setCityStats,
    setHeatmapData,
    setPriceDistribution,
    setModelStats,
    setSelectedCity,
    setAnalyticsLoading,
    setAnalyticsError,
    setPriceTrend,
    setZoneComparison,
    setROIData,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
