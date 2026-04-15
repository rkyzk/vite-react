import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview } from "../../store/actions";
import toast from "react-hot-toast";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  sendRefreshJwtTokenRequest,
  sendLogoutRequest,
  setModalLogin,
  setModalOpen,
} from "../../store/actions";

const ReviewForm = ({ closeReviewForm, orderId }) => {
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { commandIdx, user } = useSelector((state) => state.auth);
  /** Close dialog if outside the dialog is clicked. */
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("MuiModal-backdrop")) {
      closeReviewForm();
      document.removeEventListener("mouseup", handleCloseModal);
    }
  };
  const handleChangeText = (e) => {
    error && setError("");
    setContent(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (content.trim() !== "") {
      setSubmitted(true);
      result = await dispatch(submitReview(content, stars, orderId, toast));
      closeReviewForm();
      if (result) {
        navigate("/order-history"); // so that 'submitted' will be displayed.
      }
    } else {
      setError("Please enter your review.");
    }
  };
  useEffect(() => {
    let result;
    const logoutUser = async () => {
      // If refreshToken has expired, log out the user.
      dispatch(sendLogoutRequest(user.id, null, null));
      // Show only the login dialog (without register dialog)
      await dispatch(setModalLogin());
      dispatch(setModalOpen());
    };
    if (submitted) {
      switch (commandIdx) {
        case 0:
          result = dispatch(submitReview(content, stars, orderId, toast));
          closeReviewForm();
          if (result) {
            navigate("/order-history"); // so that 'submitted' will be displayed.
          }
          break;
        case 1:
          // If JWT has expired, send a request to refresh it.
          dispatch(sendRefreshJwtTokenRequest());
          break;
        case 2:
          // If the refresh token has expired, log out the user.
          logoutUser();
      }
    }
  }, [commandIdx]);

  useEffect(() => {
    // Add eventlistener at first rendering.
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
        <label htmlFor="review">
          Feel free to share your opinions about the products.
        </label>
        <textarea
          id="review"
          name="review"
          onChange={(e) => handleChangeText(e)}
          value={content}
          className="border border-neutral-800 p-2"
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
        {error && <span style={{ color: "red" }}>{error}</span>}
        <button className="mt-2 px-2 py-1 outline-none bg-amber-950 text-white hover:opacity-50">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
