import dotenv from 'dotenv'
import { app } from './app.js';
import { connectToDb } from './db/index.js';

dotenv.config()
const PORT = process.env.APP_PORT;

app.get('/', (req, res) => {
    res.json({ statusCode: 200, message: "Welcome To Deployment Server" })
})

connectToDb().then(() => {
    app.listen(PORT, () => {
        console.log(`app is runnig in port ${PORT}`);
    });
}).catch(err => {
    console.log("MongoDb connection error");
})