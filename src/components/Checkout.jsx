import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleSendOrderToBE } from "../store/actions";

const Checkout = () => {
  const [ordered, setOrdered] = useState(false);
  const [address, setAddress] = useState({
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    province: "",
    countryCode: "",
    postalCode: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    if (!ordered) {
      dispatch(handleSendOrderToBE(address));
      navigate("/checkout/completed");
    }
  };
  const handleChangeAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const addressForm = (
    <>
      <label htmlFor="name">full name:</label>
      <input name="name" type="text" className="bg-white rounded-lg block" />
      <label htmlFor="street-address-1">street address 1:</label>
      <input
        id="streetAddress1"
        name="streetAddress1"
        type="text"
        className="bg-white rounded-lg block"
        onChange={(e) => handleChangeAddress(e)}
      />
      <label htmlFor="street-address-2" className="mt-1">
        street address 2:
      </label>
      <input
        id="streetAddress2"
        name="streetAddress2"
        type="text"
        className="bg-white rounded-lg block"
        onChange={(e) => handleChangeAddress(e)}
      />
      <label htmlFor="city" className="mt-1">
        city:
      </label>
      <input
        id="city "
        name="city"
        type="text"
        className="bg-white rounded-lg block"
        onChange={(e) => handleChangeAddress(e)}
      />
      <label htmlFor="province" className="mt-1">
        province:
      </label>
      <input
        id="province"
        name="province"
        type="text"
        className="bg-white rounded-lg block"
        onChange={(e) => handleChangeAddress(e)}
      />
      <label htmlFor="postalCode" className="mt-1">
        postal code:
      </label>
      <input
        id="postalCode"
        name="postalCode"
        type="text"
        className="bg-white rounded-lg block"
        onChange={(e) => handleChangeAddress(e)}
      />
      <label htmlFor="countryCode" className="mt-1">
        country:
      </label>
      <input
        id="countryCode"
        name="countryCode"
        className="bg-white rounded-lg"
        onChange={(e) => handleChangeAddress(e)}
      />
    </>
  );

  return (
    <div className="px-2 w-full mt-3 mx-auto text-xl sm:w-9/12">
      <span>
        <Link className="hover:text-sky-900">Log in </Link> or{" "}
        <Link>Register </Link>
        <br />
        so you can optionally save your address and card information securely.
        <br />
        Or fill out the form below to make a purchase without saving data in our
        system.
      </span>
      <div className="mt-4">
        <div>
          <label htmlFor="name">your full name:</label>
          <input
            name="name"
            type="text"
            className="bg-white rounded-lg block"
          />
          <label htmlFor="email" className="mt-1">
            your email (for us to send confirmation):
          </label>
          <input
            name="email"
            type="email"
            className="bg-white rounded-lg block"
          />
        </div>
        <div className="mt-2 px-4 pb-2 bg-slate-300 flex justify-around">
          <div>
            <legend className="mt-2">Shipping Address</legend>
            {addressForm}
          </div>
          <div>
            <legend className="mt-2">Billing Address</legend>
            <span className="text-sm block">
              if it's different from shipping address
            </span>
            {addressForm}
          </div>
        </div>
        <div className="mt-2 px-4 pb-2 bg-fuchsia-100">
          <legend className="mt-2">card information</legend>
          <label htmlFor="name-on-card">name on your card:</label>
          <input name="name-on-card" className="bg-white rounded-lg block" />
          <label htmlFor="card-num" className="mt-1">
            card number:
          </label>
          <input
            name="card-num"
            type="number"
            className="bg-white rounded-lg block"
          />
          <label htmlFor="expiration" className="mt-1">
            expiration date:
          </label>
          <input
            name="expiration"
            type="number"
            className="bg-white rounded-lg block"
          />
          <label htmlFor="security-code" className="mt-1">
            security code:
          </label>
          <input name="security-code" className="bg-white rounded-lg block" />
        </div>
        <button
          className="mt-2 px-2 py-1 text-white hover:opacity-50"
          onClick={() => handlePlaceOrder()}
        >
          Place your Order
        </button>
        {/* <Dialog open={open}>
          <DialogContent>Purchase items for</DialogContent>
          <DialogActions>
            <Button className="text-gray-600 py-1 px-2 hover:opacity-50">
              Go back
            </Button>
            <Button className="text-gray-600 py-1 px-2 hover:opacity-50">
              Proceed
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    </div>
  );
};

export default Checkout;
