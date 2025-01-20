import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const App = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 2) {
      setError('Please select only up to 2 PDF files');
      return;
    }
    setFiles(selectedFiles);
    setError('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 2) {
      setError('Please select only up to 2 PDF files');
      return;
    }
    setFiles(droppedFiles);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please select at least one PDF file');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('pdfs', file);
    });

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Merge failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError('Failed to merge PDFs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">PDFMERGE</h1>
        <p className="text-blue-600 text-center mb-8">Simplify, Merge, Deliver</p>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <div
            className="border-2 border-dashed border-blue-300 rounded-lg p-8 mb-4 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <p className="text-blue-600 mb-2">Drag and drop PDFs here</p>
            <p className="text-blue-400 text-sm mb-4">or</p>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              accept=".pdf"
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Browse Files
            </label>
          </div>

          {files.length > 0 && (
            <div className="mb-4">
              <h3 className="text-blue-800 font-semibold mb-2">Selected Files:</h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="text-blue-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || files.length === 0}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Merging...' : 'Merge PDFs'}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="merged.pdf"
              className="block mt-4 text-center text-blue-500 hover:text-blue-600"
            >
              Download Merged PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
