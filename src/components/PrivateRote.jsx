import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AuthModal from "./auth/AuthModal";

const PrivateRoute = ({ publicPage = false }) => {
  const auth = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);

  if (publicPage) {
    return auth?.user ? <Navigate to="/" /> : <Outlet />;
  }

  const state = false;
  const props = { state, setModalOpen };
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <AuthModal props={props} />
    </Modal>
  );
};

export default PrivateRoute;
