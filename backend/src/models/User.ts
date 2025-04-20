import mongoose, { Schema } from "mongoose";

export interface IUser {
  handle: string,
  name: string,
  email: string,
  password: string,
}

// SCHEMA
const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unque: true, // Para no tener dos usuarios con el mismo email
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
});

// MODEL
const User = mongoose.model<IUser>("User", userSchema);

export default User;
