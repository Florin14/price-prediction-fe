export interface LanguageDataTypes {
    [key: string]: any;
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
    PredictionLoading?: {
        title: string;
        subtitle?: string;
        AnalyzingData?: string;
        LocatingComparables?: string;
        RunningModels?: string;
        messages: {
            analyzing: string;
            processing: string;
            calculating: string;
            generating: string;
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
}

const ro: LanguageDataTypes = {
    // Waiting Validation
    WaitingValidationTitle: "Asteapta validare",
    WaitingValidationMessage:
        "Accesul la cont si utilizarea functiilor platformei vor fi disponibile doar dupa validarea contului. Veti fi contactat pentru validarea datelor.",

    // Complaints Tab
    AddComplaint: "Adauga sesizare",
    EditComplaint: "Editeaza sesizare",
    DeleteComplaintTitle: "Sterge sesizare",
    DeleteComplaintMessage: "Sunteti sigur ca doriti sa stergeti aceasta sesizare? Odata stearsa, aceasta actiune este ireversibila.",
    AddComplaintMessage: "Adauga o noua sesizare",
    EditComplaintMessage: "Editeaza sesizarea selectata",
    ComplaintName: "Denumire sesizare",

    // Location Filters
    LocationName: "Denumire locatie",
    Address: "Adresa",
    LPRCamera: "Camera LPR",
    KarcherDevice: "Aparat Karcher",
    Show: "Afiseaza",
    Search: "Cauta",
    AddLocation: "Adauga locatie",
    DeleteLocationTitle: "Sterge locatie",
    DeleteLocationMessage: "Sunteti sigur ca doriti sa stergeti aceasta locatie? Odata stearsa, aceasta actiune este ireversibila.",
    ClearFilters: "Sterge filtre",
    BaseAddress: "Adresa de baza",
    PricePerMeter: "Pret/m²",
    TotalPrice: "Pret total",

    // Analytics Page
    MarketAnalytics: "Analiza Pietei",
    TotalListings: "Total Anunturi",
    CitiesCovered: "Orase Acoperite",
    AvgPricePerSqm: "Pret Mediu / mp",
    SaleVsRent: "Vanzare / Inchiriere",
    PricesByCity: "Preturi pe Oras",
    PriceDistribution: "Distributie Preturi",
    Listings: "anunturi",
    AvgArea: "Sup. medie",
    AvgPrice: "Pret mediu",
    AIModelPerformance: "Performanta Modele AI",
    LastTrained: "Ultima antrenare",
    BestModel: "Cel mai bun",
    NoDataAvailable: "Nu exista date disponibile",
    PredictionSubtitle: "Obtine o estimare AI pentru orice proprietate din Romania",
    RequiredField: "indica camp obligatoriu",
    AddressInfo: "Informatii Adresa",
    PropertyInfo: "Clasificare Proprietate",
    AreaDimensions: "Suprafata si Dimensiuni",
    AdditionalDetails: "Detalii Suplimentare",
    SelectPropertyType: "Selecteaza tipul proprietatii...",
    PriceTrend: "Trend Preturi",
    CompareZones: "Comparatie Zone",
    ROIEstimation: "ROI Investitie",
    ValuationIndex: "Indice Evaluare",
    Undervalued: "Subevaluat",
    Fair: "Corect",
    Overvalued: "Supraevaluat",
    AnnualYield: "Randament Anual",
    PaybackYears: "Perioada de Recuperare",
    AvgSalePrice: "Pret Mediu Vanzare",
    AvgMonthlyRent: "Chirie Medie Lunara",
    PricePerSqm: "Pret pe mp",
    HeatmapTitle: "Heatmap Preturi",
    SelectCitiesToCompare: "Selecteaza orasele pentru comparatie",
    ConfidenceRange: "Interval de Incredere",
    Warnings: "Avertismente",
    Years: "ani",
    ForSale: "De Vanzare",
    PriceTrendOverTime: "Evolutie Preturi in Timp",

    Cancel: "Anuleaza",
    Delete: "Sterge",
    Save: "Salveaza",
    Email: "Email",
    EmailAddress: "Adresa de email",
    Password: "Parola",
    ConfirmPassword: "Confirma parola",
    Edit: "Editeaza",
    EmailInfo: "Adresa de email va fi utilizata pentru autentificare si comunicare, iar parola va fi trimisa pe aceasta adresa.",
    Login: "Autentifica-te",
    ToLogin: "Intra in cont",
    LoginAction: "Autentificare",
    SignIn: "Login",
    CreateAccount: "Creeaza cont",
    OrSplitter: "Sau",
    ForgotPassword: "Ai uitat parola?",
    WelcomeTitle: "Bun venit 👋",
    SendLinkToEmail: "Trimite link pe email",
    WelcomeDescription:
        "Vizualizeaza locatiile noastre, gestioneaza-ti flota\nsi cardurile de spalatorie direct din aplicatie.\nConecteaza-te pentru a incepe!",
    ResetPassword: "Resetare parola",
    Reset: "Reseteaza parola",
    BackToAuthentication: "Inapoi la autentificare",
    InvalidEmail: "Email invalid",
    InvalidPassword: "Parola invalida",
    SomethingWentWrong: "Eroare de server. Va rugam incercati mai tarziu.",
    ResetPasswordEmailSentConfirm:
        "Daca adresa specificata se afla in baza de date, un e-mail cu instructiunile de resetarea a parolei a fost trimis catre aceasta.",
    EmailConfirmationMessage:
        "Dupa confirmarea contului, este necesara confirmarea acestuia. Va rugam sa verificati adresa de email folosita la inregistrare pentru a finaliza activarea contului.",
    SuccessfulPasswordReset: "Parola a fost resetata cu succes.",
    InvalidResetCode: "Codul de resetare este invalid",
    PasswordsDontMatch: "Parolele nu coincid.",
    MainRoute: "Main Route!",
    Logout: "Deconecteaza-te",
    PageNotFound: "Pagina nu a fost gasita",
    MyProfile: "Profilul meu",
    ChangePassword: "Schimba parola",
    PasswordMessage: "Parola trebuie sa includa: ",
    UpperCaseMessage: "Cel putin o litera mare",
    LowerCaseMessage: "Cel putin o litera mica",
    DigitMessage: "Cel putin un numar",
    SpecialCharMessage: "Cel putin un caracter special [~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/]",
    LengthMessage: "Lungimea minima este de 8 caractere",
    CurrentPassword: "Parola curenta",
    NewPassword: "Parola noua",
    ConfirmNewPassword: "Confirma parola noua",
    "Invalid password": "Parola curenta invalida",
    No: "Nu",
    Yes: "Da",
    Ok: "Ok",
    View: "Vizualizeaza",
    SelectAll: "Selecteaza tot",
    LoadMore: "Incarca mai mult",
    SoftwareBy: "Soft realizat de",
    NoResultsFound: "Nu s-au gasit rezultate",
    RowsPerPage: "Randuri pe pagina",
    Dashboard: "Dashboard",
    TestPage: "Test Page",
    InvalidCredentials: "Credentiale nevalide.",
    Filter: "Filtreaza",
    Filters: "Filtre",
    Sort: "Ordoneaza",
    Ascending: "Ascendent",
    Descending: "Descendent",
    Month: "Luna",
    CaptchaConfirm: "Necesita verificare Captcha",
    ExampleTitlesObject: {
        Title1: "Titlu 1",
        Title2: "Titlu 2",
    },
    ConsentMessage: "Consent message",
    Planning: "Planificare",
    History: "Istoric",
    PredictRealEstatePrices: "Bine ai venit!",

    //Sidebar categories
    Taxes: "Taxe & impozite",
    CommunicationsComplaints: "Comunicari & sesizari",
    Others: "Altele",

    ReportsAndAnalyzes: "Rapoarte si analiza",
    Admins: "Administratori",
    Profile: "Profil",
    Vehicles: "Flota",
    Visits: "Vizite",
    FileUploadAlertMessage: "Poza incarcata nu este valida",
    OrderBy: "Ordoneaza dupa",
    Prediction: "Predictie",

    Attention: "Atentie!",

    //Location
    Location: "Locatie",
    Boxes: "Boxe",
    EditLocation: "Editeaza locatie",

    CommunicationTabTitle: "Comunicari",
    ComplaintsTabTitle: "Sesizari",
    LabelsTabTitle: "Definire etichete",
    InputChannelTabTitle: "Definire canale de intrare",
    CategoriesTabTitle: "Categorii comunicari",

    //ManageUsers
    Users: "Utilizatori",
    DefineSections: "Definire compartimente",

    LocationStates: [
        { id: "Active", name: "Activ", optionStyle: { color: "green" } },
        { id: "Inactive", name: "Inactiv", optionStyle: { color: "red" } },
    ],

    forms: {
        inputPlaceholder: "Text",
        cancelButton: "Anuleaza",
        saveButton: "Salveaza",
        editButton: "Editeaza",
        selectPlaceholder: "Selecteaza",
        selectMultiplePlaceholder: "Selecteaza multiple",
        location: {
            name: "Nume locatie",
            address: "Adresa",
            link: "Link Google Maps",
        },
        administrators: {
            name: "Nume si prenume",
            email: "Email",
            phone: "Telefon",
        },
        box: {
            name: "Denumire Boxa",
            cameraLPR: "Camera LPR",
            karcherMachine: "Aparat Karcher",
            status: "Status",
        },
        register: {
            placeholder: "Scrie",
            naturalPerson: {
                name: "Nume si prenume",
                email: "Email",
                phoneNumber: "Nr. de telefon",
                password: "Parola",
                confirmPassword: "Confirma parola",
            },
        },
    },

    Validation: {
        Required: "Acest camp este obligatoriu",
    },

    UploadFile: "Incarca fisier",

    //Website in lucru
    WebsiteInWork: "Website in lucru",
    WebsiteInWorkTitle: "Website in lucru!",
    WebsiteInWorkMessage: "Momentan nu poate fi accesat",

    //Zilele saptamanii
    FirstLetterVersion: {
        Monday: "L",
        Tuesday: "M",
        Wednesday: "M",
        Thursday: "J",
        Friday: "V",
        Saturday: "S",
        Sunday: "D",
    },

    Roles: {
        ADMIN: "ADMIN",
        CLIENT: "CLIENT",
    },
    RolesPretty: {
        ADMIN: "Administrator",
        CLIENT: "Client",
    },
    TotalQuantityOnPeriod: "Total cantitate/perioada si filtrele selectate",
    TableWithHideableCells: "Tabel",

    NaturalPeople: "Persoane fizice",
    LegalPeople: "Persoane juridice",

    NaturalPerson: "Persoana fizica",
    LegalPerson: "Persoana juridica",
    FullName: "Nume si prenume",
    Phone: "Telefon",
    NrPhone: "Nr. de telefon",

    RegisterToPlatform: "Inregistrati-va acum pentru a beneficia de toate aceste avantaje!",
    // Adding new labels for legal person component
    CompanyName: "Nume companie",
    CUI: "CUI",
    RegistrationNumberCommerce: "Nr. de Ordine in Registru Comertului",
    SocialHQ: "Sediu Social",
    RepresentativeName: "Nume reprezentant legal",
    RepresentativePhone: "Telefon reprezentant legal",
    TaxCertificateRequired: "Certificat fiscal este obligatoriu",

    // validate accounts
    NewAccount: "Cont nou",
    AccountUpdate: "Actualizare cont",
    Validate: "Valideaza",
    NaturalPersonsTable: {
        name: { title: "Nume si prenume", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        phoneNumber: { title: "Nr. de telefon", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        copyId: { title: "Copie buletin", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        state: { title: "Tip validare", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actiuni",
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
        companyName: { title: "Nume companie", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        cui: { title: "CUI", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 90, minWidth: 50 } },
        name: { title: "Nume reprezentant", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 150, minWidth: 75 } },
        phoneNumber: { title: "Telefon reprezentant", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 100, minWidth: 50 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        copyTaxCertificate: { title: "Copie certificate fiscal", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        state: { title: "Tip validare", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 100, minWidth: 75 } },
        actions: {
            title: "Actiuni",
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
    AddSection: "Adauga compartiment",
    EditSection: "Editeaza compartiment",
    AddSectionMessage: "Adauga un nou compartiment.",
    SectionName: "Compartiment",
    EditSectionMessage: "Editeaza compartimentul selectat.",
    DeleteSectionTitle: "Sterge compartiment",
    DeleteSectionMessage: "Sunteti sigur ca doriti sa stergeti acest compartiment?",
    DefineSectionsTable: {
        name: { title: "Compartimente", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actiuni",
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
    Active: "Activ",
    Inactive: "Inactiv",
    UserName: "Nume si prenume",
    UserEmail: "Email",
    UserPhoneNumber: "Telefon",
    UserSection: "Compartiment",
    AddUser: "Adauga utilizator",
    EditUser: "Editeaza utilizator",
    AddUserMessage: "Adauga un nou utilizator al platformei.",
    EditUserMessage: "Editeaza utilizatorul selectat.",
    DeleteUserTitle: "Sterge utilizator",
    DeleteUserMessage: "Sunteti sigur ca doriti sa stergeti acest utilizator?",
    UsersTable: {
        name: { title: "Nume si prenume", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        phoneNumber: { title: "Telefon", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        state: { title: "Status", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        section: { title: "Compartiment", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actiuni",
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

    //administators
    AddAdministrator: "Adauga administrator",
    EditAdministrator: "Editeaza administrator",
    DeleteAdministratorTitle: "Sterge administrator",
    DeleteAdministratorMessage: "Sunteti sigur ca doriti sa stergeti acest administrator? Odata sters, aceasta actiune este ireversibila.",
    AdministartorsTable: {
        name: { title: "Nume si prenume", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        phoneNumber: { title: "Telefon", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        actions: {
            title: "Actiuni",
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
    NaturalPersons: "Persoane fizice",
    LegalEntities: "Persoane juridice",

    NaturalPersonFilterDrawer: {
        name: "Nume si prenume",
        cnp: "CNP",
        address: "Domiciliu",
        ciValability: "Valabilitate CI",
    },

    Select: "Selecteaza",

    NaturalPersonProfileFields: {
        CitizenInformation: "Informatii cetatean",
        NameAndSurname: "Nume si prenume",
        PhoneNumber: "Nr. de telefon",
        Email: "Email",
        CNP: "CNP",
        IDSeries: "Serie CI",
        IDNumber: "Numar CI",
        Domicile: "Domiciliu",
        Address: "Domiciliu",
        IssuedBy: "Eliberat de",
        IDExpiryDate: "Valabilitate Carte de Identitate",
    },
    LegalEntityProfileFields: {
        CompanyInformation: "Informatii companie",
        CompanyName: "Nume companie",
        CUI: "CUI",
        RepresentativeName: "Nume reprezentant legal",
        PhoneNumber: "Nr. de telefon reprezentant legal",
        Email: "Email",
        RegisterNumber: "Nr. Ordine Registru Comertului",
        SocialHQ: "Sediu Social",
    },
    Documents: "Documente",
    DeleteAccount: "Sterge cont",
    DeleteAccountMessage: "Sunteti sigur ca doriti sa stergeti acest cont? Aceasta actiune este ireversibila.",
    ValidateAccount: "Validare cont",

    // Home Page
    Home: "Acasă",
    HomePageTitle: "Prezice Prețuri Imobiliare",
    HomePageDescription:
        "Obține predicții precise ale prețurilor proprietăților, alimentate de algoritmi avansați de învățare automată. Ia decizii informate pentru cumpărarea, vânzarea sau investiția în imobiliare.",
    TryItNow: "Încearcă",
    LearnMore: "Află Mai Multe",
    WhyChooseTitle: "De Ce Să Alegi Tool-ul Nostru de Predicție?",

    // Features
    Features: {
        AccuratePredictions: {
            title: "Predicții Precise",
            description: "Modelul nostru este antrenat pe sute de mii de tranzacții imobiliare pentru a oferi predicții foarte precise ale prețurilor.",
        },
        RealTimeAnalysis: {
            title: "Analiză în Timp Real",
            description: "Obține evaluări instantanee ale proprietăților cu motorul nostru rapid și responsiv de predicție.",
        },
        UserFriendly: {
            title: "Interfață Prietenoasă",
            description: "Design-ul nostru intuitiv face ușoară introducerea detaliilor proprietății și înțelegerea rezultatelor.",
        },
        DetailedInsights: {
            title: "Analiză Detaliată",
            description: "Primește analize detaliate incluzând intervale de preț, scoruri de încredere și proprietăți comparabile.",
        },
    },

    // How It Works Section
    HowItWorksTitle: "Cum Funcționează",
    HowItWorksSteps: {
        Step1: {
            title: "Introduceți Detalii despre Proprietăți",
            description: "Furnizați informații despre proprietate, inclusiv locație, dimensiune, facilități și stare.",
        },
        Step2: {
            title: "Analiză",
            description: "Algoritmul nostru avansat analizează datele și le compară cu proprietăți similare din zonă.",
        },
        Step3: {
            title: "Obțineți Predicția",
            description: "Primiți o predicție detaliată a prețului cu intervale de încredere și date suport.",
        },
    },

    // Testimonials
    TestimonialsTitle: "Ce Spun Utilizatorii Noștri",
    Testimonials: {
        Testimonial1: {
            quote: "Acest tool m-a ajutat să îmi evaluez corect casa și să o vând într-o săptămână. Predicția a fost exactă!",
            author: "Sarah Johnson",
            role: "Vânzător",
        },
        Testimonial2: {
            quote: "Ca investitor imobiliar, mă bazez pe evaluări precise. Acest tool a devenit o parte esențială a procesului meu decizional.",
            author: "Michael Chen",
            role: "Investitor Imobiliar",
        },
        Testimonial3: {
            quote: "Analiza detaliată m-a ajutat să negociez un preț mai bun pentru casa visurilor mele. Am economisit mii de euro!",
            author: "Emily Rodriguez",
            role: "Cumpărător",
        },
    },

    // CTA Section
    ReadyToStart: "Gata să Începi?",
    TryTodayMessage: "Încearcă astăzi tool-ul nostru de predicție a prețurilor.",
    MakePrediction: "Fă o Predicție",

    // Prediction Page
    RealEstatePricePrediction: "Predicție Preț Imobiliar",
    Steps: {
        Location: "Locație",
        Property: "Proprietate",
        Result: "Rezultat",
    },
    StepGuide: {
        Location: {
            title: "Locația Proprietății și Detalii de Bază",
            hint: "Pentru o predicție mai precisă, vă rugăm să completați toate câmpurile, chiar și cele opționale.",
        },
        PropertyDetails: {
            title: "Detaliile Proprietății",
            hint: "Completați cât mai multe detalii posibil - mai multe informații duc la predicții mai precise ale prețului.",
        },
    },

    // Property Form Fields
    PropertyFields: {
        StreetAddress: "Adresă",
        City: "Oraș",
        StreetFrontage: "Deschidere la Stradă (m)",
        PropertyType: "Tip Proprietate",
        LandClassification: "Clasificare Teren",
        FloorNumber: "Etaj",
        ComfortLevel: "Nivel de Confort",
        TotalUsableArea: "Suprafață Utilă Totală (m²)",
        MainLivingArea: "Suprafață Locuibilă (m²)",
        NumberOfRooms: "Număr Camere",
        BuiltArea: "Suprafață Construită (m²)",
        LandArea: "Suprafață Teren (m²)",
        NumberOfGarages: "Număr Garaje",
    },

    // Property Types
    PropertyTypes: {
        Apartment: "Bloc",
        House: "Casa/Vila",
    },

    // Comfort Levels
    ComfortLevels: {
        Luxury: "Lux",
        Premium: "Premium",
        High: "Ridicat",
        Medium: "Mediu",
        Basic: "Basic",
    },

    // Validation Error Messages
    ValidationErrors: {
        StreetAddressRequired: "Adresa stradală este obligatorie",
        CityRequired: "Orașul este obligatoriu",
        PropertyTypeRequired: "Tipul proprietății este obligatoriu",
        ComfortLevelRequired: "Nivelul de confort este obligatoriu",
        TotalUsableAreaRequired: "Suprafața utilă totală este obligatorie",
        NumberOfRoomsRequired: "Numărul de camere este obligatoriu",
    },

    // Navigation
    Back: "Înapoi",
    Next: "Următorul",
    NextPropertyDetails: "Următorul: Detalii Proprietate",
    GetPricePrediction: "Obține Predicția Prețului",
    TryAgain: "Încearcă din nou",
    NewPrediction: "Predicție Nouă",

    // Results Page
    PredictionResults: {
        title: "Rezultatele Predicției",
        estimatedValue: "Valoare Estimată Proprietate",
        similarProperties: "Proprietăți Similare în Zonă",
        propertySpecs: {
            rooms: "camere",
            area: "m²",
        },
    },

    // History Page
    PredictionHistory: {
        title: "Istoric Predicții",
        description: "Vizualizează predicțiile tale anterioare pentru proprietăți",
        emptyState: {
            title: "Nicio Predicție Încă",
            message: "Fă prima ta predicție de preț pentru o proprietate pentru a o vedea aici.",
        },
    },

    // Prediction Loading
    PredictionLoading: {
        title: "Calculăm estimarea ta",
        subtitle: "Comparăm 117K+ anunțuri și rulăm ensemble-ul de modele.",
        AnalyzingData: "Analizez anunțurile și tendințele pieței",
        LocatingComparables: "Localizez proprietățile comparabile din apropiere",
        RunningModels: "Rulez ensemble-ul cu stacking",
        messages: {
            analyzing: "Analizez tendințele pieței...",
            processing: "Procesez caracteristicile proprietății...",
            calculating: "Calculez estimări precise...",
            generating: "Generez predicții...",
        },
    },

    ProfilePage: {
        title: "Profil",
        personalInfo: "Informații Personale",
        preferences: "Preferințe",
        name: "Nume si prenume",
        email: "Email",
        phoneNumber: "Telefon",
        darkMode: "Mod Întunecat",
        language: "Limbă",
        saveChanges: "Salvează Modificările",
    },
    TranslateInEnglish: "Tradu in Engleza",
    TranslateInRomanian: "Tradu in Romana",
    ContinueWithoutAccount: "Continua fara cont",

    SuccessAndErrorMessages: {
        Success: {
            Put: "Salvat cu succes.",
            Post: "Creat cu succes.",
            Delete: "Sters cu succes.",
            ChangePass: "Schimbat cu succes.",
        },
        Error: {
            E0010: "Credentiale nevalide.",
            E0011: "Credentiale nevalide.",
            E0012: "Utilizatorul exista deja.",
            E0013: "Token expirat.",
            E0014: "Token sters.",
            E0015: "Utilizator necunoscut.",
            E0016: "Operatiunea nu contine autorizare.",
            E0017: "Autorizare invalida.",
            E0018: "UTilizatorul este deja deconectat.",
            E0019: "Operatie interzisa.",
            E0020: "Utilizator invalid.",
            E0030: "Operatiunea contine date invalide.",

            E0031: "Trimiterea emailului a esuat.",
            E0032: "Fisierul specificat nu exista.",
            E0101: "Inserarea in baza de date esuata.",
            E0102: "Accesarea bazei de date esuata.",
            E0027: "Emailul nu a putut fi confirmat.",
            E0028: "Parolele nu corespund.",
            E0029: "Cod de confirmare expirat. Reluati procesul de inregistrare.",
            E0103: {
                post: {
                    "/users/admins": "Adminul exista deja.",
                    default: "Entitatea exista deja.",
                },
            },
            E0104: {
                get: {
                    default: "Entitatea nu exista.",
                },
                post: {
                    default: "Entitatea de care aceasta entitate depinde nu exista.",
                },
                put: {
                    default: "Entitatea nu exista.",
                },
                delete: {
                    "/users/admin/[0-9]+": "Adminul nu exista.",
                    default: "Entitatea nu exista.",
                },
            },
            E0105: {
                post: "Unul dintre campurile entitatii este prea lung.",

                put: {
                    "/users/admin/[0-9]+": "Numele adminului este prea lung.",
                    default: "Unul dintre campurile entitatii este prea lung.",
                },
            },
            E0106: {
                post: {
                    "/users/admins": "Email-ul adminului este folosit deja.",
                    "/clients/register": "Adresa de email introdusa apartine deja unui cont existent.",
                    default: "Unul dintre campurile entitatii este folosit deja.",
                },
                put: {
                    "/clients/[0-9]+": "Numele trebuie sa contine intre 3 si 500 de caractere.",
                    default: "Unul dintre campurile entitatii este folosit deja.",
                },
            },
            E0303: {
                post: {
                    default: "Numarul de telefon nu este valid.",
                },
                put: {
                    default: "Numarul de telefon nu este valid.",
                },
            },
            E0304: {
                post: "Formatul fisierului nu este valid.",

                put: {
                    default: "Formatul fisierului nu este valid.",
                },
            },
            E0107: {
                delete: {
                    default: "Entitatea nu poate fi stearsa deoarece este folosita altundeva.",
                },
            },
        },
    },

    // ============================================================
    // Redesign 2026 — copy UI (warm-editorial)
    // ============================================================

    // Autentificare
    WelcomeBack: "Bun revenit",
    SignInTitle: "Autentifică-te în cont",
    SignInSubtitle: "Accesează istoricul predicțiilor și salvează estimări noi în contul tău.",
    GetStarted: "Începe acum",
    RegisterTitle: "Creează-ți contul",
    RegisterSubtitle: "Salvează estimări, construiește un istoric și deblochează analize adaptate căutărilor tale.",
    Recovery: "Recuperare parolă",
    ForgotPasswordTitle: "Ai uitat parola?",
    ForgotPasswordSubtitle: "Introdu adresa de email asociată contului tău și îți vom trimite un link pentru resetare.",
    ResetPasswordSubtitle: "Alege o parolă nouă și sigură. Urmează lista de cerințe de mai jos pentru a-ți proteja contul.",
    WaitingValidationHint: "Dacă nu vezi email-ul în câteva minute, verifică folderul de spam sau retrimite linkul de verificare din pagina de autentificare.",
    AlmostThere: "Aproape gata",
    AlreadyHaveAccount: "Ai deja un cont?",
    FieldRequired: "Obligatoriu",
    PasswordRulesMissing: "Parola nu respectă cerințele",
    Unnamed: "Fără nume",

    // Cont / profil
    AccountKicker: "Cont",
    ProfileSubtitle: "Gestionează informațiile personale și preferințele contului.",
    ChangePasswordSubtitle: "Actualizează-ți parola periodic. Folosește o combinație unică, diferită de cea de pe alte platforme.",
    ChangePasswordHint: "Minim 8 caractere · majusculă + minusculă + cifră + simbol",
    PasswordChanged: "Parolă actualizată cu succes.",
    SecuritySection: "Securitate",
    SecurityHint: "Schimbă-ți parola periodic pentru a-ți menține contul în siguranță.",
    Loading: "Se încarcă...",

    // Home / landing
    HeroKicker: "Inteligență imobiliară — România",
    StatListings: "Anunțuri",
    StatListingsHint: "Date reale de vânzare și chirie",
    StatCities: "Orașe",
    StatCitiesHint: "Din toată România",
    StatModels: "Modele",
    StatModelsHint: "Ensemble cu stacking",
    HeroCardLocation: "Cluj-Napoca · Gheorgheni",
    HeroCardRooms: "camere",
    TrustedSources: "Construit pe date publice din toată România",
    FeaturesKicker: "De ce funcționează",
    HowItWorksKicker: "Proces",
    HowItWorksSubtitle: "Trei pași de la adresă la o estimare transparentă, bazată pe date.",
    MethodKicker: "Metodologie",
    MethodTitle: "Bazat pe date, nu pe presupuneri",
    MethodData: "117K+ anunțuri reale",
    MethodDataText: "Colectate din 10+ surse de încredere, deduplicate și validate. Actualizate continuu.",
    MethodModels: "Ensemble cu stacking",
    MethodModelsText: "XGBoost, LightGBM și RandomForest combinate într-un meta-model, evaluate prin MAE, RMSE și R².",
    MethodGeo: "Feature-uri geospațiale",
    MethodGeoText: "Distanțe la POI-uri prin OSMnx, comparabile din vecinătate și clasificare teren.",
    TestimonialsKicker: "Voci",

    // Dashboard / customer
    DashboardKicker: "Panoul tău",
    DashboardSubtitle: "Alege o direcție mai jos — sau pornește o estimare nouă acum.",
    DashboardPredictionHint: "Estimează prețul unei proprietăți în sub un minut.",
    DashboardHistoryHint: "Revizuiește estimările salvate de-a lungul timpului.",
    DashboardAnalyticsHint: "Explorează trenduri de piață și insights pe orașe.",
    Start: "Pornește",
    Explore: "Explorează",
    HistoryGuestHint: "Autentifică-te pentru a vedea estimările salvate, a le compara în timp și a urmări mișcările pieței.",
    HistoryKicker: "Arhiva ta",

    // Flow predicție
    PredictionKicker: "Evaluare",
    StepLabel: "Pas",
    AddressHint: "Folosit pentru a ancora predicția pe comparabile stradale reale.",
    ClassificationHint: "Tipul determină ce comparabile sunt luate în calcul.",
    OptionalField: "Opțional",
    AreaHint: "Cel mai important factor pentru estimarea prețului.",
    AdditionalHint: "Opțional — îmbunătățește acuratețea atunci când e disponibil.",
    MapView: "Unde sunt",
    MapViewHint: "Locațiile comparabilelor potrivite din apropierea proprietății țintă.",
    SimilarHint: "Top 5 anunțuri clasate după un scor de similaritate multi-factor.",
    ResultsFootnote: "Estimare bazată pe un ensemble cu stacking: XGBoost, LightGBM și RandomForest.",
    MarketAverage: "Medie piață (€/m²)",
    ModelAccuracy: "Acuratețe model",

    // Footer & navigare
    HowItWorks: "Cum funcționează",
    About: "Despre",
    Contact: "Contact",
    Terms: "Termeni",
    Privacy: "Confidențialitate",
    FooterTagline: "Estimări AI de preț imobiliar pentru toată România. Construit din 117K+ anunțuri reale.",
    Product: "Produs",
    Company: "Companie",
    Analytics: "Analize",
    AllRightsReserved: "Toate drepturile rezervate.",
    MadeIn: "Creat în România",
    DataPoints: "117.000+ puncte de date",

    // AuthShell
    AuthAsideQuote: "Claritatea prețurilor e avantajul tăcut. Fiecare estimare ancorată în datele unei piețe întregi.",
    AuthAsideAttrib: "Metoda Domus",

    // Diverse
    Or: "sau",
    NotFoundTitle: "Această pagină s-a rătăcit",
    GoHome: "Acasă",
};

export * from "./types";

export default ro;
