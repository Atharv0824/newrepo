import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useData } from '../../context/DataContext';

const CollegeCard = ({ college, onSave, onViewDetails }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { savedColleges } = useData();
  
  // Check if this college is in savedColleges whenever savedColleges changes
  useEffect(() => {
    const isAlreadySaved = savedColleges.some(item => item.collegeId === college.id || item.id === college.id);
    setIsSaved(isAlreadySaved);
  }, [savedColleges, college.id]);
  
  const handleSave = () => {
    const newSaveState = !isSaved;
    setIsSaved(newSaveState);
    if (onSave) onSave(college.id, newSaveState);
  };
  
  return (
    <Card hover={true} className="h-full">
      {/* College header with logo */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {college.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{college.name}</h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {college.district}, {college.state}
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className={`p-2 rounded-full transition-colors ${
            isSaved 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      {/* College details */}
      <div className="space-y-3 mb-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Available Courses</h4>
          <div className="flex flex-wrap gap-2">
            {college.courses.slice(0, 3).map((course, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
              >
                {course}
              </span>
            ))}
            {college.courses.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{college.courses.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Fees:</span>
            <p className="font-medium text-gray-900">{college.fees}</p>
          </div>
          <div>
            <span className="text-gray-600">Rating:</span>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < college.rating ? 'fill-current' : 'fill-none stroke-current'}`} 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({college.rating}/5)</span>
            </div>
          </div>
        </div>
        
        {college.admissionRequirements && (
          <div>
            <span className="text-gray-600 text-sm">Admission Requirements:</span>
            <p className="text-sm text-gray-700 mt-1">{college.admissionRequirements}</p>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => onViewDetails && onViewDetails(college)}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => handleSave}
        >
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </div>
    </Card>
  );
};

export default CollegeCard;