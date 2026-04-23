import { useState } from "react";
import Spinner from "../shared/Spinner";
import Cart from "../Cart";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { validateAddress } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/PaymentForm.module.css";

/**
 * Displays stripe's payment element
 * (pre-built secure form)
 * Handles form submission when user clicks 'proceed'
 * @param clientSecret, totalPrice
 */
const PaymentForm = ({ props }) => {
  const { clientSecret, totalPrice } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState([]);
  const { selectedSAddrId, selectedBAddrId } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    let isValid = true;
    if (selectedSAddrId === 0) {
      isValid = await dispatch(validateAddress(true));
    }
    if (selectedBAddrId === -1) {
      isValid &= await dispatch(validateAddress(false));
    }
    if (!isValid) {
      setErrorMessage("Enter valid address.");
      return;
    } else {
      setErrorMessage(null);
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
      setErrorMessage(error.message);
      return;
    }
  };
  const isLoading = !stripe || !elements;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex-col py-4 gap-x-2.5 md:flex md:flex-row"
        >
          <div className="w-1/2">
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: "800",
                fontFamily: "serif",
              }}
            >
              Card Information
            </h2>
            <PaymentElement options={paymentElementOptions} />
            {errorMessage && (
              <div className="text-red-500 mt-2">{errorMessage}</div>
            )}
          </div>
          <div className="md:w-80">
            <h2
              className={`mt-4 ml-8 ${styles.CartItems}`}
              style={{
                fontSize: "1.1rem",
                fontWeight: "800",
                fontFamily: "serif",
              }}
            >
              Items in your cart
            </h2>
            <Cart />
            <div className="flex justify-end mr-3">
              <button
                className={`bg-stone-600 text-white py-1 px-2
                hover:bg-blue-50 hover:border-stone-800 ${styles.Button}`}
                disabled={!stripe || isLoading}
              >
                {isLoading ? <Spinner /> : `Proceed to purchase`}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default PaymentForm;
