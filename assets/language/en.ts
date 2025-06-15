import { LanguageDataTypes } from "./types";

const en: LanguageDataTypes = {
    // Waiting Validation
    WaitingValidationTitle: "Waiting for Validation",
    WaitingValidationMessage:
        "Access to your account and platform features will be available after account validation. You will be contacted for data validation.",

    // Location Filters
    LocationName: "Location Name",
    Address: "Address",
    LPRCamera: "LPR Camera",
    KarcherDevice: "Karcher Device",
    Show: "Show",
    Search: "Search",
    AddLocation: "Add Location",
    DeleteLocationTitle: "Delete Location",
    DeleteLocationMessage: "Are you sure you want to delete this location? This action cannot be undone.",
    ClearFilters: "Clear Filters",
    Attention: "Atentie!",

    Cancel: "Cancel",
    Delete: "Delete",
    Save: "Save",
    Email: "Email",
    EmailAddress: "Email Address",
    Password: "Password",
    ConfirmPassword: "Confirm Password",
    Edit: "Edit",
    EmailInfo: "The email address will be used for authentication and communication, and the password will be sent to this address.",
    Login: "Login",
    ToLogin: "Login to Account",
    LoginAction: "Login",
    SignIn: "Sign In",
    CreateAccount: "Create Account",
    OrSplitter: "Or",
    ForgotPassword: "Forgot Password?",
    WelcomeTitle: "Welcome 👋",
    SendLinkToEmail: "Send Link to Email",
    WelcomeDescription: "View our locations, manage your fleet\nand car wash cards directly from the application.\nSign in to start!",
    ResetPassword: "Reset Password",
    Reset: "Reset Password",
    BackToAuthentication: "Back to Login",
    InvalidEmail: "Invalid Email",
    InvalidPassword: "Invalid Password",
    SomethingWentWrong: "Server error. Please try again later.",
    ResetPasswordEmailSentConfirm: "If the specified address is in our database, an email with password reset instructions has been sent.",
    EmailConfirmationMessage:
        "After registration, account confirmation is required. Please check the email address used for registration to complete account activation.",
    SuccessfulPasswordReset: "Password has been reset successfully.",
    InvalidResetCode: "Reset code is invalid",
    PasswordsDontMatch: "Passwords don't match.",
    MainRoute: "Main Route!",
    Logout: "Logout",
    PageNotFound: "Page Not Found",
    MyProfile: "My Profile",
    ChangePassword: "Change Password",
    PasswordMessage: "Password must include: ",
    UpperCaseMessage: "At least one uppercase letter",
    LowerCaseMessage: "At least one lowercase letter",
    DigitMessage: "At least one number",
    SpecialCharMessage: "At least one special character [~\`!@#$%^&*()_-+={[}]|:;\"'<,>.?/]",
    LengthMessage: "Minimum length is 8 characters",
    CurrentPassword: "Current Password",
    NewPassword: "New Password",
    ConfirmNewPassword: "Confirm New Password",
    "Invalid password": "Current password is invalid",
    No: "No",
    Yes: "Yes",
    Ok: "Ok",
    View: "View",
    SelectAll: "Select All",
    LoadMore: "Load More",
    SoftwareBy: "Software by",
    NoResultsFound: "No Results Found",
    RowsPerPage: "Rows per page",
    Dashboard: "Dashboard",
    TestPage: "Test Page",
    InvalidCredentials: "Invalid Credentials",
    Filter: "Filter",
    Filters: "Filters",
    Sort: "Sort",
    Ascending: "Ascending",
    Descending: "Descending",
    Month: "Month",
    CaptchaConfirm: "Captcha verification required",
    ExampleTitlesObject: {
        Title1: "Title 1",
        Title2: "Title 2",
    },
    ConsentMessage: "Consent message",
    Planning: "Planning",
    History: "History",
    PredictRealEstatePrices: "Welcome!",

    //Sidebar categories
    Taxes: "Taxes & Fees",
    CommunicationsComplaints: "Communications & Complaints",
    Others: "Others",

    ReportsAndAnalyzes: "Reports & Analysis",
    Admins: "Administrators",
    Profile: "Profile",
    Vehicles: "Fleet",
    Visits: "Visits",
    FileUploadAlertMessage: "Uploaded image is not valid",
    OrderBy: "Order by",
    Prediction: "Predictie",

    //Location
    Location: "Location",
    Boxes: "Boxes",
    EditLocation: "Edit Location",

    CommunicationTabTitle: "Communications",
    ComplaintsTabTitle: "Complaints",
    LabelsTabTitle: "Define Labels",
    InputChannelTabTitle: "Define Input Channels",
    CategoriesTabTitle: "Communication Categories",

    // Complaints Tab
    AddComplaint: "Add Complaint",
    EditComplaint: "Edit Complaint",
    DeleteComplaintTitle: "Delete Complaint",
    DeleteComplaintMessage: "Are you sure you want to delete this complaint? This action cannot be undone.",
    AddComplaintMessage: "Add a new complaint",
    EditComplaintMessage: "Edit selected complaint",
    ComplaintName: "Complaint Name",

    //ManageUsers
    Users: "Users",
    DefineSections: "Define Sections",

    LocationStates: [
        { id: "Active", name: "Active", optionStyle: { color: "green" } },
        { id: "Inactive", name: "Inactive", optionStyle: { color: "red" } },
    ],

    forms: {
        inputPlaceholder: "Text",
        cancelButton: "Cancel",
        saveButton: "Save",
        editButton: "Edit",
        selectPlaceholder: "Select",
        selectMultiplePlaceholder: "Select Multiple",
        location: {
            name: "Location Name",
            address: "Address",
            link: "Google Maps Link",
        },
        administrators: {
            name: "Full Name",
            email: "Email",
            phone: "Phone",
        },
        box: {
            name: "Box Name",
            cameraLPR: "LPR Camera",
            karcherMachine: "Karcher Machine",
            status: "Status",
        },
        register: {
            placeholder: "Write",
            naturalPerson: {
                name: "Full Name",
                email: "Email",
                phoneNumber: "Phone Number",
                password: "Password",
                confirmPassword: "Confirm password",
            },
        },
    },

    Validation: {
        Required: "This field is required",
    },

    UploadFile: "Upload File",

    //Website under construction
    WebsiteInWork: "Website Under Construction",
    WebsiteInWorkTitle: "Website Under Construction!",
    WebsiteInWorkMessage: "Currently not accessible",

    //Days of the week
    FirstLetterVersion: {
        Monday: "M",
        Tuesday: "T",
        Wednesday: "W",
        Thursday: "T",
        Friday: "F",
        Saturday: "S",
        Sunday: "S",
    },

    Roles: {
        ADMIN: "ADMIN",
        CLIENT: "CLIENT",
    },
    RolesPretty: {
        ADMIN: "Administrator",
        CLIENT: "Client",
    },

    TotalQuantityOnPeriod: "Total quantity/period and selected filters",
    TableWithHideableCells: "Table",

    NaturalPeople: "Natural Persons",
    LegalPeople: "Legal Persons",

    NaturalPerson: "Natural Person",
    LegalPerson: "Legal Person",
    FullName: "Full Name",
    Phone: "Phone",
    NrPhone: "Phone Number",

    RegisterToPlatform: "Register now to benefit from all these advantages!",

    // Adding new labels for legal person component
    CompanyName: "Company Name",
    CUI: "Unique Registration Code",
    RegistrationNumberCommerce: "Trade Register Number",
    SocialHQ: "Headquarters",
    RepresentativeName: "Legal Representative Name",
    RepresentativePhone: "Legal Representative Phone",
    TaxCertificateRequired: "Tax Certificate is required",

    // validate accounts
    NewAccount: "New Account",
    AccountUpdate: "Account Update",
    Validate: "Validate",
    NaturalPersonsTable: {
        name: { title: "Full Name", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        phoneNumber: { title: "Phone Number", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        copyId: { title: "ID Copy", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        state: { title: "Validation Type", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actions",
            style: {
                position: "sticky !important",
                color: "#313A47",
                fontSize: 12,
                fontWeight: 600,
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10px",
                width: "100%",
                minWidth: 20,
            },
        },
    },
    LegalEntitiesTable: {
        companyName: { title: "Company Name", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        cui: { title: "CUI", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        name: { title: "Representative Name", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        phoneNumber: { title: "Representative Phone", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        copyTaxCertificate: { title: "Tax Certificate Copy", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        state: { title: "Validation Type", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actions",
            style: {
                position: "sticky !important",
                color: "#313A47",
                fontSize: 12,
                fontWeight: 600,
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10px",
                width: "100%",
                minWidth: 20,
            },
        },
    },

    // sections
    AddSection: "Add Section",
    EditSection: "Edit Section",
    AddSectionMessage: "Add a new section.",
    SectionName: "Section",
    EditSectionMessage: "Edit selected section.",
    DeleteSectionTitle: "Delete Section",
    DeleteSectionMessage: "Are you sure you want to delete this section?",
    DefineSectionsTable: {
        name: { title: "Sections", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actions",
            style: {
                position: "sticky !important",
                color: "#313A47",
                fontSize: 12,
                fontWeight: 600,
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10px",
                width: "100%",
                minWidth: 20,
            },
        },
    },

    //users
    Active: "Active",
    Inactive: "Inactive",
    UserName: "Full Name",
    UserEmail: "Email",
    UserPhoneNumber: "Phone",
    UserSection: "Section",
    AddUser: "Add User",
    EditUser: "Edit User",
    AddUserMessage: "Add a new platform user.",
    EditUserMessage: "Edit selected user.",
    DeleteUserTitle: "Delete User",
    DeleteUserMessage: "Are you sure you want to delete this user?",
    UsersTable: {
        name: { title: "Full Name", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        phoneNumber: { title: "Phone", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        state: { title: "Status", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        section: { title: "Section", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actions",
            style: {
                position: "sticky !important",
                color: "#313A47",
                fontSize: 12,
                fontWeight: 600,
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10px",
                width: "100%",
                minWidth: 20,
            },
        },
    },

    //administrators
    AddAdministrator: "Add Administrator",
    EditAdministrator: "Edit Administrator",
    DeleteAdministratorTitle: "Delete Administrator",
    DeleteAdministratorMessage: "Are you sure you want to delete this administrator? This action cannot be undone.",
    AdministartorsTable: {
        name: { title: "Full Name", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        phoneNumber: { title: "Phone", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actions",
            style: {
                position: "sticky !important",
                color: "#313A47",
                fontSize: 12,
                fontWeight: 600,
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10px",
                width: "100%",
                minWidth: 20,
            },
        },
    },

    // validate accounts
    NaturalPersons: "Natural Persons",
    LegalEntities: "Legal Entities",

    NaturalPersonFilterDrawer: {
        name: "Full Name",
        cnp: "Personal Identification Number",
        address: "Address",
        ciValability: "ID Validity",
    },

    Select: "Select",

    NaturalPersonProfileFields: {
        CitizenInformation: "Citizen Information",
        NameAndSurname: "Full Name",
        PhoneNumber: "Phone Number",
        Email: "Email",
        CNP: "Personal Identification Number",
        IDSeries: "ID Series",
        IDNumber: "ID Number",
        Domicile: "Domicile",
        Address: "Address",
        IssuedBy: "Issued By",
        IDExpiryDate: "ID Expiry Date",
    },
    LegalEntityProfileFields: {
        CompanyInformation: "Company Information",
        CompanyName: "Company Name",
        CUI: "Unique Registration Code",
        RepresentativeName: "Legal Representative Name",
        PhoneNumber: "Legal Representative Phone Number",
        Email: "Email",
        RegisterNumber: "Trade Register Number",
        SocialHQ: "Headquarters",
    },
    Documents: "Documents",
    DeleteAccount: "Delete Account",
    DeleteAccountMessage: "Are you sure you want to delete this account? This action cannot be undone.",
    ValidateAccount: "Validate Account",

    // Home Page
    HomePageTitle: "Predict Real Estate Prices",
    HomePageDescription:
        "Get accurate property price predictions powered by advanced machine learning algorithms. Make informed decisions for buying, selling, or investing in real estate.",
    TryItNow: "Try It Now",
    LearnMore: "Learn More",
    WhyChooseTitle: "Why Choose Our Prediction Tool?",

    // Features
    Features: {
        AccuratePredictions: {
            title: "Accurate Predictions",
            description: "Our model is trained on hundreds of thousands of real estate transactions to provide highly accurate price predictions.",
        },
        RealTimeAnalysis: {
            title: "Real-Time Analysis",
            description: "Get instant property valuations with our fast and responsive prediction engine.",
        },
        UserFriendly: {
            title: "User-Friendly Interface",
            description: "Our intuitive design makes it easy to input property details and understand results.",
        },
        DetailedInsights: {
            title: "Detailed Insights",
            description: "Receive comprehensive analysis including price ranges, confidence scores, and comparable properties.",
        },
    },

    // How It Works Section
    HowItWorksTitle: "How It Works",
    HowItWorksSteps: {
        Step1: {
            title: "Enter Property Details",
            description: "Provide information about the property including location, size, features, and condition.",
        },
        Step2: {
            title: "Analysis",
            description: "Our advanced algorithm analyzes the data and compares it with similar properties in the area.",
        },
        Step3: {
            title: "Get Your Prediction",
            description: "Receive a detailed price prediction with confidence intervals and supporting data.",
        },
    },

    // Testimonials
    TestimonialsTitle: "What Our Users Say",
    Testimonials: {
        Testimonial1: {
            quote: "This tool helped me price my home correctly and sell it within a week. The prediction was spot on!",
            author: "Sarah Johnson",
            role: "Home Seller",
        },
        Testimonial2: {
            quote: "As a real estate investor, I rely on accurate valuations. This tool has become an essential part of my decision-making process.",
            author: "Michael Chen",
            role: "Real Estate Investor",
        },
        Testimonial3: {
            quote: "The detailed analysis helped me negotiate a better price for my dream home. Saved me thousands!",
            author: "Emily Rodriguez",
            role: "Home Buyer",
        },
    },

    // CTA Section
    ReadyToStart: "Ready to Get Started?",
    TryTodayMessage: "Try our powered real estate price prediction tool today.",
    MakePrediction: "Make a Prediction",

    // Prediction Page
    RealEstatePricePrediction: "Real Estate Price Prediction",
    Steps: {
        Location: "Location",
        Property: "Property",
        Result: "Result",
    },
    StepGuide: {
        Location: {
            title: "Property Location and Basic Details",
            hint: "For a better prediction accuracy, please complete all fields, even optional ones.",
        },
        PropertyDetails: {
            title: "Property Details",
            hint: "Fill in as many details as possible - more information leads to more accurate price predictions.",
        },
    },

    // Property Form Fields
    PropertyFields: {
        StreetAddress: "Street Address",
        City: "City",
        StreetFrontage: "Street Frontage (m)",
        PropertyType: "Property Type",
        LandClassification: "Land Classification",
        FloorNumber: "Floor Number",
        ComfortLevel: "Comfort Level",
        TotalUsableArea: "Total Usable Area (m²)",
        MainLivingArea: "Main Living Area (m²)",
        NumberOfRooms: "Number of rooms",
        BuiltArea: "Built Area (m²)",
        LandArea: "Land Area (m²)",
        NumberOfGarages: "Number of garages",
    },

    // Property Types
    PropertyTypes: {
        Apartment: "Bloc",
        House: "Casa/Vila",
    },

    // Comfort Levels
    ComfortLevels: {
        Luxury: "Luxury",
        Premium: "Premium",
        High: "High",
        Medium: "Medium",
        Basic: "Basic",
    },

    // Navigation
    Back: "Back",
    Next: "Next",
    NextPropertyDetails: "Next: Property Details",
    GetPricePrediction: "Get Price Prediction",
    TryAgain: "Try again",
    NewPrediction: "New Prediction",

    // Results Page
    PredictionResults: {
        title: "Price Prediction Results",
        estimatedValue: "Estimated Property Value",
        similarProperties: "Similar Properties in Your Area",
        propertySpecs: {
            rooms: "rooms",
            area: "m²",
        },
    },

    // History Page
    PredictionHistory: {
        title: "Prediction History",
        description: "View your past property price predictions",
        emptyState: {
            title: "No Predictions Yet",
            message: "Make your first property price prediction to see it here.",
        },
    },

    ProfilePage: {
        title: "Profile",
        personalInfo: "Personal Information",
        preferences: "Preferences",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone number",
        darkMode: "Dark Mode",
        language: "Language",
        saveChanges: "Save Changes",
    },
    TranslateInEnglish: "Translate in English",
    TranslateInRomanian: "Translate in Romanian",
    ContinueWithoutAccount: "Continua with no account",

    SuccessAndErrorMessages: {
        Success: {
            Put: "Successfully saved.",
            Post: "Successfully created.",
            Delete: "Successfully deleted.",
            ChangePass: "Successfully changed.",
        },
        Error: {
            E0010: "Invalid credentials.",
            E0011: "Invalid credentials.",
            E0012: "User already exists.",
            E0013: "Token expired.",
            E0014: "Token deleted.",
            E0015: "Unknown user.",
            E0016: "Operation does not contain authorization.",
            E0017: "Invalid authorization.",
            E0018: "User is already logged out.",
            E0019: "Operation forbidden.",
            E0020: "Invalid user.",
            E0030: "Operation contains invalid data.",
            E0031: "Email sending failed.",
            E0032: "Specified file does not exist.",
            E0101: "Database insertion failed.",
            E0102: "Database access failed.",
            E0027: "Email could not be confirmed.",
            E0028: "Passwords do not match.",
            E0029: "Confirmation code expired. Please restart the registration process.",
            E0103: {
                post: {
                    "/users/admins": "Admin already exists.",
                    default: "Entity already exists.",
                },
            },
            E0104: {
                get: {
                    default: "Entity does not exist.",
                },
                post: {
                    default: "The entity this entity depends on does not exist.",
                },
                put: {
                    default: "Entity does not exist.",
                },
                delete: {
                    "/users/admin/[0-9]+": "Admin does not exist.",
                    default: "Entity does not exist.",
                },
            },
            E0105: {
                post: "One of the entity fields is too long.",
                put: {
                    "/users/admin/[0-9]+": "Admin name is too long.",
                    default: "One of the entity fields is too long.",
                },
            },
            E0106: {
                post: {
                    "/users/admins": "Admin email is already in use.",
                    "/clients/register": "The email address entered already belongs to an existing account.",
                    default: "One of the entity fields is already in use.",
                },
                put: {
                    "/clients/[0-9]+": "Name must contain between 3 and 500 characters.",
                    default: "One of the entity fields is already in use.",
                },
            },
            E0303: {
                post: {
                    default: "Phone number is not valid.",
                },
                put: {
                    default: "Phone number is not valid.",
                },
            },
            E0304: {
                post: "File format is not valid.",
                put: {
                    default: "File format is not valid.",
                },
            },
            E0107: {
                delete: {
                    default: "Entity cannot be deleted because it is used elsewhere.",
                },
            },
        },
    },
};

export default en;
