import express, { json } from 'express';
import cors from 'cors';

import { routes } from './routes';

const app = express();

app.use(cors());
app.use(json());
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(3333, () =>
  console.log(`🔥 Server started at http://localhost:${port}`)
);
