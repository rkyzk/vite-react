import Login from "./Login";
import Register from "./Register";

const AuthModal = (state) => {
  return (
    <div
      className="max-w-[450px] px-3 py-4 border-b-black bg-gray-50
      flex-col mx-auto mt-5"
    >
      <Login state={state} />
      <Register state={state} />
    </div>
  );
};

export default AuthModal;
