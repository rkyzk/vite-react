/** useSelector & useDispatch */
import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement } from "./store/actions/action";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <>
      <h2>Count in Counter Component: {count}</h2>
      <button
        onClick={() =>
          dispatch({
            type: "INCREMENT",
          })
        }
      >
        Increment
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "DECREMENT",
          })
        }
      >
        Decrement
      </button>
    </>
  );
};

export default Counter;
