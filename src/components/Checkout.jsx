import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOrderAsGuest,
  sendOrderLoggedInUser,
  sendUpdateAddressReq,
} from "../store/actions";
import styles from "../styles/Checkout.module.css";

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
  const [openDialog, setOpenDialog] = useState(false);
  const cart = useSelector((state) => state.carts.cart);
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );

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
      setOrdered(true);
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
        <div className={`${styles.InputItem}`}>
          <label htmlFor="fullname" className={`${styles.Label}`}>
            full name:
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            className={`${styles.Input}`}
            value={address.fullname}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="streetAddress1" className={`${styles.Label}`}>
            street address 1:
          </label>
          <input
            id="streetAddress1"
            name="streetAddress1"
            type="text"
            className={`${styles.Input}`}
            value={address.streetAddress1}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="streetAddress2" className={`${styles.Label}`}>
            street address 2:
          </label>
          <input
            id="streetAddress2"
            name="streetAddress2"
            type="text"
            className={`${styles.Input}`}
            value={address.streetAddress2}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="city" className={`${styles.Label}`}>
            city:
          </label>
          <input
            id="city "
            name="city"
            type="text"
            className={`${styles.Input}`}
            value={address.city}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="province" className={`${styles.Label}`}>
            province:
          </label>
          <input
            id="province"
            name="province"
            type="text"
            className={`${styles.Input}`}
            value={address.province}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="postalCode" className={`${styles.Label}`}>
            postal code:
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            className={`${styles.Input}`}
            value={address.postalCode}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="countryCode" className={`${styles.Label}`}>
            country:
          </label>
          <input
            id="countryCode"
            name="countryCode"
            className={`${styles.Input}`}
            value={address.countryCode}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex px-2 w-full mt-3 mx-auto xl:w-9/12">
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
        <div className="grid m-auto justify-center xs:grid-col-1 sm:grid-cols-2 xs:gap-2 sm:gap-x-4 md:gap-x-16">
          <div>
            <h2 className={`${styles.Text} "mt-2"`}>Shipping Address:</h2>
            {storedSAddress && !editSAddr ? (
              <>
                <div className="pt-2">
                  <span className="block">{storedSAddress.fullname}</span>
                  <span className="block">{storedSAddress.streetAddress1}</span>
                  {storedSAddress.streetAddress2 && (
                    <span className="block">
                      {storedSAddress.streetAddress2}
                    </span>
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
              </>
            ) : (
              <div className={`${styles.addressCardBox} ${styles.sAddressBox}`}>
                <div>
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
          </div>
          <div>
            <h2 className={`${styles.Text} "mt-2"`}>Billing Address:</h2>
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
              <>
                {!storedBAddress && (
                  <p className={`${styles.note}`}>
                    If it's different from shipping address
                  </p>
                )}
                <div
                  className={`${styles.addressCardBox} ${styles.bAddressBox}`}
                >
                  <div>
                    {addressForm(handleChangeBillingAddress, billingAddress)}
                  </div>
                </div>
                {editBAddr && (
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
              </>
            )}
          </div>
          <div className="flex-col">
            <h2 className={`${styles.Text} "mt-2"`}>card information</h2>
            <div className={`${styles.addressCardBox}`}>
              <div className={`${styles.InputItem}`}>
                <label htmlFor="name-on-card" className={`${styles.Label}`}>
                  card owner:
                </label>
                <input name="name-on-card" className={`${styles.Input}`} />
              </div>
              <div className={`${styles.InputItem}`}>
                <label htmlFor="card-num" className={`${styles.Label}`}>
                  card number:
                </label>
                <input
                  name="card-num"
                  type="number"
                  className={`${styles.Input}`}
                />
              </div>
              <div className={`${styles.InputItem}`}>
                <label htmlFor="expiration" className={`${styles.Label}`}>
                  expiration date:
                </label>
                <input
                  name="expiration"
                  type="number"
                  className={`${styles.Input}`}
                />
              </div>
              <div className={`${styles.InputItem}`}>
                <label htmlFor="security-code" className={`${styles.Label}`}>
                  security code:
                </label>
                <input name="security-code" className={`${styles.Input}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
          {/* {cart?.cartItems.forEach((item) => {
            return (
              <>
                <span>{item.productName}</span>
                <span>{item.purchaseQty}</span>
              </>
            );
          })} */}
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
