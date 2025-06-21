import React from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const uploadFile = () => {
    setIsOpen(true);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    debugger
    if (file) {
      console.log('Selected file:', file.name);
    }
    axios.post('http://127.0.0.1:5000/upload', {
      file: file
    }).then(response => {
      debugger
      console.log(response.data);
    }).catch(error => {
      debugger
      console.error('Error uploading file:', error);
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={uploadFile}>Click me</button>

      {isOpen && (
      <div>
        <label>Resume (PDF):</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          required
        />
      </div>
)}
    </div>
  );
};

export default Dashboard; 