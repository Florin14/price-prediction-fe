import { FileType } from "../generic";

export interface LegalEntityProfile {
    id: number;
    companyName: string;
    representativeName: string;
    phoneNumber: string | null;
    email: string | null;
    cui: string | null;
    registerNumber: string | null;
    address: string | null;
    taxCertificate: FileType;
    otherDocuments: FileType[];
}

export interface LegalEntityProfileResponse {
    id: number;
    companyName: string;
    representativeName: string;
    phoneNumber: string | null;
    email: string | null;
    cui: string | null;
    registerNumber: string | null;
    address: string | null;
    taxCertificate: FileType;
    otherDocuments: FileType[];
}
