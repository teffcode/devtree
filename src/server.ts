import express from "express";
import router from "./router";

const app = express();

app.use(express.json()); // Leer datos del body en POST

app.use("/", router);

export default app;
