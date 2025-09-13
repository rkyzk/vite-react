import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AuthModal from "./auth/AuthModal";

const Cart = () => {
  const cart = useSelector((state) => state.carts.cart);
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const [modalOpen, setModalOpen] = useState(false);

  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const navigate = useNavigate();

  const handleCheckout = () => {
    user ? navigate("/checkout") : setModalOpen(true);
  };
  const state = true;
  const props = { state, setModalOpen };

  return (
    <div className="px-2 max-w-7xl mx-auto w-full lg:w-9/12 mt-2">
      {!cart.length ? (
        <p className="w-[250px] m-auto">カートは空です。</p>
      ) : (
        <>
          <div className="flex w-full gap-1">
            <span className="w-1/12"></span>
            <span className="w-4/12 font-bold">商品</span>
            <span className="w-2/12 font-bold">数個</span>
            <span className="w-2/12 font-bold">単価</span>
          </div>
          <hr className="mt-1" />
          {cart.map((item, idx) => {
            let data = { ...item, idx: idx };
            return <CartItem key={idx} {...data} />;
          })}
          <div className="flex w-full mt-3">
            <strong className="w-7/12 text-right">合計: </strong>
            <strong className="w-2/12 pl-3">&yen;{totalPrice}</strong>
          </div>
          <div className="flex w-full mt-3 justify-end sm:pr-5 md:pr-10">
            <button
              className={`mt-1 bg-stone-700 text-white
                  py-1 px-2 sm:mr-8`}
              onClick={() => handleCheckout()}
            >
              購入手続きに進む
            </button>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <AuthModal props={props} />
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
