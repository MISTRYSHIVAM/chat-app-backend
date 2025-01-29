import { Router } from "express";
import { addUser } from "../controller/userController.js";

const router = Router();

router.route('/register').get(addUser);

export default router;