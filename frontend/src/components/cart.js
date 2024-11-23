import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateCartItemQuantity } from '../store/actions/cartActions';
import KhaltiCheckout from "khalti-checkout-web";
import config from './khaltiConfig';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0 && !isNaN(quantity)) {
      dispatch(updateCartItemQuantity(id, quantity));
    }
  };

  const handleKhaltiPayment = () => {
    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 1000 }); // Amount should be in paisa (e.g., 1000 = 10 NPR)
  };

  const handleEsewaPayment = async () => {
    try {
      const psc = 10;
      const pdc = 50;
      const params = new URLSearchParams({
        amt: totalAmount.toString(), // Make sure this is correctly set
        psc: psc.toString(), // Any service charge if applicable, else set to 0
        pdc: pdc.toString(),
        txAmt: 0, // Any delivery charge if applicable, else set to 0
        tAmt: (totalAmount + psc + pdc).toString(), // Total amount including other charges
        pid: `TXN-${Date.now()}`, // Unique transaction ID (e.g., using a timestamp)
        su: 'http://localhost:3000/payment-success', // Replace with your actual success URL
        fu: 'http://localhost:3000/payment-failure', // Replace with your actual failure URL
        scd: 'testMerchant', // Replace with your e-Sewa Merchant Code
      });

      const esewaURL = `https://esewa.com.np/epay/main?${params.toString()}`;

      // Redirect to e-Sewa for payment
      window.location.href = esewaURL;
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[90vh]">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity || 1} 
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className="border rounded w-16 text-center mr-4"
                  />
                  <button 
                    onClick={() => handleRemove(item.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</h2>
          <div className="mt-6">
            <button 
              onClick={handleClear} 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Clear Cart
            </button>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleEsewaPayment} // Integrate e-Sewa payment
            >
              Pay with e-Sewa
            </button>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
              onClick={handleKhaltiPayment} // Placeholder for Khalti
            >
              Pay with Khalti
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
