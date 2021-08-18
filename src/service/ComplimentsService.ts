import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentsRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}
class ComplimentsService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentsRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        const userReceiverExists = await usersRepositories.findOne(user_receiver)


        if (user_receiver === user_sender) {
            throw new Error("Você não pode enviar para si mesmo.");
        }

        if (!userReceiverExists) {
            throw new Error("Usuário não existe.");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { ComplimentsService };