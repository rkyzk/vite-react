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
import PrivateRoute from "./components/PrivateRote";
import { Toaster } from "react-hot-toast";
import { Fragment } from "react";
import Product from "./components/Product";

function App() {
  return (
    <Fragment>
      <Router>
        <div className="bg-neutral-100 min-h-screen mt-0 pt-3">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirm" element={<PaymentConfirmation />} />
            </Route>
            <Route path="/product/:id" element={<Product />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <Toaster position="top-center" duration="4000" />
    </Fragment>
  );
}

export default App;
