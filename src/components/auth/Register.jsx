import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendRegisterRequest } from "../../store/actions";
import Spinner from "../shared/Spinner";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Register = (state) => {
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage, page } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const handleRegister = async (data) => {
    let result = await dispatch(
      sendRegisterRequest(data, reset, toast, setLoader, navigate, state)
    );
    if (result) {
      setLoader(false);
      setShow(false);
    } else {
      setLoader(false);
    }
  };

  return (
    <>
      {show && (
        <>
          <hr />
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="mt-4 px-2 d-flex flex-col m-auto
          items-center gap-2"
          >
            <legend className="text-sm text-center">新規アカウント登録</legend>
            {errorMessage && page === "register" && (
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
                placeholder="ユーザ名（英数字3〜20文字）"
                className="w-80 bg-white pl-2 py-1 rounded-lg border-black"
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
                placeholder="メール"
                className="w-80 bg-white pl-2 py-1 rounded-lg border-black"
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
                type="password"
                required
                placeholder="パスワード"
                className="w-80 bg-white pl-2 py-1 rounded-lg border-black"
                {...register("password", {
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/,
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
              className="bg-stone-600 text-white hover:bg-stone-300 hover:text-stone-800
                hover:opacity-50rounded-lg py-1 px-3"
            >
              {loader ? <Spinner /> : <>登録</>}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
