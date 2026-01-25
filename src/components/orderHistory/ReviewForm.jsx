import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { submitReview } from "../../store/actions";
import toast from "react-hot-toast";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ closeReviewForm, orderId }) => {
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** ダイアログの外をクリックしたらダイアログを閉じる */
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("MuiModal-backdrop")) {
      closeReviewForm();
      document.removeEventListener("mouseup", handleCloseModal);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    if (content.trim() !== "") {
      result = dispatch(submitReview(content, stars, orderId, toast));
    }
    closeReviewForm();
    if (result) {
      navigate("/order-history"); // 「レビュー投稿済み」と表示するため
    }
  };
  useEffect(() => {
    // 初回レンダーリングでイベントリスナーを追加
    document.addEventListener("mouseup", (e) => handleCloseModal(e));
  }, []);
  const scoreStars = (idx) =>
    idx > stars ? (
      <CiStar
        id={`cistar${idx}`}
        className="text-2xl"
        onClick={() => setStars(idx)}
      />
    ) : (
      <FaStar
        id={`fastar${idx}`}
        className="text-2xl text-yellow-500"
        onClick={() => setStars(idx)}
      />
    );

  return (
    <div
      className="max-w-[450px] px-3 py-4 border-b-black bg-gray-50
        flex-col mx-auto mt-5"
    >
      <form
        onSubmit={handleSubmit}
        className="px-2 pt-1 flex flex-col mx-auto mb-5
          items-center"
      >
        <label htmlFor="review">ご感想をお聞かせください。</label>
        <textarea
          id="review"
          name="review"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="border border-neutral-800"
          rows="10"
          cols="50"
        ></textarea>
        <div className="flex mt-2">
          {scoreStars(1)}
          {scoreStars(2)}
          {scoreStars(3)}
          {scoreStars(4)}
          {scoreStars(5)}
        </div>
        <button className="mt-2 px-2 py-1 outline-none bg-amber-950 text-white hover:opacity-50">
          レビューを投稿する
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
