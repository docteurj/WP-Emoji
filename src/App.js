import React, { useState } from 'react';
import GifComponent from './components/GifComponent';
import './MyComponent.css'; // Import the CSS file for styling

const MyComponent = () => {
  const [input1, setInput1] = useState('');
  const [processedData, setProcessedData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null); // Clear any previous errors

    const data = {
      string1: input1,
    };

    try {
      const response = await fetch('/process_strings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setProcessedData(responseData.data); // Update the state with the processed data
    } catch (error) {
      setError('An error occurred while processing the data.'); // Set error state if request fails
    }
  };

  return (
    <div className="container">
      <h1>WPE Meow</h1>
      <GifComponent />
      <div className="input-container">
        <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>

      {processedData && (
        <div className="result-container">
          <p>Result:</p>
          <p>WP Emoji String: {processedData}</p>
        </div>
      )}

      {error && <p className="error-msg">Error: {error}</p>}
    </div>
  );
};

export default MyComponent;
