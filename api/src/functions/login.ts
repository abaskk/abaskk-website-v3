import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { LoginRequestBody, LoginResponseBody } from "../models/login";
import * as bcrypt from 'bcrypt';
import { jwtGenerateAccessToken } from "../auth/jwt";
// import * as process from 'process';

export async function loginTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    let requestBody = await request.json() as LoginRequestBody;
    const saltedPass = process.env.SALTED_PASS;
    if(!saltedPass){
        return { jsonBody: "could not access salted pass" }
    }
    const match = await bcrypt.compare(requestBody.password, saltedPass);
    let responseBody: LoginResponseBody = 
    {
        result: "invalid",
        token: ""
    }
    if (match){
        responseBody.result = "valid"
        responseBody.token = jwtGenerateAccessToken(requestBody.password);
    }
    return { jsonBody: responseBody }
 
};

app.http('login', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: loginTrigger
});