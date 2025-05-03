import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const cart = useSelector((state) => state.carts.cart);

  return (
    <div className="px-2 max-w-7xl mx-auto w-full lg:w-9/12 mt-2">
      {!cart.length ? (
        <p>No items in cart</p>
      ) : (
        <>
          <div className="flex w-full md:w-10/12">
            <span className="w-1/12">index</span>
            <span className="w-5/12">product</span>
            <span className="w-2/12">quantity</span>
            <span className="w-2/12">unit price</span>
          </div>
          <div>
            {cart.map((item, idx) => {
              return <CartItem key={idx} {...item} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
