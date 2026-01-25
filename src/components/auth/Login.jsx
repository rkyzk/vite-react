import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAddress,
  sendLoginRequest,
  setCommandIdx,
} from "../../store/actions";
import Spinner from "../shared/Spinner";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import styles from "../../styles/Auth.module.css";

/**
 * log users in
 */
const Login = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage, page } = useSelector((state) => state.errors);
  const { checkout } = useSelector((state) => state.modal);
  const { loginOnly } = useSelector((state) => state.modal);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const path = useLocation().pathname;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(sendLoginRequest(data, toast, setLoader));
    dispatch(setCommandIdx(0));
    dispatch(getUserAddress());
    checkout ? navigate("/checkout") : navigate(path);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="px-2 pt-1 flex flex-col mx-auto mb-5
          items-center"
    >
      <h2 className={`${styles.Text} font-extralight text-center`}>
        {loginOnly ? <>ログイン</> : <>アカウントをお持ちの方</>}
      </h2>
      {errorMessage && page === "login" && (
        <span className="text-sm font-semibold text-red-600 mt-0">
          {errorMessage}
        </span>
      )}
      <div className="w-80 flex flex-col gap-2 mt-2">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="ユーザ名またはメール"
          className="bg-white pl-2 py-1 rounded-lg border border-neutral-500 outline-none"
          onChange={(e) => handleChange(e)}
        />
        <div className="flex">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="パスワード"
            className="bg-white pl-2 py-1 rounded-lg w-80 border border-neutral-500 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <IoEyeOutline id="eye-icon" className="mt-2 ml-[-25px]" />
        </div>
      </div>
      <button
        type="submit"
        className={`${styles.Button} mt-2 text-white bg-stone-600 hover:bg-stone-300
          hover:opacity-10 py-1 px-3`}
      >
        {loader ? <Spinner /> : <>ログイン</>}
      </button>
    </form>
  );
};

export default Login;
