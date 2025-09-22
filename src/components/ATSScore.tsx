import React, { useState, useEffect } from 'react';

interface ATSScoreProps {
  data: any;
  setData: (data: any) => void;
}

const ATSScore: React.FC<ATSScoreProps> = ({ data }) => {
  const [score, setScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate ATS analysis
    const timer = setTimeout(() => {
      const calculatedScore = calculateATSScore(data);
      setScore(calculatedScore);
      setAnalyzing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [data]);

  const calculateATSScore = (resumeData: any) => {
    let score = 0;
    
    // Basic info completeness (20 points)
    if (resumeData.fullName && resumeData.email && resumeData.phone) score += 20;
    
    // Work experience (30 points)
    if (resumeData.workExperience?.length > 0) {
      score += 20;
      if (resumeData.workExperience.some((exp: any) => exp.responsibilities?.length > 2)) score += 10;
    }
    
    // Skills (20 points)
    if (resumeData.technicalSkills?.length >= 5) score += 15;
    if (resumeData.softSkills?.length >= 3) score += 5;
    
    // Education (15 points)
    if (resumeData.education?.length > 0) score += 15;
    
    // Professional summary (15 points)
    if (resumeData.professionalSummary?.length > 50) score += 15;
    
    return Math.min(score, 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent! Your resume is highly ATS-optimized.';
    if (score >= 70) return 'Good! Your resume should pass most ATS systems.';
    return 'Needs improvement. Consider enhancing key sections.';
  };

  const improvements = [
    { text: 'Add more technical skills', completed: (data.technicalSkills?.length || 0) >= 5 },
    { text: 'Include quantified achievements', completed: data.workExperience?.some((exp: any) => 
      exp.responsibilities?.some((resp: string) => /\d+/.test(resp))) },
    { text: 'Optimize professional summary', completed: (data.professionalSummary?.length || 0) > 50 },
    { text: 'Add relevant certifications', completed: (data.certifications?.length || 0) > 0 },
    { text: 'Include project details', completed: (data.projects?.length || 0) > 0 }
  ];

  const downloadResume = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${data.fullName || 'Resume'}_Resume.pdf`;
    link.click();
    
    // Show success message
    alert('Resume downloaded successfully!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ATS Compatibility Score</h2>
        <p className="text-gray-600">See how well your resume performs against Applicant Tracking Systems</p>
      </div>

      {analyzing ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Resume...</h3>
          <p className="text-gray-600">Our AI is evaluating your resume against ATS criteria</p>
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="mb-6">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/68c97c5c6a3688c38f9949b6_1758035098808_b8f037d2.webp" 
                alt="ATS Score" 
                className="w-24 h-24 mx-auto mb-4"
              />
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
                {score}%
              </div>
              <p className="text-lg text-gray-600 mb-4">{getScoreMessage(score)}</p>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
           
            <button
              onClick={downloadResume}
              className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mb-4"
            >
              Download Your Resume (PDF)
            </button>
            
            <p className="text-sm text-gray-500">
              Your resume will be formatted using the selected template
            </p>
          </div> 

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
            <div className="space-y-3">
              {improvements.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {item.completed ? '✓' : '○'}
                  </div>
                  <span className={item.completed ? 'text-gray-900' : 'text-gray-600'}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-900 mb-1">Keywords</div>
              <div className="text-sm text-blue-700">Matched: {Math.floor(score * 0.8)}%</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-900 mb-1">Format</div>
              <div className="text-sm text-green-700">ATS Readable</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-900 mb-1">Structure</div>
              <div className="text-sm text-purple-700">Well Organized</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ATSScore;