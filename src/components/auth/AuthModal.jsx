import Login from "./Login";
import Register from "./Register";

const AuthModal = ({ props }) => {
  const { state, setModalOpen } = props;
  return (
    <div
      className="max-w-[450px] px-3 py-4 border-b-black bg-gray-50
      flex-col mx-auto mt-5"
    >
      <Login props={props} />
      <Register state={state} />
    </div>
  );
};

export default AuthModal;
