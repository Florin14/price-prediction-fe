"use client";

import type React from "react";
// import StyledButton from "../../components/common/StyledButton/StyledButton"
import { HomeContainer, HeroSection, FeaturesSection, FeatureCard, HowItWorksSection, Step, TestimonialsSection, TestimonialCard } from "./HomePage.styles";
import { FiBarChart2, FiZap, FiSmartphone, FiSearch, FiArrowRight } from "react-icons/fi";
import StyledButton from "../../../components/generic-components/StyledButton";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
    const router = useRouter();

    return (
        <HomeContainer>
            <HeroSection>
                <div className="hero-content">
                    <h1>Predict Real Estate Prices with AI</h1>
                    <p>
                        Get accurate property price predictions powered by advanced machine learning algorithms. Make informed decisions for buying, selling, or
                        investing in real estate.
                    </p>
                    <div className="hero-buttons">
                        <StyledButton variant="contained" size="large" onClick={() => router.push("/guest/prediction")} endIcon={<FiArrowRight />}>
                            Try It Now
                        </StyledButton>
                        <StyledButton variant="outlined" size="large" onClick={() => router.push("/guest/how-it-works")}>
                            Learn More
                        </StyledButton>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="image-placeholder">🏘️</div>
                </div>
            </HeroSection>

            <FeaturesSection>
                <h2>Why Choose Our AI Prediction Tool?</h2>
                <div className="features-grid">
                    <FeatureCard>
                        <div className="feature-icon">
                            <FiBarChart2 />
                        </div>
                        <h3>Accurate Predictions</h3>
                        <p>Our AI model is trained on millions of real estate transactions to provide highly accurate price predictions.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <div className="feature-icon">
                            <FiZap />
                        </div>
                        <h3>Real-Time Analysis</h3>
                        <p>Get instant property valuations with our fast and responsive prediction engine.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <div className="feature-icon">
                            <FiSmartphone />
                        </div>
                        <h3>User-Friendly Interface</h3>
                        <p>Our intuitive design makes it easy to input property details and understand results.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <div className="feature-icon">
                            <FiSearch />
                        </div>
                        <h3>Detailed Insights</h3>
                        <p>Receive comprehensive analysis including price ranges, confidence scores, and comparable properties.</p>
                    </FeatureCard>
                </div>
            </FeaturesSection>

            <HowItWorksSection>
                <h2>How It Works</h2>
                <div className="steps">
                    <Step>
                        <div className="step-number">1</div>
                        <h3>Enter Property Details</h3>
                        <p>Provide information about the property including location, size, features, and condition.</p>
                    </Step>
                    <Step>
                        <div className="step-number">2</div>
                        <h3>AI Analysis</h3>
                        <p>Our advanced algorithm analyzes the data and compares it with similar properties in the area.</p>
                    </Step>
                    <Step>
                        <div className="step-number">3</div>
                        <h3>Get Your Prediction</h3>
                        <p>Receive a detailed price prediction with confidence intervals and supporting data.</p>
                    </Step>
                </div>
            </HowItWorksSection>

            <TestimonialsSection>
                <h2>What Our Users Say</h2>
                <div className="testimonials-grid">
                    <TestimonialCard>
                        <p>"This tool helped me price my home correctly and sell it within a week. The prediction was spot on!"</p>
                        <div className="testimonial-author">
                            <strong>Sarah Johnson</strong>
                            <span>Home Seller</span>
                        </div>
                    </TestimonialCard>
                    <TestimonialCard>
                        <p>
                            "As a real estate investor, I rely on accurate valuations. This AI tool has become an essential part of my decision-making process."
                        </p>
                        <div className="testimonial-author">
                            <strong>Michael Chen</strong>
                            <span>Real Estate Investor</span>
                        </div>
                    </TestimonialCard>
                    <TestimonialCard>
                        <p>"The detailed analysis helped me negotiate a better price for my dream home. Saved me thousands!"</p>
                        <div className="testimonial-author">
                            <strong>Emily Rodriguez</strong>
                            <span>Home Buyer</span>
                        </div>
                    </TestimonialCard>
                </div>
            </TestimonialsSection>

            <div className="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Try our AI-powered real estate price prediction tool today.</p>
                <StyledButton size="large" onClick={() => router.push("/guest/prediction")} endIcon={<FiArrowRight />}>
                    Make a Prediction
                </StyledButton>
            </div>
        </HomeContainer>
    );
};

export default HomePage;
