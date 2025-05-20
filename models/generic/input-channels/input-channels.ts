export interface InputChannel {
    id?: number;
    name: string;
}

export default interface InputChannelsStore {
    items: InputChannel[] | null;
    quantity: number;
}

export interface FetchInputChannelsResponse {
    items: InputChannel[];
    quantity: number;
}

export interface FetchInputChannelResponse {
    id: number;
    name: string;
}

export interface AddInputChannelPayload {
    name: string;
}

export interface InputChannelModel {
    id: number;
    name: string;
}

export interface EditInputChannelPayload {
    name: string;
}

export interface FetchInputChannelArgs {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortType?: string;
}
