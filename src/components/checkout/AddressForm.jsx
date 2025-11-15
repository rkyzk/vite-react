import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "jposta";
import { useEffect, useState } from "react";
import {
  sendUpdateAddressReq,
  deleteAddress,
  storeAddress,
  clearAddressErrors,
  validateAddress,
} from "../../store/actions";
import styles from "../../styles/AddressForm.module.css";
import toast from "react-hot-toast";
import AddressCard from "./AddressCard";

const AddressForm = ({ address, isSAddr }) => {
  const initAddr = {
    addressId: 0,
    fullname: "",
    defaultAddressFlg: false,
    shippingAddress: true,
    streetAddress1: "",
    streetAddress2: "",
    streetAddress3: "",
    city: "",
    prefecture: "",
    postalCode: "",
    saveAddr: true,
  };
  const [tempAddress, setTempAddress] = useState(initAddr);
  const { sAddrErrs, bAddrErrs, addrChecked, sAddressList, bAddressList } =
    useSelector((state) => state.auth);
  const [editAddr, setEditAddr] = useState(false);
  const [zip, setZip] = useState("");
  const [errMsgZip, setErrMsgZip] = useState("");
  const dispatch = useDispatch();

  /**
   * 住所を取得
   */
  const handleChangeZip = (e) => {
    let zip = e.target.value;
    setZip(zip);
    zip.length === 7 ? fetchAddress(zip) : clearAddr();
  };

  const clearAddr = () => {
    setTempAddress({
      ...tempAddress,
      prefecture: "",
      city: "",
      streetAddress1: "",
    });
  };

  const fetchAddress = async (zip) => {
    addrChecked && dispatch(validateAddress(tempAddress, isSAddr));
    const res = await getAddress(zip);
    if (res === null) {
      setErrMsgZip("正しい郵便番号を入力してください。");
      clearAddr();
      return;
    }
    setErrMsgZip("");
    setTempAddress({
      ...tempAddress,
      postalCode: zip,
      prefecture: res.pref,
      city: res.city,
      streetAddress1: res.area,
    });
  };

  const hideEditForm = (e) => {
    if (
      (isSAddr && !e.target.classList.contains("s-addr")) ||
      (!isSAddr && !e.target.classList.contains("b-addr"))
    ) {
      handleCancelEditAddress(isSAddr);
      document.removeEventListener("click", hideEditForm);
    }
  };

  const showEditForm = () => {
    setZip(tempAddress.postalCode);
    setEditAddr(true);
    setTimeout(() => {
      document.addEventListener("click", hideEditForm);
    }, 200);
  };

  const handleCheckZip = () => {
    zip.length !== 7 && setErrMsgZip("7桁入力してください");
    return;
  };

  const handleChangeAddress = (e) => {
    setTempAddress({ ...tempAddress, [e.target.name]: e.target.value });
    addrChecked && dispatch(validateAddress(tempAddress, isSAddr));
  };

  const toggleSaveAddr = () => {
    setTempAddress({
      ...tempAddress,
      saveAddr: !tempAddress.saveAddr,
    });
  };

  const toggledeDefaultAddressFlg = () => {
    setTempAddress({
      ...tempAddress,
      defaultAddressFlg: !tempAddress.defaultAddressFlg,
    });
  };

  const saveAddress = async () => {
    let result = await dispatch(validateAddress(isSAddr));
    if (result) {
      dispatch(sendUpdateAddressReq(tempAddress));
      setEditAddr(false);
    } else {
      return;
    }
  };

  const handleDeleteAddress = () => {
    dispatch(deleteAddress(isSAddr, address.id, toast));
    setTempAddress({ ...initAddr, shippingAddress: isSAddr });
    setEditAddr(false);
  };

  const handleCancelEditAddress = (sAddr) => {
    setTempAddress({ ...address });
    setEditAddr(false);
    setErrMsgZip("");
    dispatch(clearAddressErrors(sAddr));
  };

  const handleStoreAddress = () => {
    console.log("form139: " + isSAddr);
    dispatch(storeAddress(tempAddress, isSAddr));
  };
  useEffect(() => {
    address && setTempAddress(address);
  }, []);

  const saveButtons = () => {
    return (
      <div className={`gap-x-1 pl-2 ${isSAddr ? "s-addr" : "b-addr"}`}>
        <button
          className="mt-2 bg-stone-600 text-white py-1 px-2 hover:bg-stone-300 hover:text-stone-800"
          onClick={() => saveAddress(tempAddress)}
        >
          保存
        </button>
        <button
          className="m-2 bg-stone-600 text-white py-1 px-2
                    hover:bg-stone-300 hover:text-stone-800"
          onClick={() => handleCancelEditAddress(isSAddr)}
        >
          キャンセル
        </button>
      </div>
    );
  };
  const editButtons = () => {
    return (
      <div className="mt-2 flex justify-start gap-x-2">
        <button
          className="text-stone-900 p-1 hover:bg-stone-300"
          style={{ border: "#555 solid 1px" }}
          onClick={() => showEditForm(true)}
        >
          編集
        </button>
        <button
          className="bg-stone-600 text-white py-1 px-2
                     hover:text-stone-800 hover:bg-stone-300 "
          onClick={() => handleDeleteAddress()}
        >
          この住所を削除
        </button>
      </div>
    );
  };

  const addressForm = () => {
    return (
      <form
        id={isSAddr ? "s-addr" : "b-addr"}
        onSubmit={(e) => e.preventDefault}
        onBlur={() => handleStoreAddress()}
        className={`${isSAddr ? "s-addr" : "b-addr"} pl-2`}
      >
        <div className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.InputItem}`}>
          <label
            htmlFor="fullname"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Label}`}
          >
            氏名:
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input}`}
            value={tempAddress?.fullname}
            onChange={(e) => handleChangeAddress(e, isSAddr)}
          />
          {((isSAddr && sAddrErrs?.fullname) ||
            (!isSAddr && bAddrErrs?.fullname)) && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              氏名を入力してください
            </span>
          )}
        </div>
        <div className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.InputItem}`}>
          <label
            htmlFor="postalCode"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Label}`}
          >
            郵便番号(ハイフンなし):
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input}`}
            value={zip}
            maxLength="7"
            onChange={(e) => handleChangeZip(e)}
            onBlur={(e) => handleCheckZip(e)}
          />
          {errMsgZip.length > 0 && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              {errMsgZip}
            </span>
          )}
          {errMsgZip.length === 0 &&
            ((isSAddr && sAddrErrs?.postalCode) ||
              (!isSAddr && bAddrErrs?.postalCode)) && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                郵便番号を入力してください
              </span>
            )}
        </div>
        <div className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.InputItem}`}>
          <label
            htmlFor="province"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Label}`}
          >
            都道府県:
          </label>
          <input
            id="province"
            name="province"
            type="text"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input}`}
            value={tempAddress?.prefecture}
          />
        </div>
        <div className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.InputItem}`}>
          <label
            htmlFor="city"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Label}`}
          >
            市区町村:
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input}`}
            value={tempAddress?.city}
          />
        </div>
        <div className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.InputItem}`}>
          <label
            htmlFor="streetAddress1"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Label}`}
          ></label>
          <input
            id="streetAddress1"
            name="streetAddress1"
            type="text"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input} mt-1`}
            value={tempAddress?.streetAddress1}
          />
        </div>
        <div className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.InputItem}`}>
          <label
            htmlFor="streetAddress2"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Label}`}
          >
            番地・建物名・部屋番号:
          </label>
          <input
            id="streetAddress2"
            name="streetAddress2"
            type="text"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input}`}
            value={tempAddress?.streetAddress2}
            onChange={(e) => handleChangeAddress(e)}
          />
          {(isSAddr && sAddrErrs?.streetAddress2) ||
            (!isSAddr && bAddrErrs?.streetAddress2 && (
              <span className="text-sm font-semibold text-red-600 mt-0">
                番地を入力してください
              </span>
            ))}
        </div>
        <div className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.InputItem}`}>
          <label
            htmlFor="streetAddress3"
            className={`${isSAddr ? "s-addr" : "b-addr"} hidden`}
          ></label>
          <input
            id="streetAddress3"
            name="streetAddress3"
            type="text"
            className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input} mt-1`}
            value={tempAddress?.streetAddress3}
            onChange={(e) => handleChangeAddress(e)}
          />
        </div>
        {!address && (
          <div>
            <label htmlFor="save-addr">
              <input
                type="radio"
                id="saveAddr"
                name="saveAddr"
                value={tempAddress?.saveAddr}
                checked={tempAddress?.saveAddr}
                onClick={() => toggleSaveAddr()}
                onChange={(e) => handleChangeAddress(e)}
                className={`${isSAddr ? "s-addr" : "b-addr"} m-1`}
              />
              <span>この住所を保存</span>
            </label>
          </div>
        )}
        {!address &&
          ((isSAddr && sAddressList?.length > 0) ||
            (!isSAddr && bAddressList?.length > 0)) && (
            <div className={`${isSAddr ? "s-addr" : "b-addr"} flex`}>
              <label
                htmlFor="save-addr"
                className={`${isSAddr ? "s-addr" : "b-addr"}`}
              >
                <input
                  type="radio"
                  id="saveAddr"
                  name="saveAddr"
                  value={tempAddress?.defaultAddressFlg}
                  checked={tempAddress?.defaultAddressFlg}
                  onClick={() => toggledeDefaultAddressFlg()}
                  onChange={(e) => handleChangeAddress(e)}
                  className={`${isSAddr ? "s-addr" : "b-addr"} m-1`}
                />
              </label>
              <span>
                デフォルトに設定
                <br />
                (次回以降上に表示する)
              </span>
            </div>
          )}
        {((isSAddr && sAddressList?.length > 1) ||
          (!isSAddr && bAddressList?.length > 1)) && <>{saveButtons()}hello</>}
      </form>
    );
  };

  return (
    <>
      {address && !editAddr ? (
        <div className="flex-col">
          <AddressCard address={tempAddress} />
          {editButtons()}
        </div>
      ) : (
        <div
          className={`${isSAddr && editAddr && "s-addr"}
          ${styles.addressCardBox} ${styles.sAddressBox}
          ${!isSAddr && editAddr && "b-addr"}`}
        >
          {addressForm()}
          {editAddr && <>{saveButtons()}</>}
        </div>
      )}
    </>
  );
};

export default AddressForm;
