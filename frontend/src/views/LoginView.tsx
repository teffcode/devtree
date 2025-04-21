import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";
import { LoginForm } from "../types";

export default function LoginView() {
  const navigate = useNavigate()
  const initialValues: LoginForm = {
    email: "",
    password: ""
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData);
      localStorage.setItem("AUTH_TOKEN", data);
      navigate("/admin");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  }

  return (
    <>
      <h1>Iniciar Sesión</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        noValidate
      >
        <div>
          <label htmlFor="email">Correo:</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div>
          <label htmlFor="password">Constraseña:</label>
          <input
            id="password"
            type="password"
            placeholder="Constraseña de Registro"
            {...register("password", {
              required: "La constraseña es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
        />
      </form>

      <nav>
        <Link
          to="/auth/register"
        >
          ¿No tienes cuenta? Crea una aquí
        </Link>
      </nav>
    </>
  )
};
