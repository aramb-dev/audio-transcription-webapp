import { render, screen, fireEvent } from '@testing-library/react';
import AudioInput from '../../../client/src/components/AudioInput';

describe('AudioInput Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders file upload input by default', () => {
    render(<AudioInput onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/Upload Audio File/i)).toBeInTheDocument();
  });

  test('switches to YouTube input when selected', () => {
    render(<AudioInput onSubmit={mockOnSubmit} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'youtube' } });
    expect(screen.getByPlaceholderText(/Enter YouTube URL/i)).toBeInTheDocument();
  });

  test('validates YouTube URL format', () => {
    render(<AudioInput onSubmit={mockOnSubmit} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'youtube' } });
    
    const input = screen.getByPlaceholderText(/Enter YouTube URL/i);
    fireEvent.change(input, { target: { value: 'invalid-url' } });
    
    expect(screen.getByText(/Please enter a valid YouTube URL/i)).toBeInTheDocument();
  });
});