import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllCounsellors } from '../services/firebaseService';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const CounsellorList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadCounsellors();
  }, []);

  const loadCounsellors = async () => {
    try {
      setLoading(true);
      let data;
      
      try {
        // Try to load from Firebase
        data = await getAllCounsellors();
        console.log('✅ Loaded counsellors from Firebase:', data.length);
      } catch (firebaseError) {
        console.warn('Firebase not available, using demo data');
        // Fallback to demo data
        data = getDemoCounsellors();
      }
      
      setCounsellors(data);
    } catch (error) {
      console.error('Error loading counsellors:', error);
      alert('Failed to load counsellors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo counsellors data (fallback)
  const getDemoCounsellors = () => [
    {
      id: 'demo-1',
      name: "Dr. Priya Sharma",
      expertise: ["JEE", "Career", "Engineering"],
      experience: 12,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      priceGroup: 99,
      priceIndividual: 199
    },
    {
      id: 'demo-2',
      name: "Prof. Rajesh Kumar",
      expertise: ["NEET", "Medical", "Career"],
      experience: 15,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      priceGroup: 99,
      priceIndividual: 199
    },
    {
      id: 'demo-3',
      name: "Dr. Anjali Mehta",
      expertise: ["JEE", "Engineering", "Career"],
      experience: 10,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      priceGroup: 99,
      priceIndividual: 199
    },
    {
      id: 'demo-4',
      name: "Mr. Vikram Singh",
      expertise: ["Career", "Medical", "Engineering"],
      experience: 8,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      priceGroup: 99,
      priceIndividual: 199
    },
    {
      id: 'demo-5',
      name: "Dr. Sunita Reddy",
      expertise: ["NEET", "Medical"],
      experience: 18,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      priceGroup: 99,
      priceIndividual: 199
    },
    {
      id: 'demo-6',
      name: "Prof. Amit Patel",
      expertise: ["JEE", "Engineering"],
      experience: 14,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      priceGroup: 99,
      priceIndividual: 199
    }
  ];

  const handleBookSession = (counsellor, sessionType) => {
    if (!user) {
      alert('Please login to book a session');
      navigate('/login');
      return;
    }

    // Store booking details in localStorage
    const bookingDetails = {
      counsellorId: counsellor.id,
      counsellorName: counsellor.name,
      counsellorImage: counsellor.image,
      expertise: counsellor.expertise,
      experience: counsellor.experience,
      rating: counsellor.rating,
      sessionType,
      price: sessionType === 'group' ? counsellor.priceGroup : counsellor.priceIndividual,
      userId: user.id,
      userEmail: user.email,
      userName: user.fullName || user.name
    };

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    navigate('/payment');
  };

  const filteredCounsellors = filter === 'all' 
    ? counsellors 
    : counsellors.filter(c => c.expertise.includes(filter));

  const expertiseOptions = ['all', 'JEE', 'NEET', 'Career', 'Medical', 'Engineering'];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                👨‍🏫 Expert Counsellors
              </h1>
              <p className="text-xl text-gray-600">
                Book personalized sessions with experienced counsellors
              </p>
            </div>

            {/* Filter Options */}
            <div className="mb-6 flex flex-wrap gap-3">
              {expertiseOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    filter === option
                      ? 'bg-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
                  }`}
                >
                  {option === 'all' ? 'All Counsellors' : option}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading counsellors...</p>
              </div>
            )}

            {/* Counsellors Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCounsellors.map((counsellor) => (
                  <Card 
                    key={counsellor.id} 
                    className="bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Profile Image */}
                    <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
                      <img
                        src={counsellor.image}
                        alt={counsellor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(counsellor.name) + '&background=6366f1&color=fff&size=200';
                        }}
                      />
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-bold text-gray-900">{counsellor.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {counsellor.name}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-indigo-600">🎯</span>
                          <span className="text-sm font-medium">{counsellor.expertise.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-indigo-600">💼</span>
                          <span className="text-sm font-medium">{counsellor.experience} years exp.</span>
                        </div>
                      </div>

                      {/* Session Options */}
                      <div className="space-y-3">
                        {/* Group Session */}
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-indigo-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-indigo-900">Group Session</span>
                            <span className="text-lg font-bold text-indigo-600">₹{counsellor.priceGroup}</span>
                          </div>
                          <Button
                            variant="primary"
                            className="w-full py-2 text-sm"
                            onClick={() => handleBookSession(counsellor, 'group')}
                          >
                            Book Group Session
                          </Button>
                        </div>

                        {/* Individual Session */}
                        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-purple-900">Individual Session</span>
                            <span className="text-lg font-bold text-purple-600">₹{counsellor.priceIndividual}</span>
                          </div>
                          <Button
                            variant="secondary"
                            className="w-full py-2 text-sm"
                            onClick={() => handleBookSession(counsellor, 'individual')}
                          >
                            Book Individual Session
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredCounsellors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Counsellors Found</h3>
                <p className="text-gray-600">Try selecting a different filter</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CounsellorList;
