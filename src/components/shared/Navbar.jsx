import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GiConsoleController, GiPlantsAndAnimals } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Badge } from "@mui/material";
import styles from "../../styles/Navbar.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
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
    setOpen(false);
    document.removeEventListener("mouseup", handleCloseMenu);
    window.removeEventListener("resize", checkMedia);
  };

  /**
   * Open the menu box and add event listeners
   */
  const openMenu = () => {
    setOpen(true);
    document.addEventListener("mouseup", handleCloseMenu);
    window.addEventListener("resize", checkMedia);
  };

  const navbar = (
    <>
      <Link to="/" className={`${styles.Text}`}>
        {path === "/" && <span>*</span>}
        Home
      </Link>
      <Link className={`${styles.Text}`}>About</Link>
      <Link to="/products" className={`${styles.Text}`}>
        {path === "/products" && <span>*</span>}
        Our shop
      </Link>
      <Link to="/contact" className={`${styles.Text}`}>
        Contact
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
          <span className={`${styles.Text} ${styles.cartText}`}> My Cart</span>
        </div>
      </Link>
      {auth?.user && auth.user?.id ? (
        <>
          <UserMenu
            {...auth.user}
            clasName={`${styles.Text} "absolute top-30 right-5"`}
          />
        </>
      ) : (
        <Link to="/login" className={`${styles.Text}`}>
          Login
        </Link>
      )}
    </>
  );

  return (
    <div className="flex justify-between w-full px-8 lg:px-14">
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
  );
};

export default Navbar;
