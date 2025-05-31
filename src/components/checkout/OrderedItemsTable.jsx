import OrderedItem from "./OrderedItem";

const OrderedItemsTable = ({ cart }) => {
  return (
    <>
      <div className="flex w-full xl:w-10/12 mt-2">
        <span className="w-6/12 font-bold">product</span>
        <span className="w-3/12 text-center font-bold">quantity</span>
        <span className="w-3/12 text-center font-bold">unit price</span>
      </div>
      <hr className="mt-1" />
      <div className="w-full xl:w-10/12">
        {cart?.cartItems.map((item, idx) => {
          let data = { ...item, idx: idx };
          return <OrderedItem key={idx} data={data} />;
        })}
      </div>
      <div className="flex w-full xl:w-10/12 justify-end">
        <span className="w-9/12 text-right font-bold">Total: </span>
        <span className="w-3/12 text-center pr-4 font-bold">
          {cart?.totalPrice}
        </span>
      </div>
    </>
  );
};

export default OrderedItemsTable;
