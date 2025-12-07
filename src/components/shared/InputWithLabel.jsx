import styles from "../../styles/AddressForm.module.css";

const InputWithLabel = ({
  id,
  type,
  value,
  onInputChange,
  children,
  isSAddr,
}) => (
  <>
    <label
      htmlFor={id}
      className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Label}`}
    >
      {children}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input}`}
      value={value}
      onChange={(e) => onInputChange(e)}
    />
  </>
);

export default InputWithLabel;
