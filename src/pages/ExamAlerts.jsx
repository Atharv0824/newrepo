import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ExamApplicationForm from '../components/sections/ExamApplicationForm';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ExamAlerts = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [alerts, setAlerts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Mock exam and admission alerts data for 2026-2027
  const mockAlerts = [
    {
      id: 1,
      title: 'JEE Main 2026 Application Deadline',
      category: 'engineering',
      type: 'deadline',
      date: '2026-01-31',
      description: 'Last date to submit JEE Main application form without late fee',
      priority: 'high',
      action: 'Apply Now'
    },
    {
      id: 2,
      title: 'NEET 2026 Registration Opens',
      category: 'medical',
      type: 'registration',
      date: '2026-02-15',
      description: 'NEET 2026 registration window opens for medical entrance exam',
      priority: 'high',
      action: 'Register'
    },
    {
      id: 3,
      title: 'CAT 2026 Exam Date Announced',
      category: 'management',
      type: 'exam',
      date: '2026-11-24',
      description: 'Common Admission Test for MBA programs will be held on November 24, 2026',
      priority: 'medium',
      action: 'Prepare'
    },
    {
      id: 4,
      title: 'GATE 2027 Results Declaration',
      category: 'engineering',
      type: 'results',
      date: '2027-03-15',
      description: 'GATE 2027 results will be declared. Check your scores and rankings',
      priority: 'medium',
      action: 'Check Results'
    },
    {
      id: 5,
      title: 'DU JAT 2026 Application Deadline',
      category: 'commerce',
      type: 'deadline',
      date: '2026-02-28',
      description: 'Delhi University Joint Admission Test application deadline for BBA/BMS',
      priority: 'medium',
      action: 'Apply'
    },
    {
      id: 6,
      title: 'BITSAT 2026 Admit Card Release',
      category: 'engineering',
      type: 'admit-card',
      date: '2026-05-10',
      description: 'BITSAT 2026 admit cards will be available for download',
      priority: 'medium',
      action: 'Download'
    },
    {
      id: 7,
      title: 'Scholarship Application for SC/ST Students 2026',
      category: 'scholarship',
      type: 'scholarship',
      date: '2026-02-28',
      description: 'Government scholarship scheme for SC/ST students - application deadline',
      priority: 'high',
      action: 'Apply'
    },
    {
      id: 8,
      title: 'CLAT 2026 Counselling Process',
      category: 'law',
      type: 'counselling',
      date: '2026-07-01',
      description: 'Common Law Admission Test counselling and seat allocation process begins',
      priority: 'medium',
      action: 'Prepare Documents'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Alerts', icon: '🔔' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'medical', name: 'Medical', icon: '🏥' },
    { id: 'management', name: 'Management', icon: '💼' },
    { id: 'commerce', name: 'Commerce', icon: '📊' },
    { id: 'law', name: 'Law', icon: '⚖️' },
    { id: 'scholarship', name: 'Scholarships', icon: '💰' }
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const typeColors = {
    deadline: 'bg-purple-100 text-purple-800',
    registration: 'bg-blue-100 text-blue-800',
    exam: 'bg-indigo-100 text-indigo-800',
    results: 'bg-green-100 text-green-800',
    'admit-card': 'bg-orange-100 text-orange-800',
    scholarship: 'bg-teal-100 text-teal-800',
    counselling: 'bg-pink-100 text-pink-800'
  };

  useEffect(() => {
    setAlerts(mockAlerts);
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem('examNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const filteredAlerts = activeFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.category === activeFilter);

  const handleNotificationToggle = (alertId) => {
    const updatedNotifications = notifications.includes(alertId)
      ? notifications.filter(id => id !== alertId)
      : [...notifications, alertId];
    
    setNotifications(updatedNotifications);
    localStorage.setItem('examNotifications', JSON.stringify(updatedNotifications));
  };

  const isNotificationEnabled = (alertId) => {
    return notifications.includes(alertId);
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Passed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const handleApplyClick = (alert) => {
    if (!user) {
      toast.error('Please login to apply for exams');
      return;
    }
    setSelectedAlert(alert);
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = (data) => {
    toast.success('Application submitted successfully! Check your email for confirmation.');
    setShowApplicationForm(false);
    setSelectedAlert(null);
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
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Exam & Admission Alerts</h1>
              <p className="text-xl text-gray-600">
                Never miss important deadlines, exam dates, and scholarship opportunities
              </p>
            </div>

            {/* Category Filters */}
            <div className="mb-8">
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
              <Card className="text-center bg-white">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {alerts.filter(a => a.priority === 'high').length}
                </div>
                <div className="text-gray-600">High Priority</div>
              </Card>
              <Card className="text-center bg-white">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {alerts.filter(a => getDaysUntil(a.date) === 'Today' || getDaysUntil(a.date) === 'Tomorrow').length}
                </div>
                <div className="text-gray-600">Urgent Deadlines</div>
              </Card>
              <Card className="text-center bg-white">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {alerts.filter(a => a.type === 'results').length}
                </div>
                <div className="text-gray-600">Results Announced</div>
              </Card>
              <Card className="text-center bg-white">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {notifications.length}
                </div>
                <div className="text-gray-600">Notifications On</div>
              </Card>
            </div>

            {/* Alerts List */}
            <div className="space-y-6">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className="bg-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[alert.priority]}`}>
                          {alert.priority.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[alert.type]}`}>
                          {alert.type.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {categories.find(c => c.id === alert.category)?.icon} {categories.find(c => c.id === alert.category)?.name}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{alert.title}</h3>
                      <p className="text-gray-600 mb-3">{alert.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(alert.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className={`flex items-center space-x-1 font-medium ${
                          getDaysUntil(alert.date) === 'Passed' ? 'text-gray-400' :
                          getDaysUntil(alert.date) === 'Today' ? 'text-red-600' :
                          getDaysUntil(alert.date) === 'Tomorrow' ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{getDaysUntil(alert.date)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="primary"
                        className="whitespace-nowrap"
                        onClick={() => handleApplyClick(alert)}
                      >
                        {alert.action}
                      </Button>
                      <button
                        onClick={() => handleNotificationToggle(alert.id)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                          isNotificationEnabled(alert.id)
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-gray-300 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                        }`}
                      >
                        {isNotificationEnabled(alert.id) ? '🔔 On' : '🔕 Off'}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <Card className="text-center py-12 bg-white">
                <div className="text-5xl mb-4">📢</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Alerts Found</h3>
                <p className="text-gray-600">Try selecting a different category or check back later</p>
              </Card>
            )}

            {/* Reminder Section */}
            <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-3">Stay Updated with Important Deadlines</h2>
                  <p className="text-indigo-100 text-lg mb-4">
                    Enable notifications to never miss crucial exam dates, application deadlines, and scholarship opportunities.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-white text-indigo-600 hover:bg-gray-100"
                  >
                    Enable All Notifications
                  </Button>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-3">⏰</div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-indigo-200">Reminders</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedAlert && (
        <ExamApplicationForm
          alert={selectedAlert}
          isOpen={showApplicationForm}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedAlert(null);
          }}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );
};

export default ExamAlerts;