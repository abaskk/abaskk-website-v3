
export const streamToText = async (readable): Promise<string> => {
    let data = '';
    // Ensure the encoding is set to 'utf8'
    readable.setEncoding('utf8');

    // Read the stream in chunks
    for await (const chunk of readable) {
        data += chunk;
    }

    return data;
};