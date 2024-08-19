import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
// import { info } from "console";
import { data } from "../tempData/data";
import { PermissionsResponseBody } from "../models/permissions";
import { jwtVerifyAccessToken } from "../auth/jwt";

export async function permissionsTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const authHeader: string | null = request.headers.get("Authorization");
    let result: PermissionsResponseBody = { authenticated: false }
    if (!authHeader){
        return { jsonBody: result };
    }
    const jwtToken: string = authHeader.split(" ")[1];
    result.authenticated = jwtVerifyAccessToken(jwtToken);
    return { jsonBody: result };
};

app.http('has-permission', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: permissionsTrigger
});