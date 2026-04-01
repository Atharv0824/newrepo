import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockColleges } from './Recommendations';

const CollegeComparison = () => {
  const navigate = useNavigate();
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState('All');

  // Get all colleges from Recommendations
  const allColleges = mockColleges.map(college => {
    // Extract placement data from batchesPassed or create default
    const latestBatch = college.batchesPassed?.[0] || {};
    
    return {
      ...college,
      fees: parseInt(college.fees.replace(/[^0-9]/g, '')) * 1000, // Convert to numeric
      ranking: Math.floor(Math.random() * 50) + 1, // Random ranking for demo
      seats: Math.floor(Math.random() * 1000) + 500,
      cutoff: (Math.random() * 20 + 80).toFixed(1), // 80-100%
      campus: `${Math.floor(Math.random() * 500) + 100} acres`,
      faculty: Math.floor(Math.random() * 500) + 200,
      placement: {
        highest: latestBatch.highestPackage ? parseInt(latestBatch.highestPackage.replace(/[^0-9]/g, '')) * 100000 : 1000000,
        average: latestBatch.avgPackage ? parseInt(latestBatch.avgPackage.replace(/[^0-9]/g, '')) * 100000 : 500000,
        rate: latestBatch.placementRate || '85%'
      }
    };
  });

  const toggleCollege = (college) => {
    if (selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges(selectedColleges.filter(c => c.id !== college.id));
    } else {
      if (selectedColleges.length < 3) {
        setSelectedColleges([...selectedColleges, college]);
      } else {
        alert('You can compare maximum 3 colleges at a time');
      }
    }
  };

  // Filter colleges based on search and state
  const filteredColleges = allColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = filterState === 'All' || college.state === filterState;
    return matchesSearch && matchesState;
  });

  // Get unique states for filter
  const states = ['All', ...new Set(allColleges.map(c => c.state))];

  const formatCurrency = (amount) => {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">⚖️ College Comparison Tool</h1>
              <p className="text-xl text-gray-600">Compare up to 3 colleges side-by-side from {allColleges.length}+ colleges</p>
            </div>

            {/* Search and Filter */}
            <Card className="bg-white mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="🔍 Search colleges by name or state..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredColleges.length}</span> out of <span className="font-semibold">{allColleges.length}</span> colleges
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => { setSearchQuery(''); setFilterState('All'); }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>

            {/* Selected Colleges */}
            <Card className="bg-white mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Selected Colleges ({selectedColleges.length}/3)</h2>
              {selectedColleges.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Select colleges from the list below to compare</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedColleges.map(college => (
                    <div key={college.id} className="bg-indigo-50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{college.name}</h3>
                        <p className="text-sm text-gray-600">{college.location}</p>
                      </div>
                      <button
                        onClick={() => toggleCollege(college)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {selectedColleges.length >= 2 && (
                <div className="mt-4 text-center">
                  <Button variant="primary" onClick={() => {}} disabled={selectedColleges.length < 2}>
                    Compare Now ({selectedColleges.length})
                  </Button>
                </div>
              )}
            </Card>

            {/* Comparison Table */}
            {selectedColleges.length > 0 && (
              <Card className="bg-white mb-8 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Parameter</th>
                      {selectedColleges.map(college => (
                        <th key={college.id} className="px-6 py-4 text-center text-sm font-semibold text-indigo-600">
                          {college.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Location</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {college.location}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Type</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {college.type}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Ranking</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          #{college.ranking} (NIRF)
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Fees</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                          {formatCurrency(college.fees)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Highest Package</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                          {formatCurrency(college.placement.highest)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Average Package</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                          {formatCurrency(college.placement.average)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Placement Rate</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {college.placement.rate}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Available Courses</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {college.courses.join(', ')}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Total Seats</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {college.seats}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Cutoff (%)</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm font-semibold text-orange-600">
                          {college.cutoff}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Campus Size</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {college.campus}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Faculty Count</td>
                      {selectedColleges.map(college => (
                        <td key={college.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {college.faculty}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </Card>
            )}

            {/* College Selection */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Colleges to Compare</h2>
            {filteredColleges.length === 0 ? (
              <Card className="bg-white text-center p-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Colleges Found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[600px] overflow-y-auto p-4">
                {filteredColleges.map(college => (
                  <Card
                    key={college.id}
                    className={`bg-white cursor-pointer transition-all ${
                      selectedColleges.find(c => c.id === college.id)
                        ? 'ring-2 ring-indigo-600 shadow-lg scale-105'
                        : 'hover:shadow-md hover:scale-105'
                    }`}
                    onClick={() => toggleCollege(college)}
                  >
                    <div className="text-center p-4">
                      <div className="text-3xl mb-3">🏫</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{college.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{college.district}, {college.state}</p>
                      <div className="flex justify-center items-center space-x-3 text-xs text-gray-600">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded">#{college.ranking} Rank</span>
                        <span>•</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">{college.type}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-xs text-gray-500">Avg Package</div>
                        <div className="font-semibold text-green-600">₹{(college.fees / 100000).toFixed(2)} Lakhs</div>
                      </div>
                      {selectedColleges.find(c => c.id === college.id) && (
                        <div className="mt-3 text-sm text-indigo-600 font-semibold flex items-center justify-center">
                          ✓ Selected ({selectedColleges.findIndex(c => c.id === college.id) + 1}/3)
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Tips */}
            <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 mt-8 border-2 border-yellow-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Comparison Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Consider placement records carefully - both average and highest packages</li>
                <li>• Check if the college offers your preferred course</li>
                <li>• Factor in total cost including hostel and other fees</li>
                <li>• Look at campus size and infrastructure</li>
                <li>• Consider location and climate preferences</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollegeComparison;
