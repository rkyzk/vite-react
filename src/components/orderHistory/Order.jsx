import { useCallback, useState } from "react";
import OrderItem from "./OrderItem";
import ReviewForm from "./ReviewForm";
import { Link } from "react-router-dom";
import { TiPencil } from "react-icons/ti";
import Modal from "@mui/material/Modal";

const Order = ({
  orderId,
  orderDate,
  cart,
  shippingAddress,
  billingAddress,
}) => {
  const [open, setOpen] = useState(false);
  const closeReviewForm = () => {
    setOpen(false);
  };

  const dayOfTheWeek = useCallback(() => {
    let date = new Date(orderDate);
    return date.getDay();
  }, [orderDate]);

  const days = {
    0: "日",
    1: "月",
    2: "火",
    3: "水",
    4: "木",
    5: "金",
    6: "土",
  };

  return (
    <>
      <div className="flex w-full gap-1 pl-3 bg-amber-950 text-white">
        <span className="w-5/12">
          注文日付：{orderDate.substring(0, 4)}年{orderDate.substring(5, 7)}月
          {orderDate.substring(8, 10)}日
        </span>
        <span className="w-4/12">注文番号：{orderId}</span>
      </div>
      <div className="xs:flex-col sm:flex sm:flex-row sm:items-center">
        <div className="w-[600px]">
          {cart?.cartItems.map((item, idx) => (
            <OrderItem {...item} idx={idx} />
          ))}
          <div className="flex w-full gap-1 mb-3 mt-[-10px]">
            <span className="w-6/12 text-center"></span>
            <span className="w-2/12">合計：</span>
            <span className="w-4/12">&yen;{cart.totalPrice}</span>
          </div>
        </div>
        <div className="h-[18px]">
          <button onClick={() => setOpen(true)} className="flex">
            <TiPencil className="mt-1" />
            レビューを書く
          </button>
        </div>
      </div>
      <Modal open={open} onClose={closeReviewForm}>
        <ReviewForm closeReviewForm={closeReviewForm} orderId={orderId} />
      </Modal>
    </>
  );
};

export default Order;
