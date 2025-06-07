import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ publicPage = false }) => {
  const auth = useSelector((state) => state.auth);
  if (publicPage) {
    return auth?.user ? <Navigate to="/" /> : <Outlet />;
  }
  return auth?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
