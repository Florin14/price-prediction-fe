import { styled } from "@mui/material/styles";

export const HomeContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(8), // xxl
    ".cta-section": {
        textAlign: "center",
        padding: `${theme.spacing(8)} 0`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        marginTop: theme.spacing(6), // xl
        h2: {
            marginBottom: theme.spacing(4), // md
        },
        p: {
            marginBottom: theme.spacing(5), // lg
            color: theme.palette.text.secondary,
        },
    },
}));

export const HeroSection = styled("section")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(8),
    padding: `${theme.spacing(8)} 0`,
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        textAlign: "center",
    },
    ".hero-content": {
        flex: 1,
        h1: {
            fontSize: "2.5rem",
            marginBottom: theme.spacing(5),
            color: theme.palette.text.primary,
            animation: "fadeIn 0.8s ease-out",
            lineHeight: "35px",
        },
        p: {
            fontSize: theme.typography.body1.fontSize,
            marginBottom: theme.spacing(6),
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            animation: "fadeIn 0.8s ease-out 0.2s both",
        },
        ".hero-buttons": {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: theme.spacing(4),
            animation: "fadeIn 0.8s ease-out 0.4s both",
            [theme.breakpoints.down("md")]: {
                justifyContent: "center",
            },
        },
    },
    ".hero-image": {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        animation: "fadeIn 0.8s ease-out 0.6s both",
        ".image-placeholder": {
            width: "100%",
            height: 400,
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "5rem",
            boxShadow: theme.shadows[8],
            transition: "transform 0.3s ease",
            "&:hover": {
                transform: "translateY(-5px)",
            },
        },
    },
}));

export const FeaturesSection = styled("section")(({ theme }) => ({
    textAlign: "center",
    h2: {
        marginBottom: theme.spacing(6),
        fontSize: "2rem",
    },
    ".features-grid": {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: theme.spacing(5),
    },
}));

export const FeatureCard = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(6),
    boxShadow: theme.shadows[4],
    transition: `transform ${theme.transitions.duration.short}ms, box-shadow ${theme.transitions.duration.short}ms`,
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[8],
    },
    ".feature-icon": {
        fontSize: "2.5rem",
        marginBottom: theme.spacing(4),
        color: theme.palette.primary.main,
        svg: {
            width: 50,
            height: 50,
        },
    },
    h3: {
        marginBottom: theme.spacing(4),
        color: theme.palette.text.primary,
    },
    p: {
        color: theme.palette.text.secondary,
        lineHeight: 1.6,
    },
}));

export const HowItWorksSection = styled("section")(({ theme }) => ({
    textAlign: "center",
    h2: {
        marginBottom: theme.spacing(6),
        fontSize: "2rem",
    },
    ".steps": {
        display: "flex",
        justifyContent: "space-between",
        gap: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
}));

export const Step = styled("div")(({ theme }) => ({
    flex: 1,
    position: "relative",
    padding: theme.spacing(6),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    ".step-number": {
        width: 40,
        height: 40,
        backgroundColor: theme.palette.primary.main,
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: theme.typography.fontWeightBold,
        margin: `0 auto ${theme.spacing(4)}px`,
    },
    h3: {
        marginBottom: theme.spacing(4),
        color: theme.palette.text.primary,
    },
    p: {
        color: theme.palette.text.secondary,
        lineHeight: 1.6,
    },
}));

export const TestimonialsSection = styled("section")(({ theme }) => ({
    textAlign: "center",
    h2: {
        marginBottom: theme.spacing(6),
        fontSize: "2rem",
    },
    ".testimonials-grid": {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: theme.spacing(5),
    },
}));

export const TestimonialCard = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(6),
    boxShadow: theme.shadows[4],
    textAlign: "left",
    p: {
        fontStyle: "italic",
        marginBottom: theme.spacing(5),
        color: theme.palette.text.primary,
        lineHeight: 1.6,
    },
    ".testimonial-author": {
        display: "flex",
        flexDirection: "column",
        strong: {
            color: theme.palette.text.primary,
        },
        span: {
            color: theme.palette.text.secondary,
            fontSize: theme.typography.body2.fontSize,
        },
    },
}));
