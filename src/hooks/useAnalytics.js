import { useEffect } from 'react';
import { analytics } from '../firebase';
import { logEvent, setUserProperties } from 'firebase/analytics';

/**
 * Custom hook to track user actions with Firebase Analytics
 */
export const useAnalytics = () => {
  // Track custom event
  const trackEvent = (eventName, eventParams = {}) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
      console.log(`📊 Event tracked: ${eventName}`, eventParams);
    } else {
      console.log(`ℹ️ Analytics not available, would track: ${eventName}`, eventParams);
    }
  };

  // Set user properties
  const setUserProperties = (properties) => {
    if (analytics && properties) {
      setUserProperties(analytics, properties);
      console.log('👤 User properties set:', properties);
    }
  };

  return { trackEvent, setUserProperties };
};

/**
 * HOC to track page views automatically
 */
export const withPageTracking = (WrappedComponent) => {
  return function TrackedComponent(props) {
    useEffect(() => {
      if (analytics) {
        logEvent(analytics, 'page_view', {
          page_path: window.location.pathname,
          page_title: document.title
        });
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default useAnalytics;
