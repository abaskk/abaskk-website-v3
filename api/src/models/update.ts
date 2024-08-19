export interface UpdateInfoRequestBody {
    newJson:  string;
    token: string;
}

export interface UpdateInfoResponseBody {
    result: boolean;
    message: string;
}