import { Request, Response } from "express";
import { AuthenticateUserService } from "../service/AuthenticateUserService";


class AuthenticateUserController {
    async handle(request: Request, response: Response){
        const { email, password } = request.body;

        const authService = new AuthenticateUserService();

        const token = await authService.execute({
            email,
            password
        });

        return response.json(token);
    }

}

export { AuthenticateUserController };