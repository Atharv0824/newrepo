import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AICounsellingChatbot from '../components/sections/AICounsellingChatbot';

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const { profileData, profileCompletion, getProfileField } = useProfile();
  const [progressData, setProgressData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  
  // Load real profile data
  useEffect(() => {
    fetchProfileData();
  }, [profileData, profileCompletion]);

  const fetchProfileData = async () => {
    try {
      // Mock progress data based on profile completion
      setProgressData({
        academicProgress: profileCompletion >= 80 ? 75 : Math.max(30, profileCompletion - 20),
        profileCompletion: profileCompletion,
        careerReadiness: profileCompletion >= 70 ? 60 : Math.max(20, profileCompletion - 30),
        collegeResearch: profileCompletion >= 60 ? 40 : Math.max(10, profileCompletion - 40)
      });
      
      // Mock recommendations history
      setRecommendations([
        {
          id: 1,
          college: 'IIT Bombay',
          course: 'Computer Science',
          date: '2026-01-15',
          status: 'Saved',
          matchScore: 92
        },
        {
          id: 2,
          college: 'MIT Pune',
          course: 'Electronics Engineering',
          date: '2026-01-12',
          status: 'Applied',
          matchScore: 87
        },
        {
          id: 3,
          college: 'Delhi University',
          course: 'Commerce (Hons)',
          date: '2026-01-10',
          status: 'Viewed',
          matchScore: 78
        }
      ]);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  
  const progressCategories = [
    { name: 'Academic Progress', value: progressData?.academicProgress || 0, color: 'bg-blue-500', icon: '📚' },
    { name: 'Profile Completion', value: progressData?.profileCompletion || 0, color: 'bg-green-500', icon: '📝' },
    { name: 'Career Readiness', value: progressData?.careerReadiness || 0, color: 'bg-purple-500', icon: '🎯' },
    { name: 'College Research', value: progressData?.collegeResearch || 0, color: 'bg-indigo-500', icon: '🏫' }
  ];
  
  const careerMilestones = [
    { id: 1, title: 'Internship Application', completed: true, date: '2026-01-01' },
    { id: 2, title: 'Take Career Assessment', completed: true, date: '2026-01-05' },
    { id: 3, title: 'Explore College Options', completed: true, date: '2026-01-10' },
    { id: 4, title: 'Shortlist Top Colleges', completed: false, date: null },
    { id: 5, title: 'Prepare Application Materials', completed: false, date: null },
    { id: 6, title: 'Submit Applications', completed: false, date: null }
  ];
  
  const handleUpdateProfile = () => {
    navigate('/profile');
  };
  
  const handleViewRecommendations = () => {
    navigate('/recommendations');
  };
  
  const handleTalkToCounsellor = () => {
    navigate('/counsellor-profile');
  };
  
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <AICounsellingChatbot />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">My Profile Dashboard</h1>
              <p className="text-xl text-gray-600">
                Track your academic journey and career development progress
              </p>
            </div>
            
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {progressCategories.map((category, index) => (
                <Card key={index} className="bg-white text-center hover:shadow-xl transition-all duration-300">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm font-bold text-gray-900">{category.value}%</span>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
                      <div
                        style={{ width: `${category.value}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${category.color}`}
                      ></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Career Roadmap */}
              <div className="lg:col-span-2">
                <Card className="bg-white" header={
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Career Roadmap</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleUpdateProfile}
                    >
                      Update Profile
                    </Button>
                  </div>
                }>
                  <div className="space-y-4">
                    {careerMilestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-center space-x-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {milestone.completed ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            milestone.completed ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {milestone.title}
                          </h4>
                          {milestone.date && (
                            <p className="text-sm text-gray-500">Completed: {milestone.date}</p>
                          )}
                        </div>
                        {!milestone.completed && index === 3 && (
                          <Button size="sm" variant="primary">
                            Start Now
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
                
                {/* Recommendations History */}
                <Card className="bg-white mt-8" header={
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Recommendations History</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleViewRecommendations}
                    >
                      View All
                    </Button>
                  </div>
                }>
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                            {rec.college.split(' ').map(word => word[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{rec.college}</h4>
                            <p className="text-gray-600">{rec.course}</p>
                            <p className="text-sm text-gray-500">Match: {rec.matchScore}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            rec.status === 'Applied' 
                              ? 'bg-green-100 text-green-800'
                              : rec.status === 'Saved'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {rec.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{rec.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              {/* Quick Actions & Stats */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <Card className="bg-white" header={<h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>}>
                  <div className="space-y-4">
                    <Button 
                      variant="primary" 
                      className="w-full py-3"
                      onClick={handleUpdateProfile}
                    >
                      📝 Update Academic Profile
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="w-full py-3"
                      onClick={handleTalkToCounsellor}
                    >
                      👥 Talk to Counsellor
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full py-3"
                      onClick={handleViewRecommendations}
                    >
                      🎓 View Recommendations
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => navigate('/counsellor-profile')}
                    >
                      💡 Get Career Advice
                    </Button>
                  </div>
                </Card>
                
                {/* Academic Summary */}
                <Card className="bg-white" header={<h3 className="text-xl font-semibold text-gray-900">Academic Summary</h3>}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Stream</span>
                      <span className="font-semibold text-gray-900">
                        {getProfileField('academicStream', 'Not specified')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Percentage</span>
                      <span className="font-semibold text-gray-900">
                        {getProfileField('marksPercentage', 'Not specified')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Preferred Location</span>
                      <span className="font-semibold text-gray-900">
                        {getProfileField('preferredRegion', 'Not specified')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Career Interests</span>
                      <span className="font-semibold text-gray-900 text-sm text-right">
                        {getProfileField('interests', 'Not specified')}
                      </span>
                    </div>
                  </div>
                </Card>
                
                {/* Achievements */}
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50" header={<h3 className="text-xl font-semibold text-gray-900">Recent Achievements</h3>}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Profile 85% Complete</p>
                        <p className="text-sm text-gray-600">Great progress!</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Colleges Saved</p>
                        <p className="text-sm text-gray-600">Keep exploring options</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Counsellor Session Booked</p>
                        <p className="text-sm text-gray-600">Taking proactive steps!</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Motivational Section */}
            <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-3">You're Making Great Progress! 🎉</h2>
                <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
                  Every step you take brings you closer to your dream career. Keep updating your profile, 
                  exploring options, and seeking guidance. Your future self will thank you!
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="secondary" 
                    onClick={handleTalkToCounsellor}
                    className="bg-white text-green-600 hover:bg-gray-100"
                  >
                    Get Expert Advice
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleViewRecommendations}
                    className="border-white text-white hover:bg-white hover:text-green-600"
                  >
                    Explore More Options
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileDashboard;