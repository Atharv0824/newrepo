import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfessionDeadlines = () => {
  const [selectedProfession, setSelectedProfession] = useState('');
  const [professionDeadlines, setProfessionDeadlines] = useState([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Comprehensive profession-based deadlines for 2026-2027
  const professionData = {
    'Software Engineer': [
      {
        id: 1,
        title: 'GATE CSE 2027 Registration',
        type: 'registration',
        deadline: '2026-10-05T23:59:59',
        description: 'Graduate Aptitude Test in Engineering for Computer Science',
        fees: '₹1500 (General), ₹750 (SC/ST/PwD)',
        website: 'gate.iitb.ac.in',
        priority: 'high',
        important: true
      },
      {
        id: 2,
        title: 'TCS CodeVita 2026 Registration',
        type: 'application',
        deadline: '2026-07-15T23:59:59',
        description: 'TCS coding competition for campus placements',
        fees: 'Free',
        website: 'codevita.tcsapps.com',
        priority: 'medium',
        important: false
      },
      {
        id: 3,
        title: 'Microsoft Imagine Cup 2026',
        type: 'application',
        deadline: '2026-04-30T23:59:59',
        description: 'Microsoft global student technology competition',
        fees: 'Free',
        website: 'imaginecup.microsoft.com',
        priority: 'medium',
        important: false
      },
      {
        id: 4,
        title: 'Google Summer of Code 2026',
        type: 'application',
        deadline: '2026-04-02T23:59:59',
        description: 'Google open source development program',
        fees: 'Free',
        website: 'summerofcode.withgoogle.com',
        priority: 'high',
        important: true
      }
    ],
    'Data Scientist': [
      {
        id: 5,
        title: 'Kaggle Competitions 2026',
        type: 'ongoing',
        deadline: '2027-12-31T23:59:59',
        description: 'Regular data science competitions and hackathons',
        fees: 'Free',
        website: 'kaggle.com',
        priority: 'high',
        important: true
      },
      {
        id: 6,
        title: 'Data Science Certificate Programs 2026',
        type: 'application',
        deadline: '2026-03-31T23:59:59',
        description: 'Various university certificate program deadlines',
        fees: 'Varies',
        website: 'coursera.org',
        priority: 'medium',
        important: false
      }
    ],
    'Doctor': [
      {
        id: 7,
        title: 'NEET 2026 Application',
        type: 'application',
        deadline: '2026-02-10T23:59:59',
        description: 'National Eligibility cum Entrance Test for MBBS',
        fees: '₹1000 (General), ₹500 (SC/ST/PwD)',
        website: 'ntaneet.nic.in',
        priority: 'high',
        important: true
      },
      {
        id: 8,
        title: 'AIIMS MBBS 2026 Registration',
        type: 'registration',
        deadline: '2026-03-15T23:59:59',
        description: 'All India Institute of Medical Sciences entrance',
        fees: '₹1500',
        website: 'aiimsexams.ac.in',
        priority: 'high',
        important: true
      }
    ],
    'Lawyer': [
      {
        id: 9,
        title: 'CLAT 2026 Application',
        type: 'application',
        deadline: '2026-03-15T23:59:59',
        description: 'Common Law Admission Test for law schools',
        fees: '₹4000 (UG), ₹4500 (PG)',
        website: 'clat.ac.in',
        priority: 'high',
        important: true
      },
      {
        id: 10,
        title: 'AILET 2026 Registration',
        type: 'registration',
        deadline: '2026-04-20T23:59:59',
        description: 'All India Law Entrance Test for NLU Delhi',
        fees: '₹3500',
        website: 'nludelhi.ac.in',
        priority: 'high',
        important: true
      }
    ],
    'CA': [
      {
        id: 11,
        title: 'CA Foundation 2026 Registration',
        type: 'registration',
        deadline: '2026-06-30T23:59:59',
        description: 'Chartered Accountancy Foundation course registration',
        fees: '₹10000',
        website: 'icai.org',
        priority: 'high',
        important: true
      },
      {
        id: 12,
        title: 'CA Intermediate 2026 Registration',
        type: 'registration',
        deadline: '2026-02-28T23:59:59',
        description: 'CA Intermediate course registration',
        fees: '₹15000',
        website: 'icai.org',
        priority: 'high',
        important: true
      }
    ],
    'Engineer': [
      {
        id: 13,
        title: 'JEE Main 2026 Application',
        type: 'application',
        deadline: '2026-01-31T23:59:59',
        description: 'Joint Entrance Examination for engineering colleges',
        fees: '₹500 (General), ₹250 (SC/ST/PwD)',
        website: 'jeemain.nta.nic.in',
        priority: 'high',
        important: true
      },
      {
        id: 14,
        title: 'BITSAT 2026 Application',
        type: 'application',
        deadline: '2026-05-15T23:59:59',
        description: 'Birla Institute of Technology entrance exam',
        fees: '₹3900 (Male), ₹2900 (Female)',
        website: 'bitsadmission.com',
        priority: 'medium',
        important: false
      }
    ],
    'Designer': [
      {
        id: 15,
        title: 'NIFT 2026 Entrance Exam',
        type: 'application',
        deadline: '2026-11-15T23:59:59',
        description: 'National Institute of Fashion Technology entrance',
        fees: '₹2000',
        website: 'nift.ac.in',
        priority: 'high',
        important: true
      },
      {
        id: 16,
        title: 'NID DAT 2026 Registration',
        type: 'registration',
        deadline: '2026-01-20T23:59:59',
        description: 'National Institute of Design entrance exam',
        fees: '₹2200',
        website: 'nid.edu',
        priority: 'high',
        important: true
      }
    ],
    'MBA': [
      {
        id: 17,
        title: 'CAT 2026 Registration',
        type: 'registration',
        deadline: '2026-09-20T23:59:59',
        description: 'Common Admission Test for MBA programs',
        fees: '₹2400 (General), ₹1200 (SC/ST/PwD)',
        website: 'iimcat.ac.in',
        priority: 'high',
        important: true
      },
      {
        id: 18,
        title: 'XAT 2027 Application',
        type: 'application',
        deadline: '2026-11-30T23:59:59',
        description: 'Xavier Aptitude Test for XLRI and others',
        fees: '₹2000',
        website: 'xatonline.in',
        priority: 'medium',
        important: false
      }
    ],
    'Government Officer': [
      {
        id: 19,
        title: 'UPSC Civil Services 2026 Prelims',
        type: 'registration',
        deadline: '2026-02-20T23:59:59',
        description: 'Union Public Service Commission examination',
        fees: '₹100 (General), ₹25 (SC/ST/PwD)',
        website: 'upsconline.nic.in',
        priority: 'high',
        important: true
      },
      {
        id: 20,
        title: 'SSC CGL 2026 Application',
        type: 'application',
        deadline: '2026-03-10T23:59:59',
        description: 'Staff Selection Commission Combined Graduate Level',
        fees: '₹100',
        website: 'ssc.nic.in',
        priority: 'high',
        important: true
      }
    ]
  };

  const professions = Object.keys(professionData);

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const typeColors = {
    application: 'bg-purple-100 text-purple-800',
    registration: 'bg-blue-100 text-blue-800',
    exam: 'bg-indigo-100 text-indigo-800',
    results: 'bg-green-100 text-green-800',
    'admit-card': 'bg-orange-100 text-orange-800',
    counselling: 'bg-pink-100 text-pink-800',
    ongoing: 'bg-teal-100 text-teal-800'
  };

  // Update time every second for real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem('professionNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  useEffect(() => {
    if (selectedProfession) {
      setProfessionDeadlines(professionData[selectedProfession] || []);
    } else {
      setProfessionDeadlines([]);
    }
  }, [selectedProfession]);

  useEffect(() => {
    filterDeadlines();
  }, [professionDeadlines, searchTerm, currentTime]);

  const filterDeadlines = () => {
    let result = [...professionDeadlines];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(deadline => 
        deadline.title.toLowerCase().includes(term) ||
        deadline.description.toLowerCase().includes(term) ||
        deadline.type.toLowerCase().includes(term)
      );
    }
    
    // Sort by deadline proximity
    result.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return dateA - dateB;
    });
    
    setFilteredDeadlines(result);
  };

  const handleNotificationToggle = (deadlineId) => {
    const updatedNotifications = notifications.includes(deadlineId)
      ? notifications.filter(id => id !== deadlineId)
      : [...notifications, deadlineId];
    
    setNotifications(updatedNotifications);
    localStorage.setItem('professionNotifications', JSON.stringify(updatedNotifications));
  };

  const isNotificationEnabled = (deadlineId) => {
    return notifications.includes(deadlineId);
  };

  const getTimeRemaining = (deadlineString) => {
    const deadline = new Date(deadlineString);
    const now = currentTime;
    const diff = deadline - now;
    
    if (diff <= 0) return { status: 'passed', text: 'Deadline Passed' };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return { 
        status: days <= 3 ? 'urgent' : days <= 7 ? 'soon' : 'future',
        text: `${days}d ${hours}h remaining`
      };
    } else if (hours > 0) {
      return { 
        status: 'urgent',
        text: `${hours}h ${minutes}m remaining`
      };
    } else {
      return { 
        status: 'critical',
        text: `${minutes} minutes remaining`
      };
    }
  };

  const getDeadlineStatus = (deadlineString) => {
    const deadline = new Date(deadlineString);
    const now = currentTime;
    const diff = deadline - now;
    
    if (diff <= 0) return 'passed';
    if (diff <= 24 * 60 * 60 * 1000) return 'today';
    if (diff <= 2 * 24 * 60 * 60 * 1000) return 'tomorrow';
    if (diff <= 7 * 24 * 60 * 60 * 1000) return 'this-week';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Profession-Based Deadlines</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select your target profession and get all relevant deadlines, exams, and opportunities in one place
              </p>
            </div>

            {/* Profession Selection */}
            <Card className="bg-white mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Target Profession</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {professions.map((profession) => (
                  <button
                    key={profession}
                    onClick={() => setSelectedProfession(profession)}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                      selectedProfession === profession
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {profession === 'Software Engineer' && '💻'}
                      {profession === 'Data Scientist' && '📊'}
                      {profession === 'Doctor' && '👨‍⚕️'}
                      {profession === 'Lawyer' && '⚖️'}
                      {profession === 'CA' && '💼'}
                      {profession === 'Engineer' && '⚙️'}
                      {profession === 'Designer' && '🎨'}
                      {profession === 'MBA' && '📈'}
                      {profession === 'Government Officer' && '🏛️'}
                    </div>
                    <div className="font-medium text-sm">{profession}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Search and Results */}
            {selectedProfession && (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="mb-6">
                  <Input
                    label="Search Deadlines"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search ${selectedProfession} deadlines...`}
                    className="w-full"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="text-center bg-white">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {filteredDeadlines.filter(d => getDeadlineStatus(d.deadline) === 'today').length}
                    </div>
                    <div className="text-gray-600">Due Today</div>
                  </Card>
                  <Card className="text-center bg-white">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {filteredDeadlines.filter(d => getDeadlineStatus(d.deadline) !== 'passed').length}
                    </div>
                    <div className="text-gray-600">Active Deadlines</div>
                  </Card>
                  <Card className="text-center bg-white">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {notifications.filter(id => 
                        filteredDeadlines.some(d => d.id === id)
                      ).length}
                    </div>
                    <div className="text-gray-600">Notifications On</div>
                  </Card>
                </div>

                {/* Deadlines List */}
                <div className="space-y-4">
                  {filteredDeadlines.map((deadline) => {
                    const timeInfo = getTimeRemaining(deadline.deadline);
                    const status = getDeadlineStatus(deadline.deadline);
                    
                    return (
                      <Card key={deadline.id} className="bg-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[deadline.priority]}`}>
                                {deadline.priority.toUpperCase()}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[deadline.type]}`}>
                                {deadline.type.replace('-', ' ').toUpperCase()}
                              </span>
                              {deadline.important && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                                  ⭐ IMPORTANT
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{deadline.title}</h3>
                            <p className="text-gray-600 mb-3">{deadline.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Deadline:</span>
                                <p className="font-medium">{new Date(deadline.deadline).toLocaleString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Fees:</span>
                                <p className="font-medium text-indigo-600">{deadline.fees}</p>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <span className="text-gray-600">Website:</span>
                              <a 
                                href={`https://${deadline.website}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline ml-2"
                              >
                                {deadline.website}
                              </a>
                            </div>
                            
                            <div className={`mt-3 p-3 rounded-lg ${
                              timeInfo.status === 'critical' ? 'bg-red-50 border border-red-200' :
                              timeInfo.status === 'urgent' ? 'bg-orange-50 border border-orange-200' :
                              timeInfo.status === 'soon' ? 'bg-yellow-50 border border-yellow-200' :
                              'bg-green-50 border border-green-200'
                            }`}>
                              <div className={`font-bold ${
                                timeInfo.status === 'critical' ? 'text-red-700' :
                                timeInfo.status === 'urgent' ? 'text-orange-700' :
                                timeInfo.status === 'soon' ? 'text-yellow-700' :
                                'text-green-700'
                              }`}>
                                ⏰ {timeInfo.text}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              variant="primary"
                              className="whitespace-nowrap"
                              onClick={() => window.open(`https://${deadline.website}`, '_blank')}
                            >
                              {deadline.action || 'Apply Now'}
                            </Button>
                            <button
                              onClick={() => handleNotificationToggle(deadline.id)}
                              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                                isNotificationEnabled(deadline.id)
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                  : 'border-gray-300 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                              }`}
                            >
                              {isNotificationEnabled(deadline.id) ? '🔔 On' : '🔕 Off'}
                            </button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {filteredDeadlines.length === 0 && (
                  <Card className="text-center py-12 bg-white">
                    <div className="text-5xl mb-4">📅</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Deadlines Found</h3>
                    <p className="text-gray-600">Try adjusting your search or select a different profession</p>
                  </Card>
                )}
              </div>
            )}

            {/* Info Section */}
            {!selectedProfession && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">Targeted Approach</h3>
                  <p className="text-gray-600">Get deadlines specific to your chosen profession</p>
                </Card>
                <Card className="text-center">
                  <div className="text-4xl mb-4">⏰</div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">Live countdowns and timely notifications</p>
                </Card>
                <Card className="text-center">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold mb-2">Comprehensive List</h3>
                  <p className="text-gray-600">All important dates in one organized place</p>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfessionDeadlines;