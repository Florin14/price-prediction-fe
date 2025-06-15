import type React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { HistoryContainer, HistoryHeader, PredictionHistoryList, PredictionHistoryItem, EmptyState } from "./HistoryPage.styles";

const HistoryPage: React.FC = () => {
    const { predictionHistory } = useSelector((state: RootState) => state.prediction);
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <HistoryContainer>
            <HistoryHeader>
                <h1>{languageData?.PredictionHistory?.title}</h1>
                <p>{languageData?.PredictionHistory?.description}</p>
            </HistoryHeader>

            {predictionHistory.length === 0 ? (
                <EmptyState>
                    <div className="empty-icon">📊</div>
                    <h3>{languageData?.PredictionHistory?.emptyState.title}</h3>
                    <p>{languageData?.PredictionHistory?.emptyState.message}</p>
                </EmptyState>
            ) : (
                <PredictionHistoryList>
                    {predictionHistory.map((prediction) => (
                        <PredictionHistoryItem key={prediction.id}>
                            <div className="prediction-date">{formatDate(prediction.createdAt)}</div>
                            <div className="prediction-price">{formatCurrency(prediction.predicted_price)}</div>
                            {/* <div className="prediction-confidence">Confidence: {(prediction.confidence * 100).toFixed(0)}%</div> */}
                            {/* <div className="prediction-range">
                Range: {formatCurrency(prediction.priceRange.min)} - {formatCurrency(prediction.priceRange.max)}
              </div> */}
                        </PredictionHistoryItem>
                    ))}
                </PredictionHistoryList>
            )}
        </HistoryContainer>
    );
};

export default HistoryPage;
