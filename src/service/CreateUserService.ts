import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    password: string;
    email: string;

    isAdmin?: boolean;
}

class CreateUserService {
    async execute({ name, email, password }: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories);
        
        if(!email){
            throw new Error("E-mail inválido.");
        }
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists)
        {
            throw new Error("Email já existe.");
        }
        
        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            user: name,
            email,
            password: passwordHash,
            isAdmin: false,
        });

        await usersRepository.save(user);

        return user;

    }
}

export { CreateUserService };