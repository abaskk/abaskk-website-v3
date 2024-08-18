import * as jwt from 'jsonwebtoken';

export const jwtGenerateAccessToken = (password: string) => {
    return jwt.sign(password, process.env.JWT_SECRET, { expiresIn: '6h' })
}

