export interface TranscriptionResult {
    text: string;
    segments?: Array<{
      text: string;
      start: number;
      end: number;
      confidence: number;
    }>;
    language?: string;
  }
  
  export type ProcessType = 'youtube' | 'google_drive' | 'upload' | 'direct_link' | 'curl';
  
  export interface TranscriptionOptions {
    language: string;
    processType: ProcessType;
  }
  
  export interface FileUploadResponse {
    url: string;
    filename: string;
  }