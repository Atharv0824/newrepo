import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { DataProvider } from './context/DataContext';
import { NotificationProvider } from './context/NotificationContext';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import StudentInfoForm from './pages/StudentInfoForm';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';
import ProfileDashboard from './pages/ProfileDashboard';
import MyDashboard from './pages/MyDashboard';
import Recommendations from './pages/Recommendations';
import AptitudeTest from './pages/AptitudeTest';
import CourseRoadmap from './pages/CourseRoadmap';
import ExamAlerts from './pages/ExamAlerts';
import ScholarshipFinder from './pages/ScholarshipFinder';
import RealTimeDeadlines from './pages/RealTimeDeadlines';
import ProfessionDeadlines from './pages/ProfessionDeadlines';
import Settings from './pages/Settings';
import ContactSupport from './pages/ContactSupport';
import MockTests from './pages/MockTests';
import StudyMaterials from './pages/StudyMaterials';
import CollegeComparison from './pages/CollegeComparison';
import EventsWebinars from './pages/EventsWebinars';
import CounsellorList from './pages/CounsellorList';
import PaymentPage from './pages/PaymentPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirects logged-in users)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return !user ? children : <Navigate to="/dashboard" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <NotificationProvider>
          <DataProvider>
            <Router basename="/my-project-first-try" future={{ v7_relativeSplatPath: true }}>
              <div className="App">
                <AppRoutes />
              </div>
            </Router>
          </DataProvider>
        </NotificationProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

// Separate component to use keyboard shortcuts within Router context
const AppRoutes = () => {
  useKeyboardShortcuts();
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/signup" 
                  element={
                    <PublicRoute>
                      <SignupPage />
                    </PublicRoute>
                  } 
                />
                
                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <StudentInfoForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile/view" 
                  element={
                    <ProtectedRoute>
                      <ProfileView />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile/edit" 
                  element={
                    <ProtectedRoute>
                      <ProfileEdit />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile-dashboard" 
                  element={
                    <ProtectedRoute>
                      <ProfileDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/recommendations" 
                  element={
                    <ProtectedRoute>
                      <Recommendations />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/aptitude-test" 
                  element={
                    <ProtectedRoute>
                      <AptitudeTest />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/course-roadmap" 
                  element={
                    <ProtectedRoute>
                      <CourseRoadmap />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/exam-alerts" 
                  element={
                    <ProtectedRoute>
                      <ExamAlerts />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/real-time-deadlines" 
                  element={
                    <ProtectedRoute>
                      <RealTimeDeadlines />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profession-deadlines" 
                  element={
                    <ProtectedRoute>
                      <ProfessionDeadlines />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/scholarships" 
                  element={
                    <ProtectedRoute>
                      <ScholarshipFinder />
                    </ProtectedRoute>
                  } 
                />
                
                {/* My Dashboard Route */}
                <Route 
                  path="/my-dashboard" 
                  element={
                    <ProtectedRoute>
                      <MyDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Settings Route */}
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Contact Support Route */}
                <Route 
                  path="/contact-support" 
                  element={
                    <ProtectedRoute>
                      <ContactSupport />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Mock Tests Route */}
                <Route 
                  path="/mock-tests" 
                  element={
                    <ProtectedRoute>
                      <MockTests />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Study Materials Route */}
                <Route 
                  path="/study-materials" 
                  element={
                    <ProtectedRoute>
                      <StudyMaterials />
                    </ProtectedRoute>
                  } 
                />
                
                {/* College Comparison Route */}
                <Route 
                  path="/college-comparison" 
                  element={
                    <ProtectedRoute>
                      <CollegeComparison />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Events Webinars Route */}
                <Route 
                  path="/events-webinars" 
                  element={
                    <ProtectedRoute>
                      <EventsWebinars />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Counsellor List Route */}
                <Route 
                  path="/counsellors" 
                  element={
                    <ProtectedRoute>
                      <CounsellorList />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Payment Page Route */}
                <Route 
                  path="/payment" 
                  element={
                    <ProtectedRoute>
                      <PaymentPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Default Route */}
                <Route 
                  path="/" 
                  element={<Navigate to="/dashboard" replace />} 
                />
                
                {/* Catch all route */}
                <Route 
                  path="*" 
                  element={<Navigate to="/dashboard" replace />} 
                />
              </Routes>
    );
};

export default App;