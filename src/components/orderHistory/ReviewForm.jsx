import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/actions";
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
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let formData = new FormData();

  const { commandIdx, user } = useSelector((state) => state.auth);
  /** Close dialog if outside the dialog is clicked. */
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("MuiModal-backdrop")) {
      closeReviewForm();
      document.removeEventListener("mouseup", handleCloseModal);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = null;
    if (content.trim() === "") {
      setError("Please enter your feedback.");
    } else if (stars === 0) {
      setError("Please rate on a scale of 1 to 5 stars.");
    } else {
      setSubmitted(true);
      formData.append("reviewContent", content);
      formData.append("stars", stars);
      formData.append("displayName", displayName);
      if (image) formData.append("file", image);
      result = await dispatch(postReview(formData, orderId, toast));
      closeReviewForm();
      if (result) {
        navigate("/order-history"); // so that 'submitted' will be displayed.
      }
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
          result = dispatch(postReview(formData, orderId, toast));
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
      className="max-w-112.5 px-3 py-4 border-b-black bg-gray-50
        flex-col mx-auto mt-5"
    >
      <form
        onSubmit={handleSubmit}
        className="px-2 pt-1 flex flex-col mx-auto mb-5
          items-center"
      >
        <span>
          We'd appreciate your feedback and will use it to improve our service.
          We also post the rates and some of the entries on the review page.
        </span>
        <textarea
          id="content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          className="border border-neutral-800 p-2"
          value={content}
          rows="10"
          cols="50"
          autofocus
        ></textarea>
        <input
          type="file"
          accept="image/*,.png,.jpg,.jpeg,.gif"
          className="mt-1 w-70 border border-neutral-800 p-2"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="flex mt-2">
          {scoreStars(1)}
          {scoreStars(2)}
          {scoreStars(3)}
          {scoreStars(4)}
          {scoreStars(5)}
        </div>
        <input
          type="text"
          id="displayName"
          className="mt-1 w-70 border border-neutral-800 px-2 py-1"
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your name"
          value={displayName}
        />
        {error && <span style={{ color: "red" }}>{error}</span>}
        <button className="mt-2 px-2 py-1 outline-none bg-amber-950 text-white hover:opacity-50">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
