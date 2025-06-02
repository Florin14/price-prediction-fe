import React from "react";
import { FiMapPin, FiHome, FiDollarSign } from "react-icons/fi";
import { HowItWorksContainer, StepIndicator } from "./HowItWorks.styles";

const HowItWorksPage: React.FC = () => {
    const renderStepIndicator = () => (
        <StepIndicator>
            <div className="step active">
                <div className="step-icon">
                    <FiMapPin />
                </div>
                <div className="step-label">Location</div>
            </div>
            <div className="connector" />
            <div className="step active">
                <div className="step-icon">
                    <FiHome />
                </div>
                <div className="step-label">Property</div>
            </div>
            <div className="connector" />
            <div className="step active">
                <div className="step-icon">
                    <FiDollarSign />
                </div>
                <div className="step-label">Result</div>
            </div>
        </StepIndicator>
    );

    return (
        <HowItWorksContainer>
            <h1>How It Works</h1>

            {renderStepIndicator()}

            <section>
                <h3>Step 1: Location</h3>
                <p>
                    Enter your property’s street address, city, state, and ZIP code. Precise location data helps our model pull the most relevant comparable
                    sales from your area.
                </p>
            </section>

            <section>
                <h3>Step 2: Property Details</h3>
                <p>
                    Provide the key features of your home—property type, year built, square footage, lot size, and number of bedrooms and bathrooms. The richer
                    your inputs, the more accurate the estimated value.
                </p>
            </section>

            <section>
                <h3>Step 3: Result</h3>
                <p>Click “Get Price Prediction” to see:</p>
                <ul>
                    <li>Your home’s estimated market value</li>
                    <li>Model confidence score</li>
                    <li>Suggested price range</li>
                    <li>A gallery of similar properties nearby</li>
                </ul>
            </section>
        </HowItWorksContainer>
    );
};

export default HowItWorksPage;
