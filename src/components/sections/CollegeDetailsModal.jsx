import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

const CollegeDetailsModal = ({ college, isOpen, onClose }) => {
  if (!college) return null;

  // Original college images from different sources
  const collegeImages = {
    'IIT Bombay': [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
      'https://images.unsplash.com/photo-1592280778193-8b5d58d2c0a4?w=800&q=80',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
    ],
    'VJTI': [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
      'https://images.unsplash.com/photo-1592280778193-8b5d58d2c0a4?w=800&q=80',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
    ]
  };

  // Get college key for image mapping
  const getCollegeKey = (name) => {
    if (name.includes('IIT Bombay')) return 'IIT Bombay';
    if (name.includes('VJTI')) return 'VJTI';
    return 'default';
  };

  const galleryImages = collegeImages[getCollegeKey(college.name)] || [
    college.image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80`,
    `https://images.unsplash.com/photo-1592280778193-8b5d58d2c0a4?w=800&q=80`,
    `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80`,
    `https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80`
  ];

  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    stream: '',
    examType: 'jee', // jee or diploma
    marks: '',
    category: 'general'
  });
  const [admissionAnalysis, setAdmissionAnalysis] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'placements', label: 'Placements' },
    { id: 'merit', label: 'Merit List' },
    { id: 'gallery', label: 'Campus Gallery' },
    { id: 'admission', label: 'Check Admission' }
  ];

  // Analyze admission chances based on student info and college merit list
  const analyzeAdmissionChances = () => {
    if (!studentInfo.marks || !college.meritList) {
      setAdmissionAnalysis('Please enter your marks/percentile to check admission chances.');
      return;
    }

    const marks = parseFloat(studentInfo.marks);
    const category = studentInfo.category.toLowerCase();
    const meritData = college.meritList[category];

    if (!meritData) {
      setAdmissionAnalysis(`No merit list data available for ${category.toUpperCase()} category.`);
      return;
    }

    // Convert JEE marks to approximate rank (simplified logic)
    let estimatedRank;
    if (studentInfo.examType === 'jee') {
      // Assuming JEE Main percentile to rank conversion (simplified)
      if (marks >= 99) estimatedRank = 500;
      else if (marks >= 98) estimatedRank = 1000;
      else if (marks >= 97) estimatedRank = 2000;
      else if (marks >= 96) estimatedRank = 3000;
      else if (marks >= 95) estimatedRank = 4000;
      else if (marks >= 90) estimatedRank = 8000;
      else if (marks >= 85) estimatedRank = 15000;
      else if (marks >= 80) estimatedRank = 25000;
      else if (marks >= 75) estimatedRank = 40000;
      else if (marks >= 70) estimatedRank = 60000;
      else estimatedRank = 100000;
    } else {
      // For diploma, assume marks are percentage
      estimatedRank = Math.floor((100 - marks) * 1000);
    }

    const openingRank = parseInt(meritData.opening.replace(/,/g, ''));
    const closingRank = parseInt(meritData.closing.replace(/,/g, ''));

    let analysis = '';
    if (estimatedRank <= openingRank) {
      analysis = `🎉 Excellent Chances! Your estimated rank (${estimatedRank.toLocaleString()}) is better than the opening rank (${meritData.opening}) for ${category.toUpperCase()} category. You have very high chances of getting admission!`;
    } else if (estimatedRank <= closingRank) {
      analysis = `✅ Good Chances! Your estimated rank (${estimatedRank.toLocaleString()}) falls within the admission range (Opening: ${meritData.opening}, Closing: ${meritData.closing}) for ${category.toUpperCase()} category. You have good chances of getting admission!`;
    } else if (estimatedRank <= closingRank * 1.2) {
      analysis = `⚠️ Moderate Chances! Your estimated rank (${estimatedRank.toLocaleString()}) is slightly above the closing rank (${meritData.closing}) for ${category.toUpperCase()} category. You might have a chance in later rounds of counseling. Consider having backup options.`;
    } else {
      analysis = `❌ Difficult! Your estimated rank (${estimatedRank.toLocaleString()}) is significantly above the closing rank (${meritData.closing}) for ${category.toUpperCase()} category. Admission to this college seems difficult. Consider exploring other good colleges with lower cut-offs.`;
    }

    // Add college highlights
    analysis += `\n\n📍 About ${college.name}:`;
    analysis += `\n   • Established: ${college.established}`;
    analysis += `\n   • Accreditation: ${college.accreditation || 'NAAC'}`;
    analysis += `\n   • Campus Area: ${college.campusArea || 'Not specified'}`;
    
    if (college.batchesPassed && college.batchesPassed.length > 0) {
      const latestBatch = college.batchesPassed[0];
      analysis += `\n   • Highest Package: ${latestBatch.highestPackage}`;
      analysis += `\n   • Average Package: ${latestBatch.avgPackage}`;
      analysis += `\n   • Placement Rate: ${latestBatch.placementRate}`;
    }

    analysis += `\n\n💡 Tip: Keep checking the official counseling rounds as cut-offs may vary!`;

    setAdmissionAnalysis(analysis);
  };

  const resetForm = () => {
    setStudentInfo({
      name: '',
      stream: '',
      examType: 'jee',
      marks: '',
      category: 'general'
    });
    setAdmissionAnalysis(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-5xl">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{college.name}</h2>
          <p className="text-gray-600">{college.district}, {college.state}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Hero Section with Gradient Background */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{college.name}</h3>
                    <p className="text-white/90 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {college.district}, {college.state}
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                    <div className="text-3xl font-bold">⭐ {college.rating}/5</div>
                    <div className="text-sm text-white/90">Rating</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{college.established}</div>
                    <div className="text-sm text-white/90">Established</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{college.type}</div>
                    <div className="text-sm text-white/90">Type</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{college.campusArea}</div>
                    <div className="text-sm text-white/90">Campus</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{college.totalStudents}</div>
                    <div className="text-sm text-white/90">Students</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Accreditation & Recognition */}
              <Card className="p-6 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[200px]">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Accreditation & Recognition</h4>
                    <p className="text-gray-700 mb-2 break-words leading-relaxed">{college.accreditation || 'NAAC A+ Accredited'}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap">UGC Recognized</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap">AICTE Approved</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Faculty & Infrastructure */}
              <Card className="p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[200px]">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Faculty & Infrastructure</h4>
                    <p className="text-gray-700 mb-2 break-words leading-relaxed"><strong className="break-words">{college.facultyCount || '300+'}</strong> Experienced Faculty Members</p>
                    <p className="text-gray-700 leading-relaxed">Student-Faculty Ratio: <strong>15:1</strong></p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Courses Offered */}
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Programs & Departments
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {college.courses.map((course, idx) => (
                  <div key={idx} className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer group min-h-[60px] flex items-center">
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <span className="text-sm font-medium text-gray-700 break-words leading-relaxed">{course}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Campus Facilities */}
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                World-Class Facilities
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {college.facilities?.map((facility, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer min-h-[70px]">
                    <div className="bg-emerald-100 p-2 rounded-full flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700 break-words leading-relaxed">{facility}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Bright Stars (Alumni) with Images */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Distinguished Alumni (Bright Stars)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {college.brightStars?.map((star, idx) => (
                  <Card key={idx} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-yellow-200 min-h-[300px] flex flex-col">
                    <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-32 flex items-center justify-center flex-shrink-0">
                      <div className="text-6xl">🎓</div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="font-bold text-lg text-gray-900 mb-1 break-words leading-relaxed">{star.name}</div>
                      <div className="text-sm text-purple-600 font-semibold mb-2 whitespace-nowrap">Batch of {star.batch}</div>
                      <div className="text-sm text-gray-700 mb-3 flex-1 break-words leading-relaxed">{star.achievement}</div>
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold text-center inline-block w-fit mt-auto">
                        💰 {star.package}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Admission Requirements */}
            {college.admissionRequirements && (
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 min-h-[120px]">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Eligibility Criteria
                </h4>
                <p className="text-gray-700 break-words leading-relaxed">{college.admissionRequirements}</p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'placements' && (
          <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-bold mb-1 break-words">{college.batchesPassed?.[0]?.highestPackage || '₹45 LPA'}</div>
                <div className="text-xs md:text-sm opacity-90 whitespace-nowrap">Highest Package</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-bold mb-1 break-words">{college.batchesPassed?.[0]?.avgPackage || '₹8 LPA'}</div>
                <div className="text-xs md:text-sm opacity-90 whitespace-nowrap">Average Package</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-bold mb-1 break-words">{college.batchesPassed?.[0]?.placementRate || '95%'}</div>
                <div className="text-xs md:text-sm opacity-90 whitespace-nowrap">Placement Rate</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-bold mb-1 break-words">{college.batchesPassed?.[0]?.totalPassed || '650+'}</div>
                <div className="text-xs md:text-sm opacity-90 whitespace-nowrap">Total Students</div>
              </Card>
            </div>

            {/* Year-wise Statistics */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Placement Trends Over The Years
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {college.batchesPassed?.map((batch, idx) => (
                  <Card key={idx} className={`overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${idx === 0 ? 'ring-4 ring-yellow-400' : ''}`}>
                    <div className={`bg-gradient-to-r ${idx === 0 ? 'from-yellow-400 to-orange-500' : idx === 1 ? 'from-blue-400 to-indigo-500' : 'from-purple-400 to-pink-500'} p-4`}>
                      <div className="text-2xl md:text-3xl font-bold text-white">{batch.year}</div>
                      <div className="text-white/90 text-xs md:text-sm">Batch Pass-out Year</div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-xs md:text-sm text-gray-600">Students:</span>
                        <span className="font-bold text-gray-900 text-sm md:text-base">{batch.totalPassed}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-xs md:text-sm text-gray-600">Highest:</span>
                        <span className="font-bold text-green-600 text-sm md:text-base break-words">{batch.highestPackage}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-xs md:text-sm text-gray-600">Average:</span>
                        <span className="font-bold text-blue-600 text-sm md:text-base break-words">{batch.avgPackage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-600">Rate:</span>
                        <span className="font-bold text-purple-600 text-sm md:text-base">{batch.placementRate}</span>
                      </div>
                    </div>
                    {idx === 0 && (
                      <div className="bg-yellow-100 px-4 py-2 text-center">
                        <span className="text-yellow-800 text-xs font-semibold">🏆 Latest Batch</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Top Recruiters Section */}
            <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Top Recruiters</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                {[
                  { 
                    name: 'Google', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
                    color: 'bg-white'
                  },
                  { 
                    name: 'Microsoft', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
                    color: 'bg-white'
                  },
                  { 
                    name: 'Amazon', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
                    color: 'bg-white'
                  },
                  { 
                    name: 'Flipkart', 
                    logo: 'https://upload.wikimedia.org/wikipedia/en/f/fa/Flipkart_logo.svg',
                    color: 'bg-white'
                  },
                  { 
                    name: 'Adobe', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png',
                    color: 'bg-white'
                  },
                  { 
                    name: 'Tesla', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
                    color: 'bg-white'
                  }
                ].map((company, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white p-4 rounded-lg md:rounded-xl flex items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border-2 border-gray-200 hover:border-indigo-400 min-h-[80px] md:min-h-[100px] group`}
                  >
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain max-h-[60px] md:max-h-[70px] group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<span class="text-xs md:text-sm font-bold text-gray-700">${company.name}</span>`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'merit' && (
          <div className="space-y-6">
            {/* Header with Info */}
            <Card className="p-4 md:p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl">
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Previous Years Cut-off Analysis
              </h3>
              <p className="text-white/90 text-xs md:text-sm">Check category-wise opening and closing ranks for admission</p>
            </Card>

            {/* Category-wise Table - Clear Number Display */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-2 border-gray-200 overflow-x-auto">
              <h4 className="text-base md:text-xl font-bold text-gray-900 mb-4 md:mb-6">📊 Merit List 2026 - All Categories</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs md:text-sm">
                      <th className="px-4 py-4 md:px-6 md:py-4 text-left font-bold uppercase tracking-wider rounded-tl-lg">Category</th>
                      <th className="px-4 py-4 md:px-6 md:py-4 text-left font-bold uppercase tracking-wider">Opening Rank</th>
                      <th className="px-4 py-4 md:px-6 md:py-4 text-left font-bold uppercase tracking-wider">Closing Rank</th>
                      <th className="px-4 py-4 md:px-6 md:py-4 text-left font-bold uppercase tracking-wider rounded-tr-lg">Available Seats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm md:text-base">
                    {Object.entries(college.meritList || {}).map(([category, ranks], idx) => {
                      const opening = parseInt(ranks.opening.replace(/,/g, ''));
                      const closing = parseInt(ranks.closing.replace(/,/g, ''));
                      const seats = closing - opening + 1;
                      
                      // Category color coding
                      const categoryColor = category === 'general' ? 'bg-blue-500' :
                                          category === 'obc' ? 'bg-green-500' :
                                          category === 'sc' ? 'bg-orange-500' :
                                          category === 'st' ? 'bg-purple-500' :
                                          category === 'ews' ? 'bg-red-500' : 'bg-gray-500';
                      
                      return (
                        <tr key={idx} className={`hover:bg-gray-50 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="px-4 py-4 md:px-6 md:py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0 ${categoryColor}`}></div>
                              <div>
                                <span className="font-bold text-gray-900 capitalize block">{category.toUpperCase()}</span>
                                <span className="text-xs text-gray-500">
                                  {category === 'general' ? 'Unreserved' : 
                                   category === 'obc' ? 'Other Backward Classes' :
                                   category === 'sc' ? 'Scheduled Caste' :
                                   category === 'st' ? 'Scheduled Tribe' :
                                   category === 'ews' ? 'Economically Weaker Section' : 'Category'}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 md:px-6 md:py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 font-bold text-lg md:text-xl">{ranks.opening}</span>
                              <span className="text-xs text-gray-500">(Open)</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 md:px-6 md:py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-green-600 font-bold text-lg md:text-xl">{ranks.closing}</span>
                              <span className="text-xs text-gray-500">(Close)</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 md:px-6 md:py-4">
                            <div className="flex items-center gap-2">
                              <span className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg text-sm md:text-base font-semibold whitespace-nowrap">
                                🎯 {seats} Seats
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reserved Categories Highlight */}
            <Card className="p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.548 5.549a9 9 0 11-11.097 0 9 9 0 0111.097 0z" />
                </svg>
                Reserved Categories Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(college.meritList || {}).filter(([cat]) => cat !== 'general').map(([category, ranks], idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                        category === 'obc' ? 'bg-green-500' :
                        category === 'sc' ? 'bg-orange-500' :
                        category === 'st' ? 'bg-purple-500' :
                        category === 'ews' ? 'bg-red-500' : 'bg-gray-500'
                      }`}></div>
                      <h5 className="font-bold text-gray-900 capitalize text-sm md:text-base">{category.toUpperCase()}</h5>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Opening Rank:</span>
                        <span className="font-bold text-red-600 text-sm md:text-base">{ranks.opening}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Closing Rank:</span>
                        <span className="font-bold text-green-600 text-sm md:text-base">{ranks.closing}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Total Seats:</span>
                          <span className="font-bold text-indigo-600 text-sm md:text-base">
                            {parseInt(ranks.closing.replace(/,/g, '')) - parseInt(ranks.opening.replace(/,/g, '')) + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Important Notes */}
            <Card className="p-4 md:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500">
              <h4 className="text-sm md:text-base font-bold text-gray-900 mb-2 md:mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reservation Information
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5 flex-shrink-0">•</span>
                  <span><strong>General (UR):</strong> Unreserved category - Open to all candidates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5 flex-shrink-0">•</span>
                  <span><strong>OBC-NCL:</strong> Other Backward Classes - Non-Creamy Layer (27% reservation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5 flex-shrink-0">•</span>
                  <span><strong>SC:</strong> Scheduled Caste (15% reservation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5 flex-shrink-0">•</span>
                  <span><strong>ST:</strong> Scheduled Tribe (7.5% reservation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5 flex-shrink-0">•</span>
                  <span><strong>EWS:</strong> Economically Weaker Section (10% reservation)</span>
                </li>
              </ul>
            </Card>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Header */}
            <Card className="p-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-2xl">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Virtual Campus Tour
              </h3>
              <p className="text-white/90 mt-2">Explore our beautiful {college.campusArea} campus through these images</p>
            </Card>
            
            {/* Main Image with Enhanced Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img
                src={galleryImages[currentImageIndex]}
                alt="Campus view"
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                  📸 View {currentImageIndex + 1} of {galleryImages.length}
                </span>
              </div>
            </div>

            {/* Enhanced Thumbnails Grid */}
            <div className="grid grid-cols-5 gap-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative h-24 rounded-xl overflow-hidden border-4 transition-all duration-300 transform hover:scale-110 ${
                    currentImageIndex === idx 
                      ? 'border-indigo-600 shadow-xl scale-110 ring-4 ring-indigo-300' 
                      : 'border-gray-300 hover:border-indigo-400 hover:shadow-lg'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  {currentImageIndex === idx && (
                    <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                      <div className="bg-white rounded-full p-2">
                        <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Campus Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900">Infrastructure</h4>
                </div>
                <p className="text-gray-700 text-sm">State-of-the-art buildings with modern architecture and eco-friendly design</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900">Academic Blocks</h4>
                </div>
                <p className="text-gray-700 text-sm">Smart classrooms, advanced labs, and comprehensive learning facilities</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900">Student Life</h4>
                </div>
                <p className="text-gray-700 text-sm">Vibrant campus life with clubs, events, and extracurricular activities</p>
              </Card>
            </div>

            {/* Detailed Description */}
            <Card className="p-8 bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Our Campus
              </h4>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {college.name} boasts a sprawling <strong className="text-indigo-600">{college.campusArea}</strong> campus 
                  with state-of-the-art infrastructure, cutting-edge laboratories, and world-class facilities. The green 
                  campus spans across acres of lush landscape, providing an ideal environment for learning and innovation.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{college.facultyCount || '300+'}</div>
                    <div className="text-sm text-gray-600">Expert Faculty</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-green-600 mb-2">{college.totalStudents || '5000+'}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-sm text-gray-600">Labs & Centers</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                    <div className="text-sm text-gray-600">WiFi Campus</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'admission' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Check Admission Eligibility</h3>
            
            {/* Student Information Form */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Enter Your Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    value={studentInfo.name}
                    onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                    placeholder="Enter your name"
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="form-label">Stream/Branch</label>
                  <input
                    type="text"
                    value={studentInfo.stream}
                    onChange={(e) => setStudentInfo({ ...studentInfo, stream: e.target.value })}
                    placeholder="e.g., Computer Science, Mechanical"
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="form-label">Exam Type</label>
                  <select
                    value={studentInfo.examType}
                    onChange={(e) => setStudentInfo({ ...studentInfo, examType: e.target.value })}
                    className="input-field"
                  >
                    <option value="jee">JEE Main/Advanced</option>
                    <option value="diploma">Diploma</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={studentInfo.category}
                    onChange={(e) => setStudentInfo({ ...studentInfo, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="general">General</option>
                    <option value="obc">OBC</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                    <option value="ews">EWS</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="form-label">
                    {studentInfo.examType === 'jee' ? 'JEE Percentile' : 'Diploma Marks (%)'}
                  </label>
                  <input
                    type="number"
                    value={studentInfo.marks}
                    onChange={(e) => setStudentInfo({ ...studentInfo, marks: e.target.value })}
                    placeholder={studentInfo.examType === 'jee' ? "e.g., 97.5" : "e.g., 85"}
                    min="0"
                    max="100"
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  variant="primary"
                  onClick={analyzeAdmissionChances}
                  className="flex-1"
                >
                  Analyze My Chances
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </Card>

            {/* Admission Analysis Result */}
            {admissionAnalysis && (
              <Card className="p-6 bg-white border-l-4 border-indigo-500">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">📊 Admission Analysis Report</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">
                    {admissionAnalysis}
                  </pre>
                </div>
                
                {/* Merit List Summary */}
                {college.meritList && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-gray-800 mb-2">📋 Previous Years Merit List</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Opening Rank</th>
                            <th className="px-4 py-2 text-left">Closing Rank</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(college.meritList).map(([category, ranks], idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium capitalize">{category.toUpperCase()}</td>
                              <td className="px-4 py-2 text-gray-600">{ranks.opening}</td>
                              <td className="px-4 py-2 text-gray-600">{ranks.closing}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* College Highlights */}
                {(college.batchesPassed || college.facilities) && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-gray-800 mb-2">✨ Why Choose This College?</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {college.batchesPassed && college.batchesPassed.length > 0 && (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-600">✓</span>
                            <span><strong>Placements:</strong> {college.batchesPassed[0].highestPackage} (Highest)</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-600">✓</span>
                            <span><strong>Average Package:</strong> {college.batchesPassed[0].avgPackage}</span>
                          </div>
                        </>
                      )}
                      {college.facilities && college.facilities.slice(0, 3).map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <span className="text-green-600">✓</span>
                          <span><strong>Facility:</strong> {facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CollegeDetailsModal;
