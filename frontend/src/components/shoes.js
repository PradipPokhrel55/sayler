import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from './carousel.js'


const Shoes = ({ searchQuery }) => {
    const [shoesdata, setShoesdata] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [currentPageUrl, setCurrentPageUrl] = useState('http://127.0.0.1:8000/shoes/');
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
            credentials: 'include',
        })
        .then((response) => {
            setLoading(false);
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error('Unauthorized, please log in again.');
            } else {
                throw new Error('Failed to fetch shoes data.');
            }
        })
        .then((data) => {
            const updatedShoesData = data.results.map(shoes => ({
                ...shoes,
                images: shoes.image ? `http://localhost:8000${shoes.image}` : null,
            }));
            setShoesdata(updatedShoesData);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, [currentPageUrl]);

    const filteredShoesData = shoesdata.filter(shoes =>
        shoes.name && shoes.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>; 
    }

    return (
        <div className="p-4">
            <CarouselComponent />
            <h1 className="text-2xl font-bold mb-4">Shoes</h1>
            {error && <p className="text-red-500">{error}</p>}
            {filteredShoesData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredShoesData.map((shoes) => (
                        <div
                            key={shoes.id}
                            onClick={() => navigate(`/products/shoes/${shoes.id}`)}
                            className="border p-4 rounded-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-100"
                        >
                            {shoes.images ? (
                                <img
                                    src={shoes.images}
                                    alt={shoes.name}
                                    className="w-full h-32 object-cover mb-2"
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            <div className="text-center">
                                <p><strong>Name:</strong> {shoes.name}</p>
                                <p><strong>Price:</strong> ₹{parseFloat(shoes.price).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No shoes data available.</p>
            )}

            <div className="pagination mt-4">
                {previousPage && (
                    <button
                        onClick={() => setCurrentPageUrl(previousPage)}
                        className="px-4 py-2 bg-customOrange text-white rounded hover:bg-blue-600 transition-opacity"
                    >
                        Previous
                    </button>
                )}
                {nextPage && (
                    <button
                        onClick={() => setCurrentPageUrl(nextPage)}
                        className="px-4 py-2 bg-customOrange text-white rounded hover:bg-blue-600 transition-opacity"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Shoes;
