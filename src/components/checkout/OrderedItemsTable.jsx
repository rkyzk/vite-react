import OrderedItem from "./OrderedItem";

const OrderedItemsTable = ({ cart }) => {
  return (
    <>
      <div className="flex w-full xl:w-10/12 mt-2">
        <span className="w-6/12 font-bold">Product</span>
        <span className="w-3/12 text-center font-bold">Quantity</span>
        <span className="w-3/12 text-center font-bold">Unit price</span>
      </div>
      <hr className="mt-1" />
      <div className="w-full xl:w-10/12">
        {cart?.cartItems.map((item, idx) => {
          let data = { ...item, idx: idx };
          return <OrderedItem key={idx} data={data} />;
        })}
      </div>
      <div className="flex w-full xl:w-10/12 justify-end">
        <span className="w-9/12 text-right font-bold">合計: </span>
        <span className="w-3/12 text-center pr-4 font-bold">
          &yen;{cart?.totalPrice}
        </span>
      </div>
    </>
  );
};

export default OrderedItemsTable;
