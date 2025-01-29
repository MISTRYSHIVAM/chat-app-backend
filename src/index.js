import dotenv from 'dotenv'
import { app } from './app.js';
import { connectToDb } from './db/index.js';

dotenv.config()
const PORT = process.env.APP_PORT;

export default (req, res) => {
    res.status(200).send('Hello, world!');
};
connectToDb().then(() => {
    app.listen(PORT, () => {
        console.log(`app is runnig in port ${PORT}`);
    });
}).catch(err => {
    console.log("MongoDb connection error");
})