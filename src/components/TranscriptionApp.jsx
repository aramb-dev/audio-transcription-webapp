import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Loader2 } from 'lucide-react';

const TranscriptionApp = () => {
  const [url, setUrl] = useState('');
  const [processType, setProcessType] = useState('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('ar');
  const [isDragging, setIsDragging] = useState(false);
  
  const processTypes = {
    youtube: "YouTube",
    google_drive: "Google Drive",
    upload: "Upload File",
    direct_link: "Direct Link",
    curl: "cURL Command"
  };

  const languages = [
    { value: 'ar', label: 'Arabic' },
    { value: 'en', label: 'English' }
  ];

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        setFile(file);
      } else {
        setError('Please upload an audio or video file');
      }
    }
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      setFile(file);
    } else {
      setError('Please upload an audio or video file');
    }
  };

  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      const formData = new FormData();
      if (processType === 'upload' && file) {
        formData.append('file', file);
      } else if (url) {
        formData.append('url', url);
      }
      formData.append('language', language);
      formData.append('process_type', processType);
      
      const response = await fetch('http://localhost:8000/transcribe', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Transcription failed');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Audio Transcription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Select 
                value={processType} 
                onValueChange={setProcessType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select input type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(processTypes).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Select 
                value={language} 
                onValueChange={setLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {processType === 'upload' ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } ${file ? 'bg-green-50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileInput}
                  accept="audio/*,video/*"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {file ? file.name : 'Drag and drop your audio file here, or click to select'}
                  </p>
                </label>
              </div>
            ) : (
              <Input
                type="text"
                placeholder={processType === 'youtube' ? 'Enter YouTube URL' : 'Enter URL or command'}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full"
              />
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || (processType === 'upload' && !file)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Start Transcription
                </>
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Transcription Result:</h3>
                <pre className="whitespace-pre-wrap text-sm">{result.text}</pre>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscriptionApp;
