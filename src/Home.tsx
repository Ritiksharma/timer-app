import { useState, useEffect } from 'react';
import { Plus, Clock } from 'lucide-react';
import { TimerList } from './components/TimerList';
import AddTimerModal from './components/AddTimerModal';
import { Toaster, toast } from 'sonner';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedTimers, setCompletedTimers] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const completed: string[] = [];
      if (completed.length > 0) {
        setCompletedTimers(completed);
        completed.forEach(timerId => {
          toast(`Timer ${timerId} completed!`, {
            duration: Infinity,
            action: {
              label: 'Dismiss',
              onClick: () => {
                setCompletedTimers(prev => prev.filter(id => id !== timerId));
              },
            },
          });
          const audio = new Audio('/path/to/notification-sound.mp3');
          audio.play();
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedTimers = localStorage.getItem('completedTimers');
    if (storedTimers) {
      setCompletedTimers(JSON.parse(storedTimers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedTimers', JSON.stringify(completedTimers));
  }, [completedTimers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
            Add Timer
          </button>
        </div>
        <TimerList />
      </div>
      {isModalOpen && <AddTimerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Home;
