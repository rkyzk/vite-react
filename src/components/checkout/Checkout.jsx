import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClientSecret } from "../../store/actions";
import StripePayment from "./StripePayment";
import AddressForm from "./AddressForm";

const Checkout = () => {
  const [ordered, setOrdered] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const cart = useSelector((state) => state.carts.cart);
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // if (!ordered) {
    //   setOrdered(true);
    //   let addressList = [];
    //   addressList.push(shippingAddress);
    //   billingAddress.fullname.length > 0 && addressList.push(billingAddress);
    //   if (!user) {
    //     dispatch(sendOrderAsGuest(addressList));
    //     navigate("/checkout/completed");
    //   } else {
    //     dispatch(sendOrderLoggedInUser(addressList));
    //     navigate("/checkout/completed");
    //   }
    // }
  };

  return (
    <>
      <AddressForm />
      <StripePayment totalPrice={totalPrice} />
      <div className="w-full flex">
        <button
          className="mx-auto w-40 bg-amber-800 mt-4 px-2 py-1 text-white hover:opacity-50"
          onClick={() => setOpenDialog(true)}
        >
          Place your order
        </button>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to make purchase follwoing items.
          </DialogContentText>
          <span>{totalPrice}</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlePlaceOrder()} autoFocus>
            proceed
          </Button>
          <Button onClick={() => setOpenDialog(false)}>cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Checkout;
