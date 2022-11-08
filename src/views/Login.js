import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login as loginRequest } from "../services/AuthService";
import { useAuthContext } from "../contexts/AuthContext";
import InputGroup from '../components/Forms/Inputs/InputGroup'
import waiterLogin from '../assets/waiterLogin.jpeg'

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const { login } = useAuthContext();

  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setError(undefined);
    setIsSubmitting(true);

    loginRequest(data)
      .then((response) => {
        login(response.access_token, () => navigate(from, { replace: true }));
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="logRegMainDiv" style={{backgroundImage: `url(${waiterLogin})`}}>
      <div className="logRegInnerDiv">
        <h1 className="">Login</h1>
        <form className="logRegForm" onSubmit={handleSubmit(onSubmit)} >
          <InputGroup
            label="Email"
            id="email"
            register={register}
            error={errors.email?.message}
            type="email"
          />
          <InputGroup
            label="Password"
            id="password"
            register={register}
            type="password"
            error={error || errors.password?.message}
          />
          <button className={`mt-3 btn btn-${isSubmitting ? "secondary" : "primary"}`}>
            {isSubmitting ? "Loggin in..." : "Submit"}
          </button>
        </form>
        <div className="logRegBottom">
          <p>Dont have an account? </p>
          <Link to="/register" className='logRegBtmBtn'> Signup Now </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
