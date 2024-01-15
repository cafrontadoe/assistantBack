import { Router } from 'express';
import HealthController from '../controllers/health.controller';

const healthRouter = Router();
const controller = new HealthController();

healthRouter.get('/', controller.health);

export default healthRouter;
