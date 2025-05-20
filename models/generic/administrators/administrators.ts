export interface Administrator {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}

export interface AdministratorsStore {
    items: Administrator[] | null;
    quantity: number;
}

export interface FetchAdministratorsResponse {
    items: Administrator[];
    quantity: number;
}

export interface FetchAdministratorResponse {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}

export interface AddAdministratorPayload {
    email: string;
    name: string;
    phoneNumber?: string;
}

export interface AdministratorModel {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}

export interface EditAdministratorPayload {
    name: string;
    phoneNumber?: string;
}

export interface FetchAdministratorsArgs {
    filter?: string;
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
