import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface PropertyFeature {
  id: string
  name: string
  value: string | number | boolean
}

export interface PropertyItemSetter {
  type: string
  value: string | number | boolean | null
}

export interface Property {
  id?: string
  address: string
  city: string
  state: string
  zipCode: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  yearBuilt: number
  lotSize: number
  features: PropertyFeature[]
  images?: string[]
  description?: string
  neighborhood?: string
  schoolDistrict?: string
  taxInfo?: {
    annualAmount: number
    lastAssessedValue: number
  }
}

interface PropertyState {
  currentProperty: Property
  savedProperties: Property[]
  loading: boolean
  error: string | null
  filters: {
    propertyType: string | null
    minBedrooms: number | null
    maxBedrooms: number | null
    minBathrooms: number | null
    maxBathrooms: number | null
    minSquareFeet: number | null
    maxSquareFeet: number | null
    minYearBuilt: number | null
    maxYearBuilt: number | null
  }
}

const initialState: PropertyState = {
  currentProperty: {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "single_family",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 0,
    yearBuilt: new Date().getFullYear(),
    lotSize: 0,
    features: [],
  },
  savedProperties: [],
  loading: false,
  error: null,
  filters: {
    propertyType: null,
    minBedrooms: null,
    maxBedrooms: null,
    minBathrooms: null,
    maxBathrooms: null,
    minSquareFeet: null,
    maxSquareFeet: null,
    minYearBuilt: null,
    maxYearBuilt: null,
  },
}

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    updateProperty: (state, action: PayloadAction<PropertyItemSetter>) => {
      state.currentProperty = { ...state.currentProperty, [action.payload.type]: action.payload.value }
    },
    addFeature: (state, action: PayloadAction<PropertyFeature>) => {
      state.currentProperty.features.push(action.payload)
    },
    removeFeature: (state, action: PayloadAction<string>) => {
      state.currentProperty.features = state.currentProperty.features.filter((feature) => feature.id !== action.payload)
    },
    saveProperty: (state, action: PayloadAction<Property>) => {
      const property = { ...action.payload, id: action.payload.id || Date.now().toString() }
      state.savedProperties.push(property)
    },
    updateSavedProperty: (state, action: PayloadAction<Property>) => {
      const index = state.savedProperties.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.savedProperties[index] = action.payload
      }
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.savedProperties = state.savedProperties.filter((p) => p.id !== action.payload)
    },
    resetProperty: (state) => {
      state.currentProperty = initialState.currentProperty
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<PropertyState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    addPropertyImage: (state, action: PayloadAction<{ propertyId?: string; imageUrl: string }>) => {
      const { propertyId, imageUrl } = action.payload

      if (propertyId) {
        // Add to saved property
        const propertyIndex = state.savedProperties.findIndex((p) => p.id === propertyId)
        if (propertyIndex !== -1) {
          if (!state.savedProperties[propertyIndex].images) {
            state.savedProperties[propertyIndex].images = []
          }
          state.savedProperties[propertyIndex].images!.push(imageUrl)
        }
      } else {
        // Add to current property
        if (!state.currentProperty.images) {
          state.currentProperty.images = []
        }
        state.currentProperty.images.push(imageUrl)
      }
    },
    removePropertyImage: (state, action: PayloadAction<{ propertyId?: string; imageIndex: number }>) => {
      const { propertyId, imageIndex } = action.payload

      if (propertyId) {
        // Remove from saved property
        const propertyIndex = state.savedProperties.findIndex((p) => p.id === propertyId)
        if (propertyIndex !== -1 && state.savedProperties[propertyIndex].images) {
          state.savedProperties[propertyIndex].images!.splice(imageIndex, 1)
        }
      } else {
        // Remove from current property
        if (state.currentProperty.images) {
          state.currentProperty.images.splice(imageIndex, 1)
        }
      }
    },
  },
})

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
} = propertySlice.actions

export default propertySlice.reducer
