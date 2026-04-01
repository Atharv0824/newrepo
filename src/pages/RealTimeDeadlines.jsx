import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const RealTimeDeadlines = () => {
  const { user } = useAuth();
  const { appointments, savedColleges, appointmentHistory } = useData();
  const [deadlines, setDeadlines] = useState([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userDeadlines, setUserDeadlines] = useState([]);

  // Comprehensive career deadlines data with realistic dates for 2026-2027
  const careerDeadlines = [
    // Engineering
    {
      id: 1,
      title: 'JEE Main 2026 Application Deadline',
      profession: 'Engineering',
      category: 'engineering',
      type: 'application',
      deadline: '2026-01-31T23:59:59',
      description: 'Last date to submit JEE Main application form without late fee',
      priority: 'high',
      action: 'Apply Now',
      website: 'jeemain.nta.nic.in',
      fees: '₹500 (General), ₹250 (SC/ST/PwD)',
      important: true
    },
    {
      id: 2,
      title: 'JEE Advanced 2026 Registration',
      profession: 'Engineering',
      category: 'engineering',
      type: 'registration',
      deadline: '2026-06-05T23:59:59',
      description: 'Registration for JEE Advanced 2026 for qualified JEE Main candidates',
      priority: 'high',
      action: 'Register',
      website: 'jeeadv.ac.in',
      fees: '₹2500 (General), ₹1250 (SC/ST/PwD)',
      important: true
    },
    {
      id: 3,
      title: 'BITSAT 2026 Application Deadline',
      profession: 'Engineering',
      category: 'engineering',
      type: 'application',
      deadline: '2026-05-15T23:59:59',
      description: 'BITSAT 2026 application deadline for B.E. programs',
      priority: 'medium',
      action: 'Apply',
      website: 'bitsadmission.com',
      fees: '₹3900 (Male), ₹2900 (Female)',
      important: false
    },
    {
      id: 4,
      title: 'VITEEE 2026 Application Deadline',
      profession: 'Engineering',
      category: 'engineering',
      type: 'application',
      deadline: '2026-05-31T23:59:59',
      description: 'Vellore Institute of Technology Engineering Entrance Exam',
      priority: 'medium',
      action: 'Apply',
      website: 'vit.ac.in',
      fees: '₹1370',
      important: false
    },

    // Medical
    {
      id: 5,
      title: 'NEET 2026 Application Deadline',
      profession: 'Medical',
      category: 'medical',
      type: 'application',
      deadline: '2026-02-10T23:59:59',
      description: 'National Eligibility cum Entrance Test for MBBS/BDS courses',
      priority: 'high',
      action: 'Apply',
      website: 'ntaneet.nic.in',
      fees: '₹1000 (General), ₹500 (SC/ST/PwD)',
      important: true
    },
    {
      id: 6,
      title: 'AIIMS MBBS 2026 Registration',
      profession: 'Medical',
      category: 'medical',
      type: 'registration',
      deadline: '2026-03-15T23:59:59',
      description: 'AIIMS MBBS entrance exam registration deadline',
      priority: 'high',
      action: 'Register',
      website: 'aiimsexams.ac.in',
      fees: '₹1500',
      important: true
    },
    {
      id: 7,
      title: 'JIPMER MBBS 2026 Application',
      profession: 'Medical',
      category: 'medical',
      type: 'application',
      deadline: '2026-03-31T23:59:59',
      description: 'Jawaharlal Institute of Postgraduate Medical Education & Research',
      priority: 'medium',
      action: 'Apply',
      website: 'jipmer.edu.in',
      fees: '₹1000',
      important: false
    },

    // Management
    {
      id: 8,
      title: 'CAT 2026 Registration Deadline',
      profession: 'Management',
      category: 'management',
      type: 'registration',
      deadline: '2026-09-20T23:59:59',
      description: 'Common Admission Test for MBA programs - Registration deadline',
      priority: 'high',
      action: 'Register',
      website: 'iimcat.ac.in',
      fees: '₹2400 (General), ₹1200 (SC/ST/PwD)',
      important: true
    },
    {
      id: 9,
      title: 'XAT 2027 Application Deadline',
      profession: 'Management',
      category: 'management',
      type: 'application',
      deadline: '2026-11-30T23:59:59',
      description: 'Xavier Aptitude Test for XLRI and other XAMI institutes',
      priority: 'medium',
      action: 'Apply',
      website: 'xatonline.in',
      fees: '₹2000',
      important: false
    },
    {
      id: 10,
      title: 'MAT 2026 Registration',
      profession: 'Management',
      category: 'management',
      type: 'registration',
      deadline: '2026-02-28T23:59:59',
      description: 'Management Aptitude Test - Registration for February cycle',
      priority: 'medium',
      action: 'Register',
      website: 'aicte-mat.com',
      fees: '₹1500',
      important: false
    },

    // Law
    {
      id: 11,
      title: 'CLAT 2026 Application Deadline',
      profession: 'Law',
      category: 'law',
      type: 'application',
      deadline: '2026-03-15T23:59:59',
      description: 'Common Law Admission Test for undergraduate and postgraduate programs',
      priority: 'high',
      action: 'Apply',
      website: 'clat.ac.in',
      fees: '₹4000 (UG), ₹4500 (PG)',
      important: true
    },
    {
      id: 12,
      title: 'AILET 2026 Registration',
      profession: 'Law',
      category: 'law',
      type: 'registration',
      deadline: '2026-04-20T23:59:59',
      description: 'All India Law Entrance Test for National Law University, Delhi',
      priority: 'high',
      action: 'Register',
      website: 'nludelhi.ac.in',
      fees: '₹3500',
      important: true
    },

    // Design
    {
      id: 13,
      title: 'NIFT 2026 Application Deadline',
      profession: 'Design',
      category: 'design',
      type: 'application',
      deadline: '2026-11-15T23:59:59',
      description: 'National Institute of Fashion Technology entrance exam',
      priority: 'high',
      action: 'Apply',
      website: 'nift.ac.in',
      fees: '₹2000',
      important: true
    },
    {
      id: 14,
      title: 'NID DAT 2026 Registration',
      profession: 'Design',
      category: 'design',
      type: 'registration',
      deadline: '2026-01-20T23:59:59',
      description: 'National Institute of Design Design Aptitude Test',
      priority: 'high',
      action: 'Register',
      website: 'nid.edu',
      fees: '₹2200',
      important: true
    },

    // Commerce
    {
      id: 15,
      title: 'CA Foundation 2026 Registration',
      profession: 'Commerce',
      category: 'commerce',
      type: 'registration',
      deadline: '2026-06-30T23:59:59',
      description: 'Chartered Accountancy Foundation course registration',
      priority: 'high',
      action: 'Register',
      website: 'icai.org',
      fees: '₹10000',
      important: true
    },
    {
      id: 16,
      title: 'CMA Foundation 2026 Registration',
      profession: 'Commerce',
      category: 'commerce',
      type: 'registration',
      deadline: '2026-02-28T23:59:59',
      description: 'Cost and Management Accountancy Foundation course',
      priority: 'medium',
      action: 'Register',
      website: 'icmai.in',
      fees: '₹6000',
      important: false
    },

    // Government Services
    {
      id: 17,
      title: 'UPSC Civil Services 2026 Prelims Registration',
      profession: 'Government Services',
      category: 'government',
      type: 'registration',
      deadline: '2026-02-20T23:59:59',
      description: 'Union Public Service Commission Civil Services Examination',
      priority: 'high',
      action: 'Register',
      website: 'upsconline.nic.in',
      fees: '₹100 (General), ₹25 (SC/ST/PwD)',
      important: true
    },
    {
      id: 18,
      title: 'SSC CGL 2026 Application Deadline',
      profession: 'Government Services',
      category: 'government',
      type: 'application',
      deadline: '2026-03-10T23:59:59',
      description: 'Staff Selection Commission Combined Graduate Level Examination',
      priority: 'high',
      action: 'Apply',
      website: 'ssc.nic.in',
      fees: '₹100',
      important: true
    },

    // Computer Science/IT
    {
      id: 19,
      title: 'GATE 2027 Registration',
      profession: 'Computer Science/IT',
      category: 'technology',
      type: 'registration',
      deadline: '2026-10-05T23:59:59',
      description: 'Graduate Aptitude Test in Engineering for M.Tech admissions',
      priority: 'high',
      action: 'Register',
      website: 'gate.iitb.ac.in',
      fees: '₹1500 (General), ₹750 (SC/ST/PwD)',
      important: true
    },
    {
      id: 20,
      title: 'UGC NET 2026 Application',
      profession: 'Computer Science/IT',
      category: 'technology',
      type: 'application',
      deadline: '2026-02-28T23:59:59',
      description: 'National Eligibility Test for Assistant Professor and JRF',
      priority: 'medium',
      action: 'Apply',
      website: 'ugcnet.nta.nic.in',
      fees: '₹1000',
      important: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Deadlines', icon: '🔔' },
    { id: 'counselling', name: 'My Appointments', icon: '💼' },
    { id: 'college', name: 'College Applications', icon: '🎓' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'medical', name: 'Medical', icon: '🏥' },
    { id: 'management', name: 'Management', icon: '💼' },
    { id: 'law', name: 'Law', icon: '⚖️' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'commerce', name: 'Commerce', icon: '📊' },
    { id: 'government', name: 'Government Services', icon: '🏛️' },
    { id: 'technology', name: 'Technology/IT', icon: '💻' }
  ];

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
    counselling: 'bg-pink-100 text-pink-800'
  };

  // Update time every second for real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Generate user-specific deadlines from appointments and activities
  useEffect(() => {
    if (!user) return;

    const generatedDeadlines = [];

    // Add appointment deadlines
    if (appointments && appointments.length > 0) {
      appointments.forEach((apt, index) => {
        const aptDateTime = new Date(`${apt.appointmentDate}T${apt.appointmentTime}`);
        generatedDeadlines.push({
          id: `apt-${apt.id || index}`,
          title: `${apt.sessionType === 'individual' ? 'Individual' : 'Group'} Session with ${apt.counsellorName || 'Counsellor'}`,
          profession: 'Counselling',
          category: 'counselling',
          type: apt.status === 'completed' ? 'completed' : 'appointment',
          deadline: aptDateTime.toISOString(),
          description: apt.reason || `Scheduled ${apt.sessionType} counselling session`,
          priority: apt.status === 'confirmed' ? 'high' : 'medium',
          action: apt.status === 'completed' ? 'View' : 'Attend',
          fees: apt.amount ? `₹${apt.amount}` : 'Paid',
          important: apt.status === 'confirmed' || apt.status === 'pending',
          status: apt.status,
          isUserActivity: true
        });
      });
    }

    // Add college application deadlines
    if (savedColleges && savedColleges.length > 0) {
      savedColleges.forEach((college, index) => {
        if (college.applicationDeadline) {
          generatedDeadlines.push({
            id: `college-${college.id || index}`,
            title: `${college.name} Application Deadline`,
            profession: college.course || 'College Admission',
            category: 'college',
            type: 'application',
            deadline: new Date(college.applicationDeadline).toISOString(),
            description: `Application deadline for ${college.course} at ${college.name}`,
            priority: 'high',
            action: 'Apply Now',
            fees: college.fees ? `₹${college.fees}` : 'Check website',
            important: true,
            isUserActivity: true
          });
        }
      });
    }

    // Add appointment history as upcoming milestones
    if (appointmentHistory && appointmentHistory.length > 0) {
      const recentHistory = appointmentHistory.slice(0, 5);
      recentHistory.forEach((item, index) => {
        if (item.timestamp) {
          generatedDeadlines.push({
            id: `history-${item.id || index}`,
            title: `${item.action === 'booked' ? 'Booked' : item.action === 'completed' ? 'Completed' : 'Cancelled'}: ${item.counsellorName || 'Session'}`,
            profession: 'Counselling',
            category: 'counselling',
            type: item.action,
            deadline: new Date(item.timestamp).toISOString(),
            description: item.reason || 'Appointment activity',
            priority: 'low',
            action: 'View Details',
            fees: item.amount ? `₹${item.amount}` : '-',
            important: false,
            isUserActivity: true
          });
        }
      });
    }

    setUserDeadlines(generatedDeadlines);
  }, [user, appointments, savedColleges, appointmentHistory]);

  useEffect(() => {
    // Combine career deadlines with user-specific deadlines
    const allDeadlines = [...careerDeadlines, ...userDeadlines];
    setDeadlines(allDeadlines);
    
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem('deadlineNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, [userDeadlines]);

  useEffect(() => {
    filterDeadlines();
  }, [deadlines, activeFilter, searchTerm, currentTime]);

  const filterDeadlines = () => {
    let result = [...deadlines];
    
    // Filter by category
    if (activeFilter !== 'all') {
      result = result.filter(deadline => deadline.category === activeFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(deadline => 
        deadline.title.toLowerCase().includes(term) ||
        deadline.profession.toLowerCase().includes(term) ||
        deadline.description.toLowerCase().includes(term)
      );
    }
    
    // Sort by deadline proximity (closest first), but prioritize user activities
    result.sort((a, b) => {
      // User activities always come first
      if (a.isUserActivity && !b.isUserActivity) return -1;
      if (!a.isUserActivity && b.isUserActivity) return 1;
      
      // Then sort by date
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
    localStorage.setItem('deadlineNotifications', JSON.stringify(updatedNotifications));
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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Real-Time Career Deadlines</h1>
              <p className="text-xl text-gray-600">
                Track your appointments, college applications, and important career deadlines with live updates
              </p>
              {userDeadlines.length > 0 && (
                <div className="mt-4 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <p className="font-semibold text-indigo-900">You have {userDeadlines.length} personal {userDeadlines.length === 1 ? 'activity' : 'activities'}</p>
                        <p className="text-sm text-indigo-700">Appointments and college applications are tracked here</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveFilter('counselling')}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      View My Appointments
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <Input
                label="Search Deadlines"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by exam name, profession, or description..."
                className="w-full"
              />
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                      activeFilter === category.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="text-center bg-white border-l-4 border-red-500">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {filteredDeadlines.filter(d => d.isUserActivity && getDeadlineStatus(d.deadline) === 'today').length}
                </div>
                <div className="text-gray-600 text-sm">Due Today</div>
                <div className="text-xs text-gray-500 mt-1">Your activities</div>
              </Card>
              <Card className="text-center bg-white border-l-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {filteredDeadlines.filter(d => d.isUserActivity && getDeadlineStatus(d.deadline) === 'tomorrow').length}
                </div>
                <div className="text-gray-600 text-sm">Due Tomorrow</div>
                <div className="text-xs text-gray-500 mt-1">Your activities</div>
              </Card>
              <Card className="text-center bg-white border-l-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {filteredDeadlines.filter(d => d.isUserActivity && getDeadlineStatus(d.deadline) === 'this-week').length}
                </div>
                <div className="text-gray-600 text-sm">This Week</div>
                <div className="text-xs text-gray-500 mt-1">Your activities</div>
              </Card>
              <Card className="text-center bg-white border-l-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {notifications.length}
                </div>
                <div className="text-gray-600 text-sm">Notifications On</div>
                <div className="text-xs text-gray-500 mt-1">Active alerts</div>
              </Card>
            </div>

            {/* Deadlines List */}
            <div className="space-y-6">
              {filteredDeadlines.map((deadline) => {
                const timeInfo = getTimeRemaining(deadline.deadline);
                const status = getDeadlineStatus(deadline.deadline);
                
                return (
                  <Card key={deadline.id} className={`bg-white ${deadline.isUserActivity ? 'ring-2 ring-indigo-500 shadow-lg' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {deadline.isUserActivity && (
                            <span className="px-3 py-1 rounded-full text-sm font-bold bg-indigo-100 text-indigo-700 border-2 border-indigo-500">
                              📌 YOUR ACTIVITY
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[deadline.priority]}`}>
                            {deadline.priority.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[deadline.type]}`}>
                            {deadline.type.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">
                            {categories.find(c => c.id === deadline.category)?.icon} {deadline.profession}
                          </span>
                          {deadline.important && !deadline.isUserActivity && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                              ⭐ IMPORTANT
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{deadline.title}</h3>
                        <p className="text-gray-600 mb-3">{deadline.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
                          <div>
                            <span className="text-gray-600">Website:</span>
                            <p className="font-medium text-blue-600">{deadline.website}</p>
                          </div>
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
                          {deadline.action}
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
                <p className="text-gray-600">Try adjusting your search or filters</p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </Card>
            )}

            {/* Reminder Section */}
            <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-3">Stay Ahead of Important Deadlines</h2>
                  <p className="text-indigo-100 text-lg mb-4">
                    Enable notifications to receive timely alerts for all career-related deadlines. 
                    Never miss an opportunity again with our real-time tracking system.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-white text-indigo-600 hover:bg-gray-100"
                    onClick={() => {
                      // Enable all notifications
                      const allIds = deadlines.map(d => d.id);
                      setNotifications(allIds);
                      localStorage.setItem('deadlineNotifications', JSON.stringify(allIds));
                    }}
                  >
                    Enable All Notifications
                  </Button>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-3">⏰</div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-indigo-200">Real-time Alerts</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RealTimeDeadlines;