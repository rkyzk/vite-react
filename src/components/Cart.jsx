import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.carts.cart);
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );

  return (
    <div className="px-2 max-w-7xl mx-auto w-full lg:w-9/12 mt-2">
      {!cart.length ? (
        <p className="w-30 m-auto">No items in cart</p>
      ) : (
        <>
          <div className="flex w-full md:w-10/12">
            <span className="w-1/12">index</span>
            <span className="w-5/12">product</span>
            <span className="w-2/12">quantity</span>
            <span className="w-2/12">unit price</span>
          </div>
          <hr className="mt-1" />
          <div>
            {cart.map((item, idx) => {
              let data = { ...item, idx: idx };
              return <CartItem key={idx} {...data} />;
            })}
          </div>
          <hr className="mt-3" />
          <div className="flex justify-end">
            <div className="mr-6">
              <span className="text-xl block">Sub Total: {totalPrice}</span>
              <Link
                to="/checkout"
                className="no-underline block mt-1 bg-amber-700 text-white
              py-1 px-3 rounded-lg w-48 hover: opacity-70"
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
