import { Router } from "express";
import { addUser, getAllUser, getUser, logInUser } from "../controller/user.controller.js";

const router = Router();

router.route('/register').post(addUser);
router.route('/login').post(logInUser);
router.route('/all').get(getAllUser);
router.route('/:id').get(getUser);

export default router;