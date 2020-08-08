import express from 'express';

import ClassController from './controllers/ClassController';
import ConnectionController from './controllers/ConnectionController';

const routes = express.Router();

routes.post('/classes', ClassController.store);
routes.get('/classes', ClassController.index);

routes.post('/connections', ConnectionController.store);
routes.get('/connections', ConnectionController.index);

export { routes };
