import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Draft } from '@reduxjs/toolkit';
import { Option } from "../../../components/generic-components/LazyLoadingMultiDropdown";

export interface PropertyFeature {
    id: string;
    name: string;
    value: string | number | boolean;
}

export interface PropertyItemSetter {
    type: string;
    value: string | number | boolean | any | null;
}

export interface Property {
    id?: string;
    externalId?: string;
    locationId?: number;

    // Features
    features?: PropertyFeature[];

    // Classification
    classification?: Option | null;
    landClassification?: string;

    // Areas
    useful_area_total?: number;
    useful_area?: number;
    builtArea?: number;
    landArea?: number;
    yardArea?: number;
    showcaseArea?: number;
    terraceArea?: number;
    balconyArea?: number;

    // Room counts
    num_rooms?: number;
    num_kitchens?: number;
    num_bathrooms?: number;
    numBalconies?: number;

    // Parking
    numParking?: number;
    num_garages?: number;

    // Location
    floor?: number;
    city?: string;
    address?: string;
    street_frontage?: number;

    // Additional details
    price?: number;
    url?: string;
    condominium?: string;
    structuralSystem?: string;
    terraces?: string;
    comfort?: string;

    // Additional frontend fields
    images?: string[];
    description?: string;
}

interface PropertyState {
    currentProperty: Property;
    savedProperties: Property[];
    loading: boolean;
    error: string | null;
    filters: {
        classification: any | null;
        minPrice: number | null;
        maxPrice: number | null;
        minRooms: number | null;
        maxRooms: number | null;
        minArea: number | null;
        maxArea: number | null;
        minBathrooms: number | null;
        maxBathrooms: number | null;
    };
}

const initialState: PropertyState = {
    currentProperty: {
        address: "",
        city: "",
        useful_area: 0,
        classification: null,
        num_rooms: 0,
        num_bathrooms: 0,
        street_frontage: 0,
        num_kitchens: 0,
        numParking: 0,
        num_garages: 0,
        useful_area_total: 0,
        builtArea: 0,
        landArea: 0,
        yardArea: 0,
        showcaseArea: 0,
        terraceArea: 0,
        balconyArea: 0,
        floor: 0,
        structuralSystem: "",
        terraces: "",
        comfort: "",
        condominium: "",
        price: 0,
        features: [],
    },
    savedProperties: [],
    loading: false,
    error: null,
    filters: {
        classification: null,
        minPrice: null,
        maxPrice: null,
        minRooms: null,
        maxRooms: null,
        minArea: null,
        maxArea: null,
        minBathrooms: null,
        maxBathrooms: null,
    },
};

type PropertySliceState = Draft<PropertyState>;

const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        updateProperty: (state: PropertySliceState, action: PayloadAction<PropertyItemSetter>) => {
            state.currentProperty = { ...state.currentProperty, [action.payload.type]: action.payload.value };
        },
        addFeature: (state: PropertySliceState, action: PayloadAction<PropertyFeature>) => {
            if (!state.currentProperty.features) {
                state.currentProperty.features = [];
            }
            state.currentProperty.features.push(action.payload);
        },
        removeFeature: (state: PropertySliceState, action: PayloadAction<string>) => {
            if (state.currentProperty.features) {
                state.currentProperty.features = state.currentProperty.features.filter((feature: PropertyFeature) => feature.id !== action.payload);
            }
        },
        saveProperty: (state: PropertySliceState, action: PayloadAction<Property>) => {
            const property = { ...action.payload, id: action.payload.id || Date.now().toString() };
            state.savedProperties.push(property);
        },
        updateSavedProperty: (state: PropertySliceState, action: PayloadAction<Property>) => {
            const index = state.savedProperties.findIndex((p: Property) => p.id === action.payload.id);
            if (index !== -1) {
                state.savedProperties[index] = action.payload;
            }
        },
        deleteProperty: (state: PropertySliceState, action: PayloadAction<string>) => {
            state.savedProperties = state.savedProperties.filter((p: Property) => p.id !== action.payload);
        },
        resetProperty: (state: PropertySliceState) => {
            state.currentProperty = initialState.currentProperty;
        },
        setLoading: (state: PropertySliceState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state: PropertySliceState, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setFilters: (state: PropertySliceState, action: PayloadAction<Partial<PropertyState["filters"]>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters: (state: PropertySliceState) => {
            state.filters = initialState.filters;
        },
        addPropertyImage: (state: PropertySliceState, action: PayloadAction<{ propertyId?: string; imageUrl: string }>) => {
            const { propertyId, imageUrl } = action.payload;

            if (propertyId) {
                // Add to saved property
                const propertyIndex = state.savedProperties.findIndex((p: Property) => p.id === propertyId);
                if (propertyIndex !== -1) {
                    if (!state.savedProperties[propertyIndex].images) {
                        state.savedProperties[propertyIndex].images = [];
                    }
                    state.savedProperties[propertyIndex].images!.push(imageUrl);
                }
            } else {
                // Add to current property
                if (!state.currentProperty.images) {
                    state.currentProperty.images = [];
                }
                state.currentProperty.images.push(imageUrl);
            }
        },
        removePropertyImage: (state: PropertySliceState, action: PayloadAction<{ propertyId?: string; imageIndex: number }>) => {
            const { propertyId, imageIndex } = action.payload;

            if (propertyId) {
                // Remove from saved property
                const propertyIndex = state.savedProperties.findIndex((p: Property) => p.id === propertyId);
                if (propertyIndex !== -1 && state.savedProperties[propertyIndex].images) {
                    state.savedProperties[propertyIndex].images!.splice(imageIndex, 1);
                }
            } else {
                // Remove from current property
                if (state.currentProperty.images) {
                    state.currentProperty.images.splice(imageIndex, 1);
                }
            }
        },
    },
});

export const {
    updateProperty,
    addFeature,
    removeFeature,
    saveProperty,
    updateSavedProperty,
    deleteProperty,
    resetProperty,
    setLoading,
    setError,
    setFilters,
    resetFilters,
    addPropertyImage,
    removePropertyImage,
} = propertySlice.actions;

export default propertySlice.reducer;
