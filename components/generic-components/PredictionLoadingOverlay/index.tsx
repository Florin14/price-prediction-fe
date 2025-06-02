import React from "react";
import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50, 0 0 15px #4CAF50; }
  50% { box-shadow: 0 0 20px #4CAF50, 0 0 35px #4CAF50, 0 0 50px #4CAF50; }
  100% { box-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50, 0 0 15px #4CAF50; }
`;

const particlesAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const OverlayContainer = styled.div<{ active: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    display: ${(props) => (props.active ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const LoadingContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const HouseIcon = styled.div`
    font-size: 60px;
    color: #4caf50;
    animation:
        ${floatAnimation} 3s ease-in-out infinite,
        ${glowAnimation} 2s ease-in-out infinite;
    margin-bottom: 20px;
`;

const ParticlesContainer = styled.div`
    position: absolute;
    width: 200px;
    height: 200px;
    animation: ${particlesAnimation} 20s linear infinite;
`;

const Particle = styled.div<{ delay: number; distance: number }>`
    position: absolute;
    width: 8px;
    height: 8px;
    background: #4caf50;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    animation: ${pulseAnimation} 2s ease-in-out infinite;
    animation-delay: ${(props) => props.delay}s;
    transform: rotate(${(props) => props.distance}deg) translateX(${(props) => props.distance}px);
`;

const Message = styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin-top: 20px;
    opacity: 0.9;
    text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
`;

const SubMessage = styled.div`
    color: #4caf50;
    font-size: 16px;
    margin-top: 10px;
    opacity: 0.8;
`;

interface PredictionLoadingOverlayProps {
    active: boolean;
}

const PredictionLoadingOverlay: React.FC<PredictionLoadingOverlayProps> = ({ active }) => {
    const particles = Array.from({ length: 12 }, (_, i) => <Particle key={i} delay={i * 0.2} distance={(i + 1) * 30} />);

    const messages = ["Analyzing market trends...", "Processing property features...", "Calculating precise estimates...", "Generating AI predictions..."];

    const [messageIndex, setMessageIndex] = React.useState(0);

    React.useEffect(() => {
        if (active) {
            const interval = setInterval(() => {
                setMessageIndex((prev) => (prev + 1) % messages.length);
            }, 800);

            return () => clearInterval(interval);
        }
    }, [active]);

    return (
        <OverlayContainer active={active}>
            <LoadingContent>
                <ParticlesContainer>{particles}</ParticlesContainer>
                <HouseIcon>🏠</HouseIcon>
                <Message>AI Price Prediction</Message>
                <SubMessage>{messages[messageIndex]}</SubMessage>
            </LoadingContent>
        </OverlayContainer>
    );
};

export default PredictionLoadingOverlay;
