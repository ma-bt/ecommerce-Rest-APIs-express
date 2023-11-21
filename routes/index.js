import express from "express";
import { loginController, registerController } from "../controllers";

const router = express.Router()

router.post('/register',registerController.register )//registerController is register logic which is written in Controller Folder and /register is an api
router.post('/login',loginController.login)
export default router