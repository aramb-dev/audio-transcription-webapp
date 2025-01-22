import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TranscriptionApp from '@/components/TranscriptionApp';
import { transcribeAudio } from '@/lib/replicate';

// Mock the replicate library
jest.mock('@/lib/replicate', () => ({
  transcribeAudio: jest.fn(),
}));

describe('TranscriptionApp', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders transcription form', () => {
    render(<TranscriptionApp />);
    
    expect(screen.getByText('Audio Transcription')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Start Transcription')).toBeInTheDocument();
  });

  test('handles YouTube URL input', async () => {
    const mockTranscription = { text: 'Mocked transcription result' };
    transcribeAudio.mockResolvedValueOnce(mockTranscription);

    render(<TranscriptionApp />);

    // Select YouTube option
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('YouTube'));

    // Enter YouTube URL
    const input = screen.getByPlaceholderText('Enter YouTube URL');
    await userEvent.type(input, 'https://youtube.com/watch?v=test');

    // Submit form
    await userEvent.click(screen.getByText('Start Transcription'));

    expect(transcribeAudio).toHaveBeenCalledWith(
      'https://youtube.com/watch?v=test',
      expect.any(Object)
    );

    await waitFor(() => {
      expect(screen.getByText('Mocked transcription result')).toBeInTheDocument();
    });
  });

  test('handles file upload', async () => {
    const mockTranscription = { text: 'Mocked file transcription' };
    transcribeAudio.mockResolvedValueOnce(mockTranscription);

    render(<TranscriptionApp />);

    // Select Upload File option
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Upload File'));

    // Upload file
    const file = new File(['audio content'], 'test.mp3', { type: 'audio/mpeg' });
    const input = screen.getByLabelText(/Drag and drop your audio file/i);
    
    await userEvent.upload(input, file);

    expect(input.files[0]).toBe(file);
    expect(input.files).toHaveLength(1);
  });

  test('displays error message on invalid input', async () => {
    render(<TranscriptionApp />);

    // Submit form without input
    await userEvent.click(screen.getByText('Start Transcription'));

    expect(screen.getByRole('alert')).toHaveTextContent(/Please provide/i);
  });

  test('handles language selection', async () => {
    render(<TranscriptionApp />);

    // Change language
    await userEvent.click(screen.getByRole('combobox', { name: /language/i }));
    await userEvent.click(screen.getByText('Arabic'));

    expect(screen.getByRole('combobox', { name: /language/i })).toHaveTextContent('Arabic');
  });

  test('shows loading state during transcription', async () => {
    transcribeAudio.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<TranscriptionApp />);

    // Enter URL and submit
    const input = screen.getByPlaceholderText('Enter YouTube URL');
    await userEvent.type(input, 'https://youtube.com/watch?v=test');
    await userEvent.click(screen.getByText('Start Transcription'));

    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });
});
