import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { appointments, savedColleges, loadAppointmentsFromSupabase } = useData();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    upcomingAppointments: 0,
    cancelledAppointments: 0,
    favouriteCounsellors: [],
    collegeViews: 0,
    profileCompletionRate: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Load latest data from Supabase
    if (user) {
      loadAppointmentsFromSupabase();
    }
  }, [user]);

  useEffect(() => {
    // Calculate analytics from actual data
    const total = appointments.length;
    const completed = appointments.filter(apt => apt.status === 'completed').length;
    const upcoming = appointments.filter(apt => apt.status === 'scheduled').length;
    const cancelled = appointments.filter(apt => apt.status === 'cancelled').length || 
                      appointments.filter(apt => apt.status === 'rescheduled').length;
    
    // Get most booked counsellors
    const counsellorCount = {};
    appointments.forEach(apt => {
      if (apt.status !== 'cancelled' && apt.counsellorName) {
        counsellorCount[apt.counsellorName] = (counsellorCount[apt.counsellorName] || 0) + 1;
      }
    });
    
    const favouriteCounsellors = Object.entries(counsellorCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));

    // Generate recent activity from appointments
    const activityFromAppointments = appointments
      .sort((a, b) => new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id))
      .slice(0, 10)
      .map(apt => ({
        id: apt.id,
        action: `Booked session with ${apt.counsellorName}`,
        item: apt.sessionType === 'individual' ? 'Individual Session' : 'Group Session',
        time: apt.createdAt ? new Date(apt.createdAt).toLocaleString() : 'Recently',
        type: 'appointment',
        status: apt.status
      }));

    setStats({
      totalAppointments: total,
      completedAppointments: completed,
      upcomingAppointments: upcoming,
      cancelledAppointments: cancelled,
      favouriteCounsellors,
      collegeViews: savedColleges.length,
      profileCompletionRate: 75
    });
    
    setRecentActivity(activityFromAppointments);
  }, [appointments, savedColleges]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">📊 My Analytics</h1>
            <p className="text-xl text-gray-600 mb-8">
              Track your academic journey and counselling progress
            </p>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">📅</div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {stats.totalAppointments}
                </div>
                <div className="text-gray-600 font-medium">Total Appointments</div>
              </Card>

              <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">✅</div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.completedAppointments}
                </div>
                <div className="text-gray-600 font-medium">Completed Sessions</div>
              </Card>

              <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">⏰</div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.upcomingAppointments}
                </div>
                <div className="text-gray-600 font-medium">Upcoming Sessions</div>
              </Card>

              <Card className="text-center bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">❌</div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {stats.cancelledAppointments}
                </div>
                <div className="text-gray-600 font-medium">Cancelled</div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Appointment Status Distribution */}
              <Card header={<h3 className="text-xl font-semibold text-gray-900">📈 Appointment Distribution</h3>}>
                <div className="space-y-4">
                  {stats.totalAppointments > 0 ? (
                    <>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Completed</span>
                          <span className="text-sm font-medium text-gray-700">
                            {Math.round((stats.completedAppointments / stats.totalAppointments) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(stats.completedAppointments / stats.totalAppointments) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Upcoming</span>
                          <span className="text-sm font-medium text-gray-700">
                            {Math.round((stats.upcomingAppointments / stats.totalAppointments) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(stats.upcomingAppointments / stats.totalAppointments) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Cancelled</span>
                          <span className="text-sm font-medium text-gray-700">
                            {Math.round((stats.cancelledAppointments / stats.totalAppointments) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-red-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(stats.cancelledAppointments / stats.totalAppointments) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <span className="text-4xl mb-2 block">📭</span>
                      <p>No appointments yet. Book your first session!</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Favourite Counsellors */}
              <Card header={<h3 className="text-xl font-semibold text-gray-900">⭐ Favourite Counsellors</h3>}>
                <div className="space-y-4">
                  {stats.favouriteCounsellors.length > 0 ? (
                    stats.favouriteCounsellors.map((counsellor, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {counsellor.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{counsellor.name}</p>
                          <p className="text-sm text-gray-600">{counsellor.count} sessions booked</p>
                        </div>
                        <div className="text-2xl">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <span className="text-4xl mb-2 block">🎯</span>
                      <p>Book sessions to see your favourite counsellors</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Activity Summary */}
            <Card header={<h3 className="text-xl font-semibold text-gray-900">📋 Activity Summary</h3>}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-3xl mb-2">🏫</div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {savedColleges.length}
                  </div>
                  <div className="text-gray-600 font-medium">Colleges Saved</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {stats.profileCompletionRate}%
                  </div>
                  <div className="text-gray-600 font-medium">Profile Complete</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {stats.totalAppointments > 0 ? 'Active' : 'New'}
                  </div>
                  <div className="text-gray-600 font-medium">User Status</div>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card 
              className="mt-8" 
              header={<h3 className="text-xl font-semibold text-gray-900">⏰ Recent Activity</h3>}
            >
              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                    >
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.status === 'completed' ? 'bg-green-500' :
                        activity.status === 'scheduled' ? 'bg-blue-500' :
                        activity.status === 'cancelled' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                        activity.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        activity.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {activity.status.toUpperCase()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">📭</span>
                    <p>No recent activity. Book your first session!</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => navigate('/counsellor-profile')}
                className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-3">👥</div>
                <div className="font-bold text-lg mb-1">Book Another Session</div>
                <div className="text-indigo-100 text-sm">Connect with expert counsellors</div>
              </button>

              <button
                onClick={() => navigate('/recommendations')}
                className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-3">🎓</div>
                <div className="font-bold text-lg mb-1">Explore Colleges</div>
                <div className="text-green-100 text-sm">Find your perfect match</div>
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-3">📝</div>
                <div className="font-bold text-lg mb-1">Update Profile</div>
                <div className="text-orange-100 text-sm">Keep your info current</div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
