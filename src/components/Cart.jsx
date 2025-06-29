import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { getUserAddress } from "../store/actions";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AuthModal from "./auth/AuthModal";

const Cart = () => {
  const cart = useSelector((state) => state.carts.cart);
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const [open, setOpen] = useState(false);

  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.id) {
      dispatch(getUserAddress());
    }
  }, []);

  const handleCheckout = () => {
    user ? navigate("/checkout") : setOpen(true);
  };

  return (
    <div className="px-2 max-w-7xl mx-auto w-full lg:w-9/12 mt-2">
      {!cart.length ? (
        <p className="w-30 m-auto">No items in cart</p>
      ) : (
        <>
          <div className="flex w-full gap-1">
            <span className="w-1/12"></span>
            <span className="w-4/12 font-bold">product</span>
            <span className="w-2/12 font-bold">qty</span>
            <span className="w-2/12 font-bold">unit price</span>
          </div>
          <hr className="mt-1" />
          {cart.map((item, idx) => {
            let data = { ...item, idx: idx };
            return <CartItem key={idx} {...data} />;
          })}
          <div className="flex w-full mt-3">
            <strong className="w-7/12 text-right">sub total: </strong>
            <strong className="w-2/12 pl-3">&yen;{totalPrice}</strong>
          </div>
          <div className="flex w-full mt-3">
            <span className="w-9/12"></span>
            <button
              className="mt-1 bg-amber-900 text-white
                  py-2 px-2 rounded-lg hover:opacity-70 sm:mr-8
                  mx-auto"
              onClick={() => handleCheckout()}
            >
              Proceed to Check out
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <AuthModal state={true} />
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
