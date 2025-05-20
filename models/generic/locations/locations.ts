interface LocationOption {
    id: number;
    name: string;
}

interface LocationResources {
    locations: LocationOption[] | null;
    lprCameras: LocationOption[] | null;
    karcherDevices: LocationOption[] | null;
}

interface LocationItem {
    id: number;
    name: string;
    address: string;
    avatar: string;
}

interface LocationStore {
    resources: LocationResources;
    locations: LocationItem[] | null;
    quantity: number | null;
}

interface FetchLocationsArgs {
    limit?: number;
    offset?: number;
    locationIds?: string[] | null;
    address?: string | null;
}

interface FetchLocationsResponse {
    items: LocationItem[];
    quantity: number;
}
