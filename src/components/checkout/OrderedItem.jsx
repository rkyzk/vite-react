import styles from "../../styles/OrderedItem.module.css";

const OrderedItem = ({ data }) => {
  return (
    <div className="flex mt-1">
      <div className="flex-col w-6/12">
        <span>{data.product.productName}</span>
        <img
          className={`${styles.imgSize} w-5/12`}
          src={`/src/assets/products/${data.product.imageName}`}
          alt={data.product.productName}
        ></img>
      </div>
      <span className="w-3/12 text-center pr-4">{data.quantity}</span>
      <span className="w-3/12 text-center pr-4">&yen;{data.product.price}</span>
    </div>
  );
};

export default OrderedItem;
