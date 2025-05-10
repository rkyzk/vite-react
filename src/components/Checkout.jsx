import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOrderAsGuest,
  sendOrderLoggedInUser,
  sendUpdateAddressReq,
} from "../store/actions";
import "../styles/Checkout.module.css";

const Checkout = () => {
  const { user, addresses } = useSelector((state) => state.auth);
  let storedSAddress = null;
  let storedBAddress = null;
  addresses?.forEach((address) => {
    address.billingAddress == false
      ? (storedSAddress = address)
      : (storedBAddress = address);
  });
  const [ordered, setOrdered] = useState(false);
  const [editSAddr, setEditSAddr] = useState(false);
  const [editBAddr, setEditBAddr] = useState(false);

  const initialSAddressState = {
    addressId: storedSAddress ? storedSAddress.addressId : null,
    fullname: storedSAddress ? storedSAddress.fullname : "",
    streetAddress1: storedSAddress ? storedSAddress.streetAddress1 : "",
    streetAddress2: storedSAddress ? storedSAddress.streetAddress2 : "",
    city: storedSAddress ? storedSAddress.city : "",
    province: storedSAddress ? storedSAddress.province : "",
    countryCode: storedSAddress ? storedSAddress.countryCode : "",
    postalCode: storedSAddress ? storedSAddress.postalCode : "",
  };
  const initialBAddressState = {
    addressId: storedBAddress ? storedBAddress.addressId : null,
    fullname: storedBAddress ? storedBAddress.fullname : "",
    streetAddress1: storedBAddress ? storedBAddress.streetAddress1 : "",
    streetAddress2: storedBAddress ? storedBAddress.streetAddress2 : "",
    city: storedBAddress ? storedBAddress.city : "",
    province: storedBAddress ? storedBAddress.province : "",
    countryCode: storedBAddress ? storedBAddress.countryCode : "",
    postalCode: storedBAddress ? storedBAddress.postalCode : "",
  };
  const [shippingAddress, setShippingAddress] = useState({
    ...initialSAddressState,
    billingAddress: false,
  });

  const [billingAddress, setBillingAddress] = useState({
    ...initialBAddressState,
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

  const saveAddress = (address) => {
    dispatch(sendUpdateAddressReq(address));
    setEditSAddr(false);
    setEditBAddr(false);
  };

  const addressForm = (handleChangeAddress, address) => {
    return (
      <div>
        <div>
          <label htmlFor="fullname" className="w-40">
            your full name:
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            className="bg-white pl-2 rounded-lg"
            value={address.fullname}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div className="mt-1">
          <label htmlFor="streetAddress1" className="w-40">
            street address 1:
          </label>
          <input
            id="streetAddress1"
            name="streetAddress1"
            type="text"
            className="bg-white pl-2 rounded-lg"
            value={address.streetAddress1}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div>
          <label htmlFor="streetAddress2" className="mt-1 w-40">
            street address 2:
          </label>
          <input
            id="streetAddress2"
            name="streetAddress2"
            type="text"
            className="bg-white pl-2 rounded-lg"
            value={address.streetAddress2}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div>
          <label htmlFor="city" className="mt-1 w-40">
            city:
          </label>
          <input
            id="city "
            name="city"
            type="text"
            className="bg-white pl-2 rounded-lg"
            value={address.city}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div>
          <label htmlFor="province" className="mt-1 w-40">
            province:
          </label>
          <input
            id="province"
            name="province"
            type="text"
            className="bg-white pl-2 rounded-lg"
            value={address.province}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="mt-1 w-40">
            postal code:
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            className="bg-white pl-2 rounded-lg"
            value={address.postalCode}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div>
          <label htmlFor="countryCode" className="mt-1 w-40">
            country:
          </label>
          <input
            id="countryCode"
            name="countryCode"
            className="bg-white pl-2 rounded-lg"
            value={address.countryCode}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
      </div>
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
      {storedSAddress && !editSAddr ? (
        <>
          <strong>Shipping Address:</strong>
          <div id="shipping-address">
            <div>
              <span className="block">{storedSAddress.fullname}</span>
              <span className="block">{storedSAddress.streetAddress1}</span>
              {storedSAddress.streetAddress2 && (
                <span className="block">{storedSAddress.streetAddress2}</span>
              )}
              <span className="block">{storedSAddress.city}</span>
              <span className="block">{storedSAddress.province}</span>
              <span className="block">{storedSAddress.postalCode}</span>
              <span className="block">{storedSAddress.countryCode}</span>
              <button
                className="bg-cyan-700 block mt-2 px-3 py-1"
                onClick={() => setEditSAddr(true)}
              >
                edit
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-2 px-4 pb-2 bg-slate-300 flex">
          <div>
            <legend className="mt-2">Shipping Address:</legend>
            {addressForm(handleChangeShippingAddress, shippingAddress)}
            {storedSAddress && (
              <div classname="flex">
                <button
                  className="bg-fuchsia-400 px-2 py-1 mr-1"
                  onClick={() => saveAddress(shippingAddress)}
                >
                  save
                </button>
                <button
                  className="bg-fuchsia-400 px-2 py-1"
                  onClick={() => setEditSAddr(false)}
                >
                  cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mt-5">
        <strong>Billing Address:</strong>
      </div>
      {storedBAddress && !editBAddr ? (
        <>
          <span className="block">{storedBAddress.fullname}</span>
          <span className="block">{storedBAddress.streetAddress1}</span>
          {storedBAddress.streetAddress2 && (
            <span className="block">{storedBAddress.streetAddress2}</span>
          )}
          <span className="block">{storedBAddress.city}</span>
          <span className="block">{storedBAddress.province}</span>
          <span className="block">{storedBAddress.postalCode}</span>
          <span className="block">{storedBAddress.countryCode}</span>
          <button
            className="bg-cyan-700 block mt-2 px-3 py-1"
            onClick={() => setEditBAddr(true)}
          >
            edit
          </button>
        </>
      ) : (
        <span>
          same as shipping address or{" "}
          <button onClick={() => setEditBAddr(true)}>
            enter a billing address
          </button>
        </span>
      )}
      {editBAddr && (
        <div>{addressForm(handleChangeBillingAddress, billingAddress)}</div>
      )}
      {storedBAddress && editBAddr && (
        <div className="flex gap-1">
          <button
            className="bg-fuchsia-400 px-2 py-1 mr-1"
            onClick={() => saveAddress(billingAddress)}
          >
            save
          </button>
          <button
            className="bg-fuchsia-400 px-2 py-1"
            onClick={() => setEditBAddr(false)}
          >
            cancel
          </button>
        </div>
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
    </div>
  );
};

export default Checkout;
