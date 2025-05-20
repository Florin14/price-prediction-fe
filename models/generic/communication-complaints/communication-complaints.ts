export interface CommunicationComplaint {
    id?: number;
    name: string;
    applicantType: "NATURAL_PERSON" | "LEGAL_PERSON" | "NATURAL_PERSON_AND_LEGAL_PERSON";
}

export default interface CommunicationComplaintsStore {
    items: CommunicationComplaint[] | null;
    quantity: number;
}

export interface FetchCommunicationComplaintsResponse {
    items: CommunicationComplaint[];
    quantity: number;
}

export interface FetchCommunicationComplaintResponse {
    id: number;
    name: string;
}

export interface AddCommunicationComplaintPayload {
    name: string;
    applicantType: "NATURAL_PERSON" | "LEGAL_PERSON" | "NATURAL_PERSON_AND_LEGAL_PERSON";
}

export interface EditCommunicationComplaintPayload {
    name: string;
    applicantType: "NATURAL_PERSON" | "LEGAL_PERSON" | "NATURAL_PERSON_AND_LEGAL_PERSON";
}

export interface FetchCommunicationComplaintArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
