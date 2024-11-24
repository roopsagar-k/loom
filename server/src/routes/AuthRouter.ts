import { Router } from "express";
import { registerUser } from "../controllers/authControllers";

const AuthRouter = Router();

AuthRouter.route("/register").post(registerUser);

export default AuthRouter;
