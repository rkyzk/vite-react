import { useEffect, useState } from "react";
import Spinner from "../shared/Spinner";
import Cart from "../shared/Cart";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { validateAddress } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/PaymentForm.module.css";
import { FRONTEND_URL } from "../../constants/constants.js";

/**
 * Displays stripe's payment element
 * (pre-built secure form)
 * Handles form submission when user clicks 'proceed'
 * @param clientSecret, totalPrice
 */
const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
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
      setErrorMessage("Enter a valid address.");
      return;
    } else {
      setErrorMessage(null);
    }
    const { error: submitError } = await elements.submit();
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${FRONTEND_URL}/order-confirm`,
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
          className="flex-col md:flex md:flex-row justify-between"
          id="payment-form"
        >
          <div className={`${styles.CardForm} pb-3`}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: "800",
                fontFamily: "serif",
              }}
            >
              Card Information
            </h2>
            <div onClick={() => setErrorMessage(null)}>
              <PaymentElement
                options={paymentElementOptions}
                className={`${styles.PaymentForm}`}
              />
            </div>
          </div>
          <div className={`${styles.CartItemsBox}`}>
            <h2
              className={`${styles.CartItems}`}
              style={{
                fontSize: "1.1rem",
                fontWeight: "800",
                fontFamily: "serif",
              }}
            >
              Items in your cart
            </h2>
            <Cart />
            <div className="flex-col text-right">
              <button
                className={`text-white py-1 px-2 ${styles.Button}`}
                disabled={!stripe || isLoading}
              >
                {isLoading ? <Spinner /> : `Proceed to purchase`}
              </button>
              {errorMessage && (
                <div className="text-red-500 mt-2">{errorMessage}</div>
              )}
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default PaymentForm;
