import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  function createPrompt(text) {
    return "<INST>You are MIT english professor. given the below text:\n\n" + text + "\n\nfix the grammar.\n</INST>";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var data = {
        text: createPrompt(inputText),
      };
      console.log(data);
      const response = await fetch('http://localhost:5000/process_text', {
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
      let generatedText = result[0]["generated_text"];
      console.log(generatedText);
      setProcessedText(generatedText);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Essay Reviewer</h1>
      <div>
        <textarea
          id="inputText"
          rows="20"  
          cols="60"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter essay text..."
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
}

export default App;
