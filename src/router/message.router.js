import { Router } from "express";
import { addMessage, getMessage } from "../controller/message.controller.js";

const router = Router();

router.route('/add').post(addMessage);
router.route('/:conversationId').get(getMessage);

export default router;