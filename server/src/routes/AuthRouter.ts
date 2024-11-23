import { Router } from "express";



const AuthRouter = Router();

AuthRouter.route("/register").post();

export default AuthRouter;