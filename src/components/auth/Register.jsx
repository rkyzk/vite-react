import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendRegisterRequest, clearErrorMessage } from "../../store/actions";
import Spinner from "../shared/Spinner";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Register = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const handleRegister = async (data) => {
    dispatch(clearErrorMessage());
    dispatch(sendRegisterRequest(data, reset, toast, setLoader, navigate));
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-100 border mt-3 px-2 d-flex flex-col m-auto
          items-center gap-2"
    >
      <h2>Register</h2>
      <span>
        Have an accout already? <Link to="/login">Login here.</Link>
      </span>
      {errorMessage && (
        <span className="text-sm font-semibold text-red-600 mt-0">
          {errorMessage}
        </span>
      )}
      <div text="align-left">
        <input
          id="username"
          name="username"
          type="text"
          required
          placeholder="your username"
          className="w-80 bg-white pl-2 py-1 rounded-lg"
          {...register("username", {
            pattern: {
              value: /^([a-zA-Z0-9]){3,20}$/,
              message: "Username must be 3 to 20 characters",
            },
          })}
        />
        {errors.username?.message && (
          <div className="text-sm font-semibold text-red-600 mt-1 pl-1">
            {errors.username.message}
          </div>
        )}
      </div>
      <div text="align-left">
        <input
          id="email"
          name="email"
          type="text"
          required
          placeholder="your email"
          className="w-80 bg-white pl-2 py-1 rounded-lg"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
              message: "Email format is not valid",
            },
          })}
        />
        {errors.email?.message && (
          <div className="text-sm font-semibold text-red-600 mt-1 pl-1">
            {errors.email.message}
          </div>
        )}
      </div>
      <div text="align-left">
        <input
          id="password"
          name="password"
          type="text"
          required
          placeholder="password"
          className="w-80 bg-white pl-2 py-1 rounded-lg"
          {...register("password", {
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/,
              message:
                "Password must be 8 to 16 characters long\nand include at least an alphabet, a number,\nand a special character.",
            },
          })}
        />
        {errors.password?.message && (
          <div className="w-80 text-sm font-semibold text-red-600 mt-1 pl-1">
            {errors.password.message}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-emerald-700 text-white hover:opacity-70 rounded-lg py-1 px-3"
      >
        {loader ? <Spinner /> : <>register</>}
      </button>
    </form>
  );
};

export default Register;
