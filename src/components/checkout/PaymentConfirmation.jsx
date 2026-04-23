import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  sendOrder,
  sendOrderWithNewAddresses,
  getUserAddress,
  sendLogoutRequest,
  setModalLogin,
  setModalOpen,
  sendRefreshJwtTokenRequest,
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
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshJwtToken = async () => {
      await dispatch(sendRefreshJwtTokenRequest());
    };
    const logoutUser = async () => {
      // If refresh token has expired, log out the user.
      dispatch(sendLogoutRequest(user.id, null, null));
      // Display the login dialog (no register form.)
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
          // If new address has been entered, include the address data
          // in the order request.
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
    // If the address has been updated, get the user addresses data from DB again.
    dispatch(getUserAddress());
  }, [order]);

  return (
    <>
      {order && (
        <div className="px-2 py-4 mx-auto md:w-9/12">
          <h2 style={{ fontSize: "1.2rem", fontWeight: "800" }}>
            Thank you for your order! Your order will be processed.
          </h2>
          <Box className="bg-gray-200 border-b-gray-600">
            <legend
              className="mt-2"
              style={{ fontSize: "1rem", fontWeight: "800" }}
            >
              Order Details:
            </legend>
            <div className="xs:flex-col sm:flex sm:gap-x-28">
              <div className="pb-1">
                <span>Shipping address:</span>
                <AddressCard address={order.shippingAddr} />
              </div>
              <div className="py-1">
                <span>Billing Address:</span>
                {order.billingAddr?.fullname.length > 0 ? (
                  <AddressCard address={order.billingAddr} />
                ) : (
                  <p>Same as shipping address.</p>
                )}
              </div>
            </div>
            <div className="mt-3">
              <OrderedItemsTable cart={order.cart} />
            </div>
          </Box>
        </div>
      )}
    </>
  );
};

export default PaymentConfirmation;
