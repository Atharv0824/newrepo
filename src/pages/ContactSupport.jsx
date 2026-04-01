import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ContactSupport = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifySuccess, notifyInfo } = useNotification();
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hi! 👋 Welcome to Future Forge Support. How can I help you today?", sender: 'support', time: new Date() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Live Chat Functions
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: chatInput,
      sender: 'user',
      time: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const responses = [
        "Thank you for contacting us! Let me check that for you...",
        "I understand your concern. Let me look into this right away.",
        "That's a great question! Here's what I can tell you...",
        "I'm here to help! Let me get that information for you.",
        "Thanks for reaching out! Based on what you're saying..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const supportMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'support',
        time: new Date()
      };

      setChatMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);

      // Notify user
      notifyInfo('Live Chat', 'Support agent is responding to you');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, visible on lg screens */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header - Responsive */}
            <div className="text-center sm:text-left mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Contact & Support</h1>
              <p className="text-lg sm:text-xl text-gray-600">
                We're here to help! Get support whenever you need it
              </p>
            </div>

            {/* Emergency Banner - Mobile Friendly */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="text-3xl">🚨</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg sm:text-xl mb-1">Need Immediate Help?</h3>
                  <p className="text-sm sm:text-base opacity-90">Our emergency support team is available 24/7 for urgent issues</p>
                </div>
                <a 
                  href="tel:+91-9876543210" 
                  className="bg-white text-red-600 px-6 py-2 sm:py-3 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 whitespace-nowrap"
                >
                  📞 Call Now
                </a>
              </div>
            </div>

            {/* Quick Contact Info - Better Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card className="bg-white text-center p-4 sm:p-6 hover:shadow-xl transition-shadow border-2 hover:border-indigo-300">
                <div className="text-4xl sm:text-5xl mb-3">📧</div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">Email Us</h3>
                <a href="mailto:support@futureforge.com" className="text-indigo-600 hover:underline block mb-1 text-sm sm:text-base">
                  support@futureforge.com
                </a>
                <p className="text-xs sm:text-sm text-gray-500">⚡ Response within 24 hours</p>
              </Card>

              <Card className="bg-white text-center p-4 sm:p-6 hover:shadow-xl transition-shadow border-2 hover:border-green-300">
                <div className="text-4xl sm:text-5xl mb-3">💬</div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">Live Chat</h3>
                <p className="text-green-600 font-medium mb-1 text-sm sm:text-base">● Online Now</p>
                <p className="text-xs sm:text-sm text-gray-500">Available 9 AM - 6 PM IST</p>
                <button className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-all text-sm sm:text-base">
                  Start Chat
                </button>
              </Card>

              <Card className="bg-white text-center p-4 sm:p-6 hover:shadow-xl transition-shadow border-2 hover:border-blue-300">
                <div className="text-4xl sm:text-5xl mb-3">📞</div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">Call Us</h3>
                <a href="tel:+91-1800-123-4567" className="text-indigo-600 hover:underline block mb-1 text-sm sm:text-base">
                  +91-1800-123-4567
                </a>
                <p className="text-xs sm:text-sm text-gray-500">Toll Free • Mon-Sat</p>
              </Card>
            </div>

            {/* Social Support Links - NEW */}
            <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-md">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center sm:text-left">
                🌐 Connect With Us
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <a href="#" className="flex items-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all justify-center">
                  <span className="text-xl">📘</span>
                  <span className="text-sm font-medium hidden sm:inline">Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-2 p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all justify-center">
                  <span className="text-xl">📸</span>
                  <span className="text-sm font-medium hidden sm:inline">Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-2 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all justify-center">
                  <span className="text-xl">🐦</span>
                  <span className="text-sm font-medium hidden sm:inline">Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all justify-center">
                  <span className="text-xl">📺</span>
                  <span className="text-sm font-medium hidden sm:inline">YouTube</span>
                </a>
              </div>
            </div>

            {/* Tabs - Removed */}

            {/* FAQ - Mobile Friendly */}
            <Card className="bg-white">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 text-center sm:text-left">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mb-6 text-sm sm:text-base text-center sm:text-left">
                  Quick answers to common questions
                </p>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      q: 'How do I complete my profile?',
                      a: 'Go to Profile section from the sidebar menu and fill in all your academic details, interests, and career goals.'
                    },
                    {
                      q: 'How can I view college recommendations?',
                      a: 'Complete your profile first, then visit the Recommendations page to see personalized college matches based on your preferences.'
                    },
                    {
                      q: 'What is the aptitude test?',
                      a: 'Our aptitude test consists of 30 questions designed to assess your interests, strengths, and personality traits to suggest suitable career paths.'
                    },
                    {
                      q: 'How do I apply to colleges?',
                      a: 'Browse colleges from the Recommendations page, click on a college to view details, and use the "Apply Now" button to submit your application.'
                    },
                    {
                      q: 'Can I save colleges for later?',
                      a: 'Yes! Click the bookmark icon on any college card to save it to your list. You can access saved colleges from My Dashboard.'
                    },
                    {
                      q: 'How do I contact support?',
                      a: 'You can email us at support@futureforge.com, use the live chat during business hours, or call our toll-free number.'
                    },
                    {
                      q: 'What are support hours?',
                      a: 'Our support team is available Monday through Saturday, 9 AM to 6 PM IST. For urgent issues, we have 24/7 emergency support via phone.'
                    },
                    {
                      q: 'How quickly will I get a response?',
                      a: 'We typically respond to all support tickets within 24-48 hours during business days. Urgent issues are prioritized.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-start gap-2">
                        <span className="text-indigo-600 flex-shrink-0">{index + 1}.</span>
                        <span>{faq.q}</span>
                      </h3>
                      <p className="text-gray-700 ml-6 text-sm sm:text-base">{faq.a}</p>
                    </div>
                  ))}
                </div>
                
                {/* Still Need Help */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Still need help?</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">Our support team is here to assist you</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" onClick={() => window.open('mailto:support@futureforge.com')}>
                      📧 Email Us
                    </Button>
                    <Button variant="outline" onClick={() => setShowChat(true)}>
                      💬 Start Live Chat
                    </Button>
                  </div>
                </div>
              </Card>
          </div>
        </main>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50"
        title="Live Chat Support"
      >
        {showChat ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.04 9.04 0 01-6-2.278m15-5.728A9.04 9.04 0 0012 4c-4.97 0-9 3.582-9 8s4.03 8 9 8a9.04 9.04 0 006-2.278M8 12h.01M12 12h.01M16 12h.01" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="font-bold">Support Chat</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online Now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                    {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 transition-all transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Future Forge AI Assistant 🤖
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactSupport;
