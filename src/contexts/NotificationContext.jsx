import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
    title: '',
    duration: 6000,
  });

  const showNotification = (message, severity = 'info', title = '', duration = 6000) => {
    setNotification({
      open: true,
      message,
      severity,
      title,
      duration,
    });
  };

  const showSuccess = (message, title = 'Success!') => {
    showNotification(message, 'success', title, 4000);
  };

  const showError = (message, title = 'Error!') => {
    showNotification(message, 'error', title, 8000);
  };

  const showWarning = (message, title = 'Warning!') => {
    showNotification(message, 'warning', title, 6000);
  };

  const showInfo = (message, title = 'Info') => {
    showNotification(message, 'info', title, 5000);
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success':
        return <CheckCircleIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const value = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={notification.duration}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            minWidth: '300px',
          },
        }}
      >
        <Alert
          onClose={hideNotification}
          severity={notification.severity}
          variant="filled"
          icon={getSeverityIcon(notification.severity)}
          sx={{
            width: '100%',
            fontWeight: 500,
            '& .MuiAlert-message': {
              width: '100%',
            },
          }}
        >
          {notification.title && (
            <AlertTitle sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {notification.title}
            </AlertTitle>
          )}
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}; 