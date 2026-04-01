import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const StudentInfoForm = () => {
  const navigate = useNavigate();
  const { saveProfileData } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Academic Information
    academicStream: '',
    marksPercentage: '',
    schoolName: '',
    passingYear: '',
    
    // Career Interests
    interests: '',
    careerGoals: '',
    preferredSubjects: [],
    
    // Location Preferences
    preferredRegion: '',
    willingToRelocate: false,
    
    // Budget
    budgetRange: ''
  });
  
  const steps = [
    { id: 1, name: 'Personal Info', description: 'Basic information' },
    { id: 2, name: 'Academic Details', description: 'Educational background' },
    { id: 3, name: 'Career Interests', description: 'Your aspirations' },
    { id: 4, name: 'Preferences', description: 'Location and budget' }
  ];
  
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
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Save profile data using the context
      const success = saveProfileData(formData);
      
      if (success) {
        alert('Profile created successfully!');
        navigate('/profile/view');
      } else {
        alert('Failed to save profile. Please try again.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Academic Stream</label>
                <select
                  name="academicStream"
                  value={formData.academicStream}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select your stream</option>
                  {academicStreams.map(stream => (
                    <option key={stream} value={stream}>{stream}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Marks/Percentage"
                name="marksPercentage"
                value={formData.marksPercentage}
                onChange={handleInputChange}
                placeholder="e.g., 85%"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <Input
              label="Career Interests"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              placeholder="e.g., Engineering, Medicine, Business"
            />
            <Input
              label="Career Goals"
              name="careerGoals"
              value={formData.careerGoals}
              onChange={handleInputChange}
              placeholder="Describe your long-term career aspirations"
              type="textarea"
            />
            <div>
              <label className="form-label">Preferred Subjects (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Economics', 'Computer Science', 'Business Studies'].map(subject => (
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
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Preferred Region</label>
              <select
                name="preferredRegion"
                value={formData.preferredRegion}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select preferred region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
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
            
            <div>
              <label className="form-label">Budget Range (Optional)</label>
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
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
              
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className={`flex items-center ${
                      step.id <= currentStep ? 'text-primary-600' : 'text-gray-400'
                    }`}>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step.id < currentStep 
                          ? 'bg-primary-600 text-white' 
                          : step.id === currentStep
                          ? 'bg-primary-100 border-2 border-primary-600 text-primary-600'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.id < currentStep ? '✓' : step.id}
                      </div>
                      <div className="ml-2 hidden sm:block">
                        <p className="text-sm font-medium">{step.name}</p>
                        <p className="text-xs">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        step.id < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {/* Form card */}
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {steps[currentStep - 1].name}
                </h2>
                <p className="text-gray-600">
                  {steps[currentStep - 1].description}
                </p>
              </div>
              
              {renderStepContent()}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button
                    onClick={nextStep}
                    disabled={!formData[Object.keys(formData)[currentStep * 4 - 4]]} // Basic validation
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                  >
                    Complete Profile
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentInfoForm;