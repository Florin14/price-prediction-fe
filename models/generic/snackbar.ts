interface SnackbarStore {
    message: string;
    type: string;
    open: boolean;
    hideDuration: number;
}

interface SnackbarPayload {
    message: string;
    type: string;
}
