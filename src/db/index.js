import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectToDb() {
    try {
        console.log(process.env.MD_URL)
        const connectionObj = await mongoose.connect(process.env.MD_URL);
        console.log("connected to mongoDb ");
        // console.log(connectionObj.sa)
    } catch (err) {
        console.log("Error " + err);
        process.exit(1);
    }
}