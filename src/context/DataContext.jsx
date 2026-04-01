import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNotification } from './NotificationContext';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [savedColleges, setSavedColleges] = useState([]);
  const [profileHistory, setProfileHistory] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notifyCollegeSaved, notifyCollegeRemoved } = useNotification();

  // Load all user data on mount
  useEffect(() => {
    loadAllUserData();
  }, []);

  const loadAllUserData = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserData(user);
        
        // Load user-specific data
        loadUserData(user.id);
      } else {
        // No user logged in, set empty arrays
        setSavedColleges([]);
        setProfileHistory([]);
        setSearchHistory([]);
        setAppointments([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
      // Set defaults on error
      setUserData(null);
      setAppointments([]);
      setSavedColleges([]);
      setProfileHistory([]);
      setSearchHistory([]);
    }
  };

  const loadUserData = (userId) => {
    try {
      // Load saved colleges
      const allSaved = JSON.parse(localStorage.getItem('savedColleges') || '[]');
      const userSaved = allSaved.filter(item => item.userId === userId);
      setSavedColleges(userSaved);

      // Load profile history
      const allProfileHistory = JSON.parse(localStorage.getItem('profileHistory') || '[]');
      const userProfileHistory = allProfileHistory.filter(item => item.userId === userId);
      setProfileHistory(userProfileHistory);

      // Load search history
      const allSearches = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const userSearches = allSearches.filter(item => item.userId === userId);
      setSearchHistory(userSearches);
    } catch (error) {
      console.error('Error loading user data:', error);
      // Set empty arrays if there's an error
      setSavedColleges([]);
      setProfileHistory([]);
      setSearchHistory([]);
    }
  };

  // Save college
  const saveCollege = (college) => {
    try {
      const savedItem = {
        ...college,
        collegeId: college.id,  // Preserve original college ID
        id: Date.now(),         // New unique ID for this saved entry
        userId: userData?.id,
        savedAt: new Date().toISOString()
      };

      const allSaved = JSON.parse(localStorage.getItem('savedColleges') || '[]');
      
      // Check if already saved
      const alreadyExists = allSaved.some(item => item.collegeId === college.id);
      if (alreadyExists) {
        console.log('College already saved:', college.name);
        return { success: true, saved: savedItem, alreadyExists: true };
      }
      
      allSaved.push(savedItem);
      localStorage.setItem('savedColleges', JSON.stringify(allSaved));
      
      setSavedColleges([...savedColleges, savedItem]);
      
      // Send notification
      if (notifyCollegeSaved) {
        notifyCollegeSaved(college.name || college.collegeName || 'College');
      }
      
      return { success: true, saved: savedItem };
    } catch (error) {
      console.error('Error saving college:', error);
      return { success: false, error: error.message };
    }
  };

  // Remove saved college
  const removeSavedCollege = (collegeId) => {
    try {
      const allSaved = JSON.parse(localStorage.getItem('savedColleges') || '[]');
      const updated = allSaved.filter(item => item.collegeId !== collegeId);
      localStorage.setItem('savedColleges', JSON.stringify(updated));
      
      const removedCollege = savedColleges.find(item => item.collegeId === collegeId);
      setSavedColleges(savedColleges.filter(item => item.collegeId !== collegeId));
      
      // Send notification
      if (notifyCollegeRemoved && removedCollege) {
        notifyCollegeRemoved(removedCollege.name || removedCollege.collegeName || 'College');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error removing saved college:', error);
      return { success: false, error: error.message };
    }
  };

  // Add to search history
  const addToSearchHistory = (searchQuery) => {
    try {
      const searchItem = {
        query: searchQuery,
        userId: userData?.id,
        timestamp: new Date().toISOString()
      };

      const allSearches = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      allSearches.unshift(searchItem);
      
      // Keep only last 50 searches
      const trimmed = allSearches.slice(0, 50);
      localStorage.setItem('searchHistory', JSON.stringify(trimmed));
      
      setSearchHistory([searchItem, ...searchHistory].slice(0, 50));
    } catch (error) {
      console.error('Error adding to search history:', error);
    }
  };

  // Add to profile history
  const addToProfileHistory = (action) => {
    try {
      const historyItem = {
        ...action,
        userId: userData?.id,
        timestamp: new Date().toISOString()
      };

      const allHistory = JSON.parse(localStorage.getItem('profileHistory') || '[]');
      allHistory.unshift(historyItem);
      
      // Keep only last 100 actions
      const trimmed = allHistory.slice(0, 100);
      localStorage.setItem('profileHistory', JSON.stringify(trimmed));
      
      setProfileHistory([historyItem, ...profileHistory].slice(0, 100));
    } catch (error) {
      console.error('Error adding to profile history:', error);
    }
  };

  // Get statistics
  const getStatistics = () => {
    return {
      savedColleges: savedColleges.length,
      profileUpdates: profileHistory.filter(h => h.type === 'profile_update').length,
      searchesLast30Days: searchHistory.filter(s => {
        const date = new Date(s.timestamp);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return date >= thirtyDaysAgo;
      }).length,
      totalAppointments: appointments.length,
      completedAppointments: appointments.filter(a => a.status === 'completed').length,
      upcomingAppointments: appointments.filter(a => a.status === 'scheduled').length
    };
  };

  // Clear all user data (for testing)
  const clearAllData = () => {
    localStorage.removeItem('savedColleges');
    localStorage.removeItem('profileHistory');
    localStorage.removeItem('searchHistory');
    setSavedColleges([]);
    setProfileHistory([]);
    setSearchHistory([]);
    setAppointments([]);
  };

  const value = {
    userData,
    savedColleges,
    profileHistory,
    searchHistory,
    appointments,
    loading,
    saveCollege,
    removeSavedCollege,
    addToSearchHistory,
    addToProfileHistory,
    getStatistics,
    clearAllData,
    refreshData: loadUserData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
