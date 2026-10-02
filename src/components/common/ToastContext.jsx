import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} className="text-status-success" />;
      case 'error':
        return <AlertCircle size={20} className="text-status-error" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-status-warning" />;
      default:
        return <Info size={20} className="text-status-info" />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-white border-l-4 border-status-success';
      case 'error':
        return 'bg-white border-l-4 border-status-error';
      case 'warning':
        return 'bg-white border-l-4 border-status-warning';
      default:
        return 'bg-white border-l-4 border-status-info';
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-level-4 border border-gray-100 min-w-[300px] max-w-md animate-slide-up ${getStyles(toast.type)}`}
          >
            <div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
