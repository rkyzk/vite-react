import Login from "./Login";
import Register from "./Register";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/actions";
import styles from "../../styles/AuthModal.module.css";
import { useNavigate } from "react-router-dom";

const AuthModal = () => {
  const { loginOnly, destPath } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** Close dialog if outside the dialog is clicked. */
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("MuiModal-backdrop")) {
      dispatch(closeModal());
      if (destPath in ["/order-history", "/order-confirm"]) {
        navigate("/");
      } else if (destPath === "/checkout") {
        navigate("/cart");
      }
      document.removeEventListener("mouseup", handleCloseModal);
    }
  };

  useEffect(() => {
    // add event listener when mounted.
    document.addEventListener("mouseup", (e) => handleCloseModal(e));
  }, []);

  return (
    <div
      className={`${styles.LoginForm} max-w-112.5 px-3 py-4 border-b-black bg-gray-50
        flex-col mx-auto mt-5`}
    >
      <Login />
      {!loginOnly && <Register />}
    </div>
  );
};

export default AuthModal;
