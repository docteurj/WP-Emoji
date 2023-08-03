import React, { useState, useRef } from 'react';
import GifComponent from './components/GifComponent';
import './MyComponent.css';
import CopyToClipboardSnackbar from './components/CopyToClipboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyComponent = () => {
  const [input1, setInput1] = useState('');
  const [processedData, setProcessedData] = useState(null);
  const [error, setError] = useState(null);
  const textAreaRef = useRef(null);

  const handleSubmit = async () => {
    setError(null);

    const data = {
      string1: input1,
    };

    try {
      const response = await fetch('/process_strings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setProcessedData(responseData.data); 
    } catch (error) {
      setError('An error occurred while processing the data.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const adjustTextAreaHeight = () => {
    const element = textAreaRef.current;
    if (element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  return (
    <div className="container">
      <GifComponent />
      <h1>WP Emoji</h1>
      <div className="input-container">
        <textarea
          ref={textAreaRef}
          value={input1}
          onChange={(e) => {
            setInput1(e.target.value);
            adjustTextAreaHeight(); 
          }}
          onKeyPress={handleKeyPress}
          rows="1" 
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      {processedData && (
        <div className="result-container">
          <p>Result:</p>
          <p>{processedData}</p>
          <CopyToClipboardSnackbar text={processedData} />
          <ToastContainer />
        </div>
      )}

      {error && <p className="error-msg">Error: {error}</p>}
    </div>
  );
};

export default MyComponent;
