import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Products from "./components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderCompleted from "./components/OrderCompleted";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRote";

function App() {
  return (
    <Router>
      <div className="bg-stone-200 min-h-screen mt-0 pt-3">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<PrivateRoute />}></Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/completed" element={<OrderCompleted />} />
          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
