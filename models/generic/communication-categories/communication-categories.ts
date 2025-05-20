export interface CommunicationCategory {
    id?: number;
    name: string;
    isDefault?: boolean;
    canBeDeleted?: boolean;
}

export default interface CommunicationCategoriesStore {
    items: CommunicationCategory[] | null;
    quantity: number;
}

export interface FetchCommunicationCategoriesResponse {
    items: CommunicationCategory[];
    quantity: number;
}

export interface FetchCommunicationCategoryResponse {
    id: number;
    name: string;
    isDefault: boolean;
}

export interface AddCommunicationCategoryPayload {
    name: string;
}

export interface CommunicationCategoryModel {
    id: number;
    name: string;
    isDefault: boolean;
    canBeDeleted: boolean;
}

export interface EditCommunicationCategoryPayload {
    name: string;
}

export interface FetchCommunicationCategoryArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
