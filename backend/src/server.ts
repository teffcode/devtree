import express from "express";
import "dotenv/config";
import router from "./router";
import { connectDB } from "./config/db";

const app = express();
connectDB();

app.use(express.json()); // Leer datos del body en POST

app.use("/", router);

export default app;
