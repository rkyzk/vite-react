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

const StripePayment = ({ totalPrice }) => {
  const clientSecret = useSelector((state) => state.auth.clientSecret);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!clientSecret) dispatch(createClientSecret(totalPrice));
  }, [clientSecret]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
