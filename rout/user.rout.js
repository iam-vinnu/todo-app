import express from "express"
import { register } from "../controller/user.controller.js ";
import { login } from "../controller/user.controller.js";


const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);

export default router;