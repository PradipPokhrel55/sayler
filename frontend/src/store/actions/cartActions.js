

export const addToCart = (item) => {
  return {
    type: 'addToCart',
    payload: item,
  };
};

export const updateCartItemQuantity = (id, quantity) => {
  return {
    type: 'updateCartItemQuantity',
    payload: { id, quantity },
  };
};

export const removeFromCart = (id) => {
  return {
    type: 'removeFromCart',
    payload: { id },
  };
};

export const clearCart = () => {
  return {
    type: 'clearCart',
  };
};
