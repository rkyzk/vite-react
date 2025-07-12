import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  sendOrderAsUser,
  sendOrderWithNewAddresses,
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
  const auth = useSelector((state) => state.auth);
  const shippingAddress =
    auth && auth.shippingAddress ? auth.shippingAddress : null;

  const { errorMessage } = useSelector((state) => state.errors);
  const order = useSelector((state) => state.order.order);

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
      shippingAddress
        ? dispatch(sendOrderAsUser(sendData))
        : dispatch(sendOrderWithNewAddresses(sendData));
    }
  }, []);

  return (
    <>
      {order && (
        <div className="px-2 py-4 mx-auto md:w-9/12">
          <h2>Thank you for your purchase. Your order has been placed.</h2>
          <h3>Order Summary</h3>
          <div className="xs:flex-col sm:flex sm:gap-x-28">
            <div className="border py-1">
              <span>Shipping Address:</span>
              <AddressCard address={order.shippingAddr} />
            </div>
            {order.billingAddr?.fullname.length > 0 && (
              <div className="border py-1">
                <span>Billing Address:</span>
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
