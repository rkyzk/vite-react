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
import styles from "../../styles/OrderHistory.module.css";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { user, commandIdx } = useSelector((state) => state.auth);
  const { orderList, pagination } = useSelector((state) => state.order);
  const { errorMessage, page } = useSelector((state) => state.errors);

  useEffect(() => {
    // 購入履歴のデータをリクエスト。JWT期限切れの時は更新をリクエスト。
    // refreshTokenが期限切れの時はユーザをログアウトし、再度ログインするようダイアログを表示する
    const refreshJwtToken = async () => {
      await dispatch(sendRefreshJwtTokenRequest());
    };
    const logoutUser = async () => {
      // refreshTokenが有効期限切れの時はログアウトしてログイン画面を表示
      dispatch(sendLogoutRequest(user.id, null, null));
      // ログインダイアログのみ表示（アカウント登録ダイアログは非表示）
      await dispatch(setModalLogin());
      dispatch(setModalOpen());
    };
    if (commandIdx === 0 && !orderList) dispatch(fetchOrderHistory());
    if (commandIdx === 1) refreshJwtToken(); // JWTが期限切れの時、更新をリクエスト
    if (commandIdx === 2) logoutUser(); // refreshTokenが期限切れの時、ユーザをログアウトする
  }, [commandIdx]);

  return (
    <div className="px-2 max-w-7xl mx-auto w-full md:w-10/12 lg:w-9/12">
      <h2 className={`${styles.Text}`}>購入履歴</h2>
      {page === "order-history" && errorMessage ? (
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
          <span className="text-lg text-slate-600">{errorMessage}</span>
        </div>
      ) : (
        <>
          <div className="flex">
            {orderList && <span>全{orderList?.length}件</span>}
            {orderList?.length > 10 && (
              <PaginationSection totalPages={Number(pagination?.totalPages)} />
            )}
          </div>
          {orderList?.map((order, idx) => (
            <Order {...order} key={idx} />
          ))}
          <hr className="xs:mx-2 md:mx-5" />
        </>
      )}
    </div>
  );
};

export default OrderHistory;
