import express from "express";
import {
  loginController,
  refreshController,
  registerController,
  userController,
} from "../controllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerController.register); //registerController is register logic which is written in Controller Folder and /register is an api
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);
export default router;
