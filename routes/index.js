import express from "express";
import { registerController } from "../controllers";

const router = express.Router()

router.post('/register',registerController.register )//registerController is register logic which is written in Controller Folder and /register is an api

export default router