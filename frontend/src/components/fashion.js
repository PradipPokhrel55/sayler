import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarouselComponent from './carousel.js'


const Fashion = ({ searchQuery }) => {
    const [cloth, setClothData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);  
    const [previousPage, setPreviousPage] = useState(null);  
    const [currentPageUrl, setCurrentPageUrl] = useState('http://localhost:8000/fashion/');
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
                throw new Error('Error on authorization');
            } else {
                throw new Error('Failed to fetch fashion data.');
            }
        })
        .then((data) => {
            console.log('Fetched data:', data);
            const updatedFashionData = data.results.map(fashion => ({
                ...fashion,
                images: fashion.image ? `http://localhost:8000${fashion.image}` : null, // Correctly formatted image URL
            }));
            setClothData(updatedFashionData);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, [currentPageUrl]);

    const filteredClothData = cloth.filter(item =>
        item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()) // Check if name exists
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            <CarouselComponent />
            <h1 className="text-2xl font-bold mb-4">Fashion Data</h1>

            {error && <p className="text-red-500">{error}</p>}
            {filteredClothData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredClothData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/products/fashion/${item.id}`)}
                            className="border p-4 rounded-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-100"
                        >
                            {item.images && (
                                <img
                                    src={item.images}
                                    alt={item.name}
                                    className="w-full h-32 object-cover mb-2"
                                />
                            )}
                            <div className="text-center">
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Price:</strong> ₹{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No fashion data available.</p>
            )}

            <div className="pagination mt-4">
                {previousPage && (
                    <button
                        onClick={() => setCurrentPageUrl(previousPage)}
                        disabled={loading}
                        className={`px-4 py-2 bg-customOrange text-white rounded hover:bg-blue-600 transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Previous
                    </button>
                )}
                {nextPage && (
                    <button
                        onClick={() => setCurrentPageUrl(nextPage)}
                        disabled={loading}
                        className={`px-4 py-2 bg-customOrange text-white rounded hover:bg-blue-600 transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Fashion;
