import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  sendOrder,
  sendOrderWithNewAddresses,
  getUserAddress,
} from "../../store/actions";
import AddressCard from "../checkout/AddressCard";
import OrderedItemsTable from "./OrderedItemsTable";
import styles from "../../styles/OrderConfirmation.module.css";
import toast from "react-hot-toast";

const OrderConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");
  const { cart } = useSelector((state) => state.carts);
  const { order } = useSelector((state) => state.order);
  const { selectedSAddrId, selectedBAddrId, user } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect fired");
    console.log(clientSecret);
    console.log(user);
    if (
      user &&
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart.length > 0
    ) {
      const sendData = {
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };
      if (selectedSAddrId === 0 || selectedBAddrId === -1) {
        // If new address has been entered, include the address data
        // in the order request.
        console.log("dispatching send order req");
        dispatch(sendOrderWithNewAddresses(sendData, toast));
      } else {
        dispatch(sendOrder(sendData, toast));
      }
    }
  }, [user]);

  // useEffect(() => {
  //   // If the address has been updated, get the user addresses data from DB again.
  //   dispatch(getUserAddress());
  // }, [order]);

  return (
    <>
      {Object.keys(order).length > 0 && (
        <div className={`${styles.Box} px-2 py-1 mx-auto md:w-9/12`}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "800",
              fontFamily: "serif",
            }}
          >
            Thank you for your order! Your order will be processed.
          </h2>
          <legend
            className="mt-3"
            style={{
              fontSize: "1.1rem",
              fontWeight: "800",
              fontFamily: "serif",
            }}
          >
            Order Details
          </legend>
          <div className="xs:flex-col sm:flex sm:gap-x-28">
            <div className="pb-1">
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "800",
                  fontFamily: "serif",
                }}
              >
                Shipping address:
              </span>
              <AddressCard address={order.shippingAddr} />
            </div>
            <div>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "800",
                  fontFamily: "serif",
                }}
              >
                Billing Address:
              </span>
              {order.billingAddr?.fullname.length > 0 ? (
                <AddressCard address={order.billingAddr} />
              ) : (
                <p>Same as shipping address.</p>
              )}
            </div>
          </div>
          <div className="mt-3">
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "800",
                fontFamily: "serif",
              }}
            >
              Ordered Items:
            </span>
            <OrderedItemsTable cart={order.cart} />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderConfirmation;
