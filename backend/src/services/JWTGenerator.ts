import Logger from "@/services/Logger";
import jwt, {JwtPayload} from "jsonwebtoken";

export default class JWTGenerator {
    private static instance: JWTGenerator;
    private readonly secret: string;

    private constructor() {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            Logger.instance.error("JWT_SECRET is not set");
            throw new Error("JWT_SECRET is not set");
        }
        this.secret = secret;
    }

    public static getInstance(): JWTGenerator {
        if (!JWTGenerator.instance) {
            JWTGenerator.instance = new JWTGenerator();
        }
        return JWTGenerator.instance;
    }

    public generateToken(id: number, email: string, expiration: string | number = "2h"): string {
        return jwt.sign({id, email}, this.secret, {expiresIn: expiration});
    }

    public verifyToken(token: string): string | JwtPayload {
        return jwt.verify(token, this.secret);
    }
}