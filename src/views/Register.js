import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerRequest } from "../services/AuthService";
import InputGroup from "../components/Forms/Inputs/InputGroup";
import waiterRegister from "../assets/waiterRegister.jpeg";

const schema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().min(8).required(),
  })
  .required();

const Register = () => {
  const [backErrors, setBackErrors] = useState(false);
  const [duplicateErr, setDuplicateErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const setBackEndErrors = (err) => {
    if (err.response.data.errors) {
      return setBackErrors(err?.response?.data.errors);
    }
    if (err.response.data.message?.includes("Duplicate")) {
      return setDuplicateErr(err.response.data.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setBackErrors({});
    setDuplicateErr("");

    setIsSubmitting(true);

    registerRequest(data)
      .then((user) => navigate("/login"))
      .catch((err) => setBackEndErrors(err))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div
      className="logRegMainDiv"
      style={{ backgroundImage: `url(${waiterRegister})` }}
    >
      <div className="logRegInnerDiv">
        <h1 className="">Register</h1>
        <form className="logRegForm" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            label="Email"
            id="email"
            register={register}
            error={backErrors?.email || errors.email?.message}
            type="email"
            duplicateErr={duplicateErr}
          />
          <InputGroup
            label="Name"
            id="name"
            register={register}
            error={backErrors?.name || errors.name?.message}
          />
          <InputGroup
            label="Password"
            id="password"
            register={register}
            error={backErrors?.password || errors.password?.message}
            type="password"
          />
          <button
            className={`mt-3 btn btn-${isSubmitting ? "secondary" : "primary"}`}
          >
            {isSubmitting ? "Creating user..." : "Submit"}
          </button>
        </form>
        <div className="logRegBottom">
          <p>Already registered? </p>
          <Link to="/login" className="logRegBtmBtn">Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
