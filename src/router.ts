import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { createAccount } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hola mundo en Express")
});

// Authentication and Registration
router.post("/auth/register",
  body("handle")
    .notEmpty()
    .withMessage("El handle no puede estar vacio"),
  body("name")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
  body("email")
    .isEmail()
    .withMessage("Este email no es válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto, mínimo 8 caracteres"),
  handleInputErrors,
  createAccount,
);

export default router;
