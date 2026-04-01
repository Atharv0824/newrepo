import React from 'react';

const HeroSection = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 via-purple-100 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background decorative elements with educational theme */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-200 to-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        
        {/* Educational icons floating in background */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce-slow">📚</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float">🎓</div>
        <div className="absolute bottom-20 left-20 text-6xl opacity-10 animate-bounce-slow animation-delay-1000">✏️</div>
        <div className="absolute bottom-40 right-10 text-5xl opacity-10 animate-float animation-delay-3000">🌟</div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-10 animate-pulse-slow">💡</div>
        <div className="absolute top-2/3 right-1/4 text-4xl opacity-10 animate-bounce-slow">🚀</div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-50"></div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left side - Content */}
        <div className="text-center lg:text-left space-y-8 animate-slide-up">
          <div className="space-y-4">
            {/* Badge */}
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-full text-sm shadow-lg animate-glow">
              🎯 India's #1 Career Guidance Platform
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 leading-tight animate-gradient">
              {title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 max-w-3xl font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
          
          {/* Enhanced Stats with glassmorphism */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-gray-700 font-semibold mt-2">Students Guided</div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-gray-700 font-semibold mt-2">Colleges Listed</div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 group-hover:scale-110 transition-transform duration-300">98%</div>
              <div className="text-gray-700 font-semibold mt-2">Success Rate</div>
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-lg rounded-full shadow-lg border border-white/30">
              <span className="text-2xl">✅</span>
              <span className="font-semibold text-gray-700">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-lg rounded-full shadow-lg border border-white/30">
              <span className="text-2xl">🎯</span>
              <span className="font-semibold text-gray-700">Personalized</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-lg rounded-full shadow-lg border border-white/30">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold text-gray-700">Expert Verified</span>
            </div>
          </div>
        </div>
        
        {/* Right side - Form container with enhanced design */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_30px_80px_rgba(99,102,241,0.25)] p-8 md:p-12 border border-white/40 hover:shadow-[0_40px_100px_rgba(168,85,247,0.35)] transition-all duration-500 hover:-translate-y-2 animate-scale-in">
          {children}
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent opacity-50"></div>
    </div>
  );
};

export default HeroSection;