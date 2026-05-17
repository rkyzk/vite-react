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
    setTimeout(() => {
      document.addEventListener("mouseup", handleClose);
    }, 200);
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
          className={`${styles.SecondMenuBox} px-2 py-2 absolute w-66.25 h-18.75 top-44 right-3
            md:top-10 md:right-3`}
          style={{
            backgroundColor: "#fff",
            border: "solid 1px #cce",
            zIndex: 3,
          }}
        >
          <Link
            className={`${styles.SecondMenuItem}`}
            style={{ color: "#333", fontSize: "1.1rem" }}
            to="/order-history"
          >
            Order history & Write reviews
          </Link>
          <div
            onClick={handleLogout}
            className={`${styles.SecondMenuItem} cursor-pointer`}
          >
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
