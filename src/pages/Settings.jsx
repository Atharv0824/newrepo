import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useDarkMode } from '../context/DarkModeContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    appointmentReminders: true,
    collegeUpdates: true,
    soundEffects: true,
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Setting updated!');
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Settings</h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage your preferences and customize your experience
            </p>

            <div className="space-y-6">
              {/* Notifications */}
              <Card header={<h3 className="text-xl font-semibold text-gray-900">🔔 Notifications</h3>}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => handleToggle('emailNotifications')}
                      className={`w-14 h-7 rounded-full transition-all duration-300 ${
                        settings.emailNotifications ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                          settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">Appointment Reminders</p>
                      <p className="text-sm text-gray-600">Get reminded before sessions</p>
                    </div>
                    <button
                      onClick={() => handleToggle('appointmentReminders')}
                      className={`w-14 h-7 rounded-full transition-all duration-300 ${
                        settings.appointmentReminders ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                          settings.appointmentReminders ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">College Updates</p>
                      <p className="text-sm text-gray-600">Notifications about saved colleges</p>
                    </div>
                    <button
                      onClick={() => handleToggle('collegeUpdates')}
                      className={`w-14 h-7 rounded-full transition-all duration-300 ${
                        settings.collegeUpdates ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                          settings.collegeUpdates ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </Card>

              {/* Appearance */}
              <Card header={<h3 className="text-xl font-semibold text-gray-900">🎨 Appearance</h3>}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                    <button
                      onClick={() => {
                        toggleDarkMode();
                        toast.success(isDarkMode ? 'Light mode enabled' : 'Dark mode enabled');
                      }}
                      className={`w-14 h-7 rounded-full transition-all duration-300 ${
                        isDarkMode ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                          isDarkMode ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </Card>

              {/* Preferences */}
              <Card header={<h3 className="text-xl font-semibold text-gray-900">⚙️ Preferences</h3>}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">Sound Effects</p>
                      <p className="text-sm text-gray-600">Play sounds for interactions</p>
                    </div>
                    <button
                      onClick={() => handleToggle('soundEffects')}
                      className={`w-14 h-7 rounded-full transition-all duration-300 ${
                        settings.soundEffects ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                          settings.soundEffects ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></div>
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleChange('language', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi (Coming Soon)</option>
                      <option value="es">Spanish (Coming Soon)</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Timezone
                    </label>
                    <input
                      type="text"
                      value={settings.timezone}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                    />
                  </div>
                </div>
              </Card>

              {/* Account Info */}
              <Card header={<h3 className="text-xl font-semibold text-gray-900">👤 Account Information</h3>}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                    />
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/profile/edit')}
                    className="w-full"
                  >
                    ✏️ Edit Profile
                  </Button>
                </div>
              </Card>

              {/* Save Button */}
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="flex-1 py-3 text-lg"
                >
                  💾 Save Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSettings({
                      emailNotifications: true,
                      appointmentReminders: true,
                      collegeUpdates: true,
                      darkMode: false,
                      soundEffects: true,
                      language: 'en',
                      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    });
                    toast.info('Settings reset to defaults');
                  }}
                  className="flex-1 py-3 text-lg"
                >
                  🔄 Reset to Defaults
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
