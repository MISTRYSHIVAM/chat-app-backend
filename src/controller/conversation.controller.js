import mongoose from "mongoose";
import { Conversation } from "../model/conversation.model.js";
import { User } from "../model/user.model.js";

async function addConversation(req, res) {
    try {
        const conversation = req.body;

        if (!conversation?.senderId || conversation?.senderId.trim() == '') {
            return res.json({ statusCode: 400, message: "please provide senderId" });
        }

        if (!conversation?.receiverId || conversation?.receiverId.trim() == '') {
            return res.json({ statusCode: 400, message: "please provide receiverId" });
        }

        // if(conversation?.receiverId == conversation?.senderId){
        //     return res.json({ statusCode: 409, message: "senderId and receiverId not be same" });
        // }

        const existedConversation = await Conversation.findOne({ members: { $all: [conversation.senderId, conversation.receiverId] } });

        if (existedConversation) {
            return res.json({ statusCode: 409, message: "conversation already exist" });
        }

        const newConversation = await Conversation.create({
            members: [conversation.senderId, conversation.receiverId]
        });

        const createdConversation = await Conversation.findById(newConversation._id);

        if (!createdConversation) {
            return res.json({ statusCode: 501, message: "something went wrong. conversation can not created" });
        }

        return res.json({ statusCode: 201, message: "conversation created sucessfully", conversationData: createdConversation });

    } catch (error) {
        return res.json({ statusCode: 501, message: "something went wrong", error });
    }

}

async function getConversation(req, res) {
    // console.log("hiii")
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.json({ statusCode: 400, message: "please provide valid userId" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ statusCode: 404, message: "user name not found" });
        }

        if (!req.body?.receiverId) {
            return res.json({ statusCode: 400, message: "please provide receiverId" });
        }

        // const conversations = await Conversation.find({ members: user?._id.toString() }).populate({ "path": "members", "select": "_id userName", "match": { _id: { $ne: userId } } });
        const conversations = await Conversation.find({ members: { $all: [user?._id.toString(), req.body?.receiverId.toString()] } }).populate({ "path": "members", "select": "_id userName", "match": { _id: { $ne: userId } } });
        // console.log(conversations)
        if (conversations.length === 0) {
            return res.json({ statusCode: 200, message: "user has no conversation", hasStartedConversation: false });
        }

        return res.json({ statusCode: 200, message: "user conversation fetched", conversationData: conversations, hasStartedConversation: true });
    } catch (error) {
        return res.json({ statusCode: 501, message: "something went wrong", error });
    }
}

export { addConversation, getConversation };