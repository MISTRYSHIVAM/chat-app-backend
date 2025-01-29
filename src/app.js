import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({ origin: '', credentials: true }));

app.get('/welcome', (req, res) => {
    res.json({ statusCode: 200, message: "Welcome To Deployment Server" })
})

import userRoute from './router/userRouter.js';

app.use('/user', userRoute);

export { app };