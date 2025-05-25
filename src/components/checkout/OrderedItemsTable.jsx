import OrderedItem from "./OrderedItem";

const OrderedItemsTable = ({ cart }) => {
  return (
    <>
      <div className="flex w-full xl:w-10/12">
        <span className="w-6/12 pl-1">product</span>
        <span className="w-2/12 pl-1">quantity</span>
        <span className="w-2/12 pl-1">unit price</span>
      </div>
      <hr className="mt-1" />
      <div className="w-full md:w-10/12">
        {cart.cartItems.map((item, idx) => {
          let data = { ...item, idx: idx };
          console.log(data);
          return <OrderedItem key={idx} data={data} />;
        })}
      </div>
      <div className="flex justify-end">
        <div>
          <span className="pr-24">Total: {cart.totalPrice}</span>
        </div>
      </div>
    </>
  );
};

export default OrderedItemsTable;
