import { Link } from "react-router-dom";

const RegisterView = () => {
  return (
    <>
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
