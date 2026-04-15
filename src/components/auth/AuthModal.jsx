import Login from "./Login";
import Register from "./Register";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/actions";

const AuthModal = () => {
  const { loginOnly } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  /** Close dialog if outside the dialog is clicked. */
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("MuiModal-backdrop")) {
      dispatch(closeModal());
      document.removeEventListener("mouseup", handleCloseModal);
    }
  };
  useEffect(() => {
    // add event listener when mounted.
    document.addEventListener("mouseup", (e) => handleCloseModal(e));
  }, []);

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
