import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from './carousel.js'

const Electronics = ({ searchQuery }) => {
    const [electronicsData, setElectronicsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);  
    const [previousPage, setPreviousPage] = useState(null);  
    const [currentPageUrl, setCurrentPageUrl] = useState('http://localhost:8000/electronics/');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

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
            console.log('Response:', response);
            setLoading(false);
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error('Unauthorized, please log in again.');
            } else {
                throw new Error('Failed to fetch electronics data.');
            }
        })
        .then((data) => {
            console.log('Fetched data:', data);
            const updatedElectronicsData = data.results.map(electronics => ({
                ...electronics,
                images: electronics.image ? `http://localhost:8000${electronics.image}` : null,
            }));
            setElectronicsData(updatedElectronicsData);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
            console.error('Error fetching electronics data:', error);
        });
    }, [currentPageUrl]);  

    const filteredElectronics = electronicsData.filter(electronics =>
        electronics.device && electronics.device.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            <CarouselComponent />
            <h1 className="text-2xl font-bold mb-4">Electronics Data</h1>
            {error && <p className="text-red-500">{error}</p>}
            {filteredElectronics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredElectronics.map((electronics) => (
                        <div
                            key={electronics.id}
                            onClick={() => navigate(`/products/electronics/${electronics.id}`)}
                            className="border p-4 rounded-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-100"
                        >
                            {electronics.images ? (
                                <img
                                    src={electronics.images}
                                    alt={electronics.device}
                                    className="w-full h-32 object-cover mb-2"
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            <div className="text-center">
                                <p><strong>Device:</strong> {electronics.device}</p>
                                <p><strong>Price:</strong> ₹{parseFloat(electronics.price).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No electronics data available.</p>
            )}

            <div className="pagination mt-4 flex justify-between">
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

export default Electronics;
