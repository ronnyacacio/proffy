import express from 'express';

import ClassController from './controllers/ClassController';

const routes = express.Router();

routes.post('/classes', ClassController.store);
routes.get('/classes', ClassController.index);

export { routes };
