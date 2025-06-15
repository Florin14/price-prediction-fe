import type React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { HomeContainer, HeroSection, FeaturesSection, FeatureCard, HowItWorksSection, Step, TestimonialsSection, TestimonialCard } from "./HomePage.styles";
import { FiBarChart2, FiZap, FiSmartphone, FiSearch, FiArrowRight } from "react-icons/fi";

import StyledButton from "../components/generic-components/StyledButton";
import type { RootState } from "../store";

const HomePage: React.FC = () => {
    const router = useRouter();
    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <HomeContainer>
            <HeroSection>
                <div className="hero-content">
                    <h1>{languageData?.HomePageTitle}</h1>
                    <p>{languageData?.HomePageDescription}</p>
                    <div className="hero-buttons">
                        <StyledButton variant="contained" size="large" onClick={() => router.push("/guest/prediction")} endIcon={<FiArrowRight />}>
                            {languageData?.TryItNow}
                        </StyledButton>
                        <StyledButton variant="outlined" size="large" onClick={() => router.push("/guest/how-it-works")}>
                            {languageData?.LearnMore}
                        </StyledButton>
                    </div>
                </div>
                <div className="hero-image">
                    <img className="image-placeholder" alt="welcome page" src="/images/welcome_page.png" />
                </div>
            </HeroSection>

            <FeaturesSection>
                <h2 className="features-grid">{languageData?.WhyChooseTitle}</h2>
                <div className="features-grid">
                    <FeatureCard>
                        <div className="feature-icon">
                            <FiBarChart2 />
                        </div>
                        <h3>{languageData?.Features?.AccuratePredictions.title}</h3>
                        <p>{languageData?.Features?.AccuratePredictions.description}</p>
                    </FeatureCard>
                    <FeatureCard>
                        <div className="feature-icon">
                            <FiZap />
                        </div>
                        <h3>{languageData?.Features?.RealTimeAnalysis.title}</h3>
                        <p>{languageData?.Features?.RealTimeAnalysis.description}</p>
                    </FeatureCard>
                    <FeatureCard>
                        <div className="feature-icon">
                            <FiSmartphone />
                        </div>
                        <h3>{languageData?.Features?.UserFriendly.title}</h3>
                        <p>{languageData?.Features?.UserFriendly.description}</p>
                    </FeatureCard>
                    <FeatureCard>
                        <div className="feature-icon">
                            <FiSearch />
                        </div>
                        <h3>{languageData?.Features?.DetailedInsights.title}</h3>
                        <p>{languageData?.Features?.DetailedInsights.description}</p>
                    </FeatureCard>
                </div>
            </FeaturesSection>

            <HowItWorksSection>
                <h2>{languageData?.HowItWorksTitle}</h2>
                <div className="steps">
                    <Step>
                        <div className="step-number">1</div>
                        <h3>{languageData?.HowItWorksSteps?.Step1.title}</h3>
                        <p>{languageData?.HowItWorksSteps?.Step1.description}</p>
                    </Step>
                    <Step>
                        <div className="step-number">2</div>
                        <h3>{languageData?.HowItWorksSteps?.Step2.title}</h3>
                        <p>{languageData?.HowItWorksSteps?.Step2.description}</p>
                    </Step>
                    <Step>
                        <div className="step-number">3</div>
                        <h3>{languageData?.HowItWorksSteps?.Step3.title}</h3>
                        <p>{languageData?.HowItWorksSteps?.Step3.description}</p>
                    </Step>
                </div>
            </HowItWorksSection>

            <TestimonialsSection>
                <h2>{languageData?.TestimonialsTitle}</h2>
                <div className="testimonials-grid">
                    <TestimonialCard>
                        <p>{languageData?.Testimonials?.Testimonial1.quote}</p>
                        <div className="testimonial-author">
                            <strong>{languageData?.Testimonials?.Testimonial1.author}</strong>
                            <span>{languageData?.Testimonials?.Testimonial1.role}</span>
                        </div>
                    </TestimonialCard>
                    <TestimonialCard>
                        <p>{languageData?.Testimonials?.Testimonial2.quote}</p>
                        <div className="testimonial-author">
                            <strong>{languageData?.Testimonials?.Testimonial2.author}</strong>
                            <span>{languageData?.Testimonials?.Testimonial2.role}</span>
                        </div>
                    </TestimonialCard>
                    <TestimonialCard>
                        <p>{languageData?.Testimonials?.Testimonial3.quote}</p>
                        <div className="testimonial-author">
                            <strong>{languageData?.Testimonials?.Testimonial3.author}</strong>
                            <span>{languageData?.Testimonials?.Testimonial3.role}</span>
                        </div>
                    </TestimonialCard>
                </div>
            </TestimonialsSection>

            <div className="cta-section">
                <h2>{languageData?.ReadyToStart}</h2>
                <p>{languageData?.TryTodayMessage}</p>
                <StyledButton className="cta-button" size="large" onClick={() => router.push("/guest/prediction")} endIcon={<FiArrowRight />}>
                    {languageData?.MakePrediction}
                </StyledButton>
            </div>
        </HomeContainer>
    );
};

export default HomePage;
