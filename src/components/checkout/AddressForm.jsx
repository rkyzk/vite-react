import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { sendUpdateAddressReq } from "../../store/actions";
import styles from "../../styles/AddressForm.module.css";
import { Link } from "react-router-dom";
import AddressCard from "./AddressCard";

const AddressForm = (setTempAddresses) => {
  const { user, addresses } = useSelector((state) => state.auth);
  let storedSAddress = null;
  let storedBAddress = null;
  addresses?.forEach((address) => {
    address.billingAddress == false
      ? (storedSAddress = address)
      : (storedBAddress = address);
  });
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

  const dispatch = useDispatch();

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
      {!user && (
        <div className={`${styles.Note} "mt-2"`}>
          <Link to="/login" className="hover:text-sky-900">
            Log in{" "}
          </Link>{" "}
          or <Link to="/register">Register </Link>
          <br />
          Or fill out the form below to make a purchase as a guest.
        </div>
      )}
      <div className="flex px-2 w-full mt-3 mx-auto xl:w-9/12">
        <div className="grid m-auto justify-center xs:grid-col-1 sm:grid-cols-2 xs:gap-2 sm:gap-x-4 md:gap-x-16">
          <div>
            <h2 className={`${styles.Text} "mt-2"`}>Shipping Address:</h2>
            {storedSAddress && !editSAddr ? (
              <>
                <AddressCard address={storedSAddress} />
                <button
                  className="bg-cyan-700 block mt-2 px-3 py-1"
                  onClick={() => setEditSAddr(true)}
                >
                  edit
                </button>
              </>
            ) : (
              <div className={`${styles.addressCardBox} ${styles.sAddressBox}`}>
                {addressForm(handleChangeShippingAddress, shippingAddress)}
                {storedSAddress && (
                  <div classname="flex">
                    <button
                      className="bg-fuchsia-400 px-2 py-1 m-1"
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
            )}
          </div>
          <div>
            <h2 className={`${styles.Text} "mt-2"`}>Billing Address:</h2>
            {storedBAddress && !editBAddr ? (
              <>
                <AddressCard address={storedBAddress} />
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
                  {addressForm(handleChangeBillingAddress, billingAddress)}
                  {editBAddr && (
                    <div className="flex">
                      <button
                        className="bg-fuchsia-400 px-2 py-1 m-1"
                        onClick={() => saveAddress(billingAddress)}
                      >
                        save
                      </button>
                      <button
                        className="bg-fuchsia-400 px-2 m-1"
                        onClick={() => setEditBAddr(false)}
                      >
                        cancel
                      </button>
                      <button className="bg-fuchsia-400 m-1 px-2">
                        delete
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
