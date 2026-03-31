import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import {
  clearAuthData,
  setModalCheckout,
  setModalOpen,
} from "../store/actions";

const Cart = ({ cartPage }) => {
  const cart = useSelector((state) => state.carts.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0,
  );
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (auth && auth.user) {
      dispatch(clearAuthData());
      navigate("/checkout");
    } else {
      dispatch(setModalCheckout());
      dispatch(setModalOpen());
    }
  };

  return (
    <div
      className={`px-2 max-w-7xl mx-auto w-full lg:w-9/12 mt-2 ${
        !cartPage && "mt-5"
      }`}
    >
      {!cart.length ? (
        <p className="w-[140px] m-auto">カートは空です。</p>
      ) : (
        <>
          <div className="flex w-full gap-1">
            <span className="w-1/12"></span>
            <span className="w-4/12 font-bold">商品</span>
            <span className="w-2/12 font-bold">数個</span>
            <span className="w-2/12 font-bold">単価</span>
          </div>
          <hr className="mt-1 mx-4" />
          {cart.map((item, idx) => {
            let data = { ...item, idx: idx, cartPage };
            return <CartItem key={idx} {...data} />;
          })}
          <div className="flex w-full mt-3">
            <p className="font-sans font-bold w-7/12 text-right">小計: </p>
            <p
              className={`font-sans font-bold tracking-2 w-2/12 ${cartPage ? "pl-3" : "pl-5"}`}
            >
              &yen;{totalPrice}
            </p>
          </div>
          {cartPage && (
            <div className="flex w-full mt-3 justify-end gap-2 sm:pr-5 md:pr-10">
              <button
                className={`mt-1 bg-stone-700 text-white
                py-1 px-2 sm:mr-8`}
                onClick={() => navigate("/products")}
              >
                買い物を続ける
              </button>
              <button
                className={`mt-1 bg-stone-700 text-white
                py-1 px-2 sm:mr-8`}
                onClick={() => handleCheckout()}
              >
                購入手続きに進む
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
