// src/components/ResumePreview.tsx
import React from "react";

interface ResumePreviewProps {
  data: any;
  selectedTemplate: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, selectedTemplate }) => {
  return (
    <div id="resume-preview" className="p-8 bg-white">
      {/* Personal Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p>{data.email} | {data.phone}</p>
        {data.location && <p>{data.location}</p>}
      </div>

      {/* Work Experience */}
      {data.work && data.work.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
          {data.work.map((job: any, idx: number) => (
            <div key={idx} className="mb-4">
              <p className="font-bold">{job.position} @ {job.company}</p>
              {(job.startDate || job.endDate) && (
                <p className="text-sm text-gray-600">
                  {job.startDate} - {job.endDate}
                </p>
              )}
              {job.summary && <p className="mt-1">{job.summary}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {data.education.map((edu: any, idx: number) => (
            <div key={idx} className="mb-4">
              <p className="font-bold">{edu.degree}</p>
              <p>{edu.institution}</p>
              {(edu.startYear || edu.endYear) && (
                <p className="text-sm text-gray-600">
                  {edu.startYear} - {edu.endYear}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc list-inside">
            {data.skills.map((skill: any, idx: number) => (
              <li key={idx}>{skill.skill || skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
