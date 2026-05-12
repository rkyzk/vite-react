import React from "react";
import { useLocation } from "react-router-dom";
import styles from "../../styles/MenuColumn.module.css";
import { Link } from "react-router-dom";

const MenuColumn = () => {
  const path = useLocation();
  return (
    <div className={`${styles.MenuCol} flex justify-end`}>
      <div className="flex flex-col w-51 mt-2" id="Menu">
        <h2 style={{ fontSize: "1.2rem", width: "200px" }}>
          Browse by Categories
        </h2>
        <Link
          to={`/products?category=1`}
          style={{ color: "#24e" }}
          className={`${styles.MenuItem}`}
        >
          {path === "/products?category=1" && <span>◆</span>}
          Tulips
        </Link>
        <Link
          to={`/products?category=2`}
          style={{ color: "#24e" }}
          className={`${styles.MenuItem}`}
        >
          {path === "/products?category=2" && <span>◆</span>}
          Hyacinths
        </Link>
        <Link
          to={`/products?category=3`}
          style={{ color: "#24e" }}
          className={`${styles.MenuItem}`}
        >
          {path === "/products?category=3" && <span>◆</span>}
          Crocusses
        </Link>
        <Link
          to={`/products?category=4`}
          style={{ color: "#24e" }}
          className={`${styles.MenuItem}`}
        >
          {path === "/products?category=4" && <span>◆</span>}
          Dahlias
        </Link>
      </div>
    </div>
  );
};

export default MenuColumn;
