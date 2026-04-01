import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  // Initialize dashboard stats if they don't exist
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('dashboardStats');
      if (!savedStats) {
        const initialStats = {
          collegesMatched: 0,
          applicationsSaved: 0,
          careerMatches: 0,
          counsellorSessions: 0
        };
        localStorage.setItem('dashboardStats', JSON.stringify(initialStats));
      }
    } catch (error) {
      console.error('Error initializing dashboard stats:', error);
    }
  }, []);
  const [profileData, setProfileData] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [loading, setLoading] = useState(true);

  // Calculate profile completion percentage
  const calculateProfileCompletion = (data) => {
    if (!data) return 0;
    
    const requiredFields = [
      'fullName',
      'email', 
      'academicStream',
      'marksPercentage',
      'preferredRegion'
    ];
    
    const optionalFields = [
      'phone',
      'dateOfBirth',
      'schoolName',
      'passingYear',
      'interests',
      'careerGoals',
      'preferredSubjects',
      'willingToRelocate',
      'budgetRange'
    ];
    
    let completedRequired = 0;
    let completedOptional = 0;
    
    // Check required fields
    requiredFields.forEach(field => {
      if (data[field] && data[field].toString().trim() !== '') {
        completedRequired++;
      }
    });
    
    // Check optional fields
    optionalFields.forEach(field => {
      if (Array.isArray(data[field])) {
        if (data[field].length > 0) completedOptional++;
      } else if (data[field] && data[field].toString().trim() !== '') {
        completedOptional++;
      }
    });
    
    // Calculate weighted completion (required fields = 70%, optional fields = 30%)
    const requiredCompletion = (completedRequired / requiredFields.length) * 70;
    const optionalCompletion = (completedOptional / optionalFields.length) * 30;
    
    return Math.round(requiredCompletion + optionalCompletion);
  };

  // Load profile data from localStorage
  const loadProfileData = () => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const data = JSON.parse(savedProfile);
        setProfileData(data);
        setProfileCompletion(calculateProfileCompletion(data));
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save profile data and update completion
  const saveProfileData = (data) => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(data));
      setProfileData(data);
      setProfileCompletion(calculateProfileCompletion(data));
      
      // Update user profile completion status
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.profileCompleted = calculateProfileCompletion(data) >= 80; // Consider complete if 80%+
      localStorage.setItem('user', JSON.stringify(user));
      
      return true;
    } catch (error) {
      console.error('Error saving profile data:', error);
      return false;
    }
  };

  // Update specific field
  const updateProfileField = (field, value) => {
    const updatedData = {
      ...profileData,
      [field]: value
    };
    return saveProfileData(updatedData);
  };

  // Check if profile is complete
  const isProfileComplete = () => {
    return profileCompletion >= 80;
  };

  // Get profile field value
  const getProfileField = (field, defaultValue = '') => {
    return profileData?.[field] || defaultValue;
  };
  
  // Update dashboard statistics
  const updateDashboardStat = (statName, increment = 1) => {
    try {
      const savedStats = localStorage.getItem('dashboardStats');
      const stats = savedStats ? JSON.parse(savedStats) : {
        collegesMatched: 0,
        applicationsSaved: 0,
        careerMatches: 0,
        counsellorSessions: 0
      };
      
      stats[statName] = Math.max(0, (stats[statName] || 0) + increment);
      localStorage.setItem('dashboardStats', JSON.stringify(stats));
      return stats;
    } catch (error) {
      console.error('Error updating dashboard stat:', error);
      return null;
    }
  };
  
  // Get dashboard statistics
  const getDashboardStats = () => {
    try {
      const savedStats = localStorage.getItem('dashboardStats');
      return savedStats ? JSON.parse(savedStats) : {
        collegesMatched: 0,
        applicationsSaved: 0,
        careerMatches: 0,
        counsellorSessions: 0
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return {
        collegesMatched: 0,
        applicationsSaved: 0,
        careerMatches: 0,
        counsellorSessions: 0
      };
    }
  };

  // Initialize on mount
  useEffect(() => {
    loadProfileData();
  }, []);

  const value = {
    profileData,
    profileCompletion,
    loading,
    saveProfileData,
    updateProfileField,
    getProfileField,
    isProfileComplete,
    loadProfileData,
    calculateProfileCompletion,
    updateDashboardStat,
    getDashboardStats
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};