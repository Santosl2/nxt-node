import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    // ignora a primeira
    const [, token] = authToken.split(" ");

    try {
        // FORCAR ESSE VERIFDY A SER PAYLOAD
        const { sub } = verify(token, "1854891370649bb5c79d4f56df382f32") as IPayload;

        request.user_id = sub;

        return next();

    } catch (err) {
        return response.status(401).end();

    }
    // 1854891370649bb5c79d4f56df382f32

}