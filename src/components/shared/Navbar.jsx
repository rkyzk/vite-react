import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Badge } from "@mui/material";
import styles from "../../styles/Navbar.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import Modal from "@mui/material/Modal";
import AuthModal from "../auth/AuthModal";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const path = useLocation().pathname;
  const cart = useSelector((state) => state.carts.cart);
  const cartItemsQty = cart ? cart.length : 0;
  // watch window size (menu box needs to close above 768px if open)
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  /**
   * If window size is above 768px, set 'open' false
   */
  const checkMedia = () => {
    if (mediaQuery.matches) {
      setOpen(false);
      window.removeEventListener("resize", checkMedia);
    }
  };

  /**
   * Close menu box and remove event listeners
   */
  const handleCloseMenu = () => {
    setTimeout(() => {
      setOpen(false);
      document.removeEventListener("mouseup", handleCloseMenu);
      window.removeEventListener("resize", checkMedia);
    }, 100);
  };

  /**
   * Open the menu box and add event listeners
   */
  const openMenu = () => {
    setOpen(true);
    document.addEventListener("mouseup", handleCloseMenu);
    window.addEventListener("resize", checkMedia);
  };
  const state = false;
  const props = { state, setModalOpen };

  const navbar = (
    <>
      <Link to="/" className={`${styles.Text}`}>
        {path === "/" && <span>◆</span>}
        ホーム
      </Link>
      <Link to="/products" className={`${styles.Text}`}>
        {path === "/products" && <span>◆</span>}
        商品
      </Link>
      <Link to="/contact" className={`${styles.Text}`}>
        {path === "/contact" && <span>◆</span>}
        問い合わせ
      </Link>
      <Link to="/cart" className={`${styles.Text}`}>
        <div className="flex gap-3">
          <Badge
            showZero
            badgeContent={cartItemsQty}
            overlap="circular"
            color="primary"
            className="mt-1"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <FaShoppingCart size={25} />
          </Badge>
          <span className={`${styles.Text} ${styles.cartText}`}>カート</span>
        </div>
      </Link>
      {auth?.user && auth.user?.id ? (
        <UserMenu
          {...auth.user}
          clasName={`${styles.Text} "absolute top-30 right-5"`}
        />
      ) : (
        <button className={`${styles.Text}`} onClick={() => setModalOpen(true)}>
          ログイン
        </button>
      )}
    </>
  );

  return (
    <>
      <div className="px-2 flex justify-between w-full md:w-11/12 mx-auto">
        <Link
          to="/"
          className={`${styles.Text} flex items-center text-2xl font-bold`}
        >
          <GiPlantsAndAnimals className="mr-2 text-3xl" />
          <h1 className="font-[Ole] font-bold">Wild Blossom</h1>
        </Link>
        <ul className={`${styles.navBarMd}`}>{navbar}</ul>
        <RxHamburgerMenu
          className="mt-2 text-2xl md:hidden"
          onClick={() => openMenu()}
        />
        {open && <ul className={`${styles.navBar}`}>{navbar}</ul>}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AuthModal props={props} />
      </Modal>
    </>
  );
};

export default Navbar;
