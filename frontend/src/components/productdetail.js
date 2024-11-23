import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';

const ProductDetail = () => {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found, please log in.');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8000/${category}/${id}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error('Unauthorized, please log in again.');
        } else {
          throw new Error('Failed to fetch product details.');
        }
      })
      .then((data) => {
        const updatedData = {
          ...data,
          images: data.image ? `http://localhost:8000${data.image}` : null,
        };
        setProduct(updatedData);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [category, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ id: product.id, name: product.name, price: product.price }));
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center">No product details available.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row p-6 min-h-[90vh] bg-white shadow-lg rounded-lg">
      <div className="flex-1 mb-4 md:mb-0 md:mr-4">
        {product.images ? (
          <img
            src={product.images}
            alt={product.name}
            className="w-full h-72 object-cover rounded-lg"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        ) : (
          <p className="text-center text-gray-500">No image available</p>
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
        <p className="text-xl text-gray-600 mb-2">Price: ₹{product.price}</p>
        <div className="mb-2 text-left">
          <p className="text-gray-700">{product.brand ? `Brand: ${product.brand}` : ''}</p>
          <p className="text-gray-700">{product.size ? `Size: ${product.size}` : ''}</p>
          <p className="text-gray-700">{product.device ? `Device: ${product.device}` : ''}</p>
          <p className="text-gray-700">{product.model ? `Model: ${product.model}` : ''}</p>
          <p className="text-gray-700">{product.release_date ? `Release Date: ${product.release_date}` : ''}</p>
          <p className="text-gray-700">{product.description ? `Description: ${product.description}` : ''}</p>
          <p className="text-gray-700">{product.available ? 'Available: ✔' : 'Available: ✘'}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-3 py-1 bg-customOrange text-white rounded hover:bg-customOrange transition duration-200 ease-in-out text-sm"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
