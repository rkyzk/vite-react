import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendRegisterRequest } from "../../store/actions";
import Spinner from "../shared/Spinner";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    dispatch(sendRegisterRequest(data, setLoader, navigate));
  };

  return (
    <>
      <div
        style={{ maxWidth: "450px" }}
        className="border mt-3 w-100 px-2 d-flex flex-column m-auto
          align-items-center gap-2"
      >
        <h2>Register</h2>
        <span>
          Have an accout already? <Link to="/login">Login here.</Link>
        </span>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="your username"
          className="w-80 bg-white pl-2 py-1 rounded-lg"
          onChange={(e) => handleChangeData(e)}
        />
        <input
          id="email"
          name="email"
          type="text"
          placeholder="your email"
          className="w-80 bg-white pl-2 py-1 rounded-lg"
          onChange={(e) => handleChangeData(e)}
        />
        <input
          id="password"
          name="password"
          type="text"
          placeholder="password"
          className="w-80 bg-white pl-2 py-1 rounded-lg"
          onChange={(e) => handleChangeData(e)}
        />
        <button
          type="button"
          className="bg-emerald-700 text-white hover:opacity-70 rounded-lg py-1 px-3"
          onClick={() => handleRegister()}
        >
          {loader ? <Spinner /> : <>register</>}
        </button>
      </div>
    </>
  );
};

export default Register;
