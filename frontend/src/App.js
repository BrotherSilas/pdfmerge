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
        <h1 className="text-4xl font-bold tex