import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useProfile } from '../context/ProfileContext';
import AICounsellingChatbot from '../components/sections/AICounsellingChatbot';

const ProfileView = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  const { profileData: contextProfileData, profileCompletion } = useProfile();

  useEffect(() => {
    fetchProfileData();
  }, [contextProfileData]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // Use context data first, fallback to localStorage
      if (contextProfileData) {
        setProfileData({
          ...contextProfileData,
          profileCompletion: profileCompletion || contextProfileData.profileCompletion || 0,
          lastUpdated: new Date().toISOString().split('T')[0]
        });
      } else {
        // In real app, this would be an API call
        // const response = await fetch('/api/student');
        // const data = await response.json();
        
        // For now, using localStorage data
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          const parsedData = JSON.parse(savedProfile);
          setProfileData({
            ...parsedData,
            profileCompletion: profileCompletion || parsedData.profileCompletion || 0,
            lastUpdated: new Date().toISOString().split('T')[0]
          });
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSummaryView = () => {
    setShowSummary(!showSummary);
  };

  // Calculate summary statistics
  const getProfileStats = () => {
    if (!profileData) return null;
    
    return {
      totalFields: 14,
      completedFields: Object.values(profileData).filter(value => 
        value !== null && value !== undefined && value !== '' && !['lastUpdated', 'profileCompletion'].includes(Object.keys(profileData).find(key => profileData[key] === value))
      ).length,
      completionPercentage: profileData.profileCompletion || 0,
      academicStrength: profileData.marksPercentage >= 90 ? 'Excellent' : 
                       profileData.marksPercentage >= 80 ? 'Good' : 
                       profileData.marksPercentage >= 70 ? 'Average' : 'Needs Improvement',
      careerAlignment: profileData.interests?.some(interest => 
        profileData.careerGoals?.some(goal => 
          interest.toLowerCase().includes(goal.toLowerCase()) || 
          goal.toLowerCase().includes(interest.toLowerCase())
        )
      ) ? 'High' : 'Moderate'
    };
  };
  
  const stats = getProfileStats();

  const handleEditProfile = () => {
    navigate('/profile-edit');
  };

  const handleGoToDashboard = () => {
    navigate('/profile-dashboard');
  };

  // Enhanced summary view component
  const renderSummaryView = () => {
    if (!stats) return null;
    
    return (
      <div className="space-y-6">
        {/* Profile Completion Overview */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📊 Profile Summary</h2>
              <button 
                onClick={toggleSummaryView}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Switch to Detailed View
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">{stats.completedFields}/{stats.totalFields}</div>
                <div className="text-blue-600 font-medium">Fields Completed</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">{stats.completionPercentage}%</div>
                <div className="text-green-600 font-medium">Profile Complete</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-purple-700 mb-2">{stats.academicStrength}</div>
                <div className="text-purple-600 font-medium">Academic Strength</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-orange-700 mb-2">{stats.careerAlignment}</div>
                <div className="text-orange-600 font-medium">Career Alignment</div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Quick Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Academic Profile</h4>
                    <p className="text-gray-600 text-sm">{profileData.academicStream} stream with {profileData.marksPercentage}% marks</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Career Interests</h4>
                    <p className="text-gray-600 text-sm">{profileData.interests?.slice(0, 2).join(', ') || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Goals</h4>
                    <p className="text-gray-600 text-sm">{profileData.careerGoals?.join(', ') || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Preferences</h4>
                    <p className="text-gray-600 text-sm">{profileData.preferredRegion} • {profileData.budgetRange || 'Budget not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">🚀 Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                <div className="text-2xl mb-3">🔍</div>
                <h4 className="font-semibold text-gray-900 mb-2">Explore Colleges</h4>
                <p className="text-gray-600 text-sm mb-4">Find institutions matching your profile and preferences</p>
                <Button variant="outline" size="sm" onClick={() => navigate('/colleges')}>
                  Browse Colleges
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                <div className="text-2xl mb-3">💬</div>
                <h4 className="font-semibold text-gray-900 mb-2">Talk to Counsellor</h4>
                <p className="text-gray-600 text-sm mb-4">Get personalized guidance from our expert counsellors</p>
                <Button variant="outline" size="sm" onClick={() => navigate('/counsellor-profile')}>
                  Find Counsellors
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-colors">
                <div className="text-2xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">Take Aptitude Test</h4>
                <p className="text-gray-600 text-sm mb-4">Discover your strengths and suitable career paths</p>
                <Button variant="outline" size="sm" onClick={() => navigate('/aptitude-test')}>
                  Start Test
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Loading profile...</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">No Profile Found</h2>
                  <p className="text-gray-600 mb-6">You haven't created a profile yet.</p>
                  <Button onClick={() => navigate('/profile')}>
                    Create Profile
                  </Button>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AICounsellingChatbot />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                  <p className="text-gray-600 mt-2">View and manage your profile information</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={handleGoToDashboard}>
                    Dashboard
                  </Button>
                  <Button onClick={handleEditProfile}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Toggle between views */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => setShowSummary(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      showSummary 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📊 Summary View
                  </button>
                  <button
                    onClick={() => setShowSummary(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      !showSummary 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📋 Detailed View
                  </button>
                </div>
              </div>

              {/* Summary View */}
              {showSummary && renderSummaryView()}
              
              {/* Detailed View */}
              {!showSummary && (
                <>
                  {/* Personal Information */}
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.fullName || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.email || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.phone || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.dateOfBirth || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Academic Information */}
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Academic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Academic Stream</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.academicStream || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Marks/Percentage</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.marksPercentage || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">School/College</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.schoolName || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Passing Year</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.passingYear || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Career Information */}
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Career Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Career Interests</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.interests || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Career Goals</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.careerGoals || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Preferred Subjects</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.preferredSubjects && profileData.preferredSubjects.length > 0 ? (
                          profileData.preferredSubjects.map((subject, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {subject}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500">Not specified</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Preferences */}
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Preferred Region</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.preferredRegion || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Willing to Relocate</label>
                      <p className="text-lg font-medium text-gray-900">
                        {profileData.willingToRelocate ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Budget Range</label>
                      <p className="text-lg font-medium text-gray-900">{profileData.budgetRange || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </Card>

                </>
              )}
              
              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button variant="outline" onClick={handleGoToDashboard} className="px-8 py-3">
                  Go to Dashboard
                </Button>
                <Button onClick={handleEditProfile} className="px-8 py-3">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileView;