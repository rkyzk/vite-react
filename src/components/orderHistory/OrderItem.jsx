import styles from "../../styles/CartCartItem.module.css";

const OrderItem = ({ idx, product, quantity, totalPrice }) => {
  const { productName, imagePath, price } = product;
  return (
    <>
      <div className="flex w-full gap-1 mt-2">
        <span className="w-12.5"></span>
        <span className="w-50">{productName}</span>
        <span className="w-22.5">Quantity</span>
        <span className="w-20 pl-6.25">Unit price</span>
      </div>
      <div className="flex w-full gap-1">
        <span className="w-12.5 text-center">{idx + 1}</span>
        <div className="w-50">
          <img
            className={`${styles.imgSize}`}
            src={`${imagePath}`}
            alt={productName}
          />
        </div>
        <div className="flex-col w-22.5 mt-4 ml-2">
          <div>{quantity}</div>
          {totalPrice && <div className="text-right mt-15">Total:</div>}
        </div>
        <div className="flex-col w-20 mt-4 ml-2">
          <div>&yen;{price}</div>
          {totalPrice && <div className="mt-15">&yen;{totalPrice}</div>}
        </div>
      </div>
    </>
  );
};

export default OrderItem;
