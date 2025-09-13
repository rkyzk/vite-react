import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { createClientSecret } from "../../store/actions";
import PaymentForm from "./PaymentForm";
import Spinner from "../shared/Spinner";

const stripePromise = loadStripe(
  "pk_test_51Ow1I8CGoc1OQ3lzNr9rqfPrX3M7P9TpQh6l6bG5hSWjbzbThBxZmReXhqvBsLDuIJ1OfKQxrTD3dZ3nFr59ZjhD001eJ9t8aP"
);

/**
 * Fetches client secret from the backend.
 * Displays payment form when client secret is available.
 */
const StripePayment = ({ stripePaymentProps }) => {
  const {
    sAddress,
    bAddress,
    validateInputSAddr,
    validateInputBAddr,
    billAddrCheck,
  } = stripePaymentProps;
  const auth = useSelector((state) => state.auth);
  const clientSecret = auth?.clientSecret ? auth.clientSecret : null;
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const cart = useSelector((state) => state.carts.cart);
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const dispatch = useDispatch();
  useEffect(() => {
    !clientSecret && dispatch(createClientSecret(totalPrice));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  const props = {
    clientSecret,
    totalPrice,
    sAddress,
    bAddress,
    validateInputSAddr,
    validateInputBAddr,
    billAddrCheck,
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm props={props} />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
