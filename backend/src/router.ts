import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

const router = Router();

// ✨ Test
router.get("/", (req: Request, res: Response) => {
  res.send("Hola mundo en Express")
});

// ✨ Authentication & Registration
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
    .withMessage("La constraseña es muy corta, mínimo 8 caracteres"),
  handleInputErrors,
  createAccount,
);

// ✨ Login
router.post("/auth/login",
  body("email")
    .isEmail()
    .withMessage("Este email no es válido"),
  body("password")
    .notEmpty()
    .withMessage("La constraseña es obligatoria"),
  handleInputErrors,
  login,
);

export default router;
