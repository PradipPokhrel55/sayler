

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addToCart':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      const existingItem = state.items[existingItemIndex];

      let updatedItems;
      let updatedTotalAmount;

      if (existingItem) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      updatedTotalAmount = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case 'updateCartItemQuantity':
      const updatedItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (updatedItemIndex !== -1) {
        const updatedItemsQuantity = [...state.items];
        updatedItemsQuantity[updatedItemIndex].quantity = action.payload.quantity;

        const newTotalAmount = updatedItemsQuantity.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return {
          ...state,
          items: updatedItemsQuantity,
          totalAmount: newTotalAmount,
        };
      }
      return state;

    case 'removeFromCart':
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotalAmount = filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        items: filteredItems,
        totalAmount: newTotalAmount,
      };

    case 'clearCart':
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;
