import CartItemsTable from "./shared/CartItemsTable";
import { useSelector } from "react-redux";

const OrderCompleted = () => {
  const data = useSelector((state) => state.order);
  return (
    <>
      <h2>Thank you for your purchase. Your order has been placed.</h2>
      <h3>Order Summary</h3>
      <div className="border px-3 py-1">
        <span>Shipping Address:</span>
        <span>name</span>
        {/* <span>{data.address.streetAddress1}</span>
        <span>{data.address.streetAddress2}</span>
        <span>{data.address.city}</span>
        <span>{data.address.province}</span>
        <span>{data.address.postalCode}</span>
        <span>{data.address.countryCode}</span> */}
      </div>
      {/* <CartItemsTable {...data.cart} /> */}
    </>
  );
};

export default OrderCompleted;
