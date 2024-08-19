import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
// import { info } from "console";
import { data } from "../tempData/data";
import { PermissionsRequestBody, PermissionsResponseBody } from "../models/permissions";
import { jwtVerifyAccessToken } from "../auth/jwt";

export async function permissionsTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // const authHeader: string | null = request.headers.get("Authorization");
    // return { jsonBody: `jwt code error ${authHeader}` };
    let requestBody = await request.json() as PermissionsRequestBody;

    let result: PermissionsResponseBody = { authenticated: false }
    if (!requestBody.token){
        return { jsonBody: "Auth Header not found" };
    }
    try{
        result.authenticated = jwtVerifyAccessToken(requestBody.token);
        return { jsonBody: result };
    }catch{
        return { jsonBody: `jwt code error` };
    }

};

app.http('has-permission', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: permissionsTrigger
});