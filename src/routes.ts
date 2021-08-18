import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ComplimentsController } from "./controllers/ComplimentsController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentsController = new ComplimentsController();
const listUserReceive = new ListUserReceiveComplimentsController();
const listUserSend = new ListUserSendComplimentsController();


router.post("/users", createUserController.handle);
router.post("/auth", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, complimentsController.handle);
router.post("/createTag", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get("/listReceive", ensureAuthenticated, listUserReceive.handle);
router.get("/listSend", ensureAuthenticated, listUserSend.handle);

export { router };