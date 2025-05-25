const OrderedItem = ({ data }) => {
  console.log(data);
  return (
    <div className="flex mt-1">
      <span className="w-5/12">{data.product.productName}</span>
      <img
        className="w-2/12"
        src={`/src/assets/products/${data.product.imageName}`}
        alt={data.product.productName}
      ></img>
      <span className="w-2/12 pl-4">{data.quantity}</span>
      <span className="w-2/12 pl-4">{data.product.price}</span>
    </div>
  );
};

export default OrderedItem;
