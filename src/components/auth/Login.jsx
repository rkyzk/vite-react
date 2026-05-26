import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setModal,
  getUserAddress,
  sendLoginRequest,
  setCommandIdx,
} from "../../store/actions";
import Spinner from "../shared/Spinner";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import styles from "../../styles/AuthModal.module.css";

/**
 * log users in
 */
const Login = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage, page } = useSelector((state) => state.errors);
  const { destPath, loginOnly, error } = useSelector((state) => state.modal);
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
    let result = await dispatch(sendLoginRequest(data, toast, setLoader));
    dispatch(setCommandIdx(0));
    dispatch(getUserAddress());
    result && destPath !== "" ? navigate(destPath) : navigate(path);
    dispatch(setModal(false, "", false));
  };

  // toggle show/hide password, switch between closed/open eye-icons
  const handleShowPassword = (e) => {
    e.preventDefault();
    let elem = document.getElementById("password");
    let eyeIcon = document.getElementById("eye-icon");
    let closedEyeIcon = document.getElementById("closed-eye-icon");
    if (elem.type === "password") {
      elem.type = "text";
      eyeIcon.classList.remove("hidden");
      closedEyeIcon.classList.add("hidden");
    } else {
      elem.type = "password";
      eyeIcon.classList.add("hidden");
      closedEyeIcon.classList.remove("hidden");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="px-2 pt-1 flex flex-col mx-auto mb-5
          items-center"
    >
      <h2 className={`${styles.Text} font-extralight text-center`}>
        {loginOnly ? <>Login</> : <>For Returning Customers</>}
      </h2>
      {errorMessage && page === "login" && (
        <span className="text-sm font-semibold text-red-600">
          {errorMessage}
        </span>
      )}
      {/* In case refresh token has expired
        and the dialog is shown */}
      {error && (
        <span className="text-sm font-semibold text-red-600">
          Please log in again.
        </span>
      )}
      <div className="flex flex-col gap-2 mt-2">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          className={`${styles.Input} bg-white pl-2 py-1 rounded-lg 
            border border-neutral-500 outline-none`}
          onChange={(e) => handleChange(e)}
          autoFocus
        />
        <div className="flex">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            className={`${styles.Input} bg-white pl-2 py-1 rounded-lg border
             border-neutral-500 outline-none`}
            onChange={(e) => handleChange(e)}
          />
          <button
            className="bg-transparent outline-none"
            onClick={(e) => handleShowPassword(e)}
          >
            <FaRegEyeSlash id="closed-eye-icon" className="-ml-6.25" />
            <IoEyeOutline id="eye-icon" className="-ml-6.25 hidden" />
          </button>
        </div>
      </div>
      <button
        type="submit"
        className={`${styles.Button} mt-2 py-1 px-3 text-white`}
        style={{ borderRadius: "5px" }}
      >
        {loader ? <Spinner /> : <>Login</>}
      </button>
    </form>
  );
};

export default Login;
