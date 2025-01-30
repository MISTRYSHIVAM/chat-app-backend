import { Router } from "express";
import { addUser, logInUser } from "../controller/user.controller.js";

const router = Router();

router.route('/register').post(addUser);
router.route('/login').post(logInUser);

export default router;