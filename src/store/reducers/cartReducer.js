const initialState = {
  cart: [],
  cartId: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CART": {
      const productToAdd = action.payload;
      let existsInCart = state.cart.find((item) => item.id === productToAdd.id);
      if (existsInCart) {
        let updatedCart = state.cart.map((item) => {
          if (item.id === productToAdd.id) {
            return productToAdd;
          } else {
            return item;
          }
        });
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        let newCartContent = [...state.cart, productToAdd];
        return {
          ...state,
          cart: newCartContent,
        };
      }
    }
    case "REMOVE_FROM_CART": {
      let newCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: newCart,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
