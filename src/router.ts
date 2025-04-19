import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hola mundo en Express")
});

/** Autenticación y Registro */

router.post("/auth/register", (req: Request, res: Response) => {
  console.log(req.body);
});

export default router;
