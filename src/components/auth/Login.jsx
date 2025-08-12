import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddress, sendLoginRequest } from "../../store/actions";
import Spinner from "../shared/Spinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { clearErrorMessage } from "../../store/actions/index";

/**
 * log users in
 */
const Login = ({ state, setModalOpen }) => {
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
  const path = useLocation().pathname;

  const handleLogin = async (data) => {
    dispatch(clearErrorMessage());
    await dispatch(
      sendLoginRequest(data, reset, toast, setLoader, navigate, state, path)
    );
    dispatch(getUserAddress());
    !state && setModalOpen(false);
  };
  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="px-2 flex flex-col mx-auto mb-5
          items-center"
    >
      <h2>Log in</h2>
      {errorMessage && (
        <span className="text-sm font-semibold text-red-600 mt-0">
          {errorMessage}
        </span>
      )}
      <div className="w-80 flex flex-col gap-2">
        <input
          {...register("username")}
          id="username"
          name="username"
          type="text"
          required
          placeholder="your username or email"
          className="bg-white pl-2 py-1 rounded-lg border-black"
          errors={errors}
        />
        <div className="flex">
          <input
            {...register("password")}
            id="password"
            name="password"
            required
            type="password"
            placeholder="password"
            className="bg-white pl-2 py-1 rounded-lg w-80  border-black"
          />
          <IoEyeOutline id="eye-icon" className="mt-2 ml-[-25px]" />
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 bg-stone-600 text-white hover:bg-stone-300 hover:text-stone-800
          hover:opacity-10 rounded-lg py-1 px-3"
      >
        {loader ? <Spinner /> : <>login</>}
      </button>
    </form>
  );
};

export default Login;
