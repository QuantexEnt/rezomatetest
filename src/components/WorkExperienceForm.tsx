import React, { useState } from 'react';

interface WorkExperienceFormProps {
  data: any;
  setData: (data: any) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ data, setData }) => {
  const [experiences, setExperiences] = useState(data.workExperience || [
    {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      responsibilities: ['']
    }
  ]);

  const addExperience = () => {
    const newExp = {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      responsibilities: ['']
    };
    const updated = [...experiences, newExp];
    setExperiences(updated);
    setData({ ...data, workExperience: updated });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = experiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updated);
    setData({ ...data, workExperience: updated });
  };

  const addResponsibility = (expIndex: number) => {
    const updated = experiences.map((exp, i) => 
      i === expIndex ? { ...exp, responsibilities: [...exp.responsibilities, ''] } : exp
    );
    setExperiences(updated);
    setData({ ...data, workExperience: updated });
  };
  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const updated = experiences.map((exp, i) => 
      i === expIndex ? {
        ...exp,
        responsibilities: exp.responsibilities.filter((_, j) => j !== respIndex)
      } : exp
    );
    setExperiences(updated);
    setData({ ...data, workExperience: updated });
  };

  const removeExperience = (expIndex: number) => {
    const updated = experiences.filter((_, i) => i !== expIndex);
    setExperiences(updated);
    setData({ ...data, workExperience: updated });
  };

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    const updated = experiences.map((exp, i) => 
      i === expIndex ? {
        ...exp,
        responsibilities: exp.responsibilities.map((resp, j) => j === respIndex ? value : resp)
      } : exp
    );
    setExperiences(updated);
    setData({ ...data, workExperience: updated });
  };

  const enhanceResponsibilities = (expIndex: number) => {
    const enhanced = [
      "Led cross-functional teams to deliver high-impact projects, resulting in 25% increase in operational efficiency",
      "Implemented innovative solutions that reduced costs by $50K annually while improving customer satisfaction by 30%",
      "Collaborated with stakeholders to drive strategic initiatives and achieve key business objectives"
    ];
    updateExperience(expIndex, 'responsibilities', enhanced);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your professional experience with AI-powered enhancements</p>
      </div>

      {experiences.map((exp, expIndex) => (
        <div key={expIndex} className="border border-gray-200 rounded-lg p-6 space-y-4 relative">
          {experiences.length > 1 && (
            <button
              onClick={() => removeExperience(expIndex)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium"
            >
              ✕ Remove Experience
            </button>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => updateExperience(expIndex, 'jobTitle', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Software Engineer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tech Corp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                  disabled={exp.currentJob}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={exp.currentJob}
              onChange={(e) => updateExperience(expIndex, 'currentJob', e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">I currently work here</label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Key Responsibilities & Achievements</label>
              <button
                onClick={() => enhanceResponsibilities(expIndex)}
                className="flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                <img src="https://d64gsuwffb70l.cloudfront.net/68c97c5c6a3688c38f9949b6_1758035094156_2c63eb70.webp" alt="AI" className="w-4 h-4 mr-1" />
                AI Enhance
              </button>
            </div>
            
            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="mb-2 flex gap-2">
                <textarea
                  value={resp}
                  onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="• Describe your key responsibility or achievement..."
                  rows={2}
                />
                {exp.responsibilities.length > 1 && (
                  <button
                    onClick={() => removeResponsibility(expIndex, respIndex)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 h-fit mt-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={() => addResponsibility(expIndex)}
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              + Add Another Responsibility
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        + Add Another Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;