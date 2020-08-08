import express, { json } from 'express';

const app = express();

app.use(json());

const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  return res.json({ Hello: 'World' });
});

app.listen(3333, () =>
  console.log(`🔥 Server started at http://localhost:${port}`)
);
