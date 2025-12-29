import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  sendOrder,
  sendOrderWithNewAddresses,
  getUserAddress,
  sendLogoutRequest,
  setModalLogin,
  setModalOpen,
  sendRefreshJwtTokenRequest,
  setCommandIdx,
  setModalCheckout,
} from "../../store/actions";
import AddressCard from "./AddressCard";
import OrderedItemsTable from "./OrderedItemsTable";

const PaymentConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");
  const { cart } = useSelector((state) => state.carts);
  const { errorMessage } = useSelector((state) => state.errors);
  const order = useSelector((state) => state.order.order);
  const { selectedSAddrId, selectedBAddrId, commandIdx, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshJwtToken = async () => {
      await dispatch(sendRefreshJwtTokenRequest());
    };
    const logoutUser = async () => {
      // refreshTokenが有効期限切れの時はログアウトしてログイン画面を表示
      dispatch(sendLogoutRequest(user.id, null, null));
      // ログインダイアログのみ表示（アカウント登録ダイアログは非表示）
      dispatch(setModalLogin());
      dispatch(setModalCheckout());
      dispatch(setModalOpen());
    };
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart?.length > 0
    ) {
      if (commandIdx === 0) {
        const sendData = {
          pgName: "Stripe",
          pgPaymentId: paymentIntent,
          pgStatus: "succeeded",
          pgResponseMessage: "Payment successful",
        };
        if (selectedSAddrId === 0 || selectedBAddrId === -1) {
          // 新しい住所が使われるとき住所のデータも含め注文リクエストする
          dispatch(sendOrderWithNewAddresses(sendData));
        } else {
          dispatch(sendOrder(sendData));
        }
      } else if (commandIdx === 1) {
        refreshJwtToken();
      } else if (commandIdx === 2) {
        logoutUser();
      }
    }
  }, [commandIdx]);

  useEffect(() => {
    // 住所更新された時はDBより再度取得
    dispatch(getUserAddress());
  }, [order]);

  return (
    <>
      {order && (
        <div className="px-2 py-4 mx-auto md:w-9/12">
          <p>ご注文ありがとうございました。配送の手続きを進めます。</p>
          <legend className="text-xs">注文内容</legend>
          <div className="xs:flex-col sm:flex sm:gap-x-28">
            <div className="py-1">
              <span>お届け先：</span>
              <AddressCard address={order.shippingAddr} />
            </div>
            <div className="py-1">
              <span>請求先:</span>
              {order.billingAddr?.fullname.length > 0 ? (
                <AddressCard address={order.billingAddr} />
              ) : (
                <p>お届け先と同じ</p>
              )}
            </div>
          </div>
          <div className="mt-3">
            <OrderedItemsTable cart={order.cart} />
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentConfirmation;
