import { configureStore } from "@reduxjs/toolkit";

import snackbarReducer from "./slices/snackbar/snackbar-slice";
import websiteReducer from "./slices/website/website-slice";
import loadingReducer from "./slices/loading/loading-slice";
import administratorReducer from "./slices/administrator/administrator-slice";
import userReducer from "./slices/user/user-slice";
import clientsReducer from "./slices/client/client";
import listingReducer from "./slices/listing/listing-slice";
import propertyReducer from "./slices/property/property-slice";
import predictionReducer from "./slices/prediction/prediction-slice";
import priceHistoryReducer from "./slices/price-history/price-history-slice";

// Configure the store
export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        website: websiteReducer,
        loading: loadingReducer,
        administrator: administratorReducer,
        user: userReducer,
        clients: clientsReducer,
        listing: listingReducer,
        property: propertyReducer,
        prediction: predictionReducer,
        priceHistory: priceHistoryReducer,
    },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
