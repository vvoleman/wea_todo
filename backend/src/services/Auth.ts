import bcrypt from "bcrypt";
import {LoggedInRequest, UserTokenInfo} from "@/middlewares/UserLoggedMiddleware";
import express from "express";
import JWTGenerator from "@/services/JWTGenerator";

export default class Auth {

    public static hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    public static comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    public static getUserTokenInfo(req: LoggedInRequest): UserTokenInfo {
        const user = req.user as UserTokenInfo

        if ('id' in user && 'email' in user) {
            return user
        }

        throw new Error('User token info is not valid')
    }

    public static setTokenCookie(res: express.Response, token: string): void {
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });
    }

    public static getInfoFromToken(req: express.Request): UserTokenInfo|null {
        const token = req.cookies.token;

        try {
            return JWTGenerator.getInstance().verifyToken(token) as UserTokenInfo;
        } catch (err) {
            return null;
        }
    }

    public static clearTokenCookie(res: express.Response): void {
        res.clearCookie('token');
    }

}