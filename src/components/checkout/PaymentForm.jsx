import { useState } from "react";
import Spinner from "../shared/Spinner";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "../../styles/PaymentForm.module.css";
import { useSelector } from "react-redux";

/**
 * Displays stripe's payment element
 * (pre-built secure form)
 * Handles form submission when user clicks 'proceed'
 * @param clientSecret, totalPrice
 */
const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const paymentElementOptions = {
    layout: "tabs",
  };
  const { shippingAddress, tempSAddress } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingAddress && !tempSAddress) {
      setErrorMessage("Enter valid shipping address.");
      return;
    }
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
      console.log(error.message);
      setErrorMessage(error.message);
      return false;
    }
  };
  const isLoading = !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="flex-col py-4">
      <h2 className={`${styles.paymentHeading}`}>Payment Information</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={`${styles.paymentForm}`}>
          <PaymentElement options={paymentElementOptions} />
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
          <button
            className="mt-2 mx-auto bg-amber-800 py-1 px-2"
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
