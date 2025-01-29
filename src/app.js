import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({ origin: '', credentials: true }));

app.get('/', (req, res) => {
    res.json({ statusCode: 200, message: "Welcome To Deployment Server" })
})

export { app };