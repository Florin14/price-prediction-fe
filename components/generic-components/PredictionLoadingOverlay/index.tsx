import React from "react";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export const floatAnimation = keyframes`
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

interface OverlayContainerProps {
    active: boolean;
}

const OverlayContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active",
})<OverlayContainerProps>(({ active, theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(8px)",
    display: active ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: theme.zIndex.modal + 1,
}));

const LoadingContent = styled(Box)({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

const HouseIcon = styled(Box)(({ theme }) => ({
    fontSize: 60,
    color: theme.palette.success.main,
    animation: `${floatAnimation} 3s ease-in-out infinite, ${glowAnimation} 2s ease-in-out infinite`,
    marginBottom: theme.spacing(2.5),
}));

const ParticlesContainer = styled(Box)({
    position: "absolute",
    width: 200,
    height: 200,
    animation: `${particlesAnimation} 20s linear infinite`,
});

interface ParticleProps {
    delay: number;
    distance: number;
}

const Particle = styled(Box, {
    shouldForwardProp: (prop) => !["delay", "distance"].includes(prop as string),
})<ParticleProps>(({ delay, distance, theme }) => ({
    position: "absolute",
    width: 8,
    height: 8,
    background: theme.palette.success.main,
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transformOrigin: "0 0",
    animation: `${pulseAnimation} 2s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    transform: `rotate(${distance}deg) translateX(${distance}px)`,
}));

const Message = styled(Box)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: 24,
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2.5),
    opacity: 0.9,
    textShadow: `0 0 10px ${theme.palette.success.main}80`,
}));

const SubMessage = styled(Box)(({ theme }) => ({
    color: theme.palette.success.main,
    fontSize: 16,
    marginTop: theme.spacing(1.25),
    opacity: 0.8,
}));

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
