import cors from 'cors';
import express from 'express';
import animalRouter from './animal/animal-router'
import breedRouter from './breed/breed-router'
import vaccineRouter from './vaccine/vaccine-router'

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174','https://gfms-admin-dashboard.vercel.app/','https://gfms-admin-dashboard.vercel.app'],
    credentials: true,
  }),
);

app.use(express.static('public'));
app.use(express.json());


app.use('/animals', animalRouter);
app.use('/breeds', breedRouter);
app.use('/vaccines', vaccineRouter);


export default app;
