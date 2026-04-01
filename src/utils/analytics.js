import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

/**
 * Analytics Service - Predefined events for Future Forge
 * Use these functions to track specific user actions
 */

// Authentication Events
export const trackLogin = (method) => {
  if (analytics) {
    logEvent(analytics, 'login', { method });
  }
};

export const trackSignup = (method) => {
  if (analytics) {
    logEvent(analytics, 'sign_up', { method });
  }
};

export const trackLogout = () => {
  if (analytics) {
    logEvent(analytics, 'logout');
  }
};

// Profile Events
export const trackProfileUpdate = (fields) => {
  if (analytics) {
    logEvent(analytics, 'profile_update', { fields });
  }
};

export const trackProfileComplete = (percentage) => {
  if (analytics) {
    logEvent(analytics, 'profile_complete', { percentage });
  }
};

// College Events
export const trackCollegeView = (collegeName, collegeId) => {
  if (analytics) {
    logEvent(analytics, 'view_college', { 
      college_name: collegeName,
      college_id: collegeId 
    });
  }
};

export const trackCollegeSave = (collegeName, collegeId) => {
  if (analytics) {
    logEvent(analytics, 'save_college', { 
      college_name: collegeName,
      college_id: collegeId 
    });
  }
};

export const trackCollegeRemove = (collegeName, collegeId) => {
  if (analytics) {
    logEvent(analytics, 'remove_college', { 
      college_name: collegeName,
      college_id: collegeId 
    });
  }
};

export const trackCollegeApply = (collegeName, collegeId) => {
  if (analytics) {
    logEvent(analytics, 'apply_college', { 
      college_name: collegeName,
      college_id: collegeId 
    });
  }
};

// Scholarship Events
export const trackScholarshipView = (scholarshipName) => {
  if (analytics) {
    logEvent(analytics, 'view_scholarship', { 
      scholarship_name: scholarshipName 
    });
  }
};

export const trackScholarshipApply = (scholarshipName) => {
  if (analytics) {
    logEvent(analytics, 'apply_scholarship', { 
      scholarship_name: scholarshipName 
    });
  }
};

// Test & Assessment Events
export const trackTestStart = (testName, testType) => {
  if (analytics) {
    logEvent(analytics, 'start_test', { 
      test_name: testName,
      test_type: testType 
    });
  }
};

export const trackTestComplete = (testName, score, totalQuestions) => {
  if (analytics) {
    logEvent(analytics, 'complete_test', { 
      test_name: testName,
      score,
      total_questions: totalQuestions 
    });
  }
};

export const trackAptitudeTestComplete = (result) => {
  if (analytics) {
    logEvent(analytics, 'complete_aptitude_test', { result });
  }
};

// Roadmap Events
export const trackRoadmapView = (careerName) => {
  if (analytics) {
    logEvent(analytics, 'view_roadmap', { 
      career_name: careerName 
    });
  }
};

export const trackRoadmapCourseClick = (careerName, courseTitle) => {
  if (analytics) {
    logEvent(analytics, 'click_roadmap_course', { 
      career_name: careerName,
      course_title: courseTitle 
    });
  }
};

// Search Events
export const trackSearch = (searchTerm, filters) => {
  if (analytics) {
    logEvent(analytics, 'search', { 
      search_term: searchTerm,
      filters 
    });
  }
};

// Support Events
export const trackSupportTicketCreate = (category, priority) => {
  if (analytics) {
    logEvent(analytics, 'create_support_ticket', { 
      category,
      priority 
    });
  }
};

// Achievement Events
export const trackAchievementUnlock = (achievementName) => {
  if (analytics) {
    logEvent(analytics, 'unlock_achievement', { 
      achievement_name: achievementName 
    });
  }
};

// Generic Event Tracker
export const trackCustomEvent = (eventName, params) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

export default {
  // Auth
  trackLogin,
  trackSignup,
  trackLogout,
  
  // Profile
  trackProfileUpdate,
  trackProfileComplete,
  
  // College
  trackCollegeView,
  trackCollegeSave,
  trackCollegeRemove,
  trackCollegeApply,
  
  // Scholarship
  trackScholarshipView,
  trackScholarshipApply,
  
  // Tests
  trackTestStart,
  trackTestComplete,
  trackAptitudeTestComplete,
  
  // Roadmap
  trackRoadmapView,
  trackRoadmapCourseClick,
  
  // Search
  trackSearch,
  
  // Support
  trackSupportTicketCreate,
  
  // Achievements
  trackAchievementUnlock,
  
  // Custom
  trackCustomEvent
};
