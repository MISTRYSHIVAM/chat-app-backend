import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
}, { timestamp: true })

export const Conversation = mongoose.model('Conversation', conversationSchema);