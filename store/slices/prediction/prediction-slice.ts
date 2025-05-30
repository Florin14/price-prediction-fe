import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { Property } from "../property/property-slice"
// import type { Property } from "../property/slice"

export interface PredictionResult {
  id: string
  propertyId: string
  predictedPrice: number
  priceRange: {
    min: number
    max: number
  }
  confidence: number
  similarProperties: {
    id: string
    address: string
    price: number
    distance: number
    imageUrl?: string
  }[]
  createdAt: string
  marketTrends?: {
    historicalPrices: { date: string; price: number }[]
    forecastPrices: { date: string; price: number }[]
    yearlyGrowthRate: number
  }
  propertyDetails?: Property
  factors?: {
    name: string
    impact: number
    description: string
  }[]
}

interface PredictionState {
  currentPrediction: PredictionResult | null
  predictionHistory: PredictionResult[]
  loading: boolean
  error: string | null
  selectedPredictionId: string | null
  comparisonIds: string[]
}

const initialState: PredictionState = {
  currentPrediction: null,
  predictionHistory: [],
  loading: false,
  error: null,
  selectedPredictionId: null,
  comparisonIds: [],
}

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    setPrediction: (state, action: PayloadAction<PredictionResult>) => {
      state.currentPrediction = action.payload
      // Add to history if not already there
      if (!state.predictionHistory.some((p) => p.id === action.payload.id)) {
        state.predictionHistory.unshift(action.payload)
      }
    },
    clearCurrentPrediction: (state) => {
      state.currentPrediction = null
    },
    clearPredictionHistory: (state) => {
      state.predictionHistory = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    deletePrediction: (state, action: PayloadAction<string>) => {
      state.predictionHistory = state.predictionHistory.filter((prediction) => prediction.id !== action.payload)
      if (state.currentPrediction?.id === action.payload) {
        state.currentPrediction = null
      }
      // Remove from comparison if present
      state.comparisonIds = state.comparisonIds.filter((id) => id !== action.payload)
    },
    setSelectedPrediction: (state, action: PayloadAction<string | null>) => {
      state.selectedPredictionId = action.payload
    },
    addToComparison: (state, action: PayloadAction<string>) => {
      if (!state.comparisonIds.includes(action.payload)) {
        state.comparisonIds.push(action.payload)
      }
    },
    removeFromComparison: (state, action: PayloadAction<string>) => {
      state.comparisonIds = state.comparisonIds.filter((id) => id !== action.payload)
    },
    clearComparison: (state) => {
      state.comparisonIds = []
    },
    updatePredictionDetails: (state, action: PayloadAction<{ id: string; updates: Partial<PredictionResult> }>) => {
      const { id, updates } = action.payload

      // Update in history
      const historyIndex = state.predictionHistory.findIndex((p) => p.id === id)
      if (historyIndex !== -1) {
        state.predictionHistory[historyIndex] = {
          ...state.predictionHistory[historyIndex],
          ...updates,
        }
      }

      // Update current prediction if it matches
      if (state.currentPrediction?.id === id) {
        state.currentPrediction = {
          ...state.currentPrediction,
          ...updates,
        }
      }
    },
  },
})

export const {
  setPrediction,
  clearCurrentPrediction,
  clearPredictionHistory,
  setLoading,
  setError,
  deletePrediction,
  setSelectedPrediction,
  addToComparison,
  removeFromComparison,
  clearComparison,
  updatePredictionDetails,
} = predictionSlice.actions

export default predictionSlice.reducer
