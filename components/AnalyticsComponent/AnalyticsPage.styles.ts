import { styled, Box, Typography, Paper } from "@mui/material";

export const AnalyticsContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 1400,
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
    },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.75rem",
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
}));

export const StatsGrid = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
    },
}));

export const StatCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2.5),
    borderRadius: 12,
    textAlign: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: theme.shadows[4],
    },
}));

export const StatValue = styled(Typography)(({ theme }) => ({
    fontSize: "1.75rem",
    fontWeight: 700,
    color: theme.palette.primary.main,
    lineHeight: 1.2,
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
    fontSize: "0.85rem",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    color: theme.palette.text.primary,
}));

export const CityStatsGrid = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
    },
}));

export const CityCard = styled(Paper)<{ selected?: boolean }>(({ theme, selected }) => ({
    padding: theme.spacing(2),
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.2s",
    border: selected ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: theme.shadows[4],
        borderColor: theme.palette.primary.light,
    },
}));

export const CityName = styled(Typography)(({ theme }) => ({
    fontSize: "1.1rem",
    fontWeight: 600,
    color: theme.palette.text.primary,
}));

export const CityDetail = styled(Typography)(({ theme }) => ({
    fontSize: "0.85rem",
    color: theme.palette.text.secondary,
    marginTop: 2,
}));

export const PriceTag = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
}));

export const DistributionContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 12,
    marginBottom: theme.spacing(3),
}));

export const DistributionBar = styled(Box)<{ percentage: number; colorIndex: number }>(
    ({ theme, percentage, colorIndex }) => {
        const colors = [
            theme.palette.success.main,
            theme.palette.info.main,
            theme.palette.primary.main,
            theme.palette.warning.main,
            theme.palette.error.main,
        ];
        return {
            height: 32,
            borderRadius: 6,
            backgroundColor: colors[colorIndex % colors.length],
            width: `${Math.max(percentage, 2)}%`,
            transition: "width 0.8s ease-out",
            display: "flex",
            alignItems: "center",
            paddingLeft: theme.spacing(1),
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 600,
            minWidth: percentage > 5 ? "auto" : 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
        };
    }
);

export const DistributionRow = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
}));

export const DistributionLabel = styled(Typography)(({ theme }) => ({
    fontSize: "0.85rem",
    color: theme.palette.text.secondary,
    minWidth: 180,
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
        minWidth: 120,
        fontSize: "0.75rem",
    },
}));

export const ModelStatsContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 12,
    marginBottom: theme.spacing(3),
}));

export const ModelCard = styled(Box)<{ isBest?: boolean }>(({ theme, isBest }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 2),
    borderRadius: 8,
    marginBottom: theme.spacing(1),
    backgroundColor: isBest ? `${theme.palette.primary.main}15` : theme.palette.action.hover,
    border: isBest ? `1px solid ${theme.palette.primary.main}` : "1px solid transparent",
}));

export const ModelName = styled(Typography)<{ isBest?: boolean }>(({ theme, isBest }) => ({
    fontWeight: isBest ? 700 : 500,
    color: isBest ? theme.palette.primary.main : theme.palette.text.primary,
}));

export const MetricBadge = styled(Box)(({ theme }) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: theme.spacing(0.25, 1),
    borderRadius: 16,
    backgroundColor: theme.palette.action.selected,
    fontSize: "0.8rem",
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

export const EmptyState = styled(Box)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(6),
    color: theme.palette.text.secondary,
}));
