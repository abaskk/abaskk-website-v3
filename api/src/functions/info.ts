import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { data } from "../../data";

export async function info(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    return JSON.parse(data);
};

app.http('info', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: info
});
