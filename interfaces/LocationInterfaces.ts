export interface Box {
    name: string;
    lprCamera: any | null;
    karcherMachine: any | null;
    status: any | null;
}

export interface Location {
    id: number;
    image?: string | null;
    name: string;
    address: string;
    link: string;
    boxes: Box[];
}
