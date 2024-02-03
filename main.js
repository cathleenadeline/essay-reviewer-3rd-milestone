import React, { useState } from 'react';

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      data = {
        text: inputText
      };
      log.console(data);
      const response = await fetch('/process_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error in request');
      }

      const result = await response.json();
      setProcessedText(result.processed_text);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (

    <div>
      <h1>React App</h1>
      <div>
        <label htmlFor="inputText">Input Text:</label>
        <textarea
          id="inputText"
          rows="50"  
          cols="50"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text..."
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {processedText && (
        <div>
          <h2>Processed Text:</h2>
          <pre>{processedText}</pre>
        </div>
      )}
    </div>
  );
};

export default Main;
