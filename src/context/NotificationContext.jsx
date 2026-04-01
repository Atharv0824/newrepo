import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    const savedNotifications = localStorage.getItem(`notifications_${user.id}`);
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, [user]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      type: 'info',
      read: false,
      time: new Date().toISOString(),
      ...notification
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      // Keep only last 50 notifications
      return updated.slice(0, 50);
    });

    setUnreadCount(prev => prev + 1);

    // Also update in localStorage immediately
    const updatedNotifications = [newNotification, ...notifications].slice(0, 50);
    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updatedNotifications));
    }

    return newNotification.id;
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      );
      
      // Update localStorage
      if (user) {
        localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
      }
      
      return updated;
    });

    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updated);
    setUnreadCount(0);

    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
    }
  };

  // Remove a notification
  const removeNotification = (id) => {
    const updated = notifications.filter(notif => notif.id !== id);
    setNotifications(updated);
    
    if (!updated.find(n => n.id === id)?.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }

    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
    }
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    
    if (user) {
      localStorage.removeItem(`notifications_${user.id}`);
    }
  };

  // Helper functions for common notification types
  const notifySuccess = (title, message, actionUrl) => {
    return addNotification({
      type: 'success',
      title,
      message,
      actionUrl
    });
  };

  const notifyInfo = (title, message, actionUrl) => {
    return addNotification({
      type: 'info',
      title,
      message,
      actionUrl
    });
  };

  const notifyWarning = (title, message, actionUrl) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      actionUrl
    });
  };

  const notifyError = (title, message, actionUrl) => {
    return addNotification({
      type: 'error',
      title,
      message,
      actionUrl
    });
  };

  // College-related notifications
  const notifyCollegeSaved = (collegeName) => {
    return notifySuccess(
      'College Saved',
      `${collegeName} has been added to your saved colleges`,
      '/recommendations'
    );
  };

  const notifyCollegeRemoved = (collegeName) => {
    return notifyInfo(
      'College Removed',
      `${collegeName} has been removed from your saved colleges`,
      '/recommendations'
    );
  };

  // Profile-related notifications
  const notifyProfileUpdated = () => {
    return notifySuccess(
      'Profile Updated',
      'Your profile has been successfully updated',
      '/profile'
    );
  };

  const notifyProfileComplete = (percentage) => {
    return notifySuccess(
      'Profile Complete! 🎉',
      `Your profile is ${percentage}% complete. Great job!`,
      '/profile'
    );
  };

  // Application-related notifications
  const notifyApplicationSubmitted = (examName) => {
    return notifySuccess(
      'Application Submitted',
      `Your application for ${examName} has been submitted successfully`,
      '/exam-alerts'
    );
  };

  const notifyScholarshipApplied = (scholarshipName) => {
    return notifySuccess(
      'Scholarship Applied',
      `You've applied for ${scholarshipName}. Best of luck!`,
      '/scholarships'
    );
  };

  // Test/Achievement notifications
  const notifyTestCompleted = (testName, score) => {
    return notifySuccess(
      'Test Completed',
      `You scored ${score}% in ${testName}. Check your results!`,
      '/mock-tests'
    );
  };

  const notifyAchievementUnlocked = (achievementTitle) => {
    return notifySuccess(
      'Achievement Unlocked! 🏆',
      achievementTitle,
      '/achievements'
    );
  };

  // Reminder notifications
  const notifyDeadlineReminder = (itemName, daysLeft) => {
    return notifyWarning(
      'Deadline Alert ⏰',
      `${itemName} deadline ends in ${daysLeft}. Apply now!`,
      '/real-time-deadlines'
    );
  };

  const notifyAppointmentReminder = (counsellorName, appointmentTime) => {
    return notifyInfo(
      'Appointment Reminder',
      `You have an appointment with ${counsellorName} at ${appointmentTime}`,
      '/appointment-history'
    );
  };

  // New appointment booking notification
  const notifyAppointmentBooked = (counsellorName, sessionType, price) => {
    return notifySuccess(
      'Appointment Booked! 🎉',
      `You've successfully booked a ${sessionType === 'group' ? 'Group' : 'Individual'} session with ${counsellorName} for ₹${price}`,
      '/my-dashboard'
    );
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    notifySuccess,
    notifyInfo,
    notifyWarning,
    notifyError,
    notifyCollegeSaved,
    notifyCollegeRemoved,
    notifyProfileUpdated,
    notifyProfileComplete,
    notifyApplicationSubmitted,
    notifyScholarshipApplied,
    notifyTestCompleted,
    notifyAchievementUnlocked,
    notifyDeadlineReminder,
    notifyAppointmentReminder,
    notifyAppointmentBooked
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
