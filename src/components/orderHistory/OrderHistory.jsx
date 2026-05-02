import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderHistory,
  sendRefreshJwtTokenRequest,
  sendLogoutRequest,
  setModalLogin,
  setModalOpen,
} from "../../store/actions";
import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Order from "./Order";
import PaginationSection from "../shared/PaginationSection";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { user, commandIdx } = useSelector((state) => state.auth);
  const { orderList, pagination } = useSelector((state) => state.order);
  const { errorMessage, page } = useSelector((state) => state.errors);

  useEffect(() => {
    // Request order history data. If JWT has expired, request to regenerate it.
    // If the refresh token has expired, log out the user and display the login dialog.
    const refreshJwtToken = async () => {
      await dispatch(sendRefreshJwtTokenRequest());
    };
    const logoutUser = async () => {
      // send a request to log out the user.
      dispatch(sendLogoutRequest(user.id, null, null));
      // Display the login dialog
      await dispatch(setModalLogin()); // set login only (no register form)
      dispatch(setModalOpen());
    };
    if (commandIdx === 0 && !orderList) dispatch(fetchOrderHistory()); // 0: JWT ok
    if (commandIdx === 1) refreshJwtToken(); // 1: JWT expired
    if (commandIdx === 2) logoutUser(); // 2: refresh token expired
  }, [commandIdx]);

  return (
    <div className="px-2 max-w-7xl mx-auto w-full md:w-10/12 lg:w-9/12">
      <h2
        style={{ fontSize: "1.2rem", fontFamily: "serif", fontWeight: "800px" }}
      >
        Order History
      </h2>
      {page === "order-history" && errorMessage ? (
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
          <span className="text-lg text-slate-600">{errorMessage}</span>
        </div>
      ) : (
        <>
          <div className="flex">
            {orderList && <span>Total: {orderList?.length}</span>}
            {orderList?.length > 10 && (
              <PaginationSection totalPages={Number(pagination?.totalPages)} />
            )}
          </div>
          {orderList?.map((order, idx) => (
            <Order {...order} key={idx} />
          ))}
        </>
      )}
    </div>
  );
};

export default OrderHistory;
