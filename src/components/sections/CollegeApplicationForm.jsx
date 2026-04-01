import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CollegeApplicationForm = ({ college, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: 'Male',
    category: 'General',
    pwd: 'No',
    domicile: '',
    qualification: '12th Class',
    board: '',
    yearOfPassing: '2026',
    percentage: '',
    entranceExam: '',
    entranceScore: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    courseApplied: '',
    stream: ''
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create dummy email content
    const emailContent = `
      COLLEGE APPLICATION SUBMISSION
      
      Dear ${formData.name},
      
      Your application for ${college.name} has been submitted successfully!
      
      Application Details:
      -------------------
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Course Applied: ${formData.courseApplied || college.courses[0]}
      College: ${college.name}
      
      Academic Details:
      ----------------
      Qualification: ${formData.qualification}
      Board: ${formData.board}
      Year of Passing: ${formData.yearOfPassing}
      Percentage: ${formData.percentage}%
      Entrance Exam: ${formData.entranceExam}
      Entrance Score: ${formData.entranceScore}
      
      Personal Details:
      ----------------
      Father's Name: ${formData.fatherName}
      Mother's Name: ${formData.motherName}
      Date of Birth: ${formData.dob}
      Gender: ${formData.gender}
      Category: ${formData.category}
      Domicile State: ${formData.domicile}
      
      Contact Address:
      ---------------
      ${formData.address}
      ${formData.city}, ${formData.state} - ${formData.pincode}
      
      Application ID: APP${Date.now()}
      Submission Date: ${new Date().toLocaleDateString()}
      
      Next Steps:
      ----------
      1. You will receive a confirmation email shortly
      2. Keep your application ID safe for future reference
      3. Check the college website for merit list announcements
      4. Prepare documents for verification process
      
      For any queries, contact: admissions@${college.name.replace(/\s+/g, '').toLowerCase()}.ac.in
      
      Best Regards,
      Admission Office
      ${college.name}
    `;

    console.log('DUMMY EMAIL SENT:', emailContent);
    alert(`✅ Application Submitted Successfully!\n\nA confirmation email has been sent to ${formData.email}\n\nApplication ID: APP${Date.now()}`);
    
    onSubmit({
      ...formData,
      collegeName: college.name,
      applicationId: `APP${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    });
    
    setIsSubmitting(false);
    setStep(1);
    onClose();
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Form - {college.name}
          </h2>
          <p className="text-gray-600">Course: {formData.courseApplied || college.courses[0]}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map(num => (
              <div
                key={num}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                  step >= num ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Personal Details</span>
            <span>Academic Details</span>
            <span>Contact & Submit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Father's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mother's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domicile State *
                  </label>
                  <input
                    type="text"
                    name="domicile"
                    value={formData.domicile}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="State of domicile"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={nextStep} variant="primary">
                  Next: Academic Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Academic Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Applied For *
                  </label>
                  <select
                    name="courseApplied"
                    value={formData.courseApplied}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a course</option>
                    {college.courses.map((course, idx) => (
                      <option key={idx} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification *
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="12th Class">12th Class</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Board/University *
                  </label>
                  <input
                    type="text"
                    name="board"
                    value={formData.board}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., CBSE, State Board"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Passing *
                  </label>
                  <input
                    type="text"
                    name="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage/CGPA *
                  </label>
                  <input
                    type="text"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 85% or 8.5 CGPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entrance Exam
                  </label>
                  <input
                    type="text"
                    name="entranceExam"
                    value={formData.entranceExam}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., JEE Main, NEET"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entrance Score/Rank
                  </label>
                  <input
                    type="text"
                    name="entranceScore"
                    value={formData.entranceScore}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 98 percentile or Rank 1250"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" onClick={prevStep} variant="secondary">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} variant="primary">
                  Next: Contact Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact & Submit */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your complete postal address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="City name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="State name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{6}"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>

              {/* Declaration */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Declaration:</strong> I hereby declare that all the information provided above is true and correct to the best of my knowledge. 
                  I understand that any false information may lead to cancellation of my application.
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" onClick={prevStep} variant="secondary">
                  Back
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default CollegeApplicationForm;
