import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AuthModal from "./auth/AuthModal";

const PrivateRoute = ({ setOpen, publicPage = false }) => {
  const auth = useSelector((state) => state.auth);

  if (publicPage) {
    return auth?.user ? <Navigate to="/" /> : <Outlet />;
  } else {
    return;
  }
};

export default PrivateRoute;
