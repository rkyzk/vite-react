import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "jposta";
import { useEffect, useState } from "react";
import {
  sendUpdateAddressReq,
  deleteAddress,
  storeAddress,
  clearBAddress,
  validateAddr,
  clearSAddressErrors,
  clearBAddressErrors,
} from "../../store/actions";
import styles from "../../styles/AddressForm.module.css";
import AddressCard from "./AddressCard";
import toast from "react-hot-toast";

const AddressForm = ({ props }) => {
  const { billAddrCheck, setBillAddrCheck } = props;
  const { shippingAddress, billingAddress, sAddrErrs, bAddrErrs, addrChecked } =
    useSelector((state) => state.auth);
  const initAddr = {
    addressId: "",
    fullname: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    province: "",
    postalCode: "",
    countryCode: "15",
    saveAddr: true,
  };
  const [sAddress, setSAddress] = useState({
    ...initAddr,
    billingAddress: false,
  });
  const [bAddress, setBAddress] = useState({
    ...initAddr,
    billingAddress: true,
  });
  const [editSAddr, setEditSAddr] = useState(false);
  const [editBAddr, setEditBAddr] = useState(false);
  const [saveSAddr, setSaveSAddr] = useState(true);
  const [saveBAddr, setSaveBAddr] = useState(true);
  const [sZip, setSZip] = useState("");
  const [bZip, setBZip] = useState("");
  const [errMsgSZip, setErrMsgSZip] = useState("");
  const [errMsgBZip, setErrMsgBZip] = useState("");
  const dispatch = useDispatch();

  /**
   * 住所を取得
   */
  const handleChangeZip = (e, isShippingAddr) => {
    let zip = e.target.value;
    if (isShippingAddr) {
      setSZip(zip);
      if (
        (isShippingAddr && (!shippingAddress || editSAddr)) ||
        (!isShippingAddr && (!billingAddress || editBAddr))
      ) {
        if (zip.length === 7) {
          fetchAddress(zip, isShippingAddr);
        } else {
          clearAddr(isShippingAddr);
        }
      }
    }
  };

  const clearAddr = (sAddr) => {
    if (sAddr) {
      setSAddress({
        ...sAddress,
        province: "",
        city: "",
        streetAddress1: "",
      });
    } else {
      setBAddress({
        ...bAddress,
        province: "",
        city: "",
        streetAddress1: "",
      });
    }
  };

  const fetchAddress = async (zip, sAddr) => {
    addrChecked && dispatch(validateAddr(sAddr));
    const res = await getAddress(zip);
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

  const showEditForm = (sAddr) => {
    if (sAddr) {
      setSZip(sAddress.postalCode);
      setEditSAddr(true);
    } else {
      setBZip(bAddress.postalCode);
      setEditBAddr(true);
    }
  };

  const handleCheckZip = (e, isShippingAddr) => {
    isShippingAddr && sZip.length !== 7 && setErrMsgSZip("7桁入力してください");
    !isShippingAddr &&
      bZip.length !== 7 &&
      setErrMsgBZip("7桁入力してください");
    return;
  };

  const handleChangeAddress = (e, isShippingAddr) => {
    isShippingAddr
      ? setSAddress({ ...sAddress, [e.target.name]: e.target.value })
      : setBAddress({ ...bAddress, [e.target.name]: e.target.value });
    addrChecked && dispatch(validateAddr(isShippingAddr));
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

  const saveAddress = async (address) => {
    let result = await dispatch(validateAddr(!address.billingAddress));
    if (result) {
      dispatch(sendUpdateAddressReq(address));
      address.billingAddress ? setEditBAddr(false) : setEditSAddr(false);
    }
  };

  const handleDeleteAddress = (isShippingAddr) => {
    dispatch(
      deleteAddress(
        isShippingAddr,
        isShippingAddr ? sAddress.id : bAddress.id,
        toast
      )
    );
    if (isShippingAddr) {
      setSAddress({ ...initAddr, billingAddress: false });
      setEditSAddr(false);
    } else {
      setBAddress({ ...initAddr, billingAddress: true });
      setEditBAddr(false);
    }
  };

  const handleCancelEditAddress = (isShippingAddr) => {
    if (isShippingAddr) {
      setSAddress({ ...shippingAddress, billingAddress: false });
      setEditSAddr(false);
      setErrMsgSZip("");
      dispatch(clearSAddressErrors());
    } else {
      setBAddress({ ...billingAddress, billingAddress: true });
      setEditBAddr(false);
      setErrMsgBZip("");
      dispatch(clearBAddressErrors());
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (shippingAddress) {
      setSAddress({ ...shippingAddress, saveAddr: true });
    }
    if (billingAddress) {
      setBAddress({ ...billingAddress, saveAddr: true });
    }
  }, [shippingAddress, billingAddress]);

  useEffect(() => {
    if (!billingAddress || editBAddr) {
      if (bZip.length === 7) {
        fetchAddress(false);
      } else {
        clearAddr(false);
      }
    }
  }, [bZip]);
  useEffect(() => {
    const sAddrHandler = setTimeout(() => {
      dispatch(storeAddress(sAddress));
    }, 700);
    return () => clearTimeout(sAddrHandler);
  }, [sAddress]);
  useEffect(() => {
    const bAddrHandler = setTimeout(() => {
      if (!billAddrCheck) {
        dispatch(storeAddress(bAddress));
      } else {
        dispatch(clearBAddress());
      }
    }, 700);
    return () => clearTimeout(bAddrHandler);
  }, [bAddress, billAddrCheck]);

  const editButtons = (isShippingAddr) => {
    return (
      <div className="flex">
        <button
          className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
                    hover:bg-stone-300 hover:text-stone-800"
          onClick={() => saveAddress(isShippingAddr ? sAddress : bAddress)}
        >
          保存
        </button>
        <button
          className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
                    hover:bg-stone-300 hover:text-stone-800"
          onClick={() => handleCancelEditAddress(isShippingAddr)}
        >
          キャンセル
        </button>
        <button
          className="mt-2 mx-auto bg-stone-600 text-white py-1 px-2
                      hover:bg-stone-300 hover:text-stone-800"
          onClick={() => handleDeleteAddress(isShippingAddr)}
        >
          アドレスを削除
        </button>
      </div>
    );
  };

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
          {((isShippingAddr && sAddrErrs?.fullname) ||
            (!isShippingAddr && bAddrErrs?.fullname)) && (
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
            maxLength="7"
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
          {((isShippingAddr && sAddrErrs?.postalCode) ||
            (!isShippingAddr && sAddrErrs?.postalCode)) &&
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
          {((isShippingAddr && sAddrErrs?.streetAddress2) ||
            (!isShippingAddr && bAddrErrs?.streetAddress2)) && (
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
                  onClick={() => showEditForm(true)}
                >
                  編集
                </button>
              </>
            ) : (
              <div className={`${styles.addressCardBox} ${styles.sAddressBox}`}>
                {addressForm(sAddress, true)}
                {editButtons(true)}
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
                  onClick={() => showEditForm(false)}
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
