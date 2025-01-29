import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String
    }
}, { timestamps: true })