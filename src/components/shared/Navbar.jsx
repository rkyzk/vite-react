import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Badge } from "@mui/material";
import styles from "../../styles/Navbar.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const path = useLocation().pathname;
  const cart = useSelector((state) => state.carts.cart);
  const cartItemsQty = cart ? cart.length : 0;
  const cssAttr = [
    "flex-column",
    "block",
    "bg-white",
    "absolute",
    "top-15",
    "right-5",
    "opacity-90",
    "z-[2]",
  ];

  const navbar = (
    <>
      <ul id="menu" className={`${styles.menu} "mt=[4] gap-4 flex visible"`}>
        <li>
          <Link to="/" className={`${styles.Text}`}>
            {path === "/" && <span>*</span>}
            Home
          </Link>
        </li>
        <li>
          <Link className={`${styles.Text}`}>About</Link>
        </li>
        <li>
          <Link to="/products" className={`${styles.Text}`}>
            {path === "/products" && <span>*</span>}
            Our shop
          </Link>
        </li>
        <li>
          <Link to="/contact" className={`${styles.Text}`}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/cart" className={`${styles.Text}`}>
            <Badge
              showZero
              badgeContent={cartItemsQty}
              overlap="circular"
              color="primary"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <FaShoppingCart size={25} />
            </Badge>
            <span className="xs:ml-4 sm:ml-4 md:hidden">Cart</span>
          </Link>
        </li>
        <li>
          <Link className={`${styles.Text}`}>Signin</Link>
        </li>
      </ul>
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
      {navbar}
      <RxHamburgerMenu className="mt-2 text-2xl md:hidden" />
    </div>
  );
};

export default Navbar;
