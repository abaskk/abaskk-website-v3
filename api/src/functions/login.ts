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
    let match: boolean;
    try{
        match = await bcrypt.compare(requestBody.password, saltedPass);
    }catch{
        return { jsonBody: "bcrypt compare failed" }
    }
    
    let responseBody: LoginResponseBody = 
    {
        result: "invalid",
        token: ""
    }
    if (match){
        responseBody.result = "valid"
        try{
            responseBody.token = jwtGenerateAccessToken(requestBody.password);
        }catch{
            return { jsonBody: "could not generate jwt" }
        }
        
    }
    return { jsonBody: responseBody }
 
};

app.http('login', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: loginTrigger
});