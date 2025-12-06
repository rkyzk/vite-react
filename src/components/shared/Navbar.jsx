import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Badge } from "@mui/material";
import styles from "../../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function Navbar({ setModalOpen }) {
  const cart = useSelector((state) => state.carts.cart);
  const cartItemsQty = cart ? cart.length : 0;
  const path = useLocation().pathname;
  const auth = useSelector((state) => state.auth);

  const closeMenu = (e) => {
    if (e.target.id !== "user") {
      let menu = document.getElementById("menuItems");
      setTimeout(() => {
        menu.classList.add("hidden");
        document.removeEventListener("mouseup", closeMenu);
      }, 100);
    }
  };

  const handleSetMenuOpen = () => {
    let menu = document.getElementById("menuItems");
    menu.classList.remove("hidden");
    document.addEventListener("mouseup", closeMenu);
  };

  const menuItems = (
    <div className="flex-col md:flex md:flex-row md:gap-x-[25px]">
      <div>
        <Link to="/" style={{ color: "#333" }}>
          {path === "/" && <span>◆</span>}
          ホーム
        </Link>
      </div>
      <div className={`${styles.menuItems}`}>
        <Link to="/products" style={{ color: "#333" }}>
          {path === "/products" && <span>◆</span>}
          商品
        </Link>
      </div>
      <div className={`${styles.menuItems}`}>
        <Link to="/contact" style={{ color: "#333" }}>
          {path === "/contact" && <span>◆</span>}
          問い合わせ
        </Link>
      </div>
      <div className={`${styles.menuItemCart}`}>
        <Link to="/cart" style={{ color: "#333" }}>
          <div className="flex gap-3">
            <Badge
              showZero
              badgeContent={cartItemsQty}
              overlap="circular"
              color="primary"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <FaShoppingCart size={25} />
            </Badge>
          </div>
        </Link>
      </div>
      {auth?.user && auth.user?.id ? (
        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 0 }}>
            <UserMenu {...auth.user} clasName="absolute top-30 right-5" />
          </IconButton>
        </Box>
      ) : (
        <Button
          onClick={() => setModalOpen(true)}
          style={{
            color: "#333",
            fontSize: "1rem",
            marginTop: "-13px",
            fontWeight: "400",
          }}
          className={`${styles.loginBtn}`}
        >
          ログイン
        </Button>
      )}
    </div>
  );

  return (
    <AppBar style={{ backgroundColor: "#f2f2f2" }}>
      <Container maxWidth="xl" className="flex">
        <Link to="/" className="flex items-center font-bold">
          <GiPlantsAndAnimals
            className="mr-2 text-3xl"
            style={{ color: "#500" }}
          />
          <h1 className="font-[Ole] font-bold" style={{ color: "#500" }}>
            Wild Blossom Garden
          </h1>
        </Link>
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: 2,
            justifyContent: "end",
          }}
          className="flex md:hidden"
        >
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={handleSetMenuOpen}
            style={{ color: "#500" }}
          >
            <RxHamburgerMenu className="text-lg" />
          </Button>
        </Box>
        <div
          id="menuItems"
          className={`${styles.menuBox} hidden px-3 py-2`}
          style={{
            backgroundColor: "#fff",
            width: "120px",
            height: "160px",
            position: "absolute",
            top: 50,
            right: 40,
            zIndex: 3,
            opacity: 0.9,
          }}
        >
          {menuItems}
          {/* burgerMenu */}
        </div>
        <Box
          sx={{
            flexGrow: 1,
            gap: 2,
            marginLeft: 4,
            marginTop: 2,
            fontFamily: "sans-serif",
          }}
          className="hidden md:flex md:justify-end"
        >
          {menuItems}
        </Box>
      </Container>
    </AppBar>
  );
}
export default Navbar;
