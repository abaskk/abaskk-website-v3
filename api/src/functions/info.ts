import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
// import { info } from "console";
import { BlobServiceClient } from "@azure/storage-blob";
import { streamToText } from "../utils/file"

export async function infoTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const connectString: string = process.env.BLOB_CONNECTION_STRING!;
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectString);
    const containerClient = blobServiceClient.getContainerClient("data");
    const blockBlobClient = containerClient.getBlockBlobClient("info.json");
    const downloadResponse = await blockBlobClient.download(0);
    const downloaded = await streamToText(downloadResponse.readableStreamBody);
    return { jsonBody: JSON.parse(downloaded) };
};

app.http('info', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: infoTrigger
});
