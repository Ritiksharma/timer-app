import React, { useState, useEffect } from 'react';
import ModalButtons from './ModalButtons';
import { Timer } from './AddTimerModal';
import { toast, Toaster } from 'sonner';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (timer: Timer) => void;
  initialData?: Timer;
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [duration, setDuration] = useState(initialData?.duration || 0);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isTimeValid, setIsTimeValid] = useState(false);
  const [timers, setTimers] = useState<Timer[]>([]);

  useEffect(() => {
    setIsTitleValid(title.trim().length > 0);
    setIsTimeValid(duration > 0);
  }, [title, duration]);


  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem('timers') || '[]');
    setTimers(savedTimers);
  }, []);

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const handleSubmit = () => {
    if (isTitleValid && isTimeValid) {
      onSubmit({ id: initialData?.id || '', title, description, duration, remainingTime: duration, isRunning: false, createdAt: new Date().getTime() });
      onClose();
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter timer description (optional)"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              min="0"
            />
          </div>
          <ModalButtons onCancel={onClose} onSubmit={handleSubmit} isSubmitDisabled={!isTitleValid || !isTimeValid} />
        </form>
      </div>
      <Toaster position={globalThis.innerWidth > 768 ? 'top-right' : 'bottom-center'} />
    </div>
  );
};

export default TimerModal;

