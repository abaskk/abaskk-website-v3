import * as jwt from 'jsonwebtoken';
import { decode } from 'punycode';

export const jwtGenerateAccessToken = () => {
    const userName: string = process.env.JWT_USERNAME;
    return jwt.sign({ userName }, process.env.JWT_SECRET, { expiresIn: '6h' })
}


export const jwtVerifyAccessToken = (token: string) => {
    try {
        const decoded: string = jwt.verify(token, process.env.JWT_SECRET);
        const userName: string = decoded["username"];
        if (userName != process.env.JWT_USERNAME){
            return false;
        }
        return true;
    } catch(error){
        return false;
    }

}