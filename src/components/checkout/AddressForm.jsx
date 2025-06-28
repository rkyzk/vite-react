import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUserAddress,
  sendUpdateAddressReq,
  storeAddress,
} from "../../store/actions";
import styles from "../../styles/AddressForm.module.css";
import { Link } from "react-router-dom";
import AddressCard from "./AddressCard";

const AddressForm = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth ? auth.user : null;
  const shippingAddress =
    auth && auth?.shippingAddress ? auth.shippingAddress : null;
  const billingAddress =
    auth && auth?.billingAddress ? auth.billingAddress : null;
  const [editSAddr, setEditSAddr] = useState(false);
  const [editBAddr, setEditBAddr] = useState(false);
  const [sAddress, setShippingAddress] = useState({
    fullname: null,
    streetAddress1: null,
    streetAddress2: null,
    city: null,
    province: null,
    postalCode: null,
    countryCode: null,
    billingAddress: false,
  });
  const [bAddress, setBillingAddress] = useState({
    fullname: null,
    streetAddress1: null,
    streetAddress2: null,
    city: null,
    province: null,
    postalCode: null,
    countryCode: null,
    billingAddress: true,
  });

  const [showErrorsSA, setShowErrorsSA] = useState(false);
  const [showErrorsBA, setShowErrorsBA] = useState(false);
  const handleChangeShippingAddress = (e) => {
    setShippingAddress({
      ...sAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeBillingAddress = (e) => {
    setBillingAddress({
      ...bAddress,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const setA = (e) => {
    let formId = e.currentTarget.id;
    let isShippingAddr = formId === "s-addr";
    let formElem = document.getElementById(formId);
    formElem.addEventListener("focusout", handleStoreAddr);
  };

  const handleStoreAddr = (e) => {
    let isShippingAddr = true;
    let formElem = document.getElementById("s-addr");
    if (formElem.contains(e.relatedTarget)) return;
    console.log("handle store address");
    formElem.removeEventListener("focusout", handleStoreAddr);
    let keys = [
      "fullname",
      "streetAddress1",
      "city",
      "province",
      "postalCode",
      "countryCode",
    ];
    let address = isShippingAddr ? sAddress : bAddress;
    // validate and show errors
    isShippingAddr ? setShowErrorsSA(true) : setShowErrorsBA(true);
    let complete = true;
    for (let i = 0; i < keys.length; i++) {
      if (!(address[keys[i]] && address[keys[i]]?.length > 2)) {
        console.log(i);
        complete = false;
        break;
      }
    }
    console.log(complete);
    complete && dispatch(storeAddress(address, isShippingAddr));
  };

  useEffect(() => {
    dispatch(getUserAddress());
    shippingAddress &&
      setShippingAddress({
        ...shippingAddress,
        billingAddress: false,
      });
    billingAddress &&
      setShippingAddress({
        ...shippingAddress,
        billingAddress: false,
      });
  }, []);

  const saveAddress = (address) => {
    dispatch(sendUpdateAddressReq(address));
    setEditSAddr(false);
    setEditBAddr(false);
  };

  const addressForm = (handleChangeAddress, address, isShippingAddr) => {
    return (
      <form id={isShippingAddr ? "s-addr" : "b-addr"} onFocus={(e) => setA(e)}>
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
          {((showErrorsSA && isShippingAddr) ||
            (showErrorsBA && !isShippingAddr)) &&
            !(address.fullname?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Enter 2 or more characters.
              </span>
            )}
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
          {((showErrorsSA && isShippingAddr) ||
            (showErrorsBA && !isShippingAddr)) &&
            !(address.streetAddress1?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Eneter valid street address.
              </span>
            )}
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
            id="city"
            name="city"
            type="text"
            className={`${styles.Input}`}
            value={address.city}
            onChange={(e) => handleChangeAddress(e)}
          />
          {((showErrorsSA && isShippingAddr) ||
            (showErrorsBA && !isShippingAddr)) &&
            !(address.city?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Enter valid city name.
              </span>
            )}
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
          {((showErrorsSA && isShippingAddr) ||
            (showErrorsBA && !isShippingAddr)) &&
            !(address.province?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Province is required.
              </span>
            )}
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
          {((showErrorsSA && isShippingAddr) ||
            (showErrorsBA && !isShippingAddr)) &&
            !(address.postalCode?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Postal code is required.
              </span>
            )}
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="countryCode" className={`${styles.Label}`}>
            country:
          </label>
          <input
            id="countryCode"
            name="countryCode"
            type="text"
            className={`${styles.Input}`}
            value={address.countryCode}
            onChange={(e) => handleChangeAddress(e)}
          />
          {((showErrorsSA && isShippingAddr) ||
            (showErrorsBA && !isShippingAddr)) &&
            !(address?.countryCode?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Country code is required.
              </span>
            )}
        </div>
      </form>
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
      <div className="flex w-full mt-3">
        <div className="grid xs:grid-col-1 sm:grid-cols-2 xs:gap-2 sm:gap-x-4 md:gap-x-16">
          <div>
            <h2 className={`${styles.Text} "mt-2"`}>Shipping Address:</h2>
            {shippingAddress && !editSAddr ? (
              <>
                <AddressCard address={shippingAddress} />
                <button
                  className="bg-cyan-700 block mt-2 px-3 py-1"
                  onClick={() => setEditSAddr(true)}
                >
                  edit
                </button>
              </>
            ) : (
              <div className={`${styles.addressCardBox} ${styles.sAddressBox}`}>
                {addressForm(handleChangeShippingAddress, sAddress, true)}
                {shippingAddress && (
                  <div classname="flex">
                    <button
                      className="bg-fuchsia-400 px-2 py-1 m-1"
                      onClick={() => saveAddress(sAddress)}
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
            {billingAddress && !editBAddr ? (
              <>
                <AddressCard address={billingAddress} />
                <button
                  className="bg-cyan-700 block mt-2 px-3 py-1"
                  onClick={() => setEditBAddr(true)}
                >
                  edit
                </button>
              </>
            ) : (
              <>
                {!billingAddress && (
                  <p className={`${styles.note}`}>
                    If it's different from shipping address
                  </p>
                )}
                <div
                  className={`${styles.addressCardBox} ${styles.bAddressBox}`}
                >
                  {addressForm(handleChangeBillingAddress, bAddress, false)}
                  {editBAddr && (
                    <div className="flex">
                      <button
                        className="bg-fuchsia-400 px-2 py-1 m-1"
                        onClick={() => saveAddress(bAddress)}
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
