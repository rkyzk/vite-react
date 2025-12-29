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
import { Toaster } from "react-hot-toast";
import Product from "./components/Product";
import Modal from "@mui/material/Modal";
import AuthModal from "./components/auth/AuthModal";
import { closeModal } from "./store/actions";
import { useSelector } from "react-redux";

function App() {
  const { open } = useSelector((state) => state.modal);

  return (
    <>
      <Router>
        <div className="bg-neutral-100 min-h-screen pt-20">
          <div style={{ minHeight: "70vh" }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart cartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirm" element={<PaymentConfirmation />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <Modal open={open} onClose={closeModal}>
          <AuthModal />
        </Modal>
      </Router>
      <Toaster position="top-center" duration="4000" />
    </>
  );
}

export default App;
