import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from './carousel.js'


const Watches = ({searchQuery}) => {
    const [watchesData, setWatchesData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [currentPageUrl, setCurrentPageUrl] = useState('http://127.0.0.1:8000/watches/');

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
                throw new Error('Failed to fetch watches data.');
            }
        })
        .then((data) => {
            if (Array.isArray(data.results)) {
                const updatedWatchesData = data.results.map(watch => ({
                    ...watch,
                    images: watch.image ? `http://localhost:8000${watch.image}` : null,
                }));
                setWatchesData(updatedWatchesData);
                setNextPage(data.next);
                setPreviousPage(data.previous);
            } else {
                setError('Invalid data format');
            }
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, [currentPageUrl]);

    const filteredWatchesData = watchesData.filter(watch =>
        (watch.brand && watch.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (watch.model && watch.model.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            <CarouselComponent />
            <h1 className="text-2xl font-bold mb-4">Watches</h1>

            {error && <p className="text-red-500">{error}</p>}
            {filteredWatchesData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredWatchesData.map((watch) => (
                        <div
                            key={watch.id}
                            onClick={() => navigate(`/products/watches/${watch.id}`)}
                            className="border p-4 rounded-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-100"
                        >
                            {watch.images ? (
                                <img
                                    src={watch.images}
                                    alt={watch.model}
                                    className="w-full h-40 object-cover mb-2 rounded object-cover"
                                />
                            ) : (<div className='w-full h-40 flex items-center justify-center bg-gray-200 mb-2 rounded'>
                                    <p>No image available</p>
                                </div>
                                
                            )}
                            <div className="text-center">
                                <p><strong>Brand:</strong> {watch.brand}</p>
                                <p><strong>Model:</strong> {watch.model}</p>
                                <p><strong>Price:</strong> ₹{parseFloat(watch.price).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No watches data available.</p>
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

export default Watches;
