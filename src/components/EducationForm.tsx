import React, { useState } from 'react';

interface EducationFormProps {
  data: any;
  setData: (data: any) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, setData }) => {
  const [education, setEducation] = useState(data.education || [
    {
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
      honors: '',
      relevantCourses: []
    }
  ]);

  const [certifications, setCertifications] = useState(data.certifications || [
    {
      name: '',
      issuer: '',
      date: '',
      expirationDate: '',
      credentialId: ''
    }
  ]);

  const addEducation = () => {
    const newEd = {
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
      honors: '',
      relevantCourses: []
    };
    const updated = [...education, newEd];
    setEducation(updated);
    setData({ ...data, education: updated });
  };

  const removeEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    setData({ ...data, education: updated });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = education.map((ed, i) => 
      i === index ? { ...ed, [field]: value } : ed
    );
    setEducation(updated);
    setData({ ...data, education: updated });
  };

  const addCertification = () => {
    const newCert = {
      name: '',
      issuer: '',
      date: '',
      expirationDate: '',
      credentialId: ''
    };
    const updated = [...certifications, newCert];
    setCertifications(updated);
    setData({ ...data, certifications: updated });
  };

  const removeCertification = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
    setData({ ...data, certifications: updated });
  };

  const updateCertification = (index: number, field: string, value: any) => {
    const updated = certifications.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    setCertifications(updated);
    setData({ ...data, certifications: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Certifications</h2>
        <p className="text-gray-600">Add your educational background and professional certifications</p>
      </div>

      {/* Education Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Education</h3>
        
        {education.map((ed, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4 relative">
            {education.length > 1 && (
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-medium text-sm"
              >
                ✕ Remove Education
              </button>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                <input
                  type="text"
                  value={ed.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School/University *</label>
                <input
                  type="text"
                  value={ed.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Stanford University"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={ed.location}
                  onChange={(e) => updateEducation(index, 'location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Stanford, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date</label>
                <input
                  type="month"
                  value={ed.graduationDate}
                  onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                <input
                  type="text"
                  value={ed.gpa}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3.8/4.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Honors/Awards</label>
                <input
                  type="text"
                  value={ed.honors}
                  onChange={(e) => updateEducation(index, 'honors', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Magna Cum Laude, Dean's List"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addEducation}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          + Add Another Education
        </button>
      </div>

      {/* Certifications Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Professional Certifications</h3>
        
        {certifications.map((cert, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4 relative">
            {certifications.length > 1 && (
              <button
                onClick={() => removeCertification(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-medium text-sm"
              >
                ✕ Remove Certification
              </button>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(index, 'date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                <input
                  type="month"
                  value={cert.expirationDate}
                  onChange={(e) => updateCertification(index, 'expirationDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID</label>
                <input
                  type="text"
                  value={cert.credentialId}
                  onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ABC123456789"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addCertification}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          + Add Another Certification
        </button>
      </div>
    </div>
  );
};

export default EducationForm;