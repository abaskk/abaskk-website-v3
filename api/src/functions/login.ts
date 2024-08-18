import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as process from 'process';

export async function loginTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const jwtSecret = process.env.DUMMY;
    context.log(`${jwtSecret}`);
    if (jwtSecret) {
        return { body: "GOOD" };
    }
    return {body: "bad"};
    
};

app.http('login', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: loginTrigger
});