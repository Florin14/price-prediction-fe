export interface LegalPersonRegisterInterface {
    companyName: string;
    representativeName: string;
    phoneNumber: string;
    email: string;
    taxCertificate: File | string | null;
}
