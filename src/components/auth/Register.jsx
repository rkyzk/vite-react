import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendRegisterRequest,
  clearErrorMessage,
  setModalLogin,
} from "../../store/actions";
import Spinner from "../shared/Spinner";
import toast from "react-hot-toast";
import styles from "../../styles/Auth.module.css";

const Register = () => {
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage, page } = useSelector((state) => state.errors);
  const { checkout } = useSelector((state) => state.modal);
  const [data, setData] = useState({
    regUsername: "",
    regEmail: "",
    regPassword: "",
  });
  const [usernameErrs, setUsernameErrs] = useState(false);
  const [emailErrs, setEmailErrs] = useState(false);
  const [pwErrs, setPwErrs] = useState(false);
  const validateUsername = useCallback(() => {
    if (data.regUsername.length < 3 || data.regUsername.length > 20) {
      setUsernameErrs(true);
      return false;
    } else {
      setUsernameErrs(false);
      return true;
    }
  }, [data]);

  const validateEmail = useCallback(() => {
    if (
      !data.regEmail.match(/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
    ) {
      setEmailErrs(true);
      return false;
    } else {
      setEmailErrs(false);
      return true;
    }
  }, [data]);

  const validatePassword = useCallback(() => {
    if (
      !data.regEmail.match(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/,
      )
    ) {
      setPwErrs(true);
      return false;
    } else {
      setPwErrs(false);
      return true;
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = validateUsername();
    res &= validateEmail();
    res &= validatePassword();
    if (!res) {
      setChecked(true);
      return;
    }
    let result = await dispatch(
      sendRegisterRequest(data, toast, setLoader, navigate, checkout),
    );
    if (result) {
      setLoader(false);
      dispatch(setModalLogin());
    } else {
      setLoader(false);
    }
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  useEffect(() => {
    if (checked) {
      validateUsername();
      validateEmail();
      validatePassword();
    }
  }, [data]);

  return (
    <>
      <hr />
      <form
        onSubmit={handleSubmit}
        className="mt-4 px-2 d-flex flex-col m-auto
          items-center gap-2"
      >
        <h2 className={`${styles.Text} font-extralight text-center`}>
          For New Customers
        </h2>
        {errorMessage && page === "register" && (
          <span className="text-sm font-semibold text-red-600 mt-0">
            {errorMessage}
          </span>
        )}
        <div text="align-left">
          <input
            id="regUsername"
            name="regUsername"
            type="text"
            placeholder="username(3-20 characters)"
            className="w-80 bg-white pl-2 py-1 rounded-lg border border-neutral-500 outline-none"
            onChange={(e) => handleChange(e)}
          />
          {usernameErrs && (
            <div className="text-sm font-semibold text-red-600 mt-1 pl-1">
              Username must be 3-20 characters.
            </div>
          )}
        </div>
        <div text="align-left">
          <input
            id="regEmail"
            name="regEmail"
            type="text"
            placeholder="email"
            className="w-80 bg-white pl-2 py-1 rounded-lg border border-neutral-500 outline-none"
            onChange={(e) => handleChange(e)}
          />
          {emailErrs && (
            <div className="text-sm font-semibold text-red-600 mt-1 pl-1">
              Enter valid email.
            </div>
          )}
        </div>
        <div text="align-left">
          <input
            id="regPassword"
            name="regPassword"
            type="password"
            placeholder="password"
            className="w-80 bg-white pl-2 py-1 rounded-lg border border-neutral-500 outline-none"
            onChange={(e) => handleChange(e)}
          />
          {pwErrs && (
            <div className="w-80 text-sm font-semibold text-red-600 mt-1 pl-1">
              Enter 8-16 characters containing letters and numerals.
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`${styles.Button} mt-2 bg-stone-600 text-white hover:bg-stone-300
                  hover:opacity-10 py-1 px-3`}
        >
          {loader ? <Spinner /> : <>Register</>}
        </button>
      </form>
    </>
  );
};

export default Register;
