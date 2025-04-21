import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";
import type { RegisterForm } from "../types";

const RegisterView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialValues : RegisterForm = {
    name: "",
    email: "",
    handle:  location?.state?.handle || "",
    password: "",
    password_confirmation: ""
  };

  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues : initialValues });

  const password = watch("password");

  const handleRegister = async (formData : RegisterForm) => {
    try {
      const { data } = await api.post("/auth/register", formData);
      toast.success(data);
      reset();
      navigate("/auth/login");
    } catch (error) {
      if (isAxiosError(error) && error.response ) {
        toast.error(error.response.data.error);
      };
    }
  };

  return (
    <>
      <h1>Crear cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
      >
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            {...register("name", {
              required: "El nombre es obligatorio"
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
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
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div>
          <label htmlFor="handle">Handle</label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            {...register("handle", {
              required: "El Handle es obligatorio"
            })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de registro"
            {...register("password", {
              required: "La constraseña es obligatorio",
              minLength: {
                value: 8,
                message: "La constraseña debe ser de mínimo 8 caracteres"
              }
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div>
          <label htmlFor="password_confirmation">Repetir Contraseña</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Contraseña"
            {...register("password_confirmation", {
              required: "Repetir Contraseña es obligatorio",
              validate: (value) => value === password || "Las contraseñas no son iguales"
            })}
          />

          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
        />
      </form>

      <nav>
        <Link
          to="/auth/login"
        >
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Link>
      </nav>
    </>
  );
};

export default RegisterView;
