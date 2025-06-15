import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { updateProperty, type Property } from "../../../store/slices/property/property-slice";
import { predictPropertyPrice } from "../../../store/slices/prediction/thunks";
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
import StyledDropdown from "../../../components/generic-components/StyledDropdown";
import PredictionLoadingOverlay from "../../../components/generic-components/PredictionLoadingOverlay";
import { MapLibre } from "../../../components/generic-components/LibreMap";
import { clearCurrentPrediction } from "../../../store/slices/prediction/prediction-slice";

const PredictionPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentProperty } = useSelector((state: RootState) => state.property);
    const { currentPrediction, loading, error } = useSelector((state: RootState) => state.prediction);
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const [step, setStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

    useEffect(() => {
        if (currentProperty) {
            if (step === 1) {
                validateStep1(currentProperty);
            } else if (step === 2) {
                validateStep2(currentProperty);
            }
        }
    }, [currentProperty, step]);

    const propertyTypes = [
        { id: 1, name: languageData?.PropertyTypes?.Apartment || "Bloc" },
        { id: 2, name: languageData?.PropertyTypes?.House || "Casa/Vila" },
    ];

    const comfort = [
        { value: "lux", label: languageData?.ComfortLevels?.Luxury || "Luxury" },
        { value: "premium", label: languageData?.ComfortLevels?.Premium || "Premium" },
        { value: "high", label: languageData?.ComfortLevels?.High || "High" },
        { value: "medium", label: languageData?.ComfortLevels?.Medium || "Medium" },
        { value: "basic", label: languageData?.ComfortLevels?.Basic || "Basic" },
    ];

    const validateStep1 = (property: Property): boolean => {
        const errors: string[] = [];
        if (!property.address?.trim()) errors.push("Street address is required");
        if (!property.city?.trim()) errors.push("City is required");
        if (!property.classification) errors.push("Property type is required");
        if (!property.comfort) errors.push("Comfort level is required");

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const validateStep2 = (property: Property): boolean => {
        const errors: string[] = [];
        if (!property.useful_area_total) errors.push("Total usable area is required");
        if (!property.num_rooms) errors.push("Number of rooms is required");
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
        console.log(currentProperty);
        if (validateStep2(currentProperty)) {
            setShowLoadingOverlay(true);

            // Adding a minimum loading time of 3 seconds for better UX
            await Promise.all([
                dispatch(predictPropertyPrice({ ...currentProperty, classification: currentProperty?.classification?.name })),
                new Promise((resolve) => setTimeout(resolve, 3000)),
            ]);

            setShowLoadingOverlay(false);
            setValidationErrors([]);
        }
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleReset = () => {
        dispatch(clearCurrentPrediction());
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
            <div
                className={`step ${step >= 1 || currentPrediction ? "active" : ""}`}
                onClick={() => {
                    if (step === 2 && validateStep1(currentProperty)) {
                        setStep(1);
                        setValidationErrors([]);
                    } else if (currentPrediction) {
                        setStep(1);
                        dispatch(clearCurrentPrediction());
                    }
                }}
            >
                <div className="step-icon">
                    <FiMapPin />
                </div>
                <div className="step-label">{languageData?.Steps?.Location}</div>
            </div>
            <div className="connector"></div>
            <div
                className={`step ${step >= 2 || currentPrediction ? "active" : ""}`}
                onClick={() => {
                    if (currentPrediction) {
                        setStep(2);
                        dispatch(clearCurrentPrediction());
                    } else if (step === 1 && validateStep1(currentProperty)) {
                        setStep(2);
                        setValidationErrors([]);
                    }
                }}
            >
                <div className="step-icon">
                    <FiHome />
                </div>
                <div className="step-label">{languageData?.Steps?.Property}</div>
            </div>
            <div className="connector"></div>
            <div
                className={`step ${currentPrediction ? "active" : ""}`}
                onClick={() => {
                    if (!currentPrediction && step === 2 && validateStep2(currentProperty)) {
                        handleSubmit(new Event("click") as unknown as React.FormEvent);
                    }
                }}
            >
                <div className="step-icon">
                    <FiDollarSign />
                </div>
                <div className="step-label">{languageData?.Steps?.Result}</div>
            </div>
        </StepIndicator>
    );

    const renderStep1 = () => (
        <FormSection>
            <h3>{languageData?.StepGuide?.Location.title}</h3>
            <div
                style={{
                    background: "#fffdf0",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    color: "#20B2AA",
                    marginBottom: "20px",
                    border: "1px solid #d1d5db",
                    fontSize: "13px",
                    boxShadow: "0 1px 3px rgba(110, 110, 110, 0.05)",
                }}
            >
                {languageData?.StepGuide?.Location.hint}
            </div>
            <FormRow>
                <StyledInput
                    label={languageData?.PropertyFields?.StreetAddress}
                    inputName="address"
                    value={currentProperty.address || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "address", value }));
                    }}
                    placeholder="Street address..."
                    width="100%"
                    
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label={languageData?.PropertyFields?.City}
                    inputName="city"
                    value={currentProperty.city || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "city", value }));
                    }}
                    placeholder="City name..."
                    
                />
                <StyledInput
                    label={languageData?.PropertyFields?.StreetFrontage}
                    inputName="streetFrontage"
                    type="number"
                    value={currentProperty.street_frontage?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "streetFrontage", value: Number(value) }));
                    }}
                    placeholder="Street frontage..."
                    
                />
            </FormRow>
            <FormRow>
                <StyledDropdown
                    label={languageData?.PropertyFields?.PropertyType}
                    required
                    activeLabel
                    value={currentProperty.classification || null}
                    onChange={(_, value) => {
                        dispatch(updateProperty({ type: "classification", value: value || null }));
                    }}
                    placeholder="Selecteaza tipul proprietatii..."
                    options={propertyTypes}
                />
                <StyledInput
                    label={languageData?.PropertyFields?.LandClassification}
                    inputName="landClassification"
                    value={currentProperty.landClassification || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "landClassification", value }));
                    }}
                    placeholder="Land classification..."
                    
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
                    
                />
                <StyledInput
                    label="Comfort Level"
                    inputName="comfort"
                    value={currentProperty.comfort || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "comfort", value }));
                    }}
                    placeholder="Comfort level..."
                    
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
                <StyledButton onClick={handleNextStep} endIcon={<FiArrowRight />} variant="contained" color="primary" disabled={validationErrors.length > 0}>
                    {languageData?.NextPropertyDetails}
                </StyledButton>
            </div>
        </FormSection>
    );

    const renderStep2 = () => (
        <FormSection>
            <h3>{languageData?.StepGuide?.PropertyDetails.title}</h3>
            <div
                style={{
                    background: "linear-gradient(to right, #fffdf0, #ffffff)",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    color: "#20B2AA",
                    marginBottom: "20px",
                    fontSize: "13px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
            >
                {languageData?.StepGuide?.PropertyDetails.hint}
            </div>
            <FormRow>
                <StyledInput
                    label={languageData?.PropertyFields?.TotalUsableArea}
                    inputName="useful_area_total"
                    type="number"
                    value={currentProperty.useful_area_total?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "useful_area_total", value: Number(value) }));
                    }}
                    placeholder="Total usable area..."
                    
                />
                <StyledInput
                    label={languageData?.PropertyFields?.MainLivingArea}
                    inputName="useful_area"
                    type="number"
                    value={currentProperty?.useful_area?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "useful_area", value: Number(value) }));
                    }}
                    placeholder="Main living area..."
                    
                />

                <StyledInput
                    label={languageData?.PropertyFields?.NumberOfRooms}
                    inputName="num_rooms"
                    type="number"
                    value={currentProperty.num_rooms?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "num_rooms", value: Number(value) }));
                    }}
                    placeholder="Number of rooms..."
                    
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label={languageData?.PropertyFields?.BuiltArea}
                    inputName="builtArea"
                    type="number"
                    value={currentProperty.builtArea?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "builtArea", value: Number(value) }));
                    }}
                    placeholder="Built area..."
                    
                />
                <StyledInput
                    label={languageData?.PropertyFields?.LandArea}
                    inputName="landArea"
                    type="number"
                    value={currentProperty.landArea?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "landArea", value: Number(value) }));
                    }}
                    placeholder="Land area..."
                    
                />
                <StyledInput
                    label={languageData?.PropertyFields?.NumberOfGarages}
                    inputName="num_garages"
                    type="number"
                    value={currentProperty.num_garages?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "num_garages", value: Number(value) }));
                    }}
                    placeholder="Number of garages..."
                    
                />
                <StyledInput
                    label="Street Frontage (m)"
                    inputName="street_frontage"
                    type="number"
                    value={currentProperty.street_frontage?.toString() || ""}
                    onChange={(value) => {
                        dispatch(updateProperty({ type: "street_frontage", value: Number(value) }));
                    }}
                    placeholder="Street Frontage..."
                    
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
                    {languageData?.Back}
                </StyledButton>
                <StyledButton variant="contained" onClick={handleSubmit} endIcon={<FiDollarSign />} disabled={validationErrors.length > 0}>
                    {languageData?.GetPricePrediction}
                </StyledButton>
            </div>
        </FormSection>
    );

    const dummySimilarListings = [
        {
            id: 1,
            external_id: "CJ-APT-001",
            classification: "apartment",
            land_classification: null,
            useful_area_total: 85,
            useful_area: 75,
            num_kitchens: 1,
            has_parking_space: true,
            floor: 3,
            yard_area: 0,
            location_raw: "Cluj-Napoca, Zorilor",
            city: "Cluj-Napoca",
            address: "Str. Observatorului 34",
            num_rooms: 3,
            price: 155000,
            url: "https://example.com/property1",
            has_garage: true,
            condominium: "modern",
            has_balconies: true,
            has_terrace: false,
            comfort: "lux",
            structure: "brick",
            property_type: "residential",
            built_year: 2020,
            for_sale: true,
            lat: 46.7579,
            lng: 23.5819,
            imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format",
        },
        {
            id: 2,
            external_id: "CJ-APT-002",
            classification: "apartment",
            land_classification: null,
            useful_area_total: 92,
            useful_area: 82,
            num_kitchens: 1,
            has_parking_space: true,
            floor: 4,
            yard_area: 0,
            location_raw: "Cluj-Napoca, Centru",
            city: "Cluj-Napoca",
            address: "Str. Horea 78",
            num_rooms: 3,
            price: 165000,
            url: "https://example.com/property2",
            has_garage: false,
            condominium: "residential",
            has_balconies: true,
            has_terrace: true,
            comfort: "lux",
            structure: "concrete",
            property_type: "residential",
            built_year: 2019,
            for_sale: true,
            lat: 46.7711,
            lng: 23.5874,
            imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format",
        },
        {
            id: 3,
            external_id: "CJ-HSE-001",
            classification: "house",
            land_classification: "intravilan",
            useful_area_total: 180,
            useful_area: 150,
            num_kitchens: 1,
            has_parking_space: true,
            floor: 2,
            yard_area: 300,
            location_raw: "Cluj-Napoca, Andrei Mureșanu",
            city: "Cluj-Napoca",
            address: "Str. Republicii 45",
            num_rooms: 5,
            price: 285000,
            url: "https://example.com/property3",
            has_garage: true,
            condominium: null,
            has_balconies: false,
            has_terrace: true,
            comfort: "premium",
            structure: "brick",
            property_type: "individual",
            built_year: 2018,
            for_sale: true,
            lat: 46.7645,
            lng: 23.5882,
            imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format",
        },
        {
            id: 4,
            external_id: "CJ-APT-003",
            classification: "apartment",
            land_classification: null,
            useful_area_total: 75,
            useful_area: 65,
            num_kitchens: 1,
            has_parking_space: true,
            floor: 1,
            yard_area: 0,
            location_raw: "Cluj-Napoca, Gheorgheni",
            city: "Cluj-Napoca",
            address: "Str. Albac 23",
            num_rooms: 2,
            price: 125000,
            url: "https://example.com/property4",
            has_garage: false,
            condominium: "modern",
            has_balconies: true,
            has_terrace: false,
            comfort: "high",
            structure: "concrete",
            property_type: "residential",
            built_year: 2021,
            for_sale: true,
            lat: 46.7558,
            lng: 23.6002,
            imageUrl: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=500&auto=format",
        },
        {
            id: 5,
            external_id: "CJ-APT-004",
            classification: "apartment",
            land_classification: null,
            useful_area_total: 95,
            useful_area: 85,
            num_kitchens: 1,
            has_parking_space: true,
            floor: 6,
            yard_area: 0,
            location_raw: "Cluj-Napoca, Mărăști",
            city: "Cluj-Napoca",
            address: "Str. Aurel Vlaicu 4",
            num_rooms: 4,
            price: 175000,
            url: "https://example.com/property5",
            has_garage: true,
            condominium: "premium",
            has_balconies: true,
            has_terrace: true,
            comfort: "lux",
            structure: "concrete",
            property_type: "residential",
            built_year: 2022,
            for_sale: true,
            lat: 46.7689,
            lng: 23.6089,
            imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format",
        },
    ];

    const renderResults = () => {
        if (!currentPrediction) return null;

        return (
            <PredictionResults>
                <h2>{languageData?.PredictionResults?.title}</h2>

                <ResultCard>
                    <div className="prediction-header">
                        <h3>{languageData?.PredictionResults?.estimatedValue}</h3>
                        {/* <div className="confidence">Confidence: {(currentPrediction.confidence * 100).toFixed(0)}%</div> */}
                    </div>

                    <div className="predicted-price">{currentPrediction?.predicted_price ? formatCurrency(currentPrediction?.predicted_price) : 0}</div>

                    {/* <PriceRange>
                        <div className="range-label">Price Range:</div>
                        <div className="range-bar">
                            <div className="range-min">{currentPrediction?.priceRange?.min ? formatCurrency(currentPrediction?.priceRange?.min) : ""}</div>
                            <div className="range-max">{currentPrediction?.priceRange?.max ? formatCurrency(currentPrediction?.priceRange?.max) : ""}</div>
                        </div>
                    </PriceRange> */}

                    <SimilarProperties>
                        <h4>{languageData?.PredictionResults?.similarProperties}</h4>
                        <div className="similar-properties-grid">
                            {dummySimilarListings.map((property) => (
                                <PropertyCard key={property.id}>
                                    <div className="property-image">
                                        <img src={property.imageUrl} alt={property.address} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                    </div>
                                    <div className="property-details">
                                        <div className="property-address">{property.address}</div>
                                        <div className="property-specs">
                                            <span>
                                                {property.num_rooms} {languageData?.PredictionResults?.propertySpecs.rooms}
                                            </span>{" "}
                                            •
                                            <span>
                                                {property.useful_area_total} {languageData?.PredictionResults?.propertySpecs.area}
                                            </span>{" "}
                                            •<span>{property.comfort}</span>
                                        </div>
                                        <div className="property-price">{formatCurrency(property.price)}</div>
                                        <div className="property-features">
                                            {property?.has_garage && <span>Garage</span>}
                                            {property?.has_balconies && <span>Balcony</span>}
                                            {property?.has_terrace && <span>Terrace</span>}
                                            {property?.has_parking_space && <span>Parking</span>}
                                        </div>
                                    </div>
                                </PropertyCard>
                            ))}
                        </div>
                    </SimilarProperties>

                    <div className="result-actions">
                        <StyledButton variant="outlined" onClick={handleSubmit} startIcon={<FiRefreshCw />}>
                            {languageData?.TryAgain}
                        </StyledButton>
                        <StyledButton variant="outlined" onClick={handleReset} startIcon={<FiRefreshCw />}>
                            {languageData?.NewPrediction}
                        </StyledButton>
                    </div>
                </ResultCard>
            </PredictionResults>
        );
    };

    return (
        <PredictionContainer>
            <PredictionLoadingOverlay active={showLoadingOverlay} />
            <h1>{languageData?.RealEstatePricePrediction}</h1>
            <MapLibre listings={dummySimilarListings} />

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
