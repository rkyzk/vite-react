import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendLogoutRequest } from "../../store/actions";
import { useDispatch } from "react-redux";

const UserMenu = ({ id, username, roles }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseUserMenu = () => {
    setTimeout(() => {
      setOpen(false);
      document.removeEventListener("mouseup", handleCloseUserMenu);
    }, 100);
  };
  const handleOpenUserMenu = () => {
    setOpen(true);
    document.addEventListener("mouseup", handleCloseUserMenu);
  };

  const handleLogout = () => {
    dispatch(sendLogoutRequest(navigate));
  };

  return (
    <>
      <button onClick={() => handleOpenUserMenu()}>Hi {username}!</button>
      {open && (
        <div className="px-3 py-2 d-flex flex-column bg-gray-50 text-slate-700">
          <Link>Profile</Link>
          <Link>Order History</Link>
          <button onClick={() => handleLogout()}>Log out</button>
        </div>
      )}
    </>
  );
};

export default UserMenu;
