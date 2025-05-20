export interface RouteModel {
    path: string;
    name: string;
    icon: React.ElementType | string; // <-- înlocuiește FC<{}>|null|undefined
    isOnMenu: boolean;
    label?: any | null;
    section?: string | null;
    children?: RouteModel[];
}
