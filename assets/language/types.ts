export interface LanguageDataTypes {
    [key: string]: any;
    ProfilePage?: {
        title: string;
        personalInfo: string;
        preferences: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        darkMode: string;
        language: string;
        saveChanges: string;
    };
    Features?: {
        AccuratePredictions: {
            title: string;
            description: string;
        };
        RealTimeAnalysis: {
            title: string;
            description: string;
        };
        UserFriendly: {
            title: string;
            description: string;
        };
        DetailedInsights: {
            title: string;
            description: string;
        };
    };
    HowItWorksSteps?: {
        Step1: {
            title: string;
            description: string;
        };
        Step2: {
            title: string;
            description: string;
        };
        Step3: {
            title: string;
            description: string;
        };
    };
    Testimonials?: {
        Testimonial1: {
            quote: string;
            author: string;
            role: string;
        };
        Testimonial2: {
            quote: string;
            author: string;
            role: string;
        };
        Testimonial3: {
            quote: string;
            author: string;
            role: string;
        };
    };
    Steps?: {
        Location: string;
        Property: string;
        Result: string;
    };
    PropertyFields?: {
        StreetAddress: string;
        City: string;
        StreetFrontage: string;
        PropertyType: string;
        LandClassification: string;
        FloorNumber: string;
        ComfortLevel: string;
        TotalUsableArea: string;
        MainLivingArea: string;
        NumberOfRooms: string;
        BuiltArea: string;
        LandArea: string;
        NumberOfGarages: string;
    };
    PredictionResults?: {
        title: string;
        estimatedValue: string;
        similarProperties: string;
        propertySpecs: {
            rooms: string;
            area: string;
        };
    };
    PredictionHistory?: {
        title: string;
        description: string;
        emptyState: {
            title: string;
            message: string;
        };
    };
    StepGuide?: {
        Location: {
            title: string;
            hint: string;
        };
        PropertyDetails: {
            title: string;
            hint: string;
        };
    };
    ComfortLevels?: {
        Luxury: string;
        Premium: string;
        High: string;
        Medium: string;
        Basic: string;
    };
    PropertyTypes?: {
        Apartment: string;
        House: string;
    };

    // Existing Types
    WaitingValidationTitle: string;
    WaitingValidationMessage: string;
    AddComplaint: string;
    EditComplaint: string;
    DeleteComplaintTitle: string;
    DeleteComplaintMessage: string;
    AddComplaintMessage: string;
    EditComplaintMessage: string;
    ComplaintName: string;
    LocationName: string;
    Address: string;
    LPRCamera: string;
    KarcherDevice: string;
    Show: string;
    Search: string;
    AddLocation: string;
    DeleteLocationTitle: string;
    DeleteLocationMessage: string;
    ClearFilters: string;
    Cancel: string;
    Delete: string;
    Save: string;
    Email: string;
    EmailAddress: string;
    Password: string;
    ConfirmPassword: string;
    Edit: string;
    EmailInfo: string;
    Login: string;
    ToLogin: string;
    LoginAction: string;
    SignIn: string;
    CreateAccount: string;
    OrSplitter: string;
    ForgotPassword: string;
    WelcomeTitle: string;
    SendLinkToEmail: string;
    WelcomeDescription: string;
    ResetPassword: string;
    Reset: string;
    BackToAuthentication: string;
    InvalidEmail: string;
    InvalidPassword: string;
    SomethingWentWrong: string;
    ResetPasswordEmailSentConfirm: string;
    EmailConfirmationMessage: string;
    SuccessfulPasswordReset: string;
    InvalidResetCode: string;
    PasswordsDontMatch: string;
    MainRoute: string;
    Logout: string;
    PageNotFound: string;
    MyProfile: string;
    ChangePassword: string;
    PasswordMessage: string;
    UpperCaseMessage: string;
    LowerCaseMessage: string;
    DigitMessage: string;
    SpecialCharMessage: string;
    LengthMessage: string;
    CurrentPassword: string;
    NewPassword: string;
    ConfirmNewPassword: string;
    "Invalid password": string;
    No: string;
    Yes: string;
    Ok: string;
    View: string;
    SelectAll: string;
    LoadMore: string;
    SoftwareBy: string;
    NoResultsFound: string;
    RowsPerPage: string;
    Dashboard: string;
    TestPage: string;
    InvalidCredentials: string;
    Filter: string;
    Filters: string;
    Sort: string;
    Ascending: string;
    Descending: string;
    Month: string;
    CaptchaConfirm: string;
    ExampleTitlesObject: {
        Title1: string;
        Title2: string;
    };
    ConsentMessage: string;
    Planning: string;
    History: string;
    PredictRealEstatePrices: string;

    // Added Types for Home, Prediction, and History Pages
    HomePageTitle: string;
    HomePageDescription: string;
    TryItNow: string;
    LearnMore: string;
    WhyChooseTitle: string;
    HowItWorksTitle: string;
    ReadyToStart: string;
    TryTodayMessage: string;
    MakePrediction: string;
    RealEstatePricePrediction: string;
    Back: string;
    Next: string;
    NextPropertyDetails: string;
    GetPricePrediction: string;
    TryAgain: string;
    NewPrediction: string;
    TestimonialsTitle: string;
}
