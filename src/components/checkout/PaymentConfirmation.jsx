import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  sendOrder,
  sendOrderWithNewAddresses,
  getUserAddress,
} from "../../store/actions";
import AddressCard from "./AddressCard";
import OrderedItemsTable from "./OrderedItemsTable";

const PaymentConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");
  const cart = useSelector((state) => state.carts.cart);
  const { errorMessage } = useSelector((state) => state.errors);
  const order = useSelector((state) => state.order.order);
  const { selectedSAddrId, selectedBAddrId, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart?.length > 0
    ) {
      const sendData = {
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };
      selectedSAddrId === 0 || selectedBAddrId === -1
        ? dispatch(sendOrderWithNewAddresses(sendData, user.id))
        : dispatch(sendOrder(sendData));
    }
  }, [clientSecret]);

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
            {order.billingAddr?.fullname.length > 0 && (
              <div className="py-1">
                <span>請求先:</span>
                <AddressCard address={order.billingAddr} />
              </div>
            )}
          </div>
          <div>
            <OrderedItemsTable cart={order.cart} />
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentConfirmation;
