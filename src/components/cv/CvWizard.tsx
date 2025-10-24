import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Button from "../ui/button/Button";
import { useNotifications } from "../common/Notification";
import { useCv } from "../../context/CvContext";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import WorkExperienceStep from "./steps/WorkExperienceStep";
import SkillsStep from "./steps/SkillsStep";
import EducationStep from "./steps/EducationStep";
import TemplateSelectionStep from "./steps/TemplateSelectionStep";
import PreviewStep from "./steps/PreviewStep";

export interface CvData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
    title: string;
  };
  workExperience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  skills: {
    technical: Array<{ name: string; level: number }>;
    soft: Array<{ name: string; level: number }>;
    languages: Array<{ name: string; proficiency: string }>;
  };
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    description: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    startDate: string;
    endDate: string;
  }>;
  selectedTemplate: string;
}

const initialCvData: CvData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    title: "",
  },
  workExperience: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  education: [],
  certifications: [],
  projects: [],
  selectedTemplate: "modern",
};

const steps = [
  { id: "personal", title: "Personal Info", description: "Basic information about yourself" },
  { id: "experience", title: "Work Experience", description: "Your professional experience" },
  { id: "skills", title: "Skills & Languages", description: "Your technical and soft skills" },
  { id: "education", title: "Education", description: "Your academic background" },
  { id: "template", title: "Template", description: "Choose your CV template" },
  { id: "preview", title: "Preview", description: "Review and download your CV" },
];

export default function CvWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cvData, setCvData] = useState<CvData>(initialCvData);
  const { success } = useNotifications();
  const { createCv } = useCv();

  const updateCvData = (section: keyof CvData, data: any) => {
    setCvData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep data={cvData.personalInfo} onUpdate={(data) => updateCvData('personalInfo', data)} />;
      case 1:
        return <WorkExperienceStep data={cvData.workExperience} onUpdate={(data) => updateCvData('workExperience', data)} />;
      case 2:
        return <SkillsStep data={cvData.skills} onUpdate={(data) => updateCvData('skills', data)} />;
      case 3:
        return <EducationStep data={cvData.education} onUpdate={(data) => updateCvData('education', data)} />;
      case 4:
        return <TemplateSelectionStep data={cvData.selectedTemplate} onUpdate={(data) => updateCvData('selectedTemplate', data)} />;
      case 5:
        return <PreviewStep cvData={cvData} />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Progress Steps */}
      <div className="col-span-12 animate-slide-up">
        <ComponentCard title="CV Creation Progress">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
            <div 
              className="bg-brand-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={`p-3 rounded-lg text-left transition-all ${
                  index === currentStep
                    ? 'bg-brand-100 dark:bg-brand-900 border-2 border-brand-500'
                    : index < currentStep
                    ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500'
                    : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="text-xs font-medium text-gray-900 dark:text-white">
                  {step.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {step.description}
                </div>
              </button>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Step Content */}
      <div className="col-span-12 animate-fade-in">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="col-span-12 animate-slide-up" style={{animationDelay: '0.1s'}}>
        <ComponentCard title="Navigation">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentStep < steps.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    // Save CV to context
                    const cvId = createCv(cvData);
                    success('CV Saved!', 'Your CV has been saved successfully and added to your collection.');
                    console.log('CV saved with ID:', cvId);
                  }}
                >
                  Save CV
                </Button>
              )}
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
