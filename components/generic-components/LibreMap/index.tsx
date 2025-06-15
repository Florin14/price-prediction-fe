import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

interface Property {
    id: number;
    address: string;
    price: number;
    lat: number;
    lng: number;
    classification: string;
    useful_area_total: number;
    num_rooms: number;
    comfort: string;
    color?: string; // Optional color for the marker
}

interface MapLibreProps {
    listings?: Property[];
    defaultMarkerColor?: string; // Default color for all markers if not specified per property
}

const PopupContent = ({ property }: { property: Property }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div
            style={{
                padding: "12px",
                fontFamily: "Inter, sans-serif",
                minWidth: "200px",
                maxWidth: "300px",
            }}
        >
            <h3
                style={{
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1f2937",
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: "8px",
                }}
            >
                {property.address}
            </h3>
            <div
                style={{
                    display: "grid",
                    gap: "6px",
                    fontSize: "14px",
                    color: "#4b5563",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 500 }}>Price:</span>
                    <span style={{ color: "#059669" }}>{formatPrice(property.price)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 500 }}>Type:</span>
                    <span style={{ textTransform: "capitalize" }}>{property.classification}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 500 }}>Area:</span>
                    <span>{property.useful_area_total} m²</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 500 }}>Rooms:</span>
                    <span>{property.num_rooms}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 500 }}>Comfort:</span>
                    <span style={{ textTransform: "capitalize" }}>{property.comfort}</span>
                </div>
            </div>
        </div>
    );
};

const CustomMarker = ({ color }: { color?: string }) => (
    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 0C5.37 0 0 5.37 0 12c0 8.25 12 24 12 24s12-15.75 12-24c0-6.63-5.37-12-12-12zm0 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
            fill={color || "#4A90E2"}
        />
    </svg>
);

export const MapLibre = ({ listings = [], defaultMarkerColor = "#4A90E2" }: MapLibreProps) => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // Calculate the center of all listings or use a default center
    const center =
        listings.length > 0
            ? {
                  longitude: listings.reduce((sum, p) => sum + p.lng, 0) / listings.length,
                  latitude: listings.reduce((sum, p) => sum + p.lat, 0) / listings.length,
              }
            : { longitude: 23.5857936, latitude: 46.7555595 };

    return (
        <Map
            mapLib={maplibregl as any}
            initialViewState={{
                longitude: center.longitude,
                latitude: center.latitude,
                zoom: 13,
            }}
            style={{ width: "100%", height: "500px", borderRadius: "8px" }}
            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=Z1S68I71HWR60jLgMo2E"
        >
            {listings.map((property, i) => (
                <div key={property.id}>
                    <Marker
                        longitude={property.lng}
                        latitude={property.lat}
                        color={hoveredId === property.id ? "#00308E" : "#1E88E5"} // ← any valid CSS color string
                        scale={1}
                        onClick={() => setHoveredId(property.id === hoveredId ? null : property.id)}
                        style={{ cursor: "pointer" }}
                    />
                    {hoveredId === property.id && (
                        <Popup
                            longitude={property.lng}
                            latitude={property.lat}
                            closeOnClick={false}
                            anchor="top"
                            onClose={() => setHoveredId(null)}
                            offset={16}
                        >
                            <PopupContent property={property} />
                        </Popup>
                    )}
                </div>
            ))}
        </Map>
    );
};
