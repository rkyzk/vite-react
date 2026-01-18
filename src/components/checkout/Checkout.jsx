import StripePayment from "./StripePayment";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddressList from "./AddressList";
import Cart from "../Cart";
import {
  createClientSecret,
  sendRefreshJwtTokenRequest,
  sendLogoutRequest,
  setModalLogin,
  setModalOpen,
} from "../../store/actions";

export const Checkout = () => {
  const auth = useSelector((state) => state.auth);
  const clientSecret = auth?.clientSecret;
  const [billAddrCheck, setBillAddrCheck] = useState(true);
  const cart = useSelector((state) => state.carts.cart);
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.errors);
  const commandIdx = auth?.commandIdx;

  // ログインしていない時はログインダイアログを表示
  // if (auth === null) {
  //   setOpen(true);
  // }
  const props = {
    billAddrCheck,
    setBillAddrCheck,
  };
  const stripePaymentProps = {
    billAddrCheck,
  };

  useEffect(() => {
    const getClientSecret = async () => {
      !clientSecret && auth?.user && dispatch(createClientSecret());
    };
    const refreshJwtToken = async () => {
      await dispatch(sendRefreshJwtTokenRequest());
    };
    const logoutUser = async () => {
      // refreshTokenが有効期限切れの時はログアウトしてログイン画面を表示
      dispatch(sendLogoutRequest(auth.user.id, null, null));
      // ログインダイアログのみ表示（アカウント登録ダイアログは非表示）
      await dispatch(setModalLogin());
      dispatch(setModalOpen());
    };
    if (commandIdx === 0) getClientSecret();
    if (commandIdx === 1) refreshJwtToken(); // JWTが期限切れの時、更新をリクエスト
    if (commandIdx === 2) logoutUser(); // refreshTokenが期限切れの時、ユーザをログアウトする
  }, [commandIdx]);

  return (
    <>
      {cart.length > 0 ? (
        <>
          <AddressList props={props} />
          <Cart />
          <StripePayment stripePaymentProps={stripePaymentProps} />
        </>
      ) : (
        <div className="w-full">
          <p className="w-[140px] m-auto">カートは空です。</p>
        </div>
      )}
    </>
  );
};

export default Checkout;
