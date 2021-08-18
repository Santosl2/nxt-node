import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthRequest {
    email: string;
    password: string;
}
class AuthenticateUserService {
    async execute({ email, password }: IAuthRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const findUser = await usersRepositories.findOne({
            email
        });

        if (!findUser) {
            throw new Error("Email e senha incorretos.");
        }

        const passwordMatch = await compare(password, findUser.password);

        if (!passwordMatch) {
            throw new Error("Email e senha incorretos.");
        }


        // Loga usuário 

        const token = sign(
            {
                email: findUser.email,
                username: findUser.user
            },
            "1854891370649bb5c79d4f56df382f32", {
                subject: findUser.id,
                expiresIn: "1d"
                }
        );

        return token;

    }
}
export { AuthenticateUserService };