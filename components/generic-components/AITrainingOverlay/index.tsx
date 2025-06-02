import React from "react";
import styled, { keyframes } from "styled-components";

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

const OverlayContainer = styled.div<{ active: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: ${(props) => (props.active ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    z-index: 9999;
    color: white;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    width: 90%;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #4caf50;
    text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
`;

const NetworkVisualization = styled.div`
    position: relative;
    width: 600px;
    height: 300px;
    margin: 2rem 0;
    svg {
        width: 100%;
        height: 100%;
        .neural-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: ${neuralPathAnimation} 3s linear infinite;
        }
    }
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 2rem 0;
    width: 100%;
`;

const StatCard = styled.div`
    background: rgba(76, 175, 80, 0.1);
    border: 1px solid rgba(76, 175, 80, 0.3);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    animation: ${pulseAnimation} 2s ease-in-out infinite;

    h3 {
        font-size: 1.2rem;
        color: #4caf50;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 1.5rem;
        margin: 0;
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    overflow: hidden;
    margin: 2rem 0;

    div {
        height: 100%;
        background: linear-gradient(90deg, #4caf50, #81c784);
        animation: ${progressAnimation} 3s ease-in-out infinite;
        border-radius: 5px;
    }
`;

const StatusMessage = styled.div`
    font-size: 1.2rem;
    text-align: center;
    color: #81c784;
    margin: 1rem 0;
    animation: ${floatAnimation} 2s ease-in-out infinite;
`;

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

const AITrainingOverlay: React.FC<AITrainingOverlayProps> = ({ active, stats }) => {
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
                    <div style={{ width: `${(stats.epochsCompleted / stats.totalEpochs) * 100}%` }} />
                </ProgressBar>

                <StatusMessage>
                    Training Progress: {stats.epochsCompleted} / {stats.totalEpochs} Epochs
                </StatusMessage>

                <StatsContainer>
                    <StatCard>
                        <h3>Accuracy</h3>
                        <p>{(stats.accuracy * 100).toFixed(2)}%</p>
                    </StatCard>
                    <StatCard>
                        <h3>Loss</h3>
                        <p>{stats.loss.toFixed(4)}</p>
                    </StatCard>
                    <StatCard>
                        <h3>Learning Rate</h3>
                        <p>{stats.learningRate.toExponential(2)}</p>
                    </StatCard>
                    <StatCard>
                        <h3>Time Elapsed</h3>
                        <p>{stats.timeElapsed}</p>
                    </StatCard>
                    <StatCard>
                        <h3>Est. Time Remaining</h3>
                        <p>{stats.estimatedTimeRemaining}</p>
                    </StatCard>
                    <StatCard>
                        <h3>Samples Processed</h3>
                        <p>{stats.samplesProcessed.toLocaleString()}</p>
                    </StatCard>
                </StatsContainer>
            </ContentContainer>
        </OverlayContainer>
    );
};

export default AITrainingOverlay;
