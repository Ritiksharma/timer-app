import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import mockStore from '../store/mockStore';
import TimerItem from './TimerItem';

const timer = {
  id: '1',
  title: 'Test Timer',
  description: 'Test Description',
  duration: 60,
  remainingTime: 60,
  isRunning: false,
  createdAt: Date.now(),
  name: 'Test Timer Name',
  elapsedTime: 0,
};

describe('TimerItem Component', () => {
  test('renders TimerItem with title and description', () => {
    render(
      <Provider store={mockStore}>
        <TimerItem timer={timer} onToggle={() => {}} />
      </Provider>
    );
    expect(screen.getByText('Test Timer')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls onToggle when toggle button is clicked', () => {
    const onToggle = vi.fn();
    render(
      <Provider store={mockStore}>
        <TimerItem timer={timer} onToggle={onToggle} />
      </Provider>
    );
    fireEvent.click(screen.getByTitle('Start Timer'));
    expect(onToggle).toHaveBeenCalledWith(timer.id);
  });
});
