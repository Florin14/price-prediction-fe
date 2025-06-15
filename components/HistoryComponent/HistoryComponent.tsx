import type React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import { getPriceHistories } from "../../store/slices/price-history/thunks";
import type { AppDispatch, RootState } from "../../store";

import StyledButton from "../generic-components/StyledButton";

import { HistoryContainer, HistoryHeader, PredictionHistoryList, PredictionHistoryItem, EmptyState } from "./HistoryPage.styles";

const HistoryComponent: React.FC = () => {
    const histories = useSelector((state: RootState) => state.priceHistory.histories);
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const [cookies] = useCookies(["id"]);
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const isAuthenticated = !!cookies.id;

    const handleLogin = () => {
        router.push("/login");
    };

    const handleSignup = () => {
        router.push("/register");
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getPriceHistories({ id: cookies["id"] }) as any);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <HistoryContainer>
                <HistoryHeader>
                    <h1>{languageData?.PredictionHistory?.title}</h1>
                    <p>Please log in or sign up to view your prediction history</p>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                        <StyledButton onClick={handleLogin}>Login</StyledButton>
                        <StyledButton onClick={handleSignup}>Sign Up</StyledButton>
                    </div>
                </HistoryHeader>
            </HistoryContainer>
        );
    }

    return (
        <HistoryContainer>
            <HistoryHeader>
                <h1>{languageData?.PredictionHistory?.title}</h1>
                <p>{languageData?.PredictionHistory?.description}</p>
            </HistoryHeader>

            {histories?.length === 0 ? (
                <EmptyState>
                    <div className="empty-icon">📊</div>
                    <h3>{languageData?.PredictionHistory?.emptyState.title}</h3>
                    <p>{languageData?.PredictionHistory?.emptyState.message}</p>
                </EmptyState>
            ) : (
                <PredictionHistoryList>
                    {histories?.map((history, index) => (
                        <PredictionHistoryItem key={index}>
                            <div className="property-image">
                                <img
                                    src="/images/property_placeholder.png"
                                    alt={history?.location_raw}
                                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="property-details">
                                <div className="property-base-address">
                                    {languageData?.BaseAddress}: {history?.location_raw}
                                </div>

                                <div className="property-address">{history?.location_raw}</div>
                                <div className="property-specs">
                                    <span>
                                        {history?.num_rooms} {languageData?.PredictionResults?.propertySpecs.rooms}
                                    </span>
                                    •
                                    <span>
                                        {history?.useful_area} {languageData?.PredictionResults?.propertySpecs.area}
                                    </span>
                                </div>
                                {/* <div className="property-price">{formatCurrency(history.total_price)}</div> */}
                                <div className="property-features">
                                    <span>{languageData?.PricePerMeter}: {history.price_per_sqm.toFixed(2)} €</span>
                                </div>
                                <div className="property-features">
                                    <span>{languageData?.TotalPrice}: {history.total_price.toFixed(2)} €</span>
                                </div>
                            </div>
                        </PredictionHistoryItem>
                    ))}
                </PredictionHistoryList>
            )}
        </HistoryContainer>
    );
};

export default HistoryComponent;
