import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AICounsellingChatbot from '../components/sections/AICounsellingChatbot';

const Dashboard = () => {
  const navigate = useNavigate();
  const { profileCompletion, isProfileComplete, getDashboardStats, updateDashboardStat } = useProfile();
  const [dashboardStats, setDashboardStats] = useState({
    collegesMatched: 0,
    applicationsSaved: 0,
    careerMatches: 0,
    counsellorSessions: 0
  });
  
  // Load dashboard statistics
  const loadDashboardStats = () => {
    const stats = getDashboardStats();
    setDashboardStats(stats);
  };
  
  // Update specific stat
  const updateStat = (statName, increment = 1) => {
    const updatedStats = updateDashboardStat(statName, increment);
    if (updatedStats) {
      setDashboardStats(updatedStats);
    }
  };
  
  // Initialize stats on component mount
  useEffect(() => {
    loadDashboardStats();
  }, []);
  
  // Convert stats to display format
  const stats = [
    { 
      label: 'Colleges Matched', 
      value: dashboardStats.collegesMatched.toString(), 
      icon: '🏫', 
      color: 'text-indigo-600',
      statKey: 'collegesMatched'
    },
    { 
      label: 'Applications Saved', 
      value: dashboardStats.applicationsSaved.toString(), 
      icon: '📄', 
      color: 'text-teal-600',
      statKey: 'applicationsSaved'
    },
    { 
      label: 'Career Matches', 
      value: dashboardStats.careerMatches.toString(), 
      icon: '🎯', 
      color: 'text-indigo-600',
      statKey: 'careerMatches'
    },
    { 
      label: 'Counsellor Sessions', 
      value: dashboardStats.counsellorSessions.toString(), 
      icon: '👥', 
      color: 'text-teal-600',
      statKey: 'counsellorSessions'
    }
  ];
  
  const recentActivity = [
    { action: 'Viewed college details', item: 'IIT Bombay', time: '2 hours ago' },
    { action: 'Booked counsellor session', item: 'Dr. Priya Sharma', time: '1 day ago' },
    { action: 'Saved recommendation', item: 'MIT Pune', time: '1 day ago' },
    { action: 'Updated profile', item: 'Academic information', time: '2 days ago' }
  ];
  
  const handleCompleteProfile = () => {
    navigate('/profile');
  };
  
  // Handler functions to increment counters
  const handleViewColleges = () => {
    // Increment colleges matched counter
    updateStat('collegesMatched', 5); // Simulate finding 5 new matches
    navigate('/recommendations');
  };
  
  const handleViewCounsellors = () => {
    // Increment counsellor sessions counter
    updateStat('counsellorSessions', 1);
    navigate('/counsellors');
  };
  
  const handleSaveApplication = () => {
    // Increment applications saved counter
    updateStat('applicationsSaved', 1);
  };
  
  const handleTakeTest = () => {
    // Increment career matches counter
    updateStat('careerMatches', 3); // Simulate getting 3 career matches
    navigate('/aptitude-test');
  };
  
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <AICounsellingChatbot />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to Future Forge</h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Let's help you discover the perfect academic path for your future. Get personalized guidance from expert counsellors and find your ideal college match.
              </p>
            </div>
            
            {/* Profile completion reminder */}
            {!isProfileComplete() && (
              <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                      Complete Your Profile ({profileCompletion}%)
                    </h3>
                    <p className="text-yellow-700">
                      Get personalized college recommendations and counsellor matches by completing your academic profile.
                    </p>
                  </div>
                  <Button 
                    onClick={handleCompleteProfile}
                    className="btn-primary"
                  >
                    Complete Profile
                  </Button>
                </div>
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="w-full bg-yellow-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-600 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="text-center bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 transform cursor-pointer group relative overflow-hidden"
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${index % 2 === 0 ? 'from-indigo-50 to-blue-50' : 'from-purple-50 to-pink-50'}`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl mb-2 md:mb-3 animate-float group-hover:animate-bounce">{stat.icon}</div>
                    <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${stat.color} mb-1 md:mb-2 transition-transform duration-300 group-hover:scale-110`}>{stat.value}</div>
                    <div className="text-xs md:text-sm lg:text-base text-gray-600 font-medium px-2">{stat.label}</div>
                  </div>
                  
                  {/* Interactive border effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent activity */}
              <Card className="bg-white" header={<h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>}>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{activity.action}</p>
                        <p className="text-gray-600">{activity.item}</p>
                        <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Quick actions */}
              <Card className="bg-white" header={<h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>}>
                <div className="space-y-4">
                  <Button 
                    variant="primary" 
                    className="w-full py-4 text-lg"
                    onClick={handleViewColleges}
                  >
                    🎓 View College Recommendations
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full py-3"
                    onClick={handleSaveApplication}
                  >
                    💾 Save Application
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full py-4 text-lg"
                    onClick={handleViewCounsellors}
                  >
                    👥 Talk to Expert Counsellors
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full py-4"
                    onClick={() => navigate('/profile-dashboard')}
                  >
                    📊 View My Progress Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => navigate('/profile')}
                  >
                    📝 Update Academic Profile
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Counsellor promotion section */}
            <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-3">Need Personalized Career Guidance?</h2>
                  <p className="text-indigo-100 text-lg mb-4">
                    Connect with experienced counsellors who can help you make informed decisions about your academic and career path. 
                    Affordable sessions starting at just ₹99!
                  </p>
                  <Button 
                    variant="secondary" 
                    onClick={handleViewCounsellors}
                    className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-6"
                  >
                    Book a Session Now
                  </Button>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-3">👨‍🏫</div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-indigo-200">Expert Counsellors</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;