import styles from "../../styles/CartItem.module.css";

const OrderItem = ({ idx, product, quantity, totalPrice }) => {
  const { productName, imageName, price } = product;
  return (
    <>
      <div className="flex w-full gap-1 mt-2">
        <span className="w-[50px]"></span>
        <span className="w-[170px]">{productName}</span>
        <span className="w-[100px]">個数</span>
        <span className="w-[100px]">単価</span>
      </div>
      <div className="flex w-full gap-1">
        <span className="w-[50px] text-center">{idx + 1}</span>
        <div className="w-[170px]">
          <img
            className={`${styles.imgSize}`}
            src={`/src/assets/products/${imageName}`}
            alt={productName}
          />
        </div>
        <div className="flex-col w-[100px] mt-4 ml-[8px]">
          <div>{quantity}</div>
          {totalPrice && <div className="text-right mt-[60px]">合計：</div>}
        </div>
        <div className="flex-col w-[100px] mt-4 ml-[8px]">
          <div>&yen;{price}</div>
          {totalPrice && <div className="mt-[60px]">&yen;{totalPrice}</div>}
        </div>
      </div>
    </>
  );
};

export default OrderItem;
