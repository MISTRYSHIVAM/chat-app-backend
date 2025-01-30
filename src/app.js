import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({ origin: '', credentials: true }));

app.get('/welcome', (req, res) => {
    res.json({ statusCode: 200, message: "Welcome To Deployment Server" })
})

import userRoute from './router/user.router.js';
import conversationRoute from './router/conversation.router.js';
import messageRoute from './router/message.router.js';

app.use('/user', userRoute);
app.use('/user/conversation', conversationRoute);
app.use('/user/message', messageRoute);

export { app };