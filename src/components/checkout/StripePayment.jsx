import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import Spinner from "../shared/Spinner";

const stripePromise = loadStripe(
  "pk_test_51Ow1I8CGoc1OQ3lzNr9rqfPrX3M7P9TpQh6l6bG5hSWjbzbThBxZmReXhqvBsLDuIJ1OfKQxrTD3dZ3nFr59ZjhD001eJ9t8aP",
);

/**
 * Fetches client secret from the backend.
 * Displays payment form when client secret is available.
 */
const StripePayment = () => {
  const auth = useSelector((state) => state.auth);
  const clientSecret = auth?.clientSecret ? auth.clientSecret : null;
  const { isLoading } = useSelector((state) => state.errors);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {clientSecret && (
        <div className="mt-4 px-2">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        </div>
      )}
    </>
  );
};

export default StripePayment;
