import { useState } from "react";
import Spinner from "../shared/Spinner";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessege] = useState("");
  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:5173/order-confirm`,
      },
    });
    if (error) {
      setErrorMessege(error.message);
      return false;
    }
  };
  const isLoading = !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="flex-col max-w-lg mx-auto p-4">
      <legend className="w-[200px] font-normal">Payment Information</legend>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex-col">
          <PaymentElement options={paymentElementOptions} />
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
          <button
            className="mt-2 mx-auto w-[180px] bg-amber-800 py-1 px-2"
            disabled={!stripe || isLoading}
          >
            {!isLoading ? `Proceed to pay ¥${totalPrice}` : "Processing"}
          </button>
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
