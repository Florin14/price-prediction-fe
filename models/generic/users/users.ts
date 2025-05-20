export interface User {
    id?: number;
    name: string;
    email: string;
    phoneNumber: string;
    isActive?: boolean;
    section?: any;
}

export interface UsersStore {
    items: User[] | null;
    quantity: number;
}

export interface FetchUsersResponse {
    items: User[];
    quantity: number;
}

export interface FetchUserResponse {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    sectionName: string;
}

export interface AddUserPayload {
    name: string;
    email: string;
    phoneNumber: string;
    section: any;
}

export interface UserModel {
    id?: number;
    name: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    sectionName: string;
}

export interface EditUserPayload {
    name: string;
    phoneNumber: string;
    section: any;
    email: string;
    isActive: boolean;
    sectionName: string;
}

export interface FetchUsersArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}