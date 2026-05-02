import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendLogoutRequest } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import BackDrop from "./BackDrop";
import toast from "react-hot-toast";

const UserMenu = ({ id, username, roles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    dispatch(sendLogoutRequest(id, navigate, toast));
  };

  return (
    <div>
      <div style={{ fontSize: "1.1rem" }} className="-mt-0.75">
        <button
          id="user"
          className="text-gray-700 hover:text-amber-800 hover:underline hover:bg-transparent"
          onClick={handleClick}
        >
          <span>{username}</span>
        </button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="-ml-3.75 mt-2"
      >
        <MenuItem onClick={handleClose}>
          <Link style={{ color: "#333" }} to="/order-history">
            Order history & Write reviews
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <span>Log out</span>
        </MenuItem>
      </Menu>
      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
