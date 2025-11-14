import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import { changeSelectedAddr, clearAddressData } from "../../store/actions";

const AddressList = () => {
  const { sAddressList, bAddressList, selectedSAddrId, selectedBAddrId } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSelectAddress = (e, isSAddr) => {
    dispatch(changeSelectedAddr(isSAddr, Number(e.target.value)));
  };

  useEffect(() => {}, [selectedSAddrId, selectedBAddrId]);
  useEffect(() => {
    dispatch(clearAddressData());
  }, []);

  return (
    <div className="flex w-full mt-3">
      <div className="grid xs:grid-col-1 sm:grid-cols-2 xs:gap-2 sm:gap-x-4 md:gap-x-16">
        <div className="min-w-[300px] flex-col">
          <h2 className="mt-4 text-xs font-extralight">お届け先:</h2>
          {!sAddressList && <AddressForm isSAddr />}
          {sAddressList?.map((address) => {
            return (
              <div key={address.addressId} className="mt-2 flex gap-x-2">
                <label htmlFor={`selected-addr` + address.addressId}>
                  <input
                    type="radio"
                    id={`selected-addr` + address.addressId}
                    name={`selected-addr` + address.addressId}
                    value={address.addressId}
                    checked={address.addressId === selectedSAddrId}
                    onChange={(e) => handleSelectAddress(e, true)}
                    className="m-1"
                  />
                </label>
                <AddressForm address={address} isSAddr />
              </div>
            );
          })}
          {sAddressList?.length > 0 && (
            <div>
              <label htmlFor="selected-addr0" className="mt-3">
                <input
                  type="radio"
                  id="selected-addr0"
                  name="selected-addr0"
                  value="0"
                  checked={selectedSAddrId === 0}
                  onChange={(e) => handleSelectAddress(e, true)}
                  className="m-1"
                />
                <span>他の住所に配送する</span>
              </label>
              {sAddressList && selectedSAddrId === 0 && <AddressForm />}
            </div>
          )}
        </div>
        <div>
          <h2 className="mt-4 text-xs font-extralight">請求先:</h2>
          <div className="mt-[-10px]">
            <label htmlFor="selected-b-addr0">
              <input
                type="radio"
                id="selected-b-addr0"
                name="selected-b-addr0"
                value="0"
                checked={selectedBAddrId === 0}
                onChange={(e) => handleSelectAddress(e, false)}
                className="m-1"
              />
            </label>
            <span className="ml-1">お届け先と同じ</span>
          </div>
          {selectedBAddrId !== 0 && !bAddressList && (
            <div className="mt-[-23px]">
              <AddressForm />
            </div>
          )}
          {bAddressList?.map((address) => {
            return (
              <div
                key={address.addressId}
                className="mt-2 flex align-items-center gap-x-2"
              >
                <label htmlFor={`selected-b-addr` + address.addressId}>
                  <input
                    type="radio"
                    id={`selected-b-addr` + address.addressId}
                    name={`selected-b-addr` + address.addressId}
                    value={address.addressId}
                    checked={address.addressId === selectedBAddrId}
                    onChange={(e) => handleSelectAddress(e, false)}
                    className="m-1"
                  />
                </label>
                <AddressForm address={address} />
              </div>
            );
          })}
          {bAddressList?.length > 0 && (
            <label htmlFor="selected-b-addr-1" className="mt-3">
              <input
                type="radio"
                id="selected-b-addr-1"
                name="selected-b-addr-1"
                value="-1"
                checked={selectedBAddrId === -1}
                onChange={(e) => handleSelectAddress(e, false)}
                className="m-1"
              />
              <span>他アドレスを使用する</span>
            </label>
          )}
          {selectedBAddrId === -1 && <AddressForm />}
        </div>
      </div>
    </div>
  );
};

export default AddressList;
