import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
// import { info } from "console";
import { PermissionsResponseBody } from "../models/permissions";
import { UpdateInfoRequestBody, UpdateInfoResponseBody } from "../models/update";
import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";

export async function updateDataTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {


    let requestBody = await request.json() as UpdateInfoRequestBody;
    const authMiddleWare = axios.create();
    const requestUrl = request.url;
    const authUrl = requestUrl.replace('/modify-data', '/has-permission');
    const authResult = await authMiddleWare.post(`${authUrl}`, {token: requestBody.token});
    const responseData: PermissionsResponseBody = authResult.data;

    let updateRes: UpdateInfoResponseBody = {
        result: false,
        message: "unauthorized access"
    }
    if (!responseData.authenticated){
        return { jsonBody: updateRes};
    }

    const connectString: string = process.env.BLOB_CONNECTION_STRING!;
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectString);
    const containerClient = blobServiceClient.getContainerClient("data");
    const blockBlobClient = containerClient.getBlockBlobClient("info.json");

    // Upload data to the blob
    await blockBlobClient.upload(requestBody.newJson, Buffer.byteLength(requestBody.newJson));
    updateRes.result = true;
    updateRes.message = "success!"
    return { jsonBody: updateRes };

};

app.http('modify-data', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: updateDataTrigger
});