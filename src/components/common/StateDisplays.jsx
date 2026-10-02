import React from 'react';
import { PackageOpen, AlertTriangle, RefreshCcw } from 'lucide-react';

export const EmptyState = ({ 
  icon: Icon = PackageOpen, 
  title = "No data available", 
  description = "There is currently nothing to show here.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-gray-200 rounded-xl">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <Icon size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-secondary px-6 py-2">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({ 
  title = "Something went wrong", 
  description = "We couldn't load this information. Please try again.",
  onRetry 
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 text-center bg-white border border-status-error/20 rounded-xl">
      <div className="w-16 h-16 bg-status-errorBg rounded-full flex items-center justify-center mb-4">
        <AlertTriangle size={32} className="text-status-error" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">{description}</p>
      
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary px-6 py-2 flex items-center gap-2">
          <RefreshCcw size={16} /> Try Again
        </button>
      )}
    </div>
  );
};
