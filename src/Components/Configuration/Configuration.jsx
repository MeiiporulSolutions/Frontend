import React, { useState, useEffect } from 'react';

function WaitingDataComponent() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:9000/Waiting');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {error && <div>Error: {error}</div>}
            {data ? (
                <div>
                    {/* Render your data here */}
                    <h2>Data</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default WaitingDataComponent;
