export interface Listing {

}

export default interface ListingsStore {
    items: Listing[] | null;
    quantity: number;
}

export interface FetchListingsResponse {
    items: Listing[];
    quantity: number;
}

export interface FetchListingResponse {
    id: number;
    name: string;
}

export interface AddListingPayload {
    // name: string;
}

export interface ListingModel {
    id: number;
    name: string;
}

export interface EditListingPayload {
    name: string;
}

export interface FetchListingArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
