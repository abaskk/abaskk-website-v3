import * as jwt from 'jsonwebtoken';
import { decode } from 'punycode';
// 

export const jwtGenerateAccessToken = () => {
    const userName: string = process.env.JWT_USERNAME;
    // https://stackoverflow.com/questions/77612816/azure-static-web-app-jwt-token-generation
    return jwt.sign({ 'username': userName }, process.env.JWT_SECRET, { expiresIn: '6h', notBefore: 0 })
}


export const jwtVerifyAccessToken = (token: string) => {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userName: string = decoded["username"];
    if (userName != process.env.JWT_USERNAME){
            return false;
    }
    return true;

}