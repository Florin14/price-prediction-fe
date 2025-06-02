import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setError, saveProperty, updateSavedProperty, deleteProperty } from "./property-slice";
import { Property } from "./property-slice";
import { RootState } from "../..";
// import type { Property } from "./slice"
// import type { RootState } from "../index"
import Axios from "axios";

// Simulate API calls with local storage
const STORAGE_KEY = "real_estate_properties";

// Helper to get properties from local storage
const getStoredProperties = (): Property[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

// Helper to save properties to local storage
const storeProperties = (properties: Property[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
};

// Load properties from storage
export const loadProperties = createAsyncThunk("property/loadProperties", async (_, { dispatch }) => {
    try {
        dispatch(setLoading(true));

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const properties = getStoredProperties();

        // Instead of returning properties, we'll dispatch actions to update the state
        properties.forEach((property) => {
            dispatch(saveProperty(property));
        });

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError((error as Error).message));
        dispatch(setLoading(false));
    }
});

// Save a property
export const savePropertyAsync = createAsyncThunk("property/savePropertyAsync", async (property: Property, { dispatch, getState }) => {
    try {
        dispatch(setLoading(true));

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Generate ID if not present
        const propertyWithId = {
            ...property,
            id: property.id || Date.now().toString(),
        };

        // Save to Redux
        dispatch(saveProperty(propertyWithId));

        // Save to local storage
        const state = getState() as RootState;
        storeProperties(state.property.savedProperties);

        dispatch(setLoading(false));
        return propertyWithId;
    } catch (error) {
        dispatch(setError((error as Error).message));
        dispatch(setLoading(false));
        throw error;
    }
});

// Update a property
export const updatePropertyAsync = createAsyncThunk("property/updatePropertyAsync", async (property: Property, { dispatch, getState }) => {
    try {
        dispatch(setLoading(true));

        if (!property.id) {
            throw new Error("Property ID is required for updates");
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Update in Redux
        dispatch(updateSavedProperty(property));

        // Update in local storage
        const state = getState() as RootState;
        storeProperties(state.property.savedProperties);

        dispatch(setLoading(false));
        return property;
    } catch (error) {
        dispatch(setError((error as Error).message));
        dispatch(setLoading(false));
        throw error;
    }
});

// Delete a property
export const deletePropertyAsync = createAsyncThunk("property/deletePropertyAsync", async (propertyId: string, { dispatch, getState }) => {
    try {
        dispatch(setLoading(true));

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Delete from Redux
        dispatch(deleteProperty(propertyId));

        // Update local storage
        const state = getState() as RootState;
        storeProperties(state.property.savedProperties);

        dispatch(setLoading(false));
        return propertyId;
    } catch (error) {
        dispatch(setError((error as Error).message));
        dispatch(setLoading(false));
        throw error;
    }
});

