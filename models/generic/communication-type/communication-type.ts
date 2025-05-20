import { FileType } from "../generic";

interface Category {
    id: number;
    name: string;
}

export interface CommunicationType {
    id: number;
    name: string | null;
    applicantType: any;
    category: Category | null;
    fillingForm: FileType | null;
    modelFillingForm: FileType | null;
    formInstructions: string | null;
}

export interface CommunicationCategoryResource {
    id: number;
    name: string;
}
