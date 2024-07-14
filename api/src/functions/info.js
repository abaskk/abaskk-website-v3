const { app } = require('@azure/functions');

app.http('info', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        return { body: `Hello, World` };
    }
});
