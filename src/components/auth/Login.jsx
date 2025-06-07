import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendLoginRequest } from "../../store/actions";
import Spinner from "../shared/Spinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

/**
 * log users in
 */
const Login = () => {
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
    mode: "onTouched",
  });

  const handleLogin = async (data) => {
    dispatch(sendLoginRequest(data, reset, toast, setLoader, navigate));
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="max-w-md mt-3 w-100 px-2 flex flex-col m-auto
          items-center gap-2"
    >
      <h2>Log in</h2>
      <span>
        Don't have an accout yet? <Link to="/register">Register here.</Link>
      </span>
      {errorMessage && (
        <span className="text-sm font-semibold text-red-600 mt-0">
          {errorMessage}
        </span>
      )}
      <input
        {...register("username")}
        id="username"
        name="username"
        type="text"
        required
        placeholder="your username or email"
        className="w-80 bg-white pl-2 py-1 rounded-lg"
        errors={errors}
      />
      <input
        {...register("password")}
        id="password"
        name="password"
        required
        type="text"
        placeholder="password"
        className="w-80 bg-white pl-2 py-1 rounded-lg"
      />
      <button
        type="submit"
        className="bg-emerald-700 text-white hover:opacity-70 rounded-lg py-1 px-3"
      >
        {loader ? <Spinner /> : <>login</>}
      </button>
    </form>
  );
};

export default Login;
