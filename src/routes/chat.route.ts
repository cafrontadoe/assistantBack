import { Router } from 'express';
import ChatController from '../controllers/chat.controller';

const chatRouter = Router();
const controller = new ChatController();

chatRouter.get('/', controller.health);
chatRouter.post('/assistant', controller.chatAssistant);

export default chatRouter;
