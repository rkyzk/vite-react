import styles from "../../styles/AddressCard.module.css";

const AddressCard = ({ address }) => {
  return (
    <div className={`${styles.Address}`}>
      <span>{address?.fullname}</span>
      <span>{address?.streetAddress1}</span>
      {address?.streetAddress2 && (
        <span className="block">{address.streetAddress2}</span>
      )}
      <span className="block">{address?.city}</span>
      <span className="block">{address?.province}</span>
      <span className="block">{address?.postalCode}</span>
      <span className="block">{address?.countryCode}</span>
    </div>
  );
};

export default AddressCard;
