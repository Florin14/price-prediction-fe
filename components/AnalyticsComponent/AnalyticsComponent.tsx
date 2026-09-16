import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Chip, TextField, Button } from "@mui/material";
import { FiTrendingUp, FiMapPin, FiHome, FiDollarSign, FiBarChart2, FiMap } from "react-icons/fi";
import Map, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { RootState, AppDispatch } from "../../store";
import {
    fetchOverview,
    fetchCityStats,
    fetchPriceDistribution,
    fetchModelStats,
    fetchHeatmapData,
    fetchPriceTrend,
    fetchZoneComparison,
    fetchROIData,
} from "../../store/slices/analytics/thunks";
import { setSelectedCity } from "../../store/slices/analytics/analytics-slice";

import {
    AnalyticsContainer,
    PageTitle,
    StatsGrid,
    StatCard,
    StatValue,
    StatLabel,
    SectionTitle,
    CityStatsGrid,
    CityCard,
    CityName,
    CityDetail,
    PriceTag,
    DistributionContainer,
    DistributionBar,
    DistributionRow,
    DistributionLabel,
    ModelStatsContainer,
    ModelCard,
    ModelName,
    MetricBadge,
    EmptyState,
} from "./AnalyticsPage.styles";

const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
};

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(price);
};

const TREND_COLORS = ["#1976d2", "#388e3c", "#f57c00", "#d32f2f", "#7b1fa2"];

const AnalyticsComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        overview,
        cityStats,
        heatmapData,
        priceDistribution,
        modelStats,
        priceTrend,
        zoneComparison,
        roiData,
        selectedCity,
        loading,
    } = useSelector((state: RootState) => state.analytics);
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const [compareCities, setCompareCities] = useState("");

    useEffect(() => {
        dispatch(fetchOverview());
        dispatch(fetchCityStats({ minListings: 20 }));
        dispatch(fetchModelStats());
        dispatch(fetchPriceTrend({}));
        dispatch(fetchROIData({}));
        dispatch(fetchHeatmapData({}));
    }, [dispatch]);

    const handleCityClick = (city: string) => {
        dispatch(setSelectedCity(city));
        dispatch(fetchPriceDistribution(city));
        dispatch(fetchPriceTrend({ city }));
    };

    const handleCompareZones = () => {
        if (compareCities.trim()) {
            dispatch(fetchZoneComparison(compareCities.trim()));
        }
    };

    // Build GeoJSON for heatmap
    const heatmapGeoJSON = useMemo(() => {
        if (!heatmapData || heatmapData.length === 0) return null;
        const validPoints = heatmapData.filter(
            (p) => p.latitude && p.longitude && p.latitude !== 0 && p.longitude !== 0
        );
        if (validPoints.length === 0) return null;
        return {
            type: "FeatureCollection" as const,
            features: validPoints.map((point) => ({
                type: "Feature" as const,
                properties: {
                    price_per_sqm: point.price_per_sqm,
                    intensity: Math.min(point.price_per_sqm / 3000, 1),
                },
                geometry: {
                    type: "Point" as const,
                    coordinates: [point.longitude, point.latitude],
                },
            })),
        };
    }, [heatmapData]);

    if (loading && !overview) {
        return (
            <AnalyticsContainer>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                    <CircularProgress />
                </Box>
            </AnalyticsContainer>
        );
    }

    return (
        <AnalyticsContainer>
            <PageTitle>{languageData?.MarketAnalytics || "Market Analytics"}</PageTitle>

            {/* Overview Stats */}
            {overview && (
                <StatsGrid>
                    <StatCard elevation={1}>
                        <Box sx={{ color: "primary.main", mb: 1 }}>
                            <FiHome size={28} />
                        </Box>
                        <StatValue>{formatNumber(overview.total_listings)}</StatValue>
                        <StatLabel>{languageData?.TotalListings || "Total Listings"}</StatLabel>
                    </StatCard>
                    <StatCard elevation={1}>
                        <Box sx={{ color: "secondary.main", mb: 1 }}>
                            <FiMapPin size={28} />
                        </Box>
                        <StatValue>{overview.total_cities}</StatValue>
                        <StatLabel>{languageData?.CitiesCovered || "Cities Covered"}</StatLabel>
                    </StatCard>
                    <StatCard elevation={1}>
                        <Box sx={{ color: "success.main", mb: 1 }}>
                            <FiDollarSign size={28} />
                        </Box>
                        <StatValue>{formatPrice(overview.avg_price_per_sqm)}/mp</StatValue>
                        <StatLabel>{languageData?.AvgPricePerSqm || "Avg Price / sqm"}</StatLabel>
                    </StatCard>
                    <StatCard elevation={1}>
                        <Box sx={{ color: "info.main", mb: 1 }}>
                            <FiTrendingUp size={28} />
                        </Box>
                        <StatValue>
                            {formatNumber(overview.for_sale_count)} / {formatNumber(overview.for_rent_count)}
                        </StatValue>
                        <StatLabel>{languageData?.SaleVsRent || "Sale / Rent"}</StatLabel>
                    </StatCard>
                </StatsGrid>
            )}

            {/* Price Heatmap */}
            {heatmapGeoJSON && (
                <DistributionContainer elevation={1}>
                    <SectionTitle>
                        <FiMap style={{ marginRight: 8, verticalAlign: "middle" }} />
                        {languageData?.HeatmapTitle || "Price Heatmap"}
                    </SectionTitle>
                    <Box sx={{ borderRadius: 2, overflow: "hidden", height: 450 }}>
                        <Map
                            mapLib={maplibregl as any}
                            initialViewState={{
                                longitude: 25.0,
                                latitude: 45.9,
                                zoom: 6.5,
                            }}
                            style={{ width: "100%", height: "100%" }}
                            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=Z1S68I71HWR60jLgMo2E"
                        >
                            <Source id="heatmap-data" type="geojson" data={heatmapGeoJSON}>
                                <Layer
                                    id="heatmap-layer"
                                    type="heatmap"
                                    paint={{
                                        "heatmap-weight": ["get", "intensity"],
                                        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
                                        "heatmap-color": [
                                            "interpolate",
                                            ["linear"],
                                            ["heatmap-density"],
                                            0, "rgba(33,102,172,0)",
                                            0.2, "rgb(103,169,207)",
                                            0.4, "rgb(209,229,240)",
                                            0.6, "rgb(253,219,199)",
                                            0.8, "rgb(239,138,98)",
                                            1, "rgb(178,24,43)",
                                        ],
                                        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
                                        "heatmap-opacity": 0.8,
                                    }}
                                />
                            </Source>
                        </Map>
                    </Box>
                    <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "text.secondary" }}>
                        <span>Low price</span>
                        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                            {["#2166ac", "#67a9cf", "#d1e5f0", "#fddbc7", "#ef8a62", "#b2182b"].map((c) => (
                                <Box key={c} sx={{ width: 24, height: 12, backgroundColor: c, borderRadius: 0.5 }} />
                            ))}
                        </Box>
                        <span>High price</span>
                    </Box>
                </DistributionContainer>
            )}

            {/* City Stats */}
            <SectionTitle>{languageData?.PricesByCity || "Prices by City"}</SectionTitle>
            {cityStats.length > 0 ? (
                <CityStatsGrid>
                    {cityStats.slice(0, 12).map((city) => (
                        <CityCard
                            key={city.city}
                            elevation={1}
                            selected={selectedCity === city.city}
                            onClick={() => handleCityClick(city.city)}
                        >
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                <CityName>{city.city}</CityName>
                                <Chip label={`${formatNumber(city.count)} listings`} size="small" variant="outlined" />
                            </Box>
                            <PriceTag>{formatPrice(city.avg_price_per_sqm)}/mp</PriceTag>
                            <CityDetail>
                                Min: {formatPrice(city.min_price_per_sqm)} - Max: {formatPrice(city.max_price_per_sqm)}
                            </CityDetail>
                            <CityDetail>
                                {languageData?.AvgArea || "Avg area"}: {city.avg_useful_area.toFixed(0)} mp |{" "}
                                {languageData?.AvgPrice || "Avg price"}: {formatPrice(city.avg_price)}
                            </CityDetail>
                        </CityCard>
                    ))}
                </CityStatsGrid>
            ) : (
                <EmptyState>{languageData?.NoDataAvailable || "No data available"}</EmptyState>
            )}

            {/* Price Distribution for selected city */}
            {priceDistribution && selectedCity && (
                <DistributionContainer elevation={1}>
                    <SectionTitle>
                        {languageData?.PriceDistribution || "Price Distribution"}: {priceDistribution.city}
                    </SectionTitle>
                    <Box sx={{ mb: 2, color: "text.secondary", fontSize: "0.9rem" }}>
                        {priceDistribution.total_listings} {languageData?.Listings || "listings"} |{" "}
                        {languageData?.AvgPricePerSqm || "Avg"}: {formatPrice(priceDistribution.avg_price_per_sqm)}/mp
                    </Box>
                    {priceDistribution.ranges.map((range, i) => (
                        <DistributionRow key={range.range_label}>
                            <DistributionLabel>{range.range_label}</DistributionLabel>
                            <Box flex={1}>
                                <DistributionBar percentage={range.percentage} colorIndex={i}>
                                    {range.percentage > 8 ? `${range.percentage}%` : ""}
                                </DistributionBar>
                            </Box>
                            <Box sx={{ minWidth: 80, textAlign: "right", fontSize: "0.85rem", color: "text.secondary" }}>
                                {range.count} ({range.percentage}%)
                            </Box>
                        </DistributionRow>
                    ))}
                </DistributionContainer>
            )}

            {/* Price Trend */}
            {priceTrend && priceTrend.points.length > 0 && (
                <DistributionContainer elevation={1}>
                    <SectionTitle>
                        <FiBarChart2 style={{ marginRight: 8, verticalAlign: "middle" }} />
                        {languageData?.PriceTrendOverTime || "Price Trend Over Time"}
                        {priceTrend.city && `: ${priceTrend.city}`}
                    </SectionTitle>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {(() => {
                            const maxPpsm = Math.max(...priceTrend.points.map((p) => p.avg_price_per_sqm));
                            return priceTrend.points.map((point, i) => (
                                <Box key={point.period} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Box sx={{ minWidth: 70, fontSize: "0.8rem", color: "text.secondary", textAlign: "right" }}>
                                        {point.period}
                                    </Box>
                                    <Box flex={1}>
                                        <Box
                                            sx={{
                                                height: 28,
                                                borderRadius: 1,
                                                backgroundColor: TREND_COLORS[i % TREND_COLORS.length],
                                                width: `${Math.max((point.avg_price_per_sqm / maxPpsm) * 100, 3)}%`,
                                                transition: "width 0.6s ease-out",
                                                display: "flex",
                                                alignItems: "center",
                                                pl: 1,
                                                color: "#fff",
                                                fontSize: "0.75rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {formatPrice(point.avg_price_per_sqm)}/mp
                                        </Box>
                                    </Box>
                                    <Box sx={{ minWidth: 70, fontSize: "0.75rem", color: "text.secondary" }}>
                                        {point.listing_count} {languageData?.Listings || "listings"}
                                    </Box>
                                </Box>
                            ));
                        })()}
                    </Box>
                </DistributionContainer>
            )}

            {/* Zone Comparison */}
            <DistributionContainer elevation={1}>
                <SectionTitle>
                    {languageData?.CompareZones || "Compare Zones"}
                </SectionTitle>
                <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
                    <TextField
                        size="small"
                        placeholder={languageData?.SelectCitiesToCompare || "e.g. Cluj-Napoca,Bucuresti,Iasi"}
                        value={compareCities}
                        onChange={(e) => setCompareCities(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                    <Button variant="contained" onClick={handleCompareZones} disabled={!compareCities.trim()}>
                        {languageData?.CompareZones || "Compare"}
                    </Button>
                </Box>
                {zoneComparison.length > 0 && (
                    <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(zoneComparison.length, 3)}, 1fr)`, gap: 2 }}>
                        {zoneComparison.map((zone) => (
                            <Box
                                key={zone.city}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    backgroundColor: "background.paper",
                                }}
                            >
                                <Box sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 1 }}>{zone.city}</Box>
                                <Box sx={{ fontSize: "0.85rem", color: "text.secondary", display: "flex", flexDirection: "column", gap: 0.5 }}>
                                    <Box display="flex" justifyContent="space-between">
                                        <span>{languageData?.PricePerSqm || "Price/sqm"}:</span>
                                        <strong>{formatPrice(zone.avg_price_per_sqm)}</strong>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <span>{languageData?.AvgPrice || "Avg price"}:</span>
                                        <strong>{formatPrice(zone.avg_price)}</strong>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <span>{languageData?.AvgArea || "Avg area"}:</span>
                                        <strong>{zone.avg_useful_area.toFixed(0)} mp</strong>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <span>{languageData?.ForSale || "For Sale"}:</span>
                                        <strong>{zone.for_sale_pct}%</strong>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <span>{languageData?.Listings || "Listings"}:</span>
                                        <strong>{formatNumber(zone.count)}</strong>
                                    </Box>
                                    {zone.dominant_property_type && (
                                        <Chip label={zone.dominant_property_type} size="small" sx={{ mt: 0.5, alignSelf: "flex-start" }} />
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </DistributionContainer>

            {/* ROI Estimation */}
            {roiData.length > 0 && (
                <DistributionContainer elevation={1}>
                    <SectionTitle>
                        <FiDollarSign style={{ marginRight: 8, verticalAlign: "middle" }} />
                        {languageData?.ROIEstimation || "Investment ROI"}
                    </SectionTitle>
                    <Box sx={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                            <thead>
                                <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                                    <th style={{ textAlign: "left", padding: "8px" }}>City</th>
                                    <th style={{ textAlign: "right", padding: "8px" }}>{languageData?.AvgSalePrice || "Avg Sale Price"}</th>
                                    <th style={{ textAlign: "right", padding: "8px" }}>{languageData?.AvgMonthlyRent || "Avg Monthly Rent"}</th>
                                    <th style={{ textAlign: "right", padding: "8px" }}>{languageData?.AnnualYield || "Annual Yield"}</th>
                                    <th style={{ textAlign: "right", padding: "8px" }}>{languageData?.PaybackYears || "Payback Period"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roiData.map((roi) => (
                                    <tr key={roi.city} style={{ borderBottom: "1px solid #f0f0f0" }}>
                                        <td style={{ padding: "8px", fontWeight: 600 }}>{roi.city}</td>
                                        <td style={{ padding: "8px", textAlign: "right" }}>{formatPrice(roi.avg_sale_price)}</td>
                                        <td style={{ padding: "8px", textAlign: "right" }}>{formatPrice(roi.avg_monthly_rent)}</td>
                                        <td style={{ padding: "8px", textAlign: "right" }}>
                                            <Chip
                                                label={`${roi.annual_yield_pct.toFixed(1)}%`}
                                                size="small"
                                                color={roi.annual_yield_pct > 6 ? "success" : roi.annual_yield_pct > 4 ? "primary" : "default"}
                                            />
                                        </td>
                                        <td style={{ padding: "8px", textAlign: "right" }}>
                                            {roi.payback_years.toFixed(1)} {languageData?.Years || "years"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </DistributionContainer>
            )}

            {/* Model Performance */}
            {modelStats && modelStats.models.length > 0 && (
                <ModelStatsContainer elevation={1}>
                    <SectionTitle>{languageData?.AIModelPerformance || "AI Model Performance"}</SectionTitle>
                    <Box sx={{ mb: 2, color: "text.secondary", fontSize: "0.85rem" }}>
                        {modelStats.last_trained
                            ? `${languageData?.LastTrained || "Last trained"}: ${new Date(modelStats.last_trained).toLocaleDateString("ro-RO")}`
                            : ""}
                    </Box>
                    {modelStats.models.map((model) => {
                        const isBest = model.model_name === modelStats.current_best;
                        return (
                            <ModelCard key={model.model_name} isBest={isBest}>
                                <Box display="flex" alignItems="center">
                                    <ModelName isBest={isBest}>
                                        {model.model_name}
                                        {isBest && (
                                            <Chip
                                                label={languageData?.BestModel || "Best"}
                                                size="small"
                                                color="primary"
                                                sx={{ ml: 1, height: 22 }}
                                            />
                                        )}
                                    </ModelName>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <MetricBadge>MAE: {model.mae.toFixed(2)}</MetricBadge>
                                    <MetricBadge>RMSE: {model.rmse.toFixed(2)}</MetricBadge>
                                    <MetricBadge>R2: {(model.r2 * 100).toFixed(1)}%</MetricBadge>
                                </Box>
                            </ModelCard>
                        );
                    })}
                </ModelStatsContainer>
            )}
        </AnalyticsContainer>
    );
};

export default AnalyticsComponent;
