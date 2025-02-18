import { render, screen, fireEvent } from '@testing-library/react';
import ModalButtons from './ModalButtons';
import { describe, test, expect, vi } from 'vitest';

describe('ModalButtons Component', () => {
  test('calls onCancel when Cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<ModalButtons onCancel={onCancel} onSubmit={vi.fn()} isSubmitDisabled={false} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  test('calls onSubmit when Submit button is clicked', () => {
    const onSubmit = vi.fn();
    render(<ModalButtons onCancel={vi.fn()} onSubmit={onSubmit} isSubmitDisabled={false} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalled();
  });

  test('Submit button is disabled when isSubmitDisabled is true', () => {
    render(<ModalButtons onCancel={vi.fn()} onSubmit={vi.fn()} isSubmitDisabled={true} />);
    expect(screen.getByText('Submit')).toBeDisabled();
  });
});