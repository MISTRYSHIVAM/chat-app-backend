import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'
    },
    sender: {
        type: String
    },
    text: {
        type: String
    }
}, { timpestamp: true })

export const Message = mongoose.model('Message', messageSchema);