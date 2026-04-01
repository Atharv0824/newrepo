import { useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const TRACKING_API_URL = 'http://localhost:3001/api/log-action';

// Helper function to send action to backend
const sendAction = async (actionData) => {
  try {
    await fetch(TRACKING_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(actionData),
    });
  } catch (error) {
    console.error('Failed to log action:', error);
    // Fail silently - don't disrupt user experience
  }
};

export const useUserTracking = () => {
  const { user } = useAuth();

  // Track page views
  useEffect(() => {
    const trackPageView = () => {
      sendAction({
        userId: user?.id || 'anonymous',
        actionName: 'page_view',
        pageUrl: window.location.pathname,
        timestamp: new Date().toISOString(),
        additionalData: {
          title: document.title,
          referrer: document.referrer,
        },
      });
    };

    // Track initial page load
    trackPageView();

    // You can add listener for SPA navigation if needed
    return () => {
      // Cleanup if needed
    };
  }, [user]);

  // Function to track custom actions
  const trackAction = useCallback((actionName, additionalData = {}) => {
    sendAction({
      userId: user?.id || 'anonymous',
      actionName,
      pageUrl: window.location.pathname,
      timestamp: new Date().toISOString(),
      additionalData,
    });
  }, [user]);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName, context = {}) => {
    trackAction('button_click', {
      buttonName,
      ...context,
    });
  }, [trackAction]);

  // Track form submissions
  const trackFormSubmit = useCallback((formName, formData = {}) => {
    trackAction('form_submit', {
      formName,
      formData: Object.keys(formData), // Only track field names, not values (privacy)
      ...formData,
    });
  }, [trackAction]);

  // Track navigation
  const trackNavigation = useCallback((from, to) => {
    trackAction('navigation', {
      from,
      to,
    });
  }, [trackAction]);

  return {
    trackAction,
    trackButtonClick,
    trackFormSubmit,
    trackNavigation,
  };
};
