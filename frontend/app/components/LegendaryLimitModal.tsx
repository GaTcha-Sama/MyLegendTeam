import React from 'react';

interface LegendaryLimitModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LegendaryLimitModal = ({ isOpen, onConfirm, onCancel }: LegendaryLimitModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-md mx-4 shadow-2xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Legendary players limit reached!
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          You have placed 5 legendary players. Do you want to respect this limit or you just want to continue ?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all duration-200 font-medium hover:shadow-md cursor-pointer"
          >
            Continue without limit
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 font-medium hover:shadow-lg shadow-md cursor-pointer"
          >
            Respect the limit
          </button>
        </div>
      </div>
    </div>
  );
};
