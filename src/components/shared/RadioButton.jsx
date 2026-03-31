const RadioButton = ({
  id,
  type,
  value,
  onInputChange,
  onInputClick,
  checked,
  children,
  isSAddr,
}) => (
  <label htmlFor={id} className={`${isSAddr ? "s-addr" : "b-addr"}`}>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onInputChange(e)}
      onClick={(e) => onInputClick(e)}
      checked={checked}
      className={`${isSAddr ? "s-addr" : "b-addr"} m-1`}
    />
    {children}
  </label>
);

export default RadioButton;
