import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import AICounsellingChatbot from '../components/sections/AICounsellingChatbot';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { profileData, saveProfileData } = useProfile();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    academicStream: '',
    marksPercentage: '',
    schoolName: '',
    passingYear: '',
    interests: '',
    careerGoals: '',
    preferredSubjects: [],
    preferredRegion: '',
    willingToRelocate: false,
    budgetRange: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const academicStreams = [
    'Science (PCM)',
    'Science (PCB)',
    'Science (PCMB)',
    'Commerce',
    'Arts/Humanities',
    'Diploma',
    'Other'
  ];

  const regions = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Other'
  ];

  const budgetRanges = [
    'Below ₹1 Lakh',
    '₹1-2 Lakhs',
    '₹2-5 Lakhs',
    '₹5-10 Lakhs',
    'Above ₹10 Lakhs'
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 
    'History', 'Economics', 'Computer Science', 'Business Studies'
  ];

  useEffect(() => {
    // Load existing profile data from context
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (category, value) => {
    setFormData(prev => {
      const currentArray = prev[category] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [category]: newArray
      };
    });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.academicStream) {
      setError('Academic stream is required');
      return false;
    }
    if (!formData.marksPercentage) {
      setError('Marks/percentage is required');
      return false;
    }
    if (!formData.preferredRegion) {
      setError('Preferred region is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Save profile data using the context
      const success = saveProfileData(formData);
      
      if (success) {
        // Show success message
        alert('✅ Profile updated successfully!');
        navigate('/profile/view');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndStay = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const success = saveProfileData(formData);
      
      if (success) {
        alert('✅ Changes saved! You can continue editing.');
        // Stay on page, don't navigate away
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile/view');
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
              <p className="text-gray-600 mt-2">Update your personal and academic information</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <Card>
              <div className="p-6">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Full Name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                        <Input
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          required
                        />
                        <Input
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                        />
                        <Input
                          label="Date of Birth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label">Academic Stream *</label>
                          <select
                            name="academicStream"
                            value={formData.academicStream}
                            onChange={handleInputChange}
                            className="input-field"
                            required
                          >
                            <option value="">Select your stream</option>
                            {academicStreams.map(stream => (
                              <option key={stream} value={stream}>{stream}</option>
                            ))}
                          </select>
                        </div>
                        <Input
                          label="Marks/Percentage *"
                          name="marksPercentage"
                          value={formData.marksPercentage}
                          onChange={handleInputChange}
                          placeholder="e.g., 85%"
                          required
                        />
                        <Input
                          label="School/College Name"
                          name="schoolName"
                          value={formData.schoolName}
                          onChange={handleInputChange}
                          placeholder="Enter institution name"
                        />
                        <Input
                          label="Passing Year"
                          name="passingYear"
                          value={formData.passingYear}
                          onChange={handleInputChange}
                          placeholder="e.g., 2024"
                        />
                      </div>
                    </div>

                    {/* Career Information */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Career Information</h2>
                      <div className="space-y-6">
                        <Input
                          label="Career Interests"
                          name="interests"
                          value={formData.interests}
                          onChange={handleInputChange}
                          placeholder="e.g., Engineering, Medicine, Business"
                        />
                        <div>
                          <label className="form-label">Career Goals</label>
                          <textarea
                            name="careerGoals"
                            value={formData.careerGoals}
                            onChange={handleInputChange}
                            placeholder="Describe your long-term career aspirations"
                            className="input-field"
                            rows="4"
                          />
                        </div>
                        <div>
                          <label className="form-label">Preferred Subjects</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {subjects.map(subject => (
                              <button
                                key={subject}
                                type="button"
                                onClick={() => handleMultiSelect('preferredSubjects', subject)}
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                  formData.preferredSubjects.includes(subject)
                                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {subject}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label">Preferred Region *</label>
                          <select
                            name="preferredRegion"
                            value={formData.preferredRegion}
                            onChange={handleInputChange}
                            className="input-field"
                            required
                          >
                            <option value="">Select preferred region</option>
                            {regions.map(region => (
                              <option key={region} value={region}>{region}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center pt-6">
                          <input
                            type="checkbox"
                            name="willingToRelocate"
                            checked={formData.willingToRelocate}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-gray-700">
                            I'm willing to relocate to other cities
                          </label>
                        </div>
                        <div className="md:col-span-2">
                          <label className="form-label">Budget Range</label>
                          <select
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={handleInputChange}
                            className="input-field"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map(range => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-6"
                    >
                      ❌ Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleSaveAndStay}
                      disabled={loading}
                      className="px-6"
                    >
                      {loading ? 'Saving...' : '💾 Save & Stay'}
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-6"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Saving...
                        </span>
                      ) : (
                        '✅ Save & Exit'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileEdit;