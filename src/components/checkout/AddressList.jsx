import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AddressForm from "./AddressForm";
import { changeSelectedAddr, clearAddressData } from "../../store/actions";

const AddressList = () => {
  const { sAddressList, bAddressList, selectedSAddrId, selectedBAddrId } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSelectAddress = (e, isSAddr) => {
    dispatch(changeSelectedAddr(isSAddr, Number(e.target.value)));
  };

  useEffect(() => {
    dispatch(clearAddressData());
  }, []);

  return (
    <div className="xs:w-full xs:flex-col sm:mx-auto sm:flex sm:max-w-[800px] sm:justify-around">
      <div className="w-[300px] flex-col">
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
            {sAddressList && selectedSAddrId === 0 && <AddressForm isSAddr />}
          </div>
        )}
      </div>
      <div className="w-[300px] xs:mx-auto">
        <h2 className="mt-4 text-xs font-extralight">請求先:</h2>
        <div>
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
        {bAddressList?.map((address) => {
          return (
            <div key={address.addressId} className="mt-2 flex gap-x-2">
              <label htmlFor={`selected-b-addr` + address?.addressId}>
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
          <span>他の住所を使用する</span>
        </label>
        {selectedBAddrId === -1 && <AddressForm />}
      </div>
    </div>
  );
};

export default AddressList;
