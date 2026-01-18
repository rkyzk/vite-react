import { useCallback, useState } from "react";
import OrderItem from "./OrderItem";
import ReviewForm from "./ReviewForm";
import { TiPencil } from "react-icons/ti";
import Modal from "@mui/material/Modal";
import styles from "../../styles/Order.module.css";

const Order = ({
  orderId,
  orderDate,
  cart,
  review,
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
      <div className="w-full gap-1 pl-3 xs:flex-col sm:flex sm:flex-row bg-amber-950 text-white">
        <div>
          注文日付：{orderDate.substring(0, 4)}年{orderDate.substring(5, 7)}月
          {orderDate.substring(8, 10)}日
        </div>
        <div className="sm:ml-10">注文番号：{orderId}</div>
      </div>
      <div className="xs:flex-col sm:flex sm:flex-row sm:items-center">
        <div className="sm:w-[430px] md:w-[470px] lg:w-[500px]">
          {cart?.cartItems.map((item, idx) => (
            <OrderItem
              {...item}
              idx={idx}
              totalPrice={idx === cart?.cartItems.length - 1 && cart.totalPrice}
            />
          ))}
        </div>
        <div
          className={`${styles.ReviewBtn} h-[18px] mb-4 ml-[50px] mt-2 sm:mt-0 sm:ml-[20px] md:ml-0`}
        >
          {review ? (
            <p className="w-[141px] mt-1 bg-slate-600 text-white p-1">
              レビュー投稿済み
            </p>
          ) : (
            <div>
              <button
                onClick={() => setOpen(true)}
                className="flex border border-black p-1"
              >
                <TiPencil className="mt-1" />
                レビューを書く
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal open={open} onClose={closeReviewForm}>
        <ReviewForm closeReviewForm={closeReviewForm} orderId={orderId} />
      </Modal>
    </>
  );
};

export default Order;
