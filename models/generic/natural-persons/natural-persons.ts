export interface NaturalPerson {
    id?: number;
    name: string;
    phoneNumber?: string;
    email?: string;
    copyId?: any;
    validationType?: string;
}

export interface NaturalPersonsStore {
    items: NaturalPerson[] | null;
    quantity: number;
}

export interface FetchNaturalPersonsResponse {
    items: NaturalPerson[];
    quantity: number;
}

export interface FetchNaturalPersonResponse {
    id?: number;
    name: string;
    phoneNumber?: string;
    email?: string;
    copyId?: any;
    validationType?: string;
}

export interface NaturalPersonModel {
    id?: number;
    name: string;
    phoneNumber?: string;
    email?: string;
    copyId?: any;
    validationType?: string;
}

export interface EditNaturalPersonPayload {
    name: string;
}

export interface FetchNaturalPersonsArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
