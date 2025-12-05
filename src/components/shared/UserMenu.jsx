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
      <div
        id="user"
        className="text-base text-gray-800 mt-[-1px]"
        onClick={handleClick}
      >
        {username}さん
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="ml-[-15px]"
      >
        <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
        <MenuItem>
          <Link style={{ color: "#333" }}>購入履歴・レビュー投稿</Link>
        </MenuItem>
      </Menu>
      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
