import { Router } from "express";
import { addConversation, getConversation } from "../controller/conversation.controller.js";

const router = Router();

router.route('/create').post(addConversation);
router.route('/:userId').post(getConversation);

export default router