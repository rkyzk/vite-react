import StripePayment from "./StripePayment";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import AuthModal from "../auth/AuthModal";
import AddressList from "./AddressList";

export const Checkout = () => {
  const auth = useSelector((state) => state.auth);

  const [billAddrCheck, setBillAddrCheck] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  if (auth === null) {
    const state = false;
    const props = { state, setModalOpen };
    return (
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        (errorMessage === "リフレッシュトークン有効期限切れ" ?
        <Login props={props} />:
        <AuthModal props={props} />)
      </Modal>
    );
  }
  const props = {
    billAddrCheck,
    setBillAddrCheck,
  };
  const stripePaymentProps = {
    billAddrCheck,
  };

  return (
    <div className="flex">
      <div className="px-2 mx-auto">
        <AddressList props={props} />
        <StripePayment stripePaymentProps={stripePaymentProps} />
      </div>
    </div>
  );
};

export default Checkout;
