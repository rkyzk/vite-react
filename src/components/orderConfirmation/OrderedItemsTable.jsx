import OrderedItem from "./OrderedItem";

const OrderedItemsTable = ({ cart }) => {
  return (
    <>
      <div className="flex xl:w-10/12">
        <span className="w-6/12">Product</span>
        <span className="w-3/12 text-center">Qty</span>
        <span className="w-3/12 text-center">Unit price</span>
      </div>
      <hr className="mt-1" />
      <div className="w-full xl:w-10/12">
        {cart?.cartItems.map((item, idx) => {
          let data = { ...item };
          return <OrderedItem key={idx} data={data} />;
        })}
      </div>
      <hr />
      <div
        className="flex w-full xl:w-10/12 justify-end"
        style={{
          fontWeight: "800",
          fontFamily: "serif",
          letterSpacing: "0.1rem",
          fontSize: "1.1rem",
        }}
      >
        <span className="w-10/12 text-right">Total: </span>
        <span className="w-2/12">&yen; {cart?.totalPrice}</span>
      </div>
    </>
  );
};

export default OrderedItemsTable;
