import React from 'react';

interface ModalButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({ onCancel, onSubmit, isSubmitDisabled }) => {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
          isSubmitDisabled ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        }`}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </div>
  );
};

export default ModalButtons;