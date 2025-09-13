import { useState } from "react";
import Spinner from "../shared/Spinner";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "../../styles/PaymentForm.module.css";
import { storeAddress } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

/**
 * Displays stripe's payment element
 * (pre-built secure form)
 * Handles form submission when user clicks 'proceed'
 * @param clientSecret, totalPrice
 */
const PaymentForm = ({ props }) => {
  const {
    clientSecret,
    totalPrice,
    sAddress,
    bAddress,
    validateInputSAddr,
    validateInputBAddr,
    billAddrCheck,
  } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const { shippingAddress, billingAddress } = useSelector(
    (state) => state.auth
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
    let isValid =
      validateInputSAddr() &&
      (billAddrCheck || (!billAddrCheck && validateInputBAddr()));
    if (!isValid) {
      setErrorMessage("住所を正しく記入してください。");
      return;
    } else {
      setErrorMessage(null);
      !shippingAddress && dispatch(storeAddress(sAddress));
      !billingAddress && dispatch(storeAddress(bAddress));
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
    <form onSubmit={handleSubmit} className="flex-col py-4">
      <h2 className={`${styles.paymentHeading}`}>カード情報</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={`${styles.paymentForm}`}>
          <PaymentElement options={paymentElementOptions} />
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
          <button
            className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
              hover:bg-stone-300 hover:text-stone-800"
            disabled={!stripe || isLoading}
          >
            {isLoading ? <Spinner /> : `¥${totalPrice}を支払い商品を購入する`}
          </button>
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
