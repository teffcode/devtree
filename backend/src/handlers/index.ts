import { RequestHandler } from "express";
import slugify from "slugify";
import User from "../models/User";
import { hashPassword, checkPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  // ✨ Ensure that emails are not duplicated
  const userExists = await User.findOne({ email }); // findOne en Mongoose es como un WHERE en SQL

  if (userExists) {
    const error = new Error("Email ya registrado ❌");
    res.status(409).json({ error: error.message });
    return;
  }

  // ✨ Create a unique handle
  const handle = slugify(req.body.handle, {
    lower: true, // pone todo en minúsculas
    strict: true // elimina símbolos raros como @, !, etc.
  });
  const handleExists = await User.findOne({ handle });

  if (handleExists) {
    const error = new Error("Nombre de usuario no disponible ❌");
    res.status(409).json({ error: error.message });
    return;
  }

  // ✨ Create User instance
  const user = new User(req.body);

  // ✨ Hash password · Security purposes
  user.password = await hashPassword(password); // Se pone user.password para que se setee también en la DB las password con el hash.
  user.handle = handle;

  // ✨ Save actions
  await user.save();

  res.status(201).send({ msg: "Registro creado exitosamente 🎉" });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  // ✨ Check if the user is registered
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe ❌");
    res.status(404).json({ error: error.message });
    return;
  }

  // ✨ Check if the password is correct
  const isPasswordCorrect = await checkPassword(password, user.password); // Se pone user.password para que tome el password de la DB con el hash.

  if (!isPasswordCorrect) {
    const error = new Error("Constraseña incorrecta ❌");
    res.status(401).json({ error: error.message }); // 401 no autorizado
    return;
  }

  //const token = generateJWT({ id: user._id });

  //res.send(token);
  res.send("Autenticando...");
};
