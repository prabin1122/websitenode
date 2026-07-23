import React, { useEffect, useState } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

export function showToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('shophub-toast', {
      detail: { id: Date.now().toString(), message, type },
    });
    window.dispatchEvent(event);
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>;
      const newToast = customEvent.detail;
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3500);
    };

    window.addEventListener('shophub-toast', handleToast);
    return () => window.removeEventListener('shophub-toast', handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-xl p-4 shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-0 text-white font-medium text-sm ${
            toast.type === 'success'
              ? 'bg-slate-900 border border-slate-800'
              : toast.type === 'error'
              ? 'bg-red-600'
              : 'bg-blue-600'
          }`}
        >
          <span className="text-xl">
            {toast.type === 'success' ? '✨' : toast.type === 'error' ? '⚠️' : 'ℹ️'}
          </span>
          <p className="flex-1">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
