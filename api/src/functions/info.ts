import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
// import { info } from "console";
import { data } from "../tempData/data";

export async function infoTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    return {body: JSON.parse(data)};
};

app.http('info', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: infoTrigger
});
