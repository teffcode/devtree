import { Router, Request, Response } from "express";
import User from "./models/User";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hola mundo en Express")
});

/** Autenticación y Registro */

router.post("/auth/register", async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
});

export default router;
