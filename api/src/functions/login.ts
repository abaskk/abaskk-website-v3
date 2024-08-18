import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as process from 'process';

export async function loginTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const jwtSecret = process.env.DUMMY;
    return { body: jwtSecret };
};

app.http('login', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: loginTrigger
});