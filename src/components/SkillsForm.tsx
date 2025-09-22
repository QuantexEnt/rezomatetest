import React, { useState } from 'react';

interface SkillsFormProps {
  data: any;
  setData: (data: any) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, setData }) => {
  const [skills, setSkills] = useState({
    technical: data.technicalSkills || [],
    soft: data.softSkills || [],
    languages: data.languages || [],
    projects: data.projects || [{ name: '', description: '', technologies: '', link: '' }]
  });

  const [newSkill, setNewSkill] = useState({ technical: '', soft: '', language: '' });

  const addSkill = (category: 'technical' | 'soft' | 'languages') => {
    if (newSkill[category === 'languages' ? 'language' : category].trim()) {
      const updated = {
        ...skills,
        [category]: [...skills[category], newSkill[category === 'languages' ? 'language' : category]]
      };
      setSkills(updated);
      setData({ ...data, ...updated });
      setNewSkill({ ...newSkill, [category === 'languages' ? 'language' : category]: '' });
    }
  };

  const removeSkill = (category: 'technical' | 'soft' | 'languages', index: number) => {
    const updated = {
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index)
    };
    setSkills(updated);
    setData({ ...data, ...updated });
  };

  const addProject = () => {
    const updated = {
      ...skills,
      projects: [...skills.projects, { name: '', description: '', technologies: '', link: '' }]
    };
    setSkills(updated);
    setData({ ...data, projects: updated.projects });
  };

  const removeProject = (index: number) => {
    const updated = {
      ...skills,
      projects: skills.projects.filter((_, i) => i !== index)
    };
    setSkills(updated);
    setData({ ...data, projects: updated.projects });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = {
      ...skills,
      projects: skills.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    };
    setSkills(updated);
    setData({ ...data, projects: updated.projects });
  };

  const suggestSkills = () => {
    const suggested = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'Git'];
    const updated = {
      ...skills,
      technical: [...new Set([...skills.technical, ...suggested])]
    };
    setSkills(updated);
    setData({ ...data, technicalSkills: updated.technical });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Projects</h2>
        <p className="text-gray-600">Showcase your technical abilities and key projects</p>
      </div>

      {/* Technical Skills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Technical Skills</h3>
          <button
            onClick={suggestSkills}
            className="flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
          >
            <img src="https://d64gsuwffb70l.cloudfront.net/68c97c5c6a3688c38f9949b6_1758035094156_2c63eb70.webp" alt="AI" className="w-4 h-4 mr-1" />
            AI Suggest
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.technical.map((skill, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {skill}
              <button
                onClick={() => removeSkill('technical', index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill.technical}
            onChange={(e) => setNewSkill({ ...newSkill, technical: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addSkill('technical')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add technical skill..."
          />
          <button
            onClick={() => addSkill('technical')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Soft Skills</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.soft.map((skill, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {skill}
              <button
                onClick={() => removeSkill('soft', index)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill.soft}
            onChange={(e) => setNewSkill({ ...newSkill, soft: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addSkill('soft')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add soft skill..."
          />
          <button
            onClick={() => addSkill('soft')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Languages</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.languages.map((lang, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {lang}
              <button
                onClick={() => removeSkill('languages', index)}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill.language}
            onChange={(e) => setNewSkill({ ...newSkill, language: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addSkill('languages')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add language (e.g., English - Native)..."
          />
          <button
            onClick={() => addSkill('languages')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Key Projects</h3>
        
        {skills.projects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4 relative">
            {skills.projects.length > 1 && (
              <button
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-medium text-sm"
              >
                ✕ Remove Project
              </button>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="E-commerce Platform"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the project and your role..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, Node.js, MongoDB, AWS"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addProject}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          + Add Another Project
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;