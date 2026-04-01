import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import CollegeCard from '../components/sections/CollegeCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Recommendations = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    minRating: 0,
    maxFees: '',
    course: ''
  });
  const [sortBy, setSortBy] = useState('rating');
  
  // Mock college data - simple version
  const mockColleges = [
    {
      id: 1,
      name: 'IIT Bombay',
      location: 'Mumbai, Maharashtra',
      courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
      fees: '₹2.5 Lakhs/year',
      rating: 4.8,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards'
    },
    {
      id: 2,
      name: 'MIT Pune',
      location: 'Pune, Maharashtra',
      courses: ['Computer Engineering', 'Electronics', 'Mechanical'],
      fees: '₹1.8 Lakhs/year',
      rating: 4.5,
      admissionRequirements: 'MHT-CET, 65% in 12th boards'
    },
    {
      id: 3,
      name: 'Delhi University',
      location: 'Delhi',
      courses: ['Arts', 'Science', 'Commerce', 'Law'],
      fees: '₹50,000/year',
      rating: 4.3,
      admissionRequirements: 'CUET, 60% in 12th boards'
    },
    {
      id: 4,
      name: 'IIM Ahmedabad',
      location: 'Ahmedabad, Gujarat',
      courses: ['MBA', 'Executive MBA'],
      fees: '₹15 Lakhs/total',
      rating: 4.9,
      admissionRequirements: 'CAT, GD-PI'
    },
    {
      id: 5,
      name: 'VIT Vellore',
      location: 'Vellore, Tamil Nadu',
      courses: ['Computer Science', 'Biotechnology', 'Electronics'],
      fees: '₹7.5 Lakhs/year',
      rating: 4.2,
      admissionRequirements: 'VITEEE, 60% in 12th boards'
    },
    {
      id: 6,
      name: 'NIT Trichy',
      location: 'Trichy, Tamil Nadu',
      courses: ['Engineering', 'Technology', 'Architecture'],
      fees: '₹1.2 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'JEE Main, 75% in 12th boards'
    }
  ];
  
  useEffect(() => {
    setColleges(mockColleges);
    setFilteredColleges(mockColleges);
  }, []);
  
  useEffect(() => {
    let result = [...colleges];
    
    // Apply filters
    if (filters.location) {
      result = result.filter(college => 
        college.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.minRating > 0) {
      result = result.filter(college => college.rating >= filters.minRating);
    }
    
    if (filters.maxFees) {
      const maxFeeValue = parseInt(filters.maxFees.replace(/[^\d]/g, ''));
      result = result.filter(college => {
        const collegeFee = parseInt(college.fees.replace(/[^\d]/g, ''));
        return collegeFee <= maxFeeValue;
      });
    }
    
    if (filters.course) {
      result = result.filter(college => 
        college.courses.some(course => 
          course.toLowerCase().includes(filters.course.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'fees-low':
          return parseInt(a.fees.replace(/[^\d]/g, '')) - parseInt(b.fees.replace(/[^\d]/g, ''));
        case 'fees-high':
          return parseInt(b.fees.replace(/[^\d]/g, '')) - parseInt(a.fees.replace(/[^\d]/g, ''));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    
    setFilteredColleges(result);
  }, [filters, sortBy, colleges]);
  
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      location: '',
      minRating: 0,
      maxFees: '',
      course: ''
    });
    setSortBy('rating');
  };
  
  const handleSaveCollege = (collegeId, isSaved) => {
    console.log(`College ${collegeId} ${isSaved ? 'saved' : 'unsaved'}`);
  };
  
  const handleViewDetails = (college) => {
    alert(`Viewing details for ${college.name}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">College Recommendations</h1>
              <p className="text-gray-600">
                Based on your academic profile and preferences
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters sidebar */}
              <div className="lg:col-span-1">
                <Card header={<h3 className="text-lg font-semibold text-gray-900">Filters</h3>}>
                  <div className="space-y-6">
                    {/* Location filter */}
                    <div>
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        placeholder="Enter city or state"
                        className="input-field"
                      />
                    </div>
                    
                    {/* Rating filter */}
                    <div>
                      <label className="form-label">Minimum Rating</label>
                      <select
                        value={filters.minRating}
                        onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                        className="input-field"
                      >
                        <option value={0}>Any rating</option>
                        <option value={3}>3+ stars</option>
                        <option value={4}>4+ stars</option>
                        <option value={4.5}>4.5+ stars</option>
                      </select>
                    </div>
                    
                    {/* Fees filter */}
                    <div>
                      <label className="form-label">Maximum Fees</label>
                      <select
                        value={filters.maxFees}
                        onChange={(e) => handleFilterChange('maxFees', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Any amount</option>
                        <option value="₹1 Lakh">₹1 Lakh/year</option>
                        <option value="₹2 Lakhs">₹2 Lakhs/year</option>
                        <option value="₹5 Lakhs">₹5 Lakhs/year</option>
                        <option value="₹10 Lakhs">₹10 Lakhs/year</option>
                      </select>
                    </div>
                    
                    {/* Course filter */}
                    <div>
                      <label className="form-label">Course Interest</label>
                      <input
                        type="text"
                        value={filters.course}
                        onChange={(e) => handleFilterChange('course', e.target.value)}
                        placeholder="e.g., Computer Science"
                        className="input-field"
                      />
                    </div>
                    
                    {/* Sort options */}
                    <div>
                      <label className="form-label">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input-field"
                      >
                        <option value="rating">Highest Rating</option>
                        <option value="fees-low">Lowest Fees</option>
                        <option value="fees-high">Highest Fees</option>
                        <option value="name">Name (A-Z)</option>
                      </select>
                    </div>
                    
                    {/* Clear filters button */}
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </Card>
              </div>
              
              {/* College listings */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredColleges.length} of {colleges.length} colleges
                  </p>
                </div>
                
                {filteredColleges.length === 0 ? (
                  <Card className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M12 3c2.755 0 5.255.945 7.08 2.512A8.001 8.001 0 0112 20c-2.755 0-5.255-.945-7.08-2.512A7.96 7.96 0 013 12c0-2.21.895-4.21 2.512-5.708C7.08 4.945 9.58 4 12 4z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters</p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredColleges.map(college => (
                      <CollegeCard
                        key={college.id}
                        college={college}
                        onSave={handleSaveCollege}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Recommendations;
