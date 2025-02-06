import mongoose from "mongoose";
import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";
import { User } from "../model/user.model.js";

async function addMessage(req, res) {
    const { conversationId, sender, text } = req.body;

    if (!conversationId || conversationId.trim() == '') {
        return res.json({ statusCode: 400, message: "please provide conversation" });
    }
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return res.json({ statusCode: 400, message: "please provide valid conversationId" });
    }
    if (!sender || sender.trim() == '') {
        return res.json({ statusCode: 400, message: "please provide senderId" });
    }

    const senderUser = await User.findById(sender);

    if (!senderUser) {
        return res.json({ statusCode: 400, message: "provide the correct user" });
    }

    const existedConversation = await Conversation.findById(conversationId)

    if (!existedConversation) {
        return res.json({ statusCode: 409, message: "conversation not exist" });
    }

    const message = await Message.create(req.body);

    const createdMessage = await Message.findById(message._id).populate("sender", "userName");

    if (!createdMessage) {
        return res.json({ statusCode: 501, message: "something went wrong. message not stored" });
    }

    return res.json({ statusCode: 200, message: "messages created and stored", messageData: createdMessage });
}

async function getMessage(req, res) {
    const conversationId = req.params.conversationId;


    const isValidConversation = await Conversation.findById(conversationId)

    if (!isValidConversation) {
        return res.json({ statusCode: 404, message: "conversation not exist" });
    }

    const messages = await Message.find({ conversationId }).populate("sender", "userName");

    if (messages.length === 0) {
        return res.json({ statusCode: 200, message: "no messages" });
    }

    return res.json({ statusCode: 200, message: "messages fetched", messageData: messages });
}

export { addMessage, getMessage };