import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendLogoutRequest } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import BackDrop from "./BackDrop";
import styles from "../../styles/Navbar.module.css";
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
      <div className="text-base text-gray-800 mt-[-1px]" onClick={handleClick}>
        {username}さん
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
      </Menu>
      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
