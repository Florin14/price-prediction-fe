export interface Section {
    id?: number;
    name: string;
    isDefault?: boolean;
    canBeDeleted?: boolean;
}

export interface SectionsStore {
    items: Section[] | null;
    quantity: number;
}

export interface FetchSectionsResponse {
    items: Section[];
    quantity: number;
}

export interface FetchSectionResponse {
    id: number;
    name: string;
    isDefault: boolean;
}

export interface AddSectionPayload {
    name: string;
}

export interface SectionModel {
    id: number;
    name: string;
    isDefault: boolean;
}

export interface EditSectionPayload {
    name: string;
}

export interface FetchSectionsArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
