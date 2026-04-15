import CartItem from "../CartItem";

const CartItemsTable = ({ cart }) => {
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0,
  );
  return (
    <>
      <div className="flex w-full md:w-10/12">
        <span className="w-5/12 pl-11">Product</span>
        <span className="w-2/12 pl-2">Quantity</span>
        <span className="w-2/12 pl-2">Unit price</span>
      </div>
      <hr className="mt-1" />
      <div className="w-full md:w-10/12">
        {cart.map((item, idx) => {
          let data = { ...item, idx: idx };
          return <CartItem key={idx} {...data} />;
        })}
      </div>
      <div className="flex justify-end">
        <div>
          <span className="pr-24">Total: {totalPrice}</span>
        </div>
      </div>
    </>
  );
};

export default CartItemsTable;
