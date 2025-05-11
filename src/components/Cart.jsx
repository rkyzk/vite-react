import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserAddress } from "../store/actions";

const Cart = () => {
  const cart = useSelector((state) => state.carts.cart);
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAddress());
  }, []);

  return (
    <div className="px-2 max-w-7xl mx-auto w-full lg:w-9/12 mt-2">
      {!cart.length ? (
        <p className="w-30 m-auto">No items in cart</p>
      ) : (
        <>
          <div className="flex w-full gap-1">
            <span className="w-1/12"></span>
            <span className="w-4/12">product</span>
            <span className="w-2/12">qty</span>
            <span>unit price</span>
          </div>
          <hr className="mt-1" />
          {cart.map((item, idx) => {
            let data = { ...item, idx: idx };
            return <CartItem key={idx} {...data} />;
          })}
          <div className="flex w-full mt-3">
            <strong className="w-7/12 text-right">sub total: </strong>
            <strong className="w-2/12 pl-3">{totalPrice}</strong>
          </div>
          <div className="flex w-full mt-3 justify-end">
            <Link
              to="/checkout"
              className="block mt-1 bg-amber-800 text-white
                  py-1 px-3 rounded-lg hover:opacity-70 sm:mr-8"
            >
              Proceed to Check out
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
