import React, { useState } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import WorkExperienceForm from "./WorkExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import TemplateSelector from "./TemplateSelector";
import ATSScore from "./ATSScore";

import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/Morderntemplate";
import SleekTemplate from "./templates/Sleektemplate";

import { PDFDownloadLink, Document } from "@react-pdf/renderer";

const steps = [
  { id: 1, name: "Personal Info", component: PersonalInfoForm },
  { id: 2, name: "Work Experience", component: WorkExperienceForm },
  { id: 3, name: "Education", component: EducationForm },
  { id: 4, name: "Skills", component: SkillsForm },
  { id: 5, name: "Template", component: TemplateSelector },
  { id: 6, name: "ATS Score", component: ATSScore },
];

// Wrapper document needed for React-pdf
const ResumeDocument = ({ data, Template }) => (
  <Document>
    <Template data={data} />
  </Document>
);

const TemplateComponents = {
  default: ClassicTemplate,
  modern: ModernTemplate,
  sleek: SleekTemplate,
};

const ResumeWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [resumeData, setResumeData] = useState<any>({
    template: "default",
    personalInfo: {},
    workExperience: [],
    education: [],
    skills: {},
    certifications: [],
  });

  const CurrentComponent =
    steps.find((step) => step.id === currentStep)?.component || null;

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const updateData = (newData: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      ...newData,
    }));
  };

  const SelectedTemplate =
    TemplateComponents[resumeData.template] || ClassicTemplate;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`ml-2 font-medium ${
                  currentStep >= step.id ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 mx-4 ${
                    currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {CurrentComponent && (
          <CurrentComponent data={resumeData} setData={updateData} />
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep === steps.length ? (
            <PDFDownloadLink
              document={<ResumeDocument data={resumeData} Template={SelectedTemplate} />}
              fileName={`${resumeData.personalInfo?.fullName || "resume"}.pdf`}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              {({ loading }) =>
                loading ? "Preparing PDF..." : "Download Resume"
              }
            </PDFDownloadLink>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeWizard;
