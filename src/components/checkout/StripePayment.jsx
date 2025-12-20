import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
  const { isLoading } = useSelector((state) => state.errors);
  const cart = useSelector((state) => state.carts.cart);
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );

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
    <div className="flex">
      {clientSecret && (
        <div className="xs:px-1 mx-auto sm:w-11/12 sm:max-w-[400px] md:max-w-[620px] lg:w-[680px]">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm props={props} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default StripePayment;
