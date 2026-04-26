import { useSelector, useDispatch } from "react-redux";
import AddressForm from "./AddressForm";
import { changeSelectedAddr } from "../../store/actions";
import styles from "../../styles/AddressList.module.css";

const AddressList = () => {
  const { sAddressList, bAddressList, selectedSAddrId, selectedBAddrId } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSelectAddress = (e, isSAddr) => {
    dispatch(changeSelectedAddr(isSAddr, Number(e.target.value)));
  };

  return (
    <div className="w-full flex px-2">
      <div
        className="grid grid-col-1
          md:grid-cols-2 md:mx-auto"
      >
        <div className={`${styles.Address} mb-4`}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "800",
              fontFamily: "serif",
            }}
          >
            Shipping Address
          </h2>
          {(!sAddressList || sAddressList.length == 0) && (
            <AddressForm isSAddr />
          )}
          {sAddressList?.map((address) => {
            return (
              <div key={address.addressId} className="mt-1 flex gap-x-2">
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
                <span>Ship to another address</span>
              </label>
              {sAddressList && selectedSAddrId === 0 && <AddressForm isSAddr />}
            </div>
          )}
        </div>
        <hr className={`${styles.Line} md:hidden`} />
        <div className={`${styles.Address} mb-4`}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "800",
              fontFamily: "serif",
            }}
          >
            Billing Address
          </h2>
          <div className="-mt-1">
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
            <span>Same as shipping address</span>
          </div>
          {bAddressList?.map((address) => {
            return (
              <div key={address.addressId} className="mt-3 flex gap-x-2">
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
          <label htmlFor="selected-b-addr-1" className="mt-1">
            <input
              type="radio"
              id="selected-b-addr-1"
              name="selected-b-addr-1"
              value="-1"
              checked={selectedBAddrId === -1}
              onChange={(e) => handleSelectAddress(e, false)}
              className="mx-1"
            />
            <span>Send the bill to another address</span>
          </label>
          {selectedBAddrId === -1 && <AddressForm />}
        </div>
      </div>
    </div>
  );
};

export default AddressList;
