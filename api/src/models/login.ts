
export interface LoginRequestBody {
    password: string;
}

export interface LoginResponseBody {
    result: string;
    token: string;
}