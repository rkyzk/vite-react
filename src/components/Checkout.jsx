import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOrderAsGuest, sendOrderLoggedInUser } from "../store/actions";

const Checkout = () => {
  const { user, addresses } = useSelector((state) => state.auth);
  let storedSAddress = null;
  let storedBAddress = null;
  addresses?.length > 0 && console.log(addresses[0].fullname);
  addresses && (storedSAddress = addresses[0]);
  addresses?.length > 1 && (storedBAddress = addresses[1]);
  const [ordered, setOrdered] = useState(false);
  const initialAddressState = {
    fullname: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    province: "",
    countryCode: "",
    postalCode: "",
  };
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
    billingAddress: false,
  });

  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
    billingAddress: true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!ordered) {
      let addressList = [];
      if (!addresses || addresses?.length == 0) {
        addressList.push(shippingAddress);
        billingAddress.fullname.length > 0 && addressList.push(billingAddress);
      }
      if (!user) {
        dispatch(sendOrderAsGuest(addressList));
        navigate("/checkout/completed");
      } else {
        dispatch(
          sendOrderLoggedInUser(addresses?.length > 0 ? addresses : addressList)
        );
        navigate("/checkout/completed");
      }
    }
  };

  const handleChangeShippingAddress = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeBillingAddress = (e) => {
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const addressForm = (handleChangeAddress) => {
    return (
      <>
        <label htmlFor="fullname">your full name:</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          className="bg-white pl-2 rounded-lg block"
          onChange={(e) => handleChangeAddress(e)}
        />
        <label htmlFor="streetAddress1">street address 1:</label>
        <input
          id="streetAddress1"
          name="streetAddress1"
          type="text"
          className="bg-white pl-2 rounded-lg block"
          onChange={(e) => handleChangeAddress(e)}
        />
        <label htmlFor="streetAddress2" className="mt-1">
          street address 2:
        </label>
        <input
          id="streetAddress2"
          name="streetAddress2"
          type="text"
          className="bg-white pl-2 rounded-lg block"
          onChange={(e) => handleChangeAddress(e)}
        />
        <label htmlFor="city" className="mt-1">
          city:
        </label>
        <input
          id="city "
          name="city"
          type="text"
          className="bg-white pl-2 rounded-lg block"
          onChange={(e) => handleChangeAddress(e)}
        />
        <label htmlFor="province" className="mt-1">
          province:
        </label>
        <input
          id="province"
          name="province"
          type="text"
          className="bg-white pl-2 rounded-lg block"
          onChange={(e) => handleChangeAddress(e)}
        />
        <label htmlFor="postalCode" className="mt-1">
          postal code:
        </label>
        <input
          id="postalCode"
          name="postalCode"
          type="text"
          className="bg-white pl-2 rounded-lg block"
          onChange={(e) => handleChangeAddress(e)}
        />
        <label htmlFor="countryCode" className="mt-1">
          country:
        </label>
        <input
          id="countryCode"
          name="countryCode"
          className="bg-white pl-2 rounded-lg"
          onChange={(e) => handleChangeAddress(e)}
        />
      </>
    );
  };

  return (
    <div className="px-2 w-full mt-3 mx-auto text-xl sm:w-9/12">
      {!user && (
        <span>
          <Link to="/login" className="hover:text-sky-900">
            Log in{" "}
          </Link>{" "}
          or <Link to="/register">Register </Link>
          <br />
          Or fill out the form below to make a purchase as a guest.
        </span>
      )}
      {storedSAddress ? (
        <>
          <div>
            <span className="block">Shipping Address:</span>
            <span className="block">{storedSAddress.fullname}</span>
            <span className="block">{storedSAddress.streetAddress1}</span>
            {storedSAddress.streetAddress2 && (
              <span className="block">{storedSAddress.streetAddress2}</span>
            )}
            <span className="block">
              {storedSAddress.city} {storedSAddress.province}
            </span>
            <span className="block">{storedSAddress.postalCode}</span>
            <span className="block">{storedSAddress.countryCode}</span>
            <button className="block">edit</button>
          </div>
          <div>
            <span>Billing Address:</span>
          </div>
          {storedBAddress ? (
            <>
              <span>Billing Address:</span>
              <span>{storedBAddress.fullname}</span>
              <span>{storedBAddress.streetAddress1}</span>
              {storedBAddress.streetAddress2 && (
                <span>{storedBAddress.streetAddress2}</span>
              )}
              <span>{storedBAddress.city}</span>
              <span>{storedBAddress.province}</span>
              <span>{storedBAddress.postalCode}</span>
              <span>{storedBAddress.countryCode}</span>
              <button>edit</button>
            </>
          ) : (
            <span>
              same as shipping address or{" "}
              <button>enter a billing address</button>
            </span>
          )}
        </>
      ) : (
        <>
          <div className="mt-2 px-4 pb-2 bg-slate-300 flex justify-around">
            <div>
              <legend className="mt-2">Shipping Address:</legend>
              {addressForm(handleChangeShippingAddress)}
            </div>
            <div>
              <legend className="mt-2">Billing Address:</legend>
              <span className="text-sm block">
                if it's different from shipping address
              </span>
              {addressForm(handleChangeBillingAddress)}
            </div>
          </div>
        </>
      )}
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
  );
};

export default Checkout;
