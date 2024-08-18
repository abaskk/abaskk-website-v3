
export interface LoginRequestBody {
    password: string;
}

export interface LoginResponseBody {
    data: string;
    token: string;
}