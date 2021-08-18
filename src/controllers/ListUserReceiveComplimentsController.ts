import { Response, Request } from "express";
import { ListUserReceiveComplimentsService } from "../service/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController {
    async handle(request: Request, response: Response){
        const { user_id } = request;
        
        const listUsersReceive = new ListUserReceiveComplimentsService();

        const compliments = await listUsersReceive.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserReceiveComplimentsController };