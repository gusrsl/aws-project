import { useState } from 'react';

interface AlertState {
  open: boolean;
  message: string;
  title?: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showAlert = (message: string, severity: AlertState['severity'], title?: string) => {
    setAlert({
      open: true,
      message,
      severity,
      title,
    });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const showError = (message: string, title?: string) => {
    showAlert(message, 'error', title);
  };

  const showSuccess = (message: string, title?: string) => {
    showAlert(message, 'success', title);
  };

  const showWarning = (message: string, title?: string) => {
    showAlert(message, 'warning', title);
  };

  const showInfo = (message: string, title?: string) => {
    showAlert(message, 'info', title);
  };

  return {
    alert,
    showAlert,
    hideAlert,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };
}; 