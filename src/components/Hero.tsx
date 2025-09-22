import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Land Your <span className="text-yellow-400">Dream Job</span> with AI-Powered Resumes
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100">
                Transform your career story with intelligent resume optimization that beats ATS systems and impresses recruiters.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors">
                Build My Resume
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors">
                See Templates
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-blue-200">ATS Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-blue-200">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-sm text-blue-200">User Rating</div>
              </div>
            </div>
          </div>
          
          <div className="lg:block">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68c97c5c6a3688c38f9949b6_1758035075377_bd97c3b7.webp" 
              alt="AI Resume Builder" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;