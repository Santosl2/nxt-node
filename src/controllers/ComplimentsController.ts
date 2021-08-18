import { Request, Response } from "express";
import { ComplimentsService } from "../service/ComplimentsService";

class ComplimentsController {

    async handle(request: Request, response: Response) {
        const { tag_id,
            user_receiver,
            message } = request.body;

            const { user_id } = request;
        const createComplimentService = new ComplimentsService();

        const createCompliment = await createComplimentService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message
        });

        return response.json(createCompliment);
    }
}

export { ComplimentsController };