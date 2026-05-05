import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderHistory,
  sendRefreshJwtTokenRequest,
  sendLogoutRequest,
  setModalLogin,
  setModalOpen,
  clearErrorMessage,
} from "../../store/actions";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import Order from "./Order";
import PaginationSection from "../shared/PaginationSection";
import useOrderHistoryPages from "../../hooks/useOrderHistoryPages";
import styles from "../../styles/OrderHistory.module.css";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, commandIdx } = useSelector((state) => state.auth);
  const { orderList, pagination } = useSelector((state) => state.order);
  const { errorMessage, page } = useSelector((state) => state.errors);
  const [sortOrder, setSortOrder] = useState("desc");
  useOrderHistoryPages();

  useEffect(() => {
    dispatch(clearErrorMessage());
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

  useEffect(() => {
    const handler = setTimeout(() => {
      errorMessage && dispatch(clearErrorMessage());
      searchParams.delete("page");
      sortOrder === "desc"
        ? searchParams.delete("sortOrder")
        : searchParams.set("sortOrder", sortOrder);
      navigate(`?${searchParams.toString()}`);
    }, 700);
    return () => clearTimeout(handler);
  }, [sortOrder]);

  return (
    <div className="px-2 mx-auto max-w-7xl md:w-10/12 lg:w-9/12">
      <h2
        style={{ fontSize: "1.2rem", fontFamily: "serif", fontWeight: "800px" }}
      >
        Order History
      </h2>
      {page === "order-history" && errorMessage && (
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
          <span className="text-lg text-slate-600">{errorMessage}</span>
        </div>
      )}
      {orderList && (
        <>
          <div className="flex gap-3">
            <span className="mt-1">Total: {pagination.totalElements}</span>
            <select
              id="sort-order"
              name="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`${styles.Select} bg-white h-8
                       -mt-2 mb-1 border border-slate-800 w-42.5`}
              defaultValue="desc"
            >
              <option value="desc" className="font-sans text-slate-700">
                newest to oldest
              </option>
              <option value="asc" className="font-sans text-slate-700">
                oldest to newest
              </option>
            </select>
          </div>
          <div className="flex justify-end max-w-220">
            {pagination.totalElements > 8 && (
              <PaginationSection totalPages={Number(pagination.totalPages)} />
            )}
          </div>
          {orderList.map((order, idx) => (
            <Order {...order} key={idx} />
          ))}
        </>
      )}
    </div>
  );
};

export default OrderHistory;
