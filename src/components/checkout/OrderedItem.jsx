import styles from "../../styles/OrderedItem.module.css";

const OrderedItem = ({ data }) => {
  const { product, quantity } = data;
  return (
    <div className="flex mt-1">
      <div className="flex-col w-6/12">
        <span>{product.productName}</span>
        <img
          className={`${styles.imgSize} w-5/12`}
          src={`${product.imagePath}`}
          alt={product.productName}
        ></img>
      </div>
      <span className="w-3/12 text-center pr-4">{quantity}</span>
      <span className="w-3/12 text-center pr-4">&yen;{product.price}</span>
    </div>
  );
};

export default OrderedItem;
