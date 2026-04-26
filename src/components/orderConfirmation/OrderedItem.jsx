import styles from "../../styles/OrderedItem.module.css";
import { IMAGE_URL } from "../../constans/constants";

const OrderedItem = ({ data }) => {
  const { product, quantity } = data;
  return (
    <div className="flex -mt-2.5 pb-4">
      <div className="flex-col w-6/12">
        <span>{product.productName}</span>
        <div className={`${styles.imgBox} relative`}>
          <img
            className={`${styles.imgSize} absolute overflow-hidden object-cover`}
            src={`${IMAGE_URL}${product.imagePath}`}
            alt={product.productName}
          />
        </div>
      </div>
      <span className="w-3/12 text-center pr-4 mt-5">{quantity}</span>
      <span className="w-3/12 text-center pr-4 mt-5">&yen;{product.price}</span>
    </div>
  );
};

export default OrderedItem;
