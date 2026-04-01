import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();





  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'college': return '🏫';
      case 'profile': return '👤';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '🔔';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all duration-300"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-all"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <span className="text-4xl mb-2 block">🎉</span>
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`
                      p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all
                      ${!notif.read ? 'bg-indigo-50' : ''}
                      ${notif.type === 'success' ? 'border-l-4 border-green-500' : ''}
                      ${notif.type === 'warning' ? 'border-l-4 border-yellow-500' : ''}
                      ${notif.type === 'error' ? 'border-l-4 border-red-500' : ''}
                    `}
                    onClick={() => {
                      markAsRead(notif.id);
                      if (notif.actionUrl) {
                        window.location.href = notif.actionUrl;
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getNotificationIcon(notif.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{notif.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                        <p className="text-gray-400 text-xs mt-2">
                          {new Date(notif.time).toLocaleString()}
                        </p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
              <p>Stay updated with your academic journey</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
