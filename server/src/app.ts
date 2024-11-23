import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/AuthRouter";

const app: Application = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api", AuthRouter);


app.get("/healthy", (req: Request, res: Response) => {
    res.json("Healthy Server 💝")
})

export default app;