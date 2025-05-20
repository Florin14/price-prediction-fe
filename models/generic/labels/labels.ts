export interface Label {
    id?: number;
    name: string;
}

export default interface LabelsStore {
    items: Label[] | null;
    quantity: number;
}

export interface FetchLabelsResponse {
    items: Label[];
    quantity: number;
}

export interface FetchLabelResponse {
    id: number;
    name: string;
}

export interface AddLabelPayload {
    name: string;
}

export interface LabelModel {
    id: number;
    name: string;
}

export interface EditLabelPayload {
    name: string;
}

export interface FetchLabelArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
