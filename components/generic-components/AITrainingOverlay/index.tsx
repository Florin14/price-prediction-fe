import React from "react";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";

const neuralPathAnimation = keyframes`
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const progressAnimation = keyframes`
  from { width: 0%; }
  to { width: 100%; }
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
    background: "rgba(0, 0, 0, 0.9)",
    backdropFilter: "blur(8px)",
    display: active ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: theme.zIndex.modal + 1,
    color: theme.palette.common.white,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 800,
    width: "90%",
}));

const Title = styled(Box)(({ theme }) => ({
    fontSize: "2.5rem",
    marginBottom: theme.spacing(4),
    color: theme.palette.success.main,
    textShadow: "0 0 10px rgba(76, 175, 80, 0.5)",
}));

const NetworkVisualization = styled(Box)(({ theme }) => ({
    position: "relative",
    width: 600,
    height: 300,
    margin: theme.spacing(4, 0),
    "& svg": {
        width: "100%",
        height: "100%",
    },
    "& .neural-path": {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        animation: `${neuralPathAnimation} 3s linear infinite`,
    },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(4),
    margin: theme.spacing(4, 0),
    width: "100%",
}));

const StatCard = styled(Box)(({ theme }) => ({
    background: theme.palette.success.light,
    border: `1px solid ${theme.palette.success.main}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    textAlign: "center",
    animation: `${pulseAnimation} 2s ease-in-out infinite`,
    "& h3": {
        fontSize: "1.2rem",
        color: theme.palette.success.main,
        marginBottom: theme.spacing(1),
    },
    "& p": {
        fontSize: "1.5rem",
        margin: 0,
    },
}));

const ProgressBar = styled(Box)(({ theme }) => ({
    width: "100%",
    height: 10,
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    margin: theme.spacing(4, 0),
    "& > div": {
        height: "100%",
        background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
        animation: `${progressAnimation} 3s ease-in-out infinite`,
        borderRadius: theme.shape.borderRadius,
    },
}));

const StatusMessage = styled(Box)(({ theme }) => ({
    fontSize: "1.2rem",
    textAlign: "center",
    color: theme.palette.success.light,
    margin: theme.spacing(2, 0),
    animation: `${floatAnimation} 2s ease-in-out infinite`,
}));

interface AITrainingOverlayProps {
    active: boolean;
    stats: {
        epochsCompleted: number;
        totalEpochs: number;
        accuracy: number;
        loss: number;
        timeElapsed: string;
        estimatedTimeRemaining: string;
        samplesProcessed: number;
        learningRate: number;
    };
}

const AITrainingOverlay: React.FC<AITrainingOverlayProps> = ({ active = false, stats }) => {
    return (
        <OverlayContainer active={active}>
            <ContentContainer>
                <Title>AI Model Training in Progress</Title>

                <NetworkVisualization>
                    <svg viewBox="0 0 600 300">
                        {/* Animated neural network paths */}
                        <path className="neural-path" d="M50,150 C200,50 400,250 550,150" fill="none" stroke="#4CAF50" strokeWidth="2" />
                        <path className="neural-path" d="M50,150 C200,250 400,50 550,150" fill="none" stroke="#81C784" strokeWidth="2" />
                    </svg>
                </NetworkVisualization>

                <ProgressBar>
                    <Box
                        component="div"
                        sx={{
                            width: `${(stats.epochsCompleted / stats.totalEpochs) * 100}%`,
                        }}
                    />
                </ProgressBar>

                <StatusMessage>
                    Training Progress: {stats.epochsCompleted} / {stats.totalEpochs} Epochs
                </StatusMessage>

                <StatsContainer>
                    <StatCard>
                        <Box component="h3">Accuracy</Box>
                        <Box component="p">{(stats.accuracy * 100).toFixed(2)}%</Box>
                    </StatCard>
                    <StatCard>
                        <Box component="h3">Loss</Box>
                        <Box component="p">{stats.loss.toFixed(4)}</Box>
                    </StatCard>
                    <StatCard>
                        <Box component="h3">Learning Rate</Box>
                        <Box component="p">{stats.learningRate.toExponential(2)}</Box>
                    </StatCard>
                    <StatCard>
                        <Box component="h3">Time Elapsed</Box>
                        <Box component="p">{stats.timeElapsed}</Box>
                    </StatCard>
                    <StatCard>
                        <Box component="h3">Est. Time Remaining</Box>
                        <Box component="p">{stats.estimatedTimeRemaining}</Box>
                    </StatCard>
                    <StatCard>
                        <Box component="h3">Samples Processed</Box>
                        <Box component="p">{stats.samplesProcessed.toLocaleString()}</Box>
                    </StatCard>
                </StatsContainer>
            </ContentContainer>
        </OverlayContainer>
    );
};

export default AITrainingOverlay;
