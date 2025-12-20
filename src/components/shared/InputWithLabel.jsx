import styles from "../../styles/AddressForm.module.css";

const InputWithLabel = ({
  id,
  type,
  value,
  onInputChange,
  children,
  isSAddr,
  maxLength,
  min,
  errors,
  errorMsg,
  register,
}) => (
  <>
    <label
      htmlFor={id}
      className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Label}`}
    >
      {children}
    </label>
    {register ? (
      <input
        id={id}
        name={id}
        type={type}
        className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input}`}
        value={value}
        {...register(id, {
          required: true,
          validate: (value) => value.length > min,
        })}
        maxLength={maxLength}
      />
    ) : (
      <input
        id={id}
        name={id}
        type={type}
        className={`${isSAddr ? "s-addr" : "b-addr"} ${styles.Input}`}
        value={value}
        maxLength={maxLength}
      />
    )}
    {id in ["fullname", "streetAddress2", "postalCode"] && errors[id] && (
      <span className="text-sm font-semibold text-red-600 mt-0">
        {errorMsg}
      </span>
    )}
  </>
);

export default InputWithLabel;
