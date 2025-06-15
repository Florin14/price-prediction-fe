import { FileType } from "../generic";

export interface ClientProfile {
    id: number;
    name: string;
    phoneNumber: string | null;
    email: string | null;
}

export interface ClientProfileResponse {
    id: number;
    name: string;
    phoneNumber: string | null;
    email: string | null;
}

export interface EditClientPayload {
    name: string | number | null;
    phoneNumber: string | number | null;
    email: string | number | null;
}
