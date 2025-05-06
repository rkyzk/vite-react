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
          <div className="flex w-full md:w-10/12">
            <span className="w-5/12 pl-11">product</span>
            <span className="w-2/12 pl-2">quantity</span>
            <span className="w-2/12 pl-2">unit price</span>
          </div>
          <hr className="mt-1" />
          <div className="w-full md:w-10/12">
            {cart.map((item, idx) => {
              let data = { ...item, idx: idx };
              return <CartItem key={idx} {...data} />;
            })}
          </div>
          <div className="flex justify-end">
            <div>
              <span className="pr-24">Sub Total: {totalPrice}</span>
              <Link
                to="/checkout"
                className="block mt-3 bg-amber-800 text-white
              py-1 px-3 rounded-lg hover:opacity-70"
              >
                Proceed to Check out
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
