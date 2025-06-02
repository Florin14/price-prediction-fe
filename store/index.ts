import { configureStore } from "@reduxjs/toolkit";

import snackbarReducer from "./slices/snackbar/snackbar-slice";
import websiteReducer from "./slices/website/website-slice";
import loadingReducer from "./slices/loading/loading-slice";
import administratorReducer from "./slices/administrator/administrator-slice";
import sectionReducer from "./slices/section/section-slice";
import communicationCategoryReducer from "./slices/communication-categories/communication-categories-slice";
import communicationComplaintReducer from "./slices/communication-complaints/communication-complaints-slice";
import userReducer from "./slices/user/user-slice";
import naturalPersonReducer from "./slices/validation/natural-persons/natural-persons";
import legalEntityReducer from "./slices/validation/legal-entities/legal-entities";
import naturalPersonProfileReducer from "./slices/natural-person-profile/natural-person-profile-slice";
import legalEntityProfileReducer from "./slices/legal-entity-profile/legal-entity-profile-slice";
import inputChannelsReducer from "./slices/input-channels/input-channels-slice";
import addEditCommunicationTypeReducer from "./slices/add-edit-communication-type/add-edit-communication-type-slice";
import labelsReducer from "./slices/labels/labels-slice";
import listingReducer from "./slices/listing/listing-slice";
import propertyReducer from "./slices/property/property-slice";
import predictionReducer from "./slices/prediction/prediction-slice";

// Configure the store
export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        website: websiteReducer,
        loading: loadingReducer,
        administrator: administratorReducer,
        section: sectionReducer,
        communicationCategory: communicationCategoryReducer,
        communicationComplaint: communicationComplaintReducer,
        user: userReducer,
        naturalPerson: naturalPersonReducer,
        naturalPersonProfile: naturalPersonProfileReducer,
        legalEntityProfile: legalEntityProfileReducer,
        legalEntity: legalEntityReducer,
        inputChannels: inputChannelsReducer,
        communicationType: addEditCommunicationTypeReducer,
        labels: labelsReducer,
        listing: listingReducer,
        property: propertyReducer,
        prediction: predictionReducer,
    },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
