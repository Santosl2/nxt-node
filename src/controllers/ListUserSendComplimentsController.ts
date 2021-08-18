import { Response, Request } from "express";
import { ListUserSendComplimentsService } from "../service/ListUserSendComplimentsService";


class ListUserSendComplimentsController {
    async handle(request: Request, response: Response){
        const { user_id } = request;
        
        const listUsersSend = new ListUserSendComplimentsService();

        const compliments = await listUsersSend.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserSendComplimentsController };