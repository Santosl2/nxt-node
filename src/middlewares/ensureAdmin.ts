import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request;
    const userRepositories = getCustomRepository(UsersRepositories);

    const { isAdmin } = await userRepositories.findOne(user_id);


    if (isAdmin) {
        return next();
    }

    return response.status(401).json({
        name: "Não autorizado. Usuário não é um admin."
    })
}

