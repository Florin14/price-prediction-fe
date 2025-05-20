export interface LegalEntity {
    id?: number;
    cui: string;
    name: string;
    phoneNumber?: string;
    email?: string;
    taxCertificate?: any;
    validationType?: string;
}

export interface LegalEntitiesStore {
    items: LegalEntity[] | null;
    quantity: number;
}

export interface FetchLegalEntitiesResponse {
    items: LegalEntity[];
    quantity: number;
}

export interface FetchLegalEntityResponse {
    id?: number;
    companyName: string;
    cui: string;
    name: string;
    phoneNumber?: string;
    email?: string;
    taxCertificate?: any;
    validationType?: string;
}

export interface LegalEntityModel {
    id?: number;
    companyName: string;
    cui: string;
    name: string;
    phoneNumber?: string;
    email?: string;
    taxCertificate?: any;
    validationType?: string;
}

export interface EditLegalEntityPayload {
    name: string;
}

export interface FetchLegalEntitiesArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
