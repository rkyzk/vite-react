import { useState } from "react";
import ItemsInOrderHistory from "./ItemsInOrderHistory";
import ReviewForm from "./ReviewForm";
import { TiPencil } from "react-icons/ti";
import Modal from "@mui/material/Modal";

const Order = ({ orderId, orderDate, cart, review }) => {
  const [open, setOpen] = useState(false);
  const closeReviewForm = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="gap-1 pl-2 xs:flex-col sm:flex max-w-220
        sm:flex-row bg-amber-950 text-white"
      >
        <div>
          Order date: {orderDate.substring(0, 4)}-{orderDate.substring(5, 7)}-
          {orderDate.substring(8, 10)}
        </div>
        <div className="sm:ml-10">Order ID: {orderId}</div>
      </div>
      <div className="sm:flex sm:flex-row sm:items-center">
        <div className="sm:w-2/3 md:w-9/12 max-w-150">
          {cart?.cartItems.map((item, idx) => (
            <ItemsInOrderHistory
              {...item}
              idx={idx}
              totalPrice={idx === cart?.cartItems.length - 1 && cart.totalPrice}
            />
          ))}
        </div>
        <div className="w-35 h- mb-4 ml-[55%] mt-2 sm:ml-5 md:ml-0">
          {review ? (
            <p className="w-40 h-8 mt-1 bg-slate-600 text-white p-1">
              Feedback submitted
            </p>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="flex border border-black p-1 h-8"
            >
              <TiPencil className="mt-1" />
              Send feedback
            </button>
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
