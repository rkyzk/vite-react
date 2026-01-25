import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "jposta";
import { useState, useEffect } from "react";
import {
  sendUpdateAddressReq,
  deleteAddress,
  validateAddress,
  storeTempAddress,
  clearAddressErrors,
} from "../../store/actions";
import styles from "../../styles/AddressForm.module.css";
import toast from "react-hot-toast";
import AddressCard from "./AddressCard";

const AddressForm = ({ address, isSAddr }) => {
  const initAddr = {
    addressId: 0,
    fullname: "",
    defaultAddressFlg: false,
    shippingAddress: isSAddr,
    streetAddress1: "",
    streetAddress2: "",
    streetAddress3: "",
    city: "",
    prefecture: "",
    postalCode: "",
    saveAddr: true,
  };
  const [tempAddress, setTempAddress] = useState(address || initAddr);
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

  const showEditForm = () => {
    setZip(tempAddress.postalCode);
    setEditAddr(true);
  };

  const handleCheckZip = () => {
    zip.length !== 7 && setErrMsgZip("7桁入力してください");
    return;
  };

  const handleChangeAddress = (e) => {
    if (e.target.name === "saveAddr" || e.target.name === "defaultAddressFlg") {
      setTempAddress({
        ...tempAddress,
        [e.target.name]: !tempAddress[e.target.name],
      });
    } else {
      setTempAddress({ ...tempAddress, [e.target.name]: e.target.value });
    }
  };

  const saveAddress = async () => {
    let result = await dispatch(validateAddress(isSAddr));
    if (result) {
      dispatch(sendUpdateAddressReq(tempAddress));
      setEditAddr(false);
      dispatch(clearAddressErrors(isSAddr));
    } else {
      return;
    }
  };

  const handleDeleteAddress = () => {
    dispatch(deleteAddress(isSAddr, address.addressId, toast));
    setTempAddress({ ...initAddr, shippingAddress: isSAddr });
    setEditAddr(false);
    dispatch(clearAddressErrors(isSAddr));
  };

  const handleCancelEditAddress = (sAddr) => {
    setTempAddress({ ...address });
    setEditAddr(false);
    setErrMsgZip("");
    dispatch(clearAddressErrors(sAddr));
  };

  useEffect(() => {
    dispatch(storeTempAddress(tempAddress));
    addrChecked && dispatch(validateAddress(isSAddr));
  }, [tempAddress]);

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

  const defaultRadioBtn = () => {
    return (
      <div className={`${isSAddr ? "s-addr" : "b-addr"} flex`}>
        <label
          htmlFor="defaultAddressFlg"
          className={`${isSAddr ? "s-addr" : "b-addr"}`}
        >
          <input
            type="radio"
            id="defaultAddressFlg"
            name="defaultAddressFlg"
            value="defaultAddress"
            checked={tempAddress.defaultAddressFlg}
            onClick={(e) => handleChangeAddress(e)}
            className={`${isSAddr ? "s-addr" : "b-addr"} m-1`}
          />
        </label>
        <span>デフォルトに設定(次回以降上に表示)</span>
      </div>
    );
  };

  const addressForm = () => {
    return (
      <form
        id={isSAddr ? "s-addr" : "b-addr"}
        onSubmit={(e) => e.preventDefault}
        className={`${isSAddr ? "s-addr" : "b-addr"}
        ${editAddr && "bg-neutral-300 pl-2 pb-2"}`}
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
        <div
          className={`${isSAddr ? "s-addr" : "b-addr"} ${
            styles.InputItem
          } mt-1`}
        >
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
        <div
          className={`${isSAddr ? "s-addr" : "b-addr"} ${
            styles.InputItem
          } mt-1`}
        >
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
        <div
          className={`${isSAddr ? "s-addr" : "b-addr"} ${
            styles.InputItem
          } mt-1`}
        >
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
        <div
          className={`${isSAddr ? "s-addr" : "b-addr"} ${
            styles.InputItem
          } mt-1`}
        >
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
          {((isSAddr && sAddrErrs?.streetAddress2) ||
            (!isSAddr && bAddrErrs?.streetAddress2)) && (
            <span className="text-sm font-semibold text-red-600 mt-0">
              番地を入力してください
            </span>
          )}
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
        <div>
          <label htmlFor="save-addr">
            <input
              type="radio"
              id="saveAddr"
              name="saveAddr"
              value="saveAddr"
              checked={tempAddress.saveAddr}
              onClick={(e) => handleChangeAddress(e)}
              className={`${isSAddr ? "s-addr" : "b-addr"} m-1`}
            />
            <span>この住所を保存</span>
          </label>
        </div>
        {editAddr && <>{saveButtons()}</>}
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
          ${!isSAddr && editAddr && "b-addr"}
          ${isSAddr && !sAddressList && !bAddressList && "md:mt-[52px]"}`}
        >
          {addressForm()}
          {((isSAddr && sAddressList?.length > 0) ||
            (!isSAddr && bAddressList?.length > 0)) && <>{defaultRadioBtn()}</>}
        </div>
      )}
    </>
  );
};

export default AddressForm;
