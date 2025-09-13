import styles from "../../styles/AddressCard.module.css";

const AddressCard = ({ address }) => {
  return (
    <div className={`${styles.Address}`}>
      <span>{address?.fullname}</span>
      <span className="block">
        {address?.postalCode.substring(0, 3)}-{address?.postalCode.substring(3)}
      </span>
      <span className="block">
        {address?.province}
        {address?.city}
      </span>
      {address?.streetAddress2 ? (
        <span>
          {address?.streetAddress1}
          {address.streetAddress2}
        </span>
      ) : (
        <span>{address?.streetAddress1}</span>
      )}
    </div>
  );
};

export default AddressCard;
