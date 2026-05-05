import { Link, useNavigate } from "react-router-dom";
import { sendLogoutRequest } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import BackDrop from "./BackDrop";
import toast from "react-hot-toast";
import styles from "../../styles/UserMenu.module.css";
import { useState } from "react";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [secondMenuOpen, setSecondMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleClose = () => {
    setTimeout(() => {
      setSecondMenuOpen(false);
      document.removeEventListener("mouseup", handleClose);
    }, 100);
  };

  const handleOpenSecondMenu = () => {
    setSecondMenuOpen(true);
    document.addEventListener("mouseup", handleClose);
  };

  const handleLogout = () => {
    setSecondMenuOpen(false);
    handleClose();
    dispatch(sendLogoutRequest(user.id, navigate, toast));
  };

  return (
    <>
      <button
        className="text-gray-700 hover:text-amber-800 hover:underline hover:bg-transparent"
        onClick={handleOpenSecondMenu}
      >
        <span id="user">{user.username}</span>
      </button>
      {secondMenuOpen && (
        <div
          id="secondMenu"
          className="md:hidden px-2 py-2"
          style={{
            backgroundColor: "#fff",
            width: "265px",
            height: "75px",
            position: "absolute",
            borderRadius: "5px",
            top: 162,
            right: 0,
            zIndex: 3,
            opacity: 0.9,
          }}
        >
          <Link
            className={`${styles.SecondMenuItem}`}
            style={{ color: "#333", fontSize: "1.1rem" }}
            to="/order-history"
          >
            Order history & Write reviews
          </Link>
          <div onClick={handleLogout} className={`${styles.SecondMenuItem}`}>
            <span style={{ fontSize: "1.1rem", marginTop: "5px" }}>
              Log out
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMenu;
