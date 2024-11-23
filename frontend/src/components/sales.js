import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from './carousel.js'

const Sales = ({ searchQuery }) => { // Accept searchQuery as a prop
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState('http://localhost:8000/sales/');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found, please log in.');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(currentPageUrl, {
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
          throw new Error('Failed to fetch sales data. Please try again later.');
        }
      })
      .then((data) => {
        const updatedSalesData = data.results.map(sale => ({
          ...sale,
          images: sale.image ? `http://localhost:8000${sale.image}` : null, 
        }));
        setSalesData(updatedSalesData);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching sales data:', error);
      });
  }, [currentPageUrl]);

  const filteredSalesData = salesData.filter(sale =>
    sale.name.toLowerCase().includes(searchQuery.toLowerCase()) // Use the passed searchQuery prop
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <CarouselComponent />
      <h1 className="text-2xl font-bold mb-4">Sales Data</h1>
      {error && <p className="text-red-500">{error}</p>}
      {filteredSalesData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSalesData.map((sale) => (
            <div
              key={sale.id}
              onClick={() => navigate(`/products/sales/${sale.id}`)} // Navigate to ProductDetail
              className="border p-4 rounded-lg flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-100"
            >
              {sale.images ? (
                <img src={sale.images} alt={sale.name} className="w-full h-32 object-cover mb-2" />
              ) : (
                <p>No image available</p>
              )}
              <div className="text-center">
                <strong>{sale.name}</strong>
                <p>Price: ₹{sale.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No sales data available.</p>
      )}

      <div className="pagination mt-4">
        <button 
          onClick={() => setCurrentPageUrl(previousPage)} 
          disabled={!previousPage}
          className={`px-4 py-2 bg-customOrange text-white rounded hover:bg-blue-600 transition-opacity ${!previousPage && 'opacity-50 cursor-not-allowed'}`}
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentPageUrl(nextPage)} 
          disabled={!nextPage}
          className={`px-4 py-2 bg-customOrange text-white rounded hover:bg-blue-600 transition-opacity ${!nextPage && 'opacity-50 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Sales;
