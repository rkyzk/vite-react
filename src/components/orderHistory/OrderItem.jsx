import styles from "../../styles/CartItem.module.css";

const OrderItem = ({ idx, product, quantity }) => {
  const { productName, imageName, price } = product;
  return (
    <>
      <div className="flex w-full gap-1 mt-2">
        <span className="w-1/12"></span>
        <span className="w-5/12">{productName}</span>
        <span className="w-2/12">個数</span>
        <span className="w-3/12">単価</span>
      </div>
      <div className="flex w-full gap-1">
        <span className="w-1/12 text-center">{idx + 1}</span>
        <div className="w-5/12">
          <img
            className={`${styles.imgSize}`}
            src={`/src/assets/products/${imageName}`}
            alt={productName}
          />
        </div>
        <div className="w-2/12 mt-4 ml-2">{quantity}</div>
        <span className="w-3/12 mt-4">&yen;{price}</span>
      </div>
    </>
  );
};

export default OrderItem;
