import { useState, useEffect } from 'react';

// Custom hook for managing loading states across the application
export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const startLoading = (message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    setLoadingMessage
  };
};

// Global loading state for route transitions
let globalLoadingState = {
  isLoading: false,
  message: 'Loading...',
  listeners: new Set()
};

export const useGlobalLoading = () => {
  const [state, setState] = useState({
    isLoading: globalLoadingState.isLoading,
    message: globalLoadingState.message
  });

  useEffect(() => {
    const listener = (newState) => {
      setState(newState);
    };

    globalLoadingState.listeners.add(listener);

    return () => {
      globalLoadingState.listeners.delete(listener);
    };
  }, []);

  const startGlobalLoading = (message = 'Loading...') => {
    globalLoadingState.isLoading = true;
    globalLoadingState.message = message;
    
    globalLoadingState.listeners.forEach(listener => {
      listener({ isLoading: true, message });
    });
  };

  const stopGlobalLoading = () => {
    globalLoadingState.isLoading = false;
    
    globalLoadingState.listeners.forEach(listener => {
      listener({ isLoading: false, message: globalLoadingState.message });
    });
  };

  return {
    isLoading: state.isLoading,
    message: state.message,
    startGlobalLoading,
    stopGlobalLoading
  };
};
