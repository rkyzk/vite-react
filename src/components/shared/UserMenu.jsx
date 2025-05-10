import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendLogoutRequest } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import BackDrop from "./BackDrop";
import styles from "../../styles/Navbar.module.css";

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
    dispatch(sendLogoutRequest(navigate));
  };

  return (
    <div>
      <div className={`${styles.Text}`} onClick={handleClick}>
        Hi {username}!
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Order History</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
