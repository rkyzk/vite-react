import styles from "../../styles/AddressCard.module.css";

const AddressCard = ({ address }) => {
  return (
    <>
      {address && (
        <div className={`${styles.Address}`}>
          <span>{address.fullname}</span>
          <span className="block">
            {address.postalCode.substring(0, 3)}-
            {address.postalCode.substring(3)}
          </span>
          <span className="block">{address.city}</span>
          <span>
            {address?.streetAddress1}
            {address.streetAddress2}
          </span>
          {address.streetAddress3 && (
            <>
              <br />
              {address.streetAddress3}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AddressCard;
