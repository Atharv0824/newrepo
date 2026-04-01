import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

/**
 * Firebase Data Fetching Service
 * Functions to fetch data from all collections
 */

// ============================================
// COLLEGES COLLECTION
// ============================================

/**
 * Fetch all colleges
 * @returns {Promise<Array>} Array of colleges
 */
export const fetchAllColleges = async () => {
  try {
    const response = await fetch('/api/colleges');
    if (!response.ok) throw new Error('Failed to fetch colleges');
    const data = await response.json();
    
    // Track analytics
    if (analytics) {
      logEvent(analytics, 'fetch_colleges', { count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return [];
  }
};

/**
 * Fetch college by ID
 * @param {string} collegeId - College ID
 * @returns {Promise<Object>} College data
 */
export const fetchCollegeById = async (collegeId) => {
  try {
    const response = await fetch(`/api/colleges/${collegeId}`);
    if (!response.ok) throw new Error('College not found');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'fetch_college_details', { 
        college_id: collegeId,
        college_name: data.name 
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching college:', error);
    return null;
  }
};

/**
 * Search colleges by filters
 * @param {Object} filters - Search filters
 * @returns {Promise<Array>} Filtered colleges
 */
export const searchColleges = async (filters) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/colleges/search?${queryParams}`);
    
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'search_colleges', { 
        filters: JSON.stringify(filters),
        results_count: data.length 
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error searching colleges:', error);
    return [];
  }
};

// ============================================
// SCHOLARSHIPS COLLECTION
// ============================================

/**
 * Fetch all active scholarships
 * @returns {Promise<Array>} Array of scholarships
 */
export const fetchAllScholarships = async () => {
  try {
    const response = await fetch('/api/scholarships?active=true');
    if (!response.ok) throw new Error('Failed to fetch scholarships');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'fetch_scholarships', { count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    return [];
  }
};

/**
 * Get scholarships by category
 * @param {string} category - Category (sc/st/obc/general/female)
 * @returns {Promise<Array>} Filtered scholarships
 */
export const getScholarshipsByCategory = async (category) => {
  try {
    const response = await fetch(`/api/scholarships/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'filter_scholarships', { category, count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error filtering scholarships:', error);
    return [];
  }
};

/**
 * Get scholarships approaching deadline
 * @param {number} days - Days before deadline
 * @returns {Promise<Array>} Scholarships expiring soon
 */
export const getUrgentScholarships = async (days = 7) => {
  try {
    const response = await fetch(`/api/scholarships/urgent?days=${days}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'view_urgent_scholarships', { days_left: days, count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching urgent scholarships:', error);
    return [];
  }
};

// ============================================
// MOCK TESTS COLLECTION
// ============================================

/**
 * Fetch all available mock tests
 * @returns {Promise<Array>} Array of tests
 */
export const fetchAllMockTests = async () => {
  try {
    const response = await fetch('/api/mock-tests?available=true');
    if (!response.ok) throw new Error('Failed to fetch tests');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'fetch_mock_tests', { count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching mock tests:', error);
    return [];
  }
};

/**
 * Get mock test by ID with questions
 * @param {string} testId - Test ID
 * @returns {Promise<Object>} Complete test data
 */
export const fetchMockTestById = async (testId) => {
  try {
    const response = await fetch(`/api/mock-tests/${testId}`);
    if (!response.ok) throw new Error('Test not found');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'start_mock_test', { 
        test_id: testId,
        test_name: data.name 
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching mock test:', error);
    return null;
  }
};

/**
 * Get tests by type (JEE/NEET/CUET)
 * @param {string} type - Test type
 * @returns {Promise<Array>} Filtered tests
 */
export const getTestsByType = async (type) => {
  try {
    const response = await fetch(`/api/mock-tests/type/${type}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'filter_tests_by_type', { type, count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error filtering tests:', error);
    return [];
  }
};

// ============================================
// CAREER ROADMAPS COLLECTION
// ============================================

/**
 * Fetch all career roadmaps
 * @returns {Promise<Array>} Array of roadmaps
 */
export const fetchAllRoadmaps = async () => {
  try {
    const response = await fetch('/api/career-roadmaps');
    if (!response.ok) throw new Error('Failed to fetch roadmaps');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'fetch_roadmaps', { count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return [];
  }
};

/**
 * Get roadmap by career name
 * @param {string} careerName - Career name
 * @returns {Promise<Object>} Roadmap data
 */
export const getRoadmapByCareer = async (careerName) => {
  try {
    const encodedName = encodeURIComponent(careerName);
    const response = await fetch(`/api/career-roadmaps/${encodedName}`);
    if (!response.ok) throw new Error('Roadmap not found');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'view_career_roadmap', { 
        career_name: careerName 
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return null;
  }
};

// ============================================
// EXAM ALERTS COLLECTION
// ============================================

/**
 * Fetch all active exam alerts
 * @returns {Promise<Array>} Array of exams
 */
export const fetchAllExamAlerts = async () => {
  try {
    const response = await fetch('/api/exam-alerts?active=true');
    if (!response.ok) throw new Error('Failed to fetch exams');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'fetch_exam_alerts', { count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching exam alerts:', error);
    return [];
  }
};

/**
 * Get exams by category
 * @param {string} category - Category (Engineering/Medical/Law/etc)
 * @returns {Promise<Array>} Filtered exams
 */
export const getExamsByCategory = async (category) => {
  try {
    const response = await fetch(`/api/exam-alerts/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'filter_exams', { category, count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error filtering exams:', error);
    return [];
  }
};

// ============================================
// STUDY MATERIALS COLLECTION
// ============================================

/**
 * Fetch study materials by subject
 * @param {string} subject - Subject name
 * @returns {Promise<Array>} Materials array
 */
export const getMaterialsBySubject = async (subject) => {
  try {
    const response = await fetch(`/api/study-materials/subject/${subject}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'fetch_study_materials', { 
        subject, 
        count: data.length 
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching materials:', error);
    return [];
  }
};

/**
 * Search study materials
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} Materials array
 */
export const searchStudyMaterials = async (params) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`/api/study-materials/search?${queryParams}`);
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'search_study_materials', { 
        params: JSON.stringify(params),
        count: data.length 
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error searching materials:', error);
    return [];
  }
};

// ============================================
// EVENTS & WEBINARS COLLECTION
// ============================================

/**
 * Fetch upcoming events
 * @returns {Promise<Array>} Events array
 */
export const fetchUpcomingEvents = async () => {
  try {
    const response = await fetch('/api/events/upcoming');
    if (!response.ok) throw new Error('Failed to fetch events');
    const data = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'fetch_events', { count: data.length });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

/**
 * Register for an event
 * @param {string} eventId - Event ID
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Registration confirmation
 */
export const registerForEvent = async (eventId, userData) => {
  try {
    const response = await fetch('/api/events/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, ...userData })
    });
    
    if (!response.ok) throw new Error('Registration failed');
    const result = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'register_event', { 
        event_id: eventId,
        event_name: result.eventName 
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error registering for event:', error);
    return null;
  }
};

// ============================================
// SUPPORT TICKETS COLLECTION
// ============================================

/**
 * Get user's support tickets
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Tickets array
 */
export const getUserTickets = async (userId) => {
  try {
    const response = await fetch(`/api/support-tickets/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch tickets');
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};

/**
 * Create new support ticket
 * @param {Object} ticketData - Ticket information
 * @returns {Promise<Object>} Created ticket
 */
export const createSupportTicket = async (ticketData) => {
  try {
    const response = await fetch('/api/support-tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData)
    });
    
    if (!response.ok) throw new Error('Failed to create ticket');
    const result = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'create_support_ticket', { 
        category: ticketData.category,
        priority: ticketData.priority 
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error creating ticket:', error);
    return null;
  }
};

// ============================================
// USER PROFILE COLLECTION
// ============================================

/**
 * Fetch user profile
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Profile data
 */
export const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`/api/profiles/user/${userId}`);
    if (!response.ok) throw new Error('Profile not found');
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} Updated profile
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`/api/profiles/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) throw new Error('Update failed');
    const result = await response.json();
    
    if (analytics) {
      logEvent(analytics, 'update_profile', { 
        fields_updated: Object.keys(profileData).length 
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error updating profile:', error);
    return null;
  }
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

export default {
  // Colleges
  fetchAllColleges,
  fetchCollegeById,
  searchColleges,
  
  // Scholarships
  fetchAllScholarships,
  getScholarshipsByCategory,
  getUrgentScholarships,
  
  // Mock Tests
  fetchAllMockTests,
  fetchMockTestById,
  getTestsByType,
  
  // Career Roadmaps
  fetchAllRoadmaps,
  getRoadmapByCareer,
  
  // Exam Alerts
  fetchAllExamAlerts,
  getExamsByCategory,
  
  // Study Materials
  getMaterialsBySubject,
  searchStudyMaterials,
  
  // Events
  fetchUpcomingEvents,
  registerForEvent,
  
  // Support
  getUserTickets,
  createSupportTicket,
  
  // User Profile
  fetchUserProfile,
  updateUserProfile
};
