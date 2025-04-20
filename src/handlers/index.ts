import { RequestHandler } from "express";
import slug from "slug";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  // ✨ Ensure that emails are not duplicated
  const userExists = await User.findOne({ email }); // findOne en Mongoose es como un WHERE en SQL

  if (userExists) {
    const error = new Error('Email ya registrado ❌');
    res.status(409).json({ error: error.message });
    return;
  }

  // ✨ Create a unique handle
  const handle = slug(req.body.handle, "");
  const handleExists = await User.findOne({ handle });

  if (handleExists) {
    const error = new Error('Nombre de usuario no disponible ❌');
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
