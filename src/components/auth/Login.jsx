import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendLoginRequest } from "../../store/actions";
import Spinner from "../shared/Spinner";

const Login = () => {
  const [data, setData] = useState({
    username: "",
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

  const handleLogin = () => {
    dispatch(sendLoginRequest(data, setLoader, navigate));
  };

  return (
    <>
      <div
        style={{ maxWidth: "450px" }}
        className="mt-3 w-100 px-2 d-flex flex-column m-auto
          align-items-center gap-2"
      >
        <h2>Log in</h2>
        <span>
          Don't have an accout yet? <Link>Register here.</Link>
        </span>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="your username or email"
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
          onClick={() => handleLogin()}
        >
          {loader ? <Spinner /> : <>login</>}
        </button>
      </div>
    </>
  );
};

export default Login;
