import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../store/actions";

const Cart = () => {
  const cart = useSelector((state) => state.carts.cart);
  const dispatch = useDispatch();

  const removeItem = (prodId) => {
    dispatch(removeItemFromCart(prodId));
  };

  return (
    <div className="px-2 max-w-7xl mx-auto w-full md:w-9/12 mt-2">
      {!cart.length ? (
        <p>No items in cart</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nr.</th>
              <th className="w-25">product</th>
              <th className="w-25">quantity</th>
              <th className="w-25">unit price</th>
              <th className="w-25"></th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((item, idx) => {
                return (
                  <tr key={idx} className="h-30">
                    <td>{idx + 1}</td>
                    <td>
                      <div className="flex-column">
                        <span>{item.product.productName}</span>
                        <img
                          src={item.product.image}
                          alt={item.product.productName}
                          className="w-15 h-10"
                        />
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      <select
                        name="quantity"
                        className="border bg-white rounded-lg py-2 pl-1"
                      >
                        {[...Array(30)]
                          .map((_, i) => i + 1)
                          .map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="flex-column">
                      <button className="block bg-sky-600 text-white px-2 py-1 rounded-lg">
                        update quantity
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="block mt-1 bg-amber-400 text-white px-2 py-1 rounded-lg"
                      >
                        remove item
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
