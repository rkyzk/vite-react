const initialState = {
  cart: [],
  totalPrice: 0.0,
  cartId: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CART": {
      let existsInCart = state.cart.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existsInCart) {
        let updatedCart = state.cart.map((item) => {
          if (item.product.id === action.payload.product.id) {
            return {
              product: action.payload.product,
              quantity: action.payload.quantity,
            };
          } else {
            return item;
          }
        });
        let newPrice = getTotalPrice(updatedCart);
        return {
          ...state,
          cart: updatedCart,
          totalPrice: newPrice,
        };
      } else {
        let newCartItem = {
          product: action.payload.product,
          quantity: action.payload.quantity,
        };
        let newCartContent = [...state.cart, newCartItem];
        let newPrice = getTotalPrice(newCartContent);
        return {
          ...state,
          cart: newCartContent,
          totalPrice: newPrice,
        };
      }
    }
    default:
      return state;
  }
};

const getTotalPrice = (cart) => {
  const prices = cart.map((item) => item.product.price * item.quantity);
  const totalPrice = prices.reduce((acc, val) => acc + val, 0);
  return totalPrice;
};

export default cartReducer;
