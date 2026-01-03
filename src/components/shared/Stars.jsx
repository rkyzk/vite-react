import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Stars = ({ stars }) => {
  const scoreStars = (idx) =>
    idx > stars ? (
      <CiStar id={`cistar${idx}`} className="text-2xl text-yellow-300" />
    ) : (
      <FaStar id={`fastar${idx}`} className="text-2xl text-yellow-300" />
    );
  return (
    <div className="flex mt-2 justify-center">
      {scoreStars(1)}
      {scoreStars(2)}
      {scoreStars(3)}
      {scoreStars(4)}
      {scoreStars(5)}
    </div>
  );
};

export default Stars;
