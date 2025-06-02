"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { updateProperty, resetProperty, type Property } from "../../../store/slices/property/property-slice";
import { addPrediction, predictPropertyPrice } from "../../../store/slices/prediction/thunks";
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
import { fetchImobiliareRoData, importListings } from "../../../store/slices/listing/thunks";
import PredictionLoadingOverlay from "../../../components/generic-components/PredictionLoadingOverlay";

const PredictionPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentProperty } = useSelector((state: RootState) => state.property);
    const { currentPrediction, loading, error } = useSelector((state: RootState) => state.prediction);
    const [step, setStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

    const propertyTypes = [
        { value: "apartment", label: "Apartment" },
        { value: "house", label: "House" },
        { value: "villa", label: "Villa" },
        { value: "office", label: "Office Space" },
        { value: "commercial", label: "Commercial Space" },
        { value: "land", label: "Land" },
    ];

    const comfort = [
        { value: "lux", label: "Luxury" },
        { value: "premium", label: "Premium" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "basic", label: "Basic" },
    ];

    // useEffect(() => {
    //     dispatch(fetchImobiliareRoData({})).then((res) => {
    //         console.log(res);
    //     });
    // }, []);

    // const validateStep1 = () => {
    //     const required = ["address", "city"];
    //     for (const field of required) {
    //         if (!currentProperty[field]) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    const validateStep1 = (property: Property): boolean => {
        const errors: string[] = [];
        if (!property.address?.trim()) errors.push("Street address is required");
        if (!property.city?.trim()) errors.push("City is required");
        if (!property.classification) errors.push("Property type is required");
        setValidationErrors(errors);
        return errors.length === 0;
    };

    const validateStep2 = (property: Property): boolean => {
        const errors: string[] = [];
        if (!property.usefulAreaTotal) errors.push("Total usable area is required");
        if (!property.numRooms) errors.push("Number of rooms is required");
        if (!property.comfort) errors.push("Comfort level is required");
        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handleNextStep = () => {
        if (validateStep1(currentProperty)) {
            setStep(2);
            setValidationErrors([]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep2(currentProperty)) {
            setShowLoadingOverlay(true);

            // Adding a minimum loading time of 3 seconds for better UX
            await Promise.all([dispatch(predictPropertyPrice(currentProperty)), new Promise((resolve) => setTimeout(resolve, 3000))]);

            setShowLoadingOverlay(false);
            setValidationErrors([]);
        }
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleReset = () => {
        console.log(4235);
        dispatch(resetProperty());
        setStep(1);
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
            <h3>Property Location and Basic Details</h3>
            <FormRow>
                <StyledInput
                    label="Street Address"
                    inputName="address"
                    value={currentProperty.address || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "address", value }));
                    }}
                    placeholder="Street address..."
                    width="100%"
                    variant="filled"
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label="City"
                    inputName="city"
                    value={currentProperty.city || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "city", value }));
                    }}
                    placeholder="City name..."
                    variant="filled"
                />
                <StyledInput
                    label="Street Frontage (m)"
                    inputName="streetFrontage"
                    type="number"
                    value={currentProperty.streetFrontage?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "streetFrontage", value: Number(value) }));
                    }}
                    placeholder="Street frontage..."
                    variant="filled"
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label="Property Type"
                    inputName="classification"
                    value={currentProperty.classification || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "classification", value }));
                    }}
                    placeholder="Property type..."
                    variant="filled"
                    select={true}
                    items={propertyTypes}
                />
                <StyledInput
                    label="Land Classification"
                    inputName="landClassification"
                    value={currentProperty.landClassification || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "landClassification", value }));
                    }}
                    placeholder="Land classification..."
                    variant="filled"
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label="Floor Number"
                    inputName="floor"
                    type="number"
                    value={currentProperty.floor?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "floor", value: Number(value) }));
                    }}
                    placeholder="Floor number..."
                    variant="filled"
                />
                <StyledInput
                    label="Comfort Level"
                    inputName="comfort"
                    value={currentProperty.comfort || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "comfort", value }));
                    }}
                    placeholder="Comfort level..."
                    variant="filled"
                    select={true}
                    items={comfort}
                />
            </FormRow>
            <div className="validation-errors">
                {validationErrors.map((error, index) => (
                    <div key={index} className="error-message">
                        {error}
                    </div>
                ))}
            </div>
            <div className="form-actions">
                <StyledButton onClick={handleNextStep} endIcon={<FiArrowRight />} variant="contained" color="primary">
                    Next: Property Details
                </StyledButton>
            </div>
        </FormSection>
    );

    const renderStep2 = () => (
        <FormSection>
            <h3>Property Details</h3>
            <FormRow>
                <StyledInput
                    label="Total Usable Area (m²)"
                    inputName="usefulAreaTotal"
                    type="number"
                    value={currentProperty.usefulAreaTotal?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "usefulAreaTotal", value: Number(value) }));
                    }}
                    placeholder="Total usable area..."
                    variant="filled"
                />
                <StyledInput
                    label="Main Living Area (m²)"
                    inputName="usefulArea"
                    type="number"
                    value={currentProperty?.usefulArea?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "usefulArea", value: Number(value) }));
                    }}
                    placeholder="Main living area..."
                    variant="filled"
                />

                <StyledInput
                    label="Number of rooms"
                    inputName="numRooms"
                    type="number"
                    value={currentProperty.numRooms?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "numRooms", value: Number(value) }));
                    }}
                    placeholder="Number of rooms..."
                    variant="filled"
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label="Built Area (m²)"
                    inputName="builtArea"
                    type="number"
                    value={currentProperty.builtArea?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "builtArea", value: Number(value) }));
                    }}
                    placeholder="Built area..."
                    variant="filled"
                />
                <StyledInput
                    label="Land Area (m²)"
                    inputName="landArea"
                    type="number"
                    value={currentProperty.landArea?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "landArea", value: Number(value) }));
                    }}
                    placeholder="Land area..."
                    variant="filled"
                />
            </FormRow>
            <div className="validation-errors">
                {validationErrors.map((error, index) => (
                    <div key={index} className="error-message">
                        {error}
                    </div>
                ))}
            </div>
            <div className="form-actions">
                <StyledButton variant="outlined" onClick={handlePrevStep} startIcon={<FiArrowLeft />}>
                    Back
                </StyledButton>
                <StyledButton variant="contained" onClick={handleSubmit} endIcon={<FiDollarSign />} disabled={validationErrors.length > 0}>
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
                            <div className="range-min">{currentPrediction?.priceRange?.min ? formatCurrency(currentPrediction?.priceRange?.min) : ""}</div>
                            <div className="range-max">{currentPrediction?.priceRange?.max ? formatCurrency(currentPrediction?.priceRange?.max) : ""}</div>
                        </div>
                    </PriceRange>

                    <SimilarProperties>
                        <h4>Similar Properties</h4>
                        <div className="similar-properties-grid">
                            {currentPrediction?.similarProperties?.map((property) => (
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
                        <StyledButton variant="outlined" onClick={handleSubmit} startIcon={<FiRefreshCw />}>
                            Try again
                        </StyledButton>
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
            <PredictionLoadingOverlay active={showLoadingOverlay} />
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
