import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import Order from "./Order";
import PaginationSection from "../shared/PaginationSection";
import useOrderHistoryPages from "../../hooks/useOrderHistoryPages";
import styles from "../../styles/OrderHistory.module.css";
import Spinner from "../shared/Spinner";

const OrderHistory = () => {
  const { isLoading, errorMessage, page } = useSelector(
    (state) => state.errors,
  );
  const { orderList, pagination } = useSelector((state) => state.order);
  useOrderHistoryPages();
  console.log("order history page");

  return (
    <div className="px-2 mx-auto max-w-7xl md:w-10/12 lg:w-9/12">
      <h2
        style={{
          fontSize: "1.3rem",
          fontFamily: "M PLUS Rounded 1c",
          fontWeight: "800px",
        }}
      >
        Order History
      </h2>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner className="w-9 mx-auto" />
        </div>
      )}
      {!isLoading && (
        <>
          {page === "order-history" && errorMessage ? (
            <div className="flex justify-center">
              <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
              <span className="text-lg text-slate-600">{errorMessage}</span>
            </div>
          ) : (
            <>
              {orderList && (
                <div className="flex gap-3">
                  <span className="mt-1">
                    Total: {pagination.totalElements}
                  </span>
                  <select
                    id="sort-order"
                    name="sortOrder"
                    //onChange={(e) => setSortOrder(e.target.value)}
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
              )}
            </>
          )}
        </>
      )}
      <div className="flex justify-end max-w-220">
        {pagination?.totalElements > 8 && (
          <PaginationSection totalPages={Number(pagination.totalPages)} />
        )}
      </div>
      {!isLoading && (
        <div>
          {orderList?.map((order, idx) => (
            <Order {...order} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
