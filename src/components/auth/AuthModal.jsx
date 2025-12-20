import Login from "./Login";
import Register from "./Register";
import { useSelector } from "react-redux";

const AuthModal = () => {
  const { loginOnly } = useSelector((state) => state.modal);
  return (
    <div
      className="max-w-[450px] px-3 py-4 border-b-black bg-gray-50
        flex-col mx-auto mt-5"
    >
      <Login />
      {!loginOnly && <Register />}
    </div>
  );
};

export default AuthModal;
