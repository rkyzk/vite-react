import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AuthModal from "./auth/AuthModal";

const PrivateRoute = ({ publicPage = false }) => {
  const auth = useSelector((state) => state.auth);

  if (!publicPage) {
    return auth?.user ? <Outlet /> : <Navigate to="/" />;
  } else {
    return;
  }
};

export default PrivateRoute;
