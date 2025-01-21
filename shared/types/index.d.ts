// Common Types
export interface AudioFile {
    filename: string;
    size: number;
    mimetype: string;
    path?: string;
  }
  
  export interface TranscriptionResult {
    text: string;
    confidence: number;
    timestamp: string;
    processedBy: string;
  }
  
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
  }
  
  // Request Types
  export interface AudioUploadRequest {
    file: File;
  }
  
  export interface UrlProcessRequest {
    url: string;
    type: 'youtube' | 'drive';
  }
  
  // Response Types
  export interface UploadResponse {
    message: string;
    file: AudioFile;
  }
  
  export interface TranscriptionResponse {
    jobId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    result?: TranscriptionResult;
    error?: string;
  }
  
  // Configuration Types
  export interface AppConfig {
    apiUrl: string;
    maxFileSize: number;
    allowedTypes: string[];
    version: string;
    lastUpdated: string;
    maintainer: string;
  }