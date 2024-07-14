import { data } from './data';

module.exports = async function (context, req) {
    //context.res(JSON.parse(data));
    context.res.status(200).send("Hello World");
};