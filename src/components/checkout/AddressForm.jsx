import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "jposta";
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
  const [sZip, setSZip] = useState("");
  const [bZip, setBZip] = useState("");
  const [errMsgSZip, setErrMsgSZip] = useState("");
  const [errMsgBZip, setErrMsgBZip] = useState("");

  /**
   * 住所を取得
   */
  const handleChangeZip = (e, isShippingAddr) => {
    if (isShippingAddr) {
      setSZip(e.target.value);
    } else {
      setBZip(e.target.value);
    }
  };

  const clearAddr = (sAddr) => {
    if (sAddr) {
      setSAddress({
        ...sAddress,
        province: "",
        city: "",
        streetAddress1: "",
        streetAddress2: "",
      });
    } else {
      setBAddress({
        ...bAddress,
        province: "",
        city: "",
        streetAddress1: "",
        streetAddress2: "",
      });
    }
  };

  const fetchAddress = async (sAddr) => {
    console.log("fetchaddresss" + sAddr);
    let newErrors = {
      ...errors,
    };
    if (sAddr) {
      newErrors = {
        ...errors,
        postalCode: false,
      };
      setErrors(newErrors);
    } else {
      newErrors = {
        ...billAddrErrors,
        postalCode: false,
      };
      setBillAddrErrors(newErrors);
    }
    const res = await getAddress(sAddr ? sZip : bZip);
    if (res === null) {
      sAddr
        ? setErrMsgSZip("正しい郵便番号を入力してください。")
        : setErrMsgBZip("正しい郵便番号を入力してください。");
      clearAddr(sAddr);
      return;
    }
    setErrMsgBZip("");
    setErrMsgSZip("");
    if (sAddr) {
      setSAddress({
        ...sAddress,
        postalCode: sZip,
        province: res.pref,
        city: res.city,
        streetAddress1: res.area,
      });
    } else {
      setBAddress({
        ...bAddress,
        postalCode: bZip,
        province: res.pref,
        city: res.city,
        streetAddress1: res.area,
      });
    }
  };

  const handleCheckZip = (e, isShippingAddr) => {
    if (isShippingAddr) {
      if (sZip.length !== 7) {
        setErrMsgSZip("7桁入力してください");
        return;
      }
    } else {
      if (bZip.length !== 7) {
        setErrMsgBZip("7桁入力してください");
        return;
      }
    }
  };
  const handleChangeAddress = (e, isShippingAddr) => {
    isShippingAddr &&
      setSAddress({ ...sAddress, [e.target.name]: e.target.value });
    !isShippingAddr &&
      setBAddress({ ...bAddress, [e.target.name]: e.target.value });
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
  useEffect(() => {
    if (shippingAddress) {
      setSAddress({ ...shippingAddress, saveAddr: true });
      setSZip(shippingAddress.postalCode);
    }
    if (billingAddress) {
      setBAddress({ ...billingAddress, saveAddr: true });
      setBZip(billingAddress.postalCode);
    }
  }, [auth]);

  useEffect(() => {
    if (!shippingAddress || editSAddr) {
      if (sZip.length === 7) {
        fetchAddress(true);
      } else {
        clearAddr(true);
      }
    }
  }, [sZip]);
  useEffect(() => {
    if (!billingAddress || editBAddr) {
      if (bZip.length === 7) {
        fetchAddress(false);
      } else {
        clearAddr(false);
      }
    }
  }, [bZip]);
  useEffect(() => {}, [showErrorsSA, showErrorsBA, errors, billAddrErrors]);

  const addressForm = (address, isShippingAddr) => {
    return (
      <form
        id={isShippingAddr ? "s-addr" : "b-addr"}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={`${styles.InputItem}`}>
          <label htmlFor="fullname" className={`${styles.Label}`}>
            氏名:
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            className={`${styles.Input}`}
            value={address.fullname}
            onChange={(e) => handleChangeAddress(e, isShippingAddr)}
          />
          {((showErrorsSA && isShippingAddr && errors.fullname) ||
            (showErrorsBA && !isShippingAddr && billAddrErrors.fullname)) && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              氏名を入力してください
            </span>
          )}
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="postalCode" className={`${styles.Label}`}>
            郵便番号(ハイフンなし):
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            className={`${styles.Input}`}
            value={isShippingAddr ? sZip : bZip}
            maxlength="7"
            onChange={(e) => handleChangeZip(e, isShippingAddr)}
            onBlur={(e) => handleCheckZip(e, isShippingAddr)}
          />
          {isShippingAddr && errMsgSZip.length > 0 && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              {errMsgSZip}
            </span>
          )}
          {!isShippingAddr && errMsgBZip.length > 0 && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              {errMsgBZip}
            </span>
          )}
          {((showErrorsSA && isShippingAddr && errors.postalCode) ||
            (showErrorsBA && !isShippingAddr && billAddrErrors.postalCode)) &&
            errMsgSZip.length === 0 && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                郵便番号を入力してください
              </span>
            )}
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="province" className={`${styles.Label}`}>
            都道府県:
          </label>
          <input
            id="province"
            name="province"
            type="text"
            className={`${styles.Input}`}
            value={address.province}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="city" className={`${styles.Label}`}>
            市区町村:
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className={`${styles.Input}`}
            value={address.city}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="streetAddress1" className={`${styles.Label}`}></label>
          <input
            id="streetAddress1"
            name="streetAddress1"
            type="text"
            className={`${styles.Input} mt-1`}
            value={address.streetAddress1}
          />
        </div>
        <div className={`${styles.InputItem}`}>
          <label htmlFor="streetAddress2" className={`${styles.Label}`}>
            番地:
          </label>
          <input
            id="streetAddress2"
            name="streetAddress2"
            type="text"
            className={`${styles.Input}`}
            value={address.streetAddress2}
            onChange={(e) => handleChangeAddress(e, isShippingAddr)}
          />
          {((showErrorsSA && isShippingAddr && errors.streetAddress2) ||
            (showErrorsBA &&
              !isShippingAddr &&
              billAddrErrors.streetAddress2)) && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              番地を入力してください
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
              <span>この住所を保存</span>
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
            <h2 className="mt-4 text-xs font-extralight">お届け先:</h2>
            {shippingAddress && !editSAddr ? (
              <>
                <AddressCard address={sAddress} />
                <button
                  className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
                  hover:bg-stone-300 hover:text-stone-800"
                  onClick={() => setEditSAddr(true)}
                >
                  編集
                </button>
              </>
            ) : (
              <div className={`${styles.addressCardBox} ${styles.sAddressBox}`}>
                {addressForm(sAddress, true)}
                {shippingAddress && (
                  <div className="flex gap-1">
                    <button
                      className="mt-2 bg-stone-600 text-white py-1 px-2
                      hover:bg-stone-300 hover:text-stone-800"
                      onClick={() => saveAddress(sAddress)}
                    >
                      保存
                    </button>
                    <button
                      className="mt-2 bg-stone-600 text-white py-1 px-2
                      hover:bg-stone-300 hover:text-stone-800"
                      onClick={() => handleCancelEditAddress(true)}
                    >
                      キャンセル
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <h2 className="mt-4 text-xs font-extralight">請求先:</h2>
            {billingAddress && !editBAddr && (
              <>
                <AddressCard address={bAddress} />
                <button
                  className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
                  hover:bg-stone-300 hover:text-stone-800"
                  onClick={() => setEditBAddr(true)}
                >
                  編集
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
                  <span className="ml-1">お届け先と同じ</span>
                </label>
              </div>
            )}
            {(!billAddrCheck || editBAddr) && (
              <div className={`${styles.addressCardBox}`}>
                {addressForm(bAddress, false)}
                {editBAddr && (
                  <div className="flex">
                    <button
                      className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
                    hover:bg-stone-300 hover:text-stone-800"
                      onClick={() => saveAddress(bAddress)}
                    >
                      保存
                    </button>
                    <button
                      className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
                    hover:bg-stone-300 hover:text-stone-800"
                      onClick={() => handleCancelEditAddress(false)}
                    >
                      キャンセル
                    </button>
                    <button
                      className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
                      hover:bg-stone-300 hover:text-stone-800"
                      onClick={() => handleDeleteBAddress(bAddress.addressId)}
                    >
                      アドレスを削除
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
