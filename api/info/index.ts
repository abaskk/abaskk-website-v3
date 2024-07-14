import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { data } from "./data";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.res.send(data);
};

export default httpTrigger;
