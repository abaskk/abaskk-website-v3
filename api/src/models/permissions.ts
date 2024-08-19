
export interface PermissionsRequestBody {
    token: string | null;
}

export interface PermissionsResponseBody {
    authenticated: boolean;
}