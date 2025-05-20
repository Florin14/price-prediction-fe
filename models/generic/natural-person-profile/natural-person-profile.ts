import { FileType } from "../generic";

export interface NaturalPersonProfile {
    id: number;
    name: string;
    phoneNumber: string | null;
    email: string | null;
    cnp: string | null;
    cnpSeries: string | null;
    cnpNumber: string | null;
    address: string | null;
    issuedBy: string | null;
    identityCardExpiryDate: string | null;
    identityCard: FileType;
    otherDocuments: FileType[];
}

export interface NaturalPersonProfileResponse {
    id: number;
    name: string;
    phoneNumber: string | null;
    email: string | null;
    cnp: string | null;
    cnpSeries: string | null;
    cnpNumber: string | null;
    address: string | null;
    issuedBy: string | null;
    identityCardExpiryDate: string | null;
    identityCard: FileType;
    otherDocuments: FileType[];
}
