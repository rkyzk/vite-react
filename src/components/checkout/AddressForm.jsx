import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sendUpdateAddressReq, deleteAddress } from "../../store/actions";
import styles from "../../styles/AddressForm.module.css";
import AddressCard from "./AddressCard";
import toast from "react-hot-toast";

const AddressForm = ({ props }) => {
  const {
    sAddress,
    setSAddress,
    errors,
    setErrors,
    bAddress,
    setBAddress,
    billAddrErrors,
    setBillAddrErrors,
    showErrorsSA,
    showErrorsBA,
    initAddr,
    billAddrCheck,
    setBillAddrCheck,
  } = props;
  const auth = useSelector((state) => state.auth);
  const shippingAddress =
    auth && auth?.shippingAddress ? auth.shippingAddress : null;
  const billingAddress =
    auth && auth?.billingAddress ? auth.billingAddress : null;
  const [editSAddr, setEditSAddr] = useState(false);
  const [editBAddr, setEditBAddr] = useState(false);
  const [saveSAddr, setSaveSAddr] = useState(true);
  const [saveBAddr, setSaveBAddr] = useState(true);

  const handleChangeShippingAddress = (e) => {
    setSAddress({
      ...sAddress,
      [e.target.name]: e.target.value,
    });
    if (e.target.id !== "streetAddress2") {
      validateIpt(e);
    }
  };

  const handleChangeBillingAddress = (e) => {
    setBAddress({
      ...bAddress,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSaveAddr = (isShippingAddr) => {
    if (isShippingAddr) {
      setSaveSAddr(!saveSAddr);
      sAddress.saveAddr = !sAddress.saveAddr;
    } else {
      setSaveBAddr(!saveBAddr);
      bAddress.saveAddr = !bAddress.saveAddr;
    }
  };

  const dispatch = useDispatch();
  const saveAddress = (address) => {
    dispatch(sendUpdateAddressReq(address));
    setEditSAddr(false);
    setEditBAddr(false);
  };

  const handleDeleteBAddress = (id) => {
    dispatch(deleteAddress(id, toast));
    setBAddress({ ...initAddr, billingAddress: true });
    setEditBAddr(false);
  };
  const handleCancelEditAddress = (isShippingAddr) => {
    if (isShippingAddr) {
      setSAddress({ ...sAddress, ...shippingAddress });
      setEditSAddr(false);
    } else {
      setBAddress({ ...bAddress, ...billingAddress });
      setEditBAddr(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const validateIpt = (e) => {
    let errs = errors;
    if (e.target.value.trim().length < 2) {
      errs[e.target.name] = true;
      setErrors(errs);
    } else {
      errs[e.target.name] = false;
      setErrors(errs);
    }
  };
  useEffect(() => {
    shippingAddress && setSAddress({ ...shippingAddress, saveAddr: true });
    billingAddress && setBAddress({ ...billingAddress, saveAddr: true });
  }, [auth]);
  useEffect(() => {}, [showErrorsSA]);

  const addressForm = (handleChangeAddress, address, isShippingAddr) => {
    return (
      <form
        id={isShippingAddr ? "s-addr" : "b-addr"}
        onSubmit={(e) => handleSubmit(e)}
      >
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
          {((showErrorsSA && isShippingAddr && errors.fullname) ||
            (showErrorsBA && !isShippingAddr && billAddrErrors.fullname)) && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              "Fullname must be two or more characters"
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
          {((showErrorsSA && isShippingAddr && errors.streetAddress1) ||
            (showErrorsBA &&
              !isShippingAddr &&
              billAddrErrors.streetAddress1)) && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              Eneter valid street address
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
          {((showErrorsSA && isShippingAddr && errors.city) ||
            (showErrorsBA && !isShippingAddr && billAddrErrors.city)) && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              Enter valid city
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
          {((showErrorsSA && isShippingAddr && errors.province) ||
            (showErrorsBA && !isShippingAddr && billAddrErrors.province)) &&
            !(address.province?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Enter valid province
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
          {((showErrorsSA && isShippingAddr && errors.postalCode) ||
            (showErrorsBA && !isShippingAddr && billAddrErrors.postalCode)) &&
            !(address.postalCode?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Enter valid postal code
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
          {((showErrorsSA && isShippingAddr && errors.countryCode) ||
            (showErrorsBA && !isShippingAddr && billAddrErrors.countryCode)) &&
            !(address?.countryCode?.length > 2) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                Enter valid country
              </span>
            )}
        </div>
        {((isShippingAddr && !shippingAddress) ||
          (!isShippingAddr && !billingAddress)) && (
          <div>
            <label htmlFor="save-addr">
              <input
                type="radio"
                id="saveAddr"
                name="saveAddr"
                value={isShippingAddr ? saveSAddr : saveBAddr}
                checked={address.saveAddr}
                onClick={() => {
                  toggleSaveAddr(isShippingAddr);
                }}
                onChange={(e) => handleChangeAddress(e)}
                className="m-1"
              />
              <span>save this address</span>
            </label>
          </div>
        )}
      </form>
    );
  };
  return (
    <>
      <div className="flex w-full mt-3">
        <div className="grid xs:grid-col-1 sm:grid-cols-2 xs:gap-2 sm:gap-x-4 md:gap-x-16">
          <div className="min-w-[300px]">
            <h2 className={`${styles.Text} "mt-2"`}>Shipping Address:</h2>
            {shippingAddress && !editSAddr ? (
              <>
                <AddressCard address={sAddress} />
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
                  <div className="flex">
                    <button
                      className="bg-fuchsia-400 px-2 py-1 m-1"
                      onClick={() => saveAddress(sAddress)}
                    >
                      save
                    </button>
                    <button
                      className="bg-fuchsia-400 px-2 my-1"
                      onClick={() => handleCancelEditAddress(true)}
                    >
                      cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <h2 className={`${styles.Text}`}>Billing Address:</h2>
            {billingAddress && !editBAddr && (
              <>
                <AddressCard address={bAddress} />
                <button
                  className="bg-cyan-700 block mt-2 px-3 py-1"
                  onClick={() => setEditBAddr(true)}
                >
                  edit
                </button>
              </>
            )}
            {!billingAddress && (
              <div className="mt-[-10px]">
                <label htmlFor="billAddrCheck">
                  <input
                    type="radio"
                    id="billAddrCheckBox"
                    name="billAddrCheckBox"
                    value={billAddrCheck}
                    checked={billAddrCheck}
                    onClick={() => {
                      setBillAddrCheck(!billAddrCheck);
                    }}
                  />
                  <span className="ml-1">Same as shipping address</span>
                </label>
              </div>
            )}
            {(!billAddrCheck || editBAddr) && (
              <div className={`${styles.addressCardBox}`}>
                {addressForm(handleChangeBillingAddress, bAddress, false)}
                {editBAddr && (
                  <div className="flex">
                    <button
                      className="bg-fuchsia-400 px-2 py-1 mt-1"
                      onClick={() => saveAddress(bAddress)}
                    >
                      save
                    </button>
                    <button
                      className="bg-fuchsia-400 px-2 mx-1 mt-1"
                      onClick={() => handleCancelEditAddress(false)}
                    >
                      cancel
                    </button>
                    <button
                      className="bg-fuchsia-400 mt-1 px-2"
                      onClick={() => handleDeleteBAddress(bAddress.addressId)}
                    >
                      delete this address
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
