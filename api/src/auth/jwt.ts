import * as jwt from 'jsonwebtoken';

export const jwtGenerateAccessToken = () => {
    const userName: string = process.env.JWT_USERNAME;
    return jwt.sign({ userName }, process.env.JWT_SECRET, { expiresIn: '6h' })
}

