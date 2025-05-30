import { LanguageDataTypes } from "./ro";

// const en: LanguageDataTypes = {
const en = {

    // Waiting Validation
    WaitingValidationTitle: "Asteapta validare",
    WaitingValidationMessage:
        "Accesul la cont si utilizarea functiilor platformei vor fi disponibile doar dupa validarea contului. Veti fi contactat pentru validarea datelor.",

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
    SignIn: "Intra in cont",
    CreateAccount: "Creaza cont",
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
    PredictRealEstatePrices: "Predict Real Estate Prices",

    //Sidebar categories
    Taxes: "Taxe & impozite",
    CommunicationsComplaints: "Comunicari & sesizari",
    Others: "Altele",

    // Labels for role routes
    ControlPanel: "Panou de control",
    Registry: "Registratura",
    Communications: "Comunicari",
    ValidateAccounts: "Validare conturi",
    ValidAccounts: "Conturi valide",
    ManageCommunications: "Gestionare comunicari",
    ManageUsers: "Gestionare utilizatori",
    Properties: "Proprietati",
    Complaints: "Sesizari",
    Settings: "Setari",

    ReportsAndAnalyzes: "Rapoarte si analiza",
    Admins: "Administratori",
    Profile: "Profil",
    Vehicles: "Flota",
    Visits: "Vizite",
    FileUploadAlertMessage: "Poza incarcata nu este valida",
    OrderBy: "Ordoneaza dupa",

    //Location
    Location: "Locatie",
    Boxes: "Boxe",
    EditLocation: "Editeaza locatie",

    CommunicationTabTitle: "Comunicari",
    ComplaintsTabTitle: "Sesizari",
    LabelsTabTitle: "Definire etichete",
    InputChannelTabTitle: "Definire canale de intrare",
    CategoriesTabTitle: "Categorii comunicari",

    //CommunicationsCategories
    AddCommunicationCategory: "Adauga categorie",
    EditCategory: "Editeaza categorie",
    AddCommunicationCategoryMessage: "Adauga o noua categorie pentru comunicari.",
    CategoryName: "Denumire categorie",
    EditCategoryMessage: "Editeaza categoria selectata.",
    DeleteCategoryTitle: "Sterge categorie",
    DeleteCategoryMessage: "Sunteti sigur ca doriti sa stergeti aceasta categorie?",
    DefineCommunicationCategoriesTable: {
        name: "Categorie",
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

    AddLabel: "Adauga eticheta",
    EditLabel: "Editeaza eticheta",
    AddLabelMessage: "Adauga o noua eticheta.",
    LabelName: "Denumire eticheta",
    EditLabelMessage: "Editeaza eticheta selectata.",
    DeleteLabelTitle: "Sterge eticheta",
    DeleteLabelMessage: "Sunteti sigur ca doriti sa stergeti aceasta eticheta?",
    DefineLabelsTable: {
        name: "Eticheta",
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

    AddInputChannel: "Adauga canal de intrare",
    EditInputChannel: "Editeaza canal de intrare",
    AddInputChannelMessage: "Adauga un nou canal de intrare.",
    InputChannelName: "Denumire canal de intrare",
    EditInputChannelMessage: "Editeaza canalul de intrare selectat.",
    DeleteInputChannelTitle: "Sterge canal de intrare",
    DeleteInputChannelMessage: "Sunteti sigur ca doriti sa stergeti acest canal de intrare?",
    DefineInputChannelsTable: {
        name: "Canal de intrare",
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
                uploadIdentityCard: "Incarca copie buletin",
                identityCardIsRequired: "Copie de buletin este obligatoriu",
            },
            legalPerson: {
                companyName: "Nume companie",
                representativeName: "Nume reprezentant legal",
                phoneNumber: "Telefon reprezentant legal",
                email: "Email",
                uploadTaxCertificate: "Incarca copie certificat fiscal",
                taxCertificateIsRequired: "Copie de certificat fiscal este obligatorie",
            },
        },
    },

    Validation: {
        Required: "Acest camp este obligatoriu",
    },

    UploadFile: "Incarca fisier",

    //Aquabis
    Drivers: "Soferi",
    Mechanics: "Mecanici",
    JobTitle: "Functie",
    RegistrationNumber: "Nr. inmatriculare",
    AutoType: "Tip auto",

    //Website in lucru
    WebsiteInWork: "Website in lucru",
    WebsiteInWorkTitle: "Website in lucru!",
    WebsiteInWorkMessage: "Momentan nu poate fi accesat",

    //Componenta panou de control AQUABIS
    SectorBoss: "[X] sef sector",
    CarEmployee: "[X] impegat auto",
    Driver: "[X] soferi auto",
    MachineMechanic: "[X] mecanici utilaje",
    AutoMechanic: "[X] mecanici auto",

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
        REGISTRY: "REGISTRY",
        TAXES: "TAXES",
        EMPLOYEE: "EMPLOYEE",
        CITIZEN: "CITIZEN",
        GUEST: "GUEST",
        SECRETARY: "SECRETARY",
        MAYOR: "MAYOR",
    },
    RolesPretty: {
        REGISTRY: "Registratura",
        TAXES: "Taxe si impozite",
        EMPLOYEE: "Angajat",
        CITIZEN: "Cetatean cu cont",
        GUEST: "Cetatean fara cont",
        SECRETARY: "Secretar",
        MAYOR: "Primar",
    },

    StyledTableWithHideableCellsTitles: {
        providerName: "Furnizor",
        category1A: "Categ. 1A",
        category1B: "Categ. 1B",
        category1C: "Categ. 1C",
        finalizationDate: "Data finalizare",
        actions: "Actiuni",
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

    HomePageMessage:
        "Descoperiti noua platforma digitala a Primariei comunei Vad, creata pentru a simplifica interactiunea cu cetatenii. Cu aceasta platforma, puteti face cereri si primi raspunsuri prin email, chiar si fara un cont. Daca va inregistrati, puteti urmari statusul cererilor, puteti vedea proprietatile personale si sumele de plata, si accesa un dashboard personalizat.",
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
        cui: { title: "CUI", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        name: { title: "Nume reprezentant", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        phoneNumber: { title: "Telefon reprezentant", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        email: { title: "Email", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
        copyTaxCertificate: { title: "Copie certificate fiscal", style: { color: "#313A47", fontSize: 12, fontWeight: 600, width: 135, minWidth: 75 } },
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

    ComplaintsFilterDrawer: {
        name: "Sesizare",
        applicantType: "Solicitant"
    },

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
            E0030: {
                post: {
                    "/legal-entities/register": "Numele companiei trebuie sa contina intre 3 si 500 de caractere.",
                    "/natural-persons/register": "Numele si prenumele trebuie sa contina intre 3 si 500 de caractere.",
                    default: "Operatiunea contine date invalide.",
                },
                put: {
                    "/legal-entities/[0-9]+": "Numele companiei trebuie sa contina intre 3 si 500 de caractere.",
                    "/natural-persons/[0-9]+": "Numele si prenumele trebuie sa contina intre 3 si 500 de caractere.",
                    default: "Operatiunea contine date invalide.",
                },
            },
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
                post: {
                    "/users/admin": "Numele sau email-ul adminului este prea lung.",
                    "/legal-entities/register": "Numele sau email-ul este prea lung.",
                    "/natural-persons/register": "Numele sau email-ul este prea lung.",
                    default: "Unul dintre campurile entitatii este prea lung.",
                },
                put: {
                    "/users/admin/[0-9]+": "Numele adminului este prea lung.",
                    default: "Unul dintre campurile entitatii este prea lung.",
                },
            },
            E0106: {
                post: {
                    "/input-channel": "Exista deja un canal de intrare cu aceasta denumire.",
                    "/users/admins": "Email-ul adminului este folosit deja.",
                    "/category": "Aceasta categorie exista deja.",
                    "/legal-entities/register": "Adresa de email introdusa apartine deja unui cont existent.",
                    "/natural-persons/register": "Adresa de email introdusa apartine deja unui cont existent.",
                    "/sections": "Acest nume de compartiment este deja utilizat.",
                    default: "Unul dintre campurile entitatii este folosit deja.",
                },
                put: {
                    "/input-channel/[0-9]+": "Exista deja un canal de intrare cu aceasta denumire.",
                    "/legal-entities/[0-9]+": "Numele companiei trebuie sa contina intre 3 si 500 de caractere.",
                    "/natural-persons/[0-9]+": "Numele si prenumele trebuie sa contina intre 3 si 500 de caractere.",
                    "/category": "Aceasta categorie exista deja.",
                    "/sections": "Acest nume de compartiment este deja utilizat.",
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
                post: {
                    "/legal-entities/register": "Formatul fisierului trebuie sa fie .pdf, .jpg, .jpeg sau .png.",
                    "/natural-persons/register": "Formatul fisierului trebuie sa fie .pdf, .jpg, .jpeg sau .png.",
                    default: "Formatul fisierului nu este valid.",
                },
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
    AddComplaint: "",
    EditComplaint: "",
    DeleteComplaintTitle: "",
    DeleteComplaintMessage: "",
    AddComplaintMessage: "",
    EditComplaintMessage: "",
    ComplaintName: "",
    DefineComplaintsTable: {
        name: "Sesizare",
        applicant_type: "Solicitant",
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
    ApplicantType: {
        NATURAL_PERSON: "Persoana fizica",
        LEGAL_PERSON: "Persoana juridica",
        NATURAL_PERSON_AND_LEGAL_PERSON: "Persoana fizica si persoana juridica",
    },
    Applicant: "",
    CommunicationTypeName: "",
    Category: "",
    AddCommunicationForm: "",
    AddCommunicationModelForm: "",
    AddFormInstructions: "",
    Attention: "",
    WarningDeleteSection: "",
};

export default en;
