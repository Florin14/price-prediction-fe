"use client";

import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { updateProperty, resetProperty } from "../../../store/slices/property/property-slice";
import { predictPropertyPrice } from "../../../store/slices/prediction/thunks";
// import StyledButton from "../../components/common/StyledButton/StyledButton"
// import StyledInput from "../../components/cStyledInput/StyledInput"
import {
    PredictionContainer,
    PredictionForm,
    FormSection,
    FormRow,
    PredictionResults,
    ResultCard,
    PriceRange,
    SimilarProperties,
    PropertyCard,
    StepIndicator,
} from "./PredictionPage.styles";
import { FiHome, FiMapPin, FiDollarSign, FiArrowRight, FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import StyledInput from "../../../components/generic-components/StyledInput";
import StyledButton from "../../../components/generic-components/StyledButton";
import { importListings } from "../../../store/slices/listing/thunks";

const PredictionPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentProperty } = useSelector((state: RootState) => state.property);
    const { currentPrediction, loading, error } = useSelector((state: RootState) => state.prediction);
    const [step, setStep] = useState(1);

    const propertyTypes = [
        { value: "single_family", label: "Single Family Home" },
        { value: "condo", label: "Condominium" },
        { value: "townhouse", label: "Townhouse" },
        { value: "multi_family", label: "Multi-Family" },
        { value: "land", label: "Land" },
    ];

    const handleNextStep = () => {
        dispatch(importListings({}));
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(predictPropertyPrice(currentProperty));
    };

    const handleReset = () => {
        dispatch(resetProperty());
        setStep(1);
        dispatch;
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const renderStepIndicator = () => (
        <StepIndicator>
            <div className={`step ${step >= 1 ? "active" : ""}`}>
                <div className="step-icon">
                    <FiMapPin />
                </div>
                <div className="step-label">Location</div>
            </div>
            <div className="connector"></div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
                <div className="step-icon">
                    <FiHome />
                </div>
                <div className="step-label">Property</div>
            </div>
            <div className="connector"></div>
            <div className={`step ${currentPrediction ? "active" : ""}`}>
                <div className="step-icon">
                    <FiDollarSign />
                </div>
                <div className="step-label">Result</div>
            </div>
        </StepIndicator>
    );

    const renderStep1 = () => (
        <FormSection>
            <h3>Property Location</h3>
            <FormRow>
                <StyledInput
                    label="Street Address"
                    inputName="address"
                    value={currentProperty.address}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "address", value }));
                    }}
                    placeholder="123 Main St"
                    width="100%"
                    variant="filled"
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label="City"
                    inputName="city"
                    value={currentProperty.city}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "city", value }));
                    }}
                    placeholder="City"
                    variant="filled"
                />
                <StyledInput
                    label="State"
                    inputName="state"
                    value={currentProperty.state}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "state", value }));
                    }}
                    placeholder="State"
                    variant="filled"
                />
                <StyledInput
                    label="Zip Code"
                    inputName="zipCode"
                    value={currentProperty.zipCode}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "zipCode", value }));
                    }}
                    placeholder="Zip Code"
                    variant="filled"
                />
            </FormRow>
            <div className="form-actions">
                <StyledButton onClick={handleNextStep} endIcon={<FiArrowRight />}>
                    Next: Property Details
                </StyledButton>
                <StyledButton onClick={handleNextStep} endIcon={<FiArrowRight />}>
                    Import data
                </StyledButton>
            </div>
        </FormSection>
    );

    const renderStep2 = () => (
        <FormSection>
            <h3>Property Details</h3>
            <FormRow>
                <StyledInput
                    label="Property Type"
                    inputName="propertyType"
                    value={currentProperty.propertyType}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "propertyType", value }));
                    }}
                    placeholder="Property Type"
                    variant="filled"
                />
                <StyledInput
                    label="Year Built"
                    inputName="yearBuilt"
                    type="number"
                    value={currentProperty.yearBuilt.toString()}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "yearBuilt", value }));
                    }}
                    placeholder="Year Built"
                    variant="filled"
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label="Bedrooms"
                    inputName="bedrooms"
                    type="number"
                    value={currentProperty.bedrooms.toString()}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "bedrooms", value }));
                    }}
                    placeholder="Number of Bedrooms"
                    variant="filled"
                />
                <StyledInput
                    label="Bathrooms"
                    inputName="bathrooms"
                    type="number"
                    value={currentProperty.bathrooms.toString()}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "bathrooms", value }));
                    }}
                    placeholder="Number of Bathrooms"
                    variant="filled"
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label="Square Feet"
                    inputName="squareFeet"
                    type="number"
                    value={currentProperty.squareFeet.toString()}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "squareFeet", value }));
                    }}
                    placeholder="Total Square Feet"
                    variant="filled"
                />
                <StyledInput
                    label="Lot Size (acres)"
                    inputName="lotSize"
                    type="number"
                    value={currentProperty.lotSize.toString()}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "lotSize", value }));
                    }}
                    placeholder="Lot Size in Acres"
                    variant="filled"
                />
            </FormRow>
            <div className="form-actions">
                <StyledButton variant="outlined" onClick={handlePrevStep} startIcon={<FiArrowLeft />}>
                    Back
                </StyledButton>
                <StyledButton variant="contained" onClick={handleSubmit} endIcon={<FiDollarSign />}>
                    Get Price Prediction
                </StyledButton>
            </div>
        </FormSection>
    );

    const renderResults = () => {
        if (!currentPrediction) return null;

        return (
            <PredictionResults>
                <h2>Price Prediction Results</h2>

                <ResultCard>
                    <div className="prediction-header">
                        <h3>Estimated Property Value</h3>
                        <div className="confidence">Confidence: {(currentPrediction.confidence * 100).toFixed(0)}%</div>
                    </div>

                    <div className="predicted-price">{formatCurrency(currentPrediction.predictedPrice)}</div>

                    <PriceRange>
                        <div className="range-label">Price Range:</div>
                        <div className="range-bar">
                            <div className="range-min">{formatCurrency(currentPrediction.priceRange.min)}</div>
                            <div className="range-max">{formatCurrency(currentPrediction.priceRange.max)}</div>
                        </div>
                    </PriceRange>

                    <SimilarProperties>
                        <h4>Similar Properties</h4>
                        <div className="similar-properties-grid">
                            {currentPrediction.similarProperties.map((property) => (
                                <PropertyCard key={property.id}>
                                    {property.imageUrl && (
                                        <div className="property-image">
                                            <img src={property.imageUrl || "/placeholder.svg"} alt={property.address} />
                                        </div>
                                    )}
                                    <div className="property-address">{property.address}</div>
                                    <div className="property-price">{formatCurrency(property.price)}</div>
                                    <div className="property-distance">{property.distance} miles away</div>
                                </PropertyCard>
                            ))}
                        </div>
                    </SimilarProperties>

                    <div className="result-actions">
                        <StyledButton variant="outlined" onClick={handleReset} startIcon={<FiRefreshCw />}>
                            New Prediction
                        </StyledButton>
                    </div>
                </ResultCard>
            </PredictionResults>
        );
    };

    return (
        <PredictionContainer>
            <h1>Real Estate Price Prediction</h1>

            {renderStepIndicator()}

            {error && <div className="error-message">Error: {error}</div>}

            {!currentPrediction ? (
                <PredictionForm>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                </PredictionForm>
            ) : (
                renderResults()
            )}
        </PredictionContainer>
    );
};

export default PredictionPage;
