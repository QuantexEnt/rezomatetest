import React from 'react';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Enhancement',
    description: 'Transform your basic work experience into compelling achievements that showcase your impact and value.'
  },
  {
    icon: '🎯',
    title: 'ATS Optimization',
    description: 'Get real-time ATS compatibility scores and suggestions to ensure your resume passes automated screening.'
  },
  {
    icon: '📊',
    title: 'Job Match Analysis',
    description: 'Input job descriptions to get personalized keyword optimization and content suggestions.'
  },
  {
    icon: '🎨',
    title: 'Professional Templates',
    description: 'Choose from expertly designed templates that look great and perform well with ATS systems.'
  },
  {
    icon: '📈',
    title: 'Impact Quantification',
    description: 'AI helps you identify and highlight measurable achievements that demonstrate your value to employers.'
  },
  {
    icon: '⚡',
    title: 'Instant Download',
    description: 'Generate and download your optimized resume in PDF format, ready for job applications.'
  }
];

const Features: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Resume Builder?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent platform combines cutting-edge AI with proven resume strategies to help you land more interviews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs with our AI-powered resume builder.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Building Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;