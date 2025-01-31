import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

async function addUser(req, res) {
    try {
        const { userName, password } = req.body;
        // console.log(userName);
        if (!userName || userName.trim() === '') {
            return res.json({ statusCode: 400, message: "please enter user name" });
        }

        if (!password || password.trim() === '') {
            return res.json({ statusCode: 400, message: "please enter password" });
        }

        const existedUser = await User.findOne({ userName })

        if (existedUser) {
            return res.json({ statusCode: 409, message: "please enter unique user name" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            userName,
            password: hashPassword
        })

        const cretaedUser = await User.findById(user._id);

        if (!cretaedUser) {
            return res.json({ statusCode: 501, message: "something went wrong. user not created" });
        }

        return res.json({ statusCode: 201, message: "user registered sucessfully", userData: cretaedUser });
    } catch (error) {
        // console.log(error)
        return res.json({ statusCode: 501, message: "something went wrong", error });
    }
}

async function logInUser(req, res) {
    try {
        const { userName, password } = req.body;
        // console.log(userName);
        if (!userName || userName.trim() === '') {
            return res.json({ statusCode: 400, message: "please enter user name" });
        }

        if (!password || password.trim() === '') {
            return res.json({ statusCode: 400, message: "please enter password" });
        }

        const user = await User.findOne({ userName })

        if (!user) {
            return res.json({ statusCode: 404, message: "user name not found" });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(password, salt);
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.json({ statusCode: 401, message: "invalid credentails" });
        }

        return res.json({ statusCode: 200, message: "user authenticated successfully", userData: user });
    } catch (error) {
        return res.json({ statusCode: 501, message: "something went wrong", error });
    }
}

export { addUser, logInUser };