import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Expecting JSON response from the server
        setUploadStatus(`Upload Successful! ${data.message}`);
      } else {
        const errorData = await response.json(); // Expecting error response in JSON format
        setUploadStatus(`Upload Failed: ${errorData.message || 'Something went wrong'}`);
      }
    } catch (error) {
      setUploadStatus('Upload Failed. Try again!'+error);
    } finally {
      setIsUploading(false);
      setFile(null);  // Clear the file input after upload
    }
  };

  return (
    <div>
      <h1>Upload a Video</h1>
      
      {uploadStatus && <p>{uploadStatus}</p>}

      {!uploadStatus && !isUploading && (
        <>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={uploadFile} disabled={isUploading}>
            Upload
          </button>
        </>
      )}
    </div>
  );
}

export default App;
