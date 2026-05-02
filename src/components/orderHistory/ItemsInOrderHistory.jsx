import { IMAGE_URL } from "../../constans/constants.js";
import styles from "../../styles/ItemsInOrderHistory.module.css";

const ItemsInOrderHistory = ({ product, quantity, totalPrice }) => {
  const { productName, imagePath, price } = product;
  return (
    <>
      <div className="flex gap-1 mt-1">
        <span className="w-5/12">{productName}</span>
        <span className="w-3/12">Qty</span>
        <span className="w-4/12">Unit price</span>
      </div>
      <div className="flex gap-1">
        <div className="w-5/12">
          <div className={`${styles.imageBox} relative`}>
            <img
              className={`${styles.imageSize} absolute object-cover overflow-hidden`}
              src={`${IMAGE_URL}${imagePath}`}
              alt={productName}
            />
          </div>
        </div>
        <div className="flex-col w-3/12 mt-4 ml-4">{quantity}</div>
        <div className="flex-col w-4/12 mt-4 ml-2">&yen;{price}</div>
      </div>
      <div className="flex">
        <div className="w-8/12 text-right mt-1 pr-1">
          {totalPrice && <span>Total:</span>}
        </div>
        <div className="w-3/12 mt-1 pl-2.25">
          {totalPrice && <span className="">&yen;{totalPrice}</span>}
        </div>
      </div>
    </>
  );
};

export default ItemsInOrderHistory;
