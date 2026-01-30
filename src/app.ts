import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { notFound } from "./middleware/notFound";
import errorHandler from "./middleware/globalErrorHandler";
import {  categoryRouter } from "./modules/category/category.router";

const app: Application = express();


app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}))
app.use(express.json());

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use("/category",categoryRouter);

app.get("/", (req, res) => {
    res.send("Hello, World from SkillBridge");
});

app.use(notFound);
app.use(errorHandler);


export default app;