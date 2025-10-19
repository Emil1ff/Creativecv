import { useRef } from "react";
import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import { CvData } from "../CvWizard";

interface PreviewStepProps {
  cvData: CvData;
}

export default function PreviewStep({ cvData }: PreviewStepProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  // Export preview to PDF using html2canvas + jsPDF
  const handleDownloadPDF = async () => {
    try {
      // Dynamic import to keep bundle size smaller
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = previewRef.current;
      if (!el) return;

      const canvas = await html2canvas(el, { 
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const getTemplateStyles = () => {
    switch (cvData.selectedTemplate) {
      case "modern":
        return "bg-white border-l-4 border-blue-500";
      case "classic":
        return "bg-white border border-gray-300";
      case "creative":
        return "bg-gradient-to-br from-pink-50 to-orange-50 border-l-4 border-pink-500";
      case "minimal":
        return "bg-white";
      case "tech":
        return "bg-white border-l-4 border-indigo-500";
      case "academic":
        return "bg-white border-l-4 border-amber-500";
      default:
        return "bg-white border-l-4 border-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      <ComponentCard title="CV Preview & Download" desc="Review your CV and download it as PDF">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            variant="primary"
            onClick={handleDownloadPDF}
            className="flex-1"
          >
            📄 Download as PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex-1"
          >
            🖨️ Print CV
          </Button>
        </div>

        {/* CV Preview */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div 
            ref={previewRef}
            className={`${getTemplateStyles()} p-8 max-w-4xl mx-auto`}
            style={{ minHeight: "800px" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-900 mb-2">
                {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-700 mb-2">
                {cvData.personalInfo.title}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-700">
                <span>{cvData.personalInfo.location}</span>
                <span>•</span>
                <span>{cvData.personalInfo.email}</span>
                <span>•</span>
                <span>{cvData.personalInfo.phone}</span>
                {cvData.personalInfo.website && (
                  <>
                    <span>•</span>
                    <span>{cvData.personalInfo.website}</span>
                  </>
                )}
                {cvData.personalInfo.linkedin && (
                  <>
                    <span>•</span>
                    <span>{cvData.personalInfo.linkedin}</span>
                  </>
                )}
                {cvData.personalInfo.github && (
                  <>
                    <span>•</span>
                    <span>{cvData.personalInfo.github}</span>
                  </>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {cvData.personalInfo.summary && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-3 border-b border-gray-300 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 dark:text-gray-700 leading-relaxed">
                  {cvData.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {cvData.workExperience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-4 border-b border-gray-300 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {cvData.workExperience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-900">
                            {exp.position}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-700">{exp.company}</p>
                          {exp.location && (
                            <p className="text-sm text-gray-600 dark:text-gray-600">{exp.location}</p>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-600 dark:text-gray-600">
                          <p>
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </p>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-700 dark:text-gray-700 mb-2">{exp.description}</p>
                      )}
                      {exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-700 space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0 || cvData.skills.languages.length > 0) && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-4 border-b border-gray-300 pb-1">
                  Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cvData.skills.technical.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-900 mb-2">Technical Skills</h3>
                      <div className="flex flex-wrap gap-1">
                        {cvData.skills.technical.map((skill, index) => (
                          <span key={index} className="bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-700 px-2 py-1 rounded text-sm">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {cvData.skills.soft.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-900 mb-2">Soft Skills</h3>
                      <div className="flex flex-wrap gap-1">
                        {cvData.skills.soft.map((skill, index) => (
                          <span key={index} className="bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-700 px-2 py-1 rounded text-sm">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {cvData.skills.languages.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-900 mb-2">Languages</h3>
                      <div className="space-y-1">
                        {cvData.skills.languages.map((language, index) => (
                          <div key={index} className="text-sm text-gray-700 dark:text-gray-700">
                            {language.name} ({language.proficiency})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-4 border-b border-gray-300 pb-1">
                  Education
                </h2>
                <div className="space-y-3">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-900">
                            {edu.degree}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-700">{edu.school}</p>
                          {edu.location && (
                            <p className="text-sm text-gray-600 dark:text-gray-600">{edu.location}</p>
                          )}
                          {edu.gpa && (
                            <p className="text-sm text-gray-600 dark:text-gray-600">GPA: {edu.gpa}</p>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-600 dark:text-gray-600">
                          <p>{edu.startDate} - {edu.endDate}</p>
                        </div>
                      </div>
                      {edu.description && (
                        <p className="text-gray-700 dark:text-gray-700 mt-1 text-sm">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ComponentCard>

      {/* Final Actions */}
      <ComponentCard title="Final Actions">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎉 Your CV is Ready!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your professional CV has been created successfully. You can download it as PDF or save it to your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={handleDownloadPDF}
            >
              📄 Download PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Save to profile functionality
                console.log("Saving CV to profile:", cvData);
                alert("CV saved to your profile!");
              }}
            >
              💾 Save to Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Start over functionality
                window.location.reload();
              }}
            >
              🔄 Create Another CV
            </Button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
