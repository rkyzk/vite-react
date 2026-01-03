import { useSelector, useDispatch } from "react-redux";
import { fetchOrderHistory } from "../../store/actions";
import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Order from "./Order";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);
  const { errorMessage, page } = useSelector((state) => state.errors);

  useEffect(() => {
    if (!orderList) dispatch(fetchOrderHistory());
  }, []);

  return (
    <div className="px-2 max-w-7xl mx-auto w-full lg:w-9/12">
      {page === "order-history" && errorMessage ? (
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
          <span className="text-lg text-slate-600">{errorMessage}</span>
        </div>
      ) : (
        <>
          <span>全{orderList?.length}件</span>
          {orderList?.map((order, idx) => (
            <Order {...order} key={idx} />
          ))}
        </>
      )}
    </div>
  );
};

export default OrderHistory;
