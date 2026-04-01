import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const MyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    savedColleges, 
    profileHistory, 
    appointments,
    getStatistics
  } = useData();
  
  const [stats, setStats] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Load statistics
    setStats(getStatistics());
  }, [user]);

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
                My Dashboard
              </h1>
              <p className="text-xl text-gray-600">
                Welcome back, {user?.name}! Track all your activities here.
              </p>
            </div>

            {/* Statistics Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm mb-1">Saved Colleges</p>
                      <p className="text-4xl font-bold">{stats.savedColleges}</p>
                    </div>
                    <div className="text-5xl opacity-30">🏫</div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Total Sessions</p>
                      <p className="text-4xl font-bold">{appointments.length}</p>
                    </div>
                    <div className="text-5xl opacity-30">👨‍🏫</div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm mb-1">Upcoming</p>
                      <p className="text-4xl font-bold">{stats.upcomingAppointments || 0}</p>
                    </div>
                    <div className="text-5xl opacity-30">📅</div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm mb-1">Completed</p>
                      <p className="text-4xl font-bold">{stats.completedAppointments || 0}</p>
                    </div>
                    <div className="text-5xl opacity-30">✅</div>
                  </div>
                </Card>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* My Booked Sessions */}
              <div>
                <Card className="bg-white" header={
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">👨‍🏫 My Booked Sessions</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/counsellors')}
                    >
                      Book New Session
                    </Button>
                  </div>
                }>
                  <div className="space-y-3">
                    {appointments.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">📅</div>
                        <p className="text-gray-600">No sessions booked yet</p>
                        <p className="text-sm text-gray-500 mt-2">Book your first counsellor session!</p>
                      </div>
                    ) : (
                      appointments.slice(0, 5).map((appointment, idx) => (
                        <div 
                          key={appointment.id} 
                          className={`p-4 rounded-lg border-l-4 ${
                            appointment.status === 'paid' || appointment.status === 'scheduled'
                              ? 'bg-green-50 border-green-500'
                              : appointment.status === 'completed'
                              ? 'bg-blue-50 border-blue-500'
                              : 'bg-gray-50 border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">👨‍🏫</span>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{appointment.counsellorName}</h4>
                                  <p className="text-sm text-gray-600">
                                    {appointment.sessionType === 'group' ? '👥 Group Session' : '👤 Individual Session'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                                <span className="flex items-center gap-1">
                                  <span>💰</span> ₹{appointment.price}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>📊</span> 
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    appointment.status === 'paid' || appointment.status === 'scheduled'
                                      ? 'bg-green-200 text-green-800'
                                      : appointment.status === 'completed'
                                      ? 'bg-blue-200 text-blue-800'
                                      : 'bg-gray-200 text-gray-800'
                                  }`}>
                                    {appointment.status.toUpperCase()}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {appointments.length > 5 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        + {appointments.length - 5} more sessions
                      </p>
                    </div>
                  )}
                </Card>
              </div>

              {/* Saved Colleges */}
              <div>
                <Card className="bg-white" header={
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Saved Colleges</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/recommendations')}
                    >
                      View All
                    </Button>
                  </div>
                }>
                  <div className="space-y-3">
                    {savedColleges.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">🏫</div>
                        <p className="text-gray-600">No colleges saved yet</p>
                      </div>
                    ) : (
                      savedColleges.slice(0, 5).map((college, idx) => (
                        <div 
                          key={college.id} 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                              {college.name?.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{college.name}</h4>
                              <p className="text-sm text-gray-600">{college.location || 'Location not specified'}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/recommendations')}
                          >
                            View
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <Card className="bg-white" header={<h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>}>
                  <div className="space-y-4">
                    {profileHistory.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No recent activity</p>
                    ) : (
                      profileHistory.slice(0, 10).map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                            activity.type === 'profile_update' ? 'bg-blue-500' :
                            activity.type === 'appointment' ? 'bg-green-500' :
                            activity.type === 'college_saved' ? 'bg-indigo-500' :
                            activity.type === 'college_removed' ? 'bg-gray-400' :
                            'bg-gray-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.description}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(activity.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => navigate('/counsellors')}
                    >
                      👨‍🏫 Book Counsellor Session
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => navigate('/recommendations')}
                    >
                      🎯 Explore Colleges
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/profile')}
                    >
                      👤 Update Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => navigate('/aptitude-test')}
                    >
                      🧠 Take Aptitude Test
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyDashboard;
