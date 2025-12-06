import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Products from "./components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import AuthModal from "./components/auth/AuthModal";
import { Toaster } from "react-hot-toast";
import Product from "./components/Product";
import { useState } from "react";
import Modal from "@mui/material/Modal";

function App() {
  // ログインダイアログ
  const [modalOpen, setModalOpen] = useState(false);
  // カートページの「購入手続きに進む」クリック時にログインした際はフラグをtrueにする。
  const [checkoutFlg, setCheckoutFlg] = useState(false);
  return (
    <>
      <Router>
        <div className="bg-neutral-100 pt-15">
          <div className="min-h-10/12">
            <Navbar setModalOpen={setModalOpen} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    setModalOpen={setModalOpen}
                    setCheckoutFlg={setCheckoutFlg}
                  />
                }
              />
              <Route
                path="/checkout"
                element={<Checkout setModalOpen={setModalOpen} />}
              />
              <Route path="/order-confirm" element={<PaymentConfirmation />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <AuthModal setModalOpen={setModalOpen} checkoutFlg={checkoutFlg} />
        </Modal>
      </Router>
      <Toaster position="top-center" duration="4000" />
    </>
  );
}

export default App;
