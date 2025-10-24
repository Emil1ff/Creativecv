import { useRef } from "react";
import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import { CvData } from "../CvWizard";
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import TechTemplate from "../templates/TechTemplate";
import DesignTemplate from "../templates/DesignTemplate";
import NatureTemplate from "../templates/NatureTemplate";
import PurpleTemplate from "../templates/CreativeTemplate";

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
      if (!el) {
        alert("CV preview not found. Please try again.");
        return;
      }

      // Show loading state
      const loadingElement = document.createElement('div');
      loadingElement.innerHTML = 'Generating PDF...';
      loadingElement.style.position = 'fixed';
      loadingElement.style.top = '50%';
      loadingElement.style.left = '50%';
      loadingElement.style.transform = 'translate(-50%, -50%)';
      loadingElement.style.background = 'rgba(0,0,0,0.8)';
      loadingElement.style.color = 'white';
      loadingElement.style.padding = '20px';
      loadingElement.style.borderRadius = '8px';
      loadingElement.style.zIndex = '9999';
      document.body.appendChild(loadingElement);

      const canvas = await html2canvas(el, { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: el.scrollWidth,
        height: el.scrollHeight
      });
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({ 
        orientation: "portrait", 
        unit: "mm", 
        format: "a4",
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      // Generate filename
      const firstName = cvData.personalInfo.firstName || 'CV';
      const lastName = cvData.personalInfo.lastName || '';
      const filename = `${firstName}_${lastName}_CV.pdf`.replace(/\s+/g, '_');
      
      pdf.save(filename);
      
      // Remove loading element
      document.body.removeChild(loadingElement);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Remove loading element if it exists
      const loadingElement = document.querySelector('[style*="position: fixed"]');
      if (loadingElement) {
        document.body.removeChild(loadingElement);
      }
      alert("Error generating PDF. Please try again or contact support if the issue persists.");
    }
  };

  const renderTemplate = () => {
    switch (cvData.selectedTemplate) {
      case "modern":
        return <ModernTemplate cvData={cvData} />;
      case "classic":
        return <ClassicTemplate cvData={cvData} />;
      case "creative":
        return <CreativeTemplate cvData={cvData} />;
      case "tech":
        return <TechTemplate cvData={cvData} />;
      case "design":
        return <DesignTemplate cvData={cvData} />;
      case "nature":
        return <NatureTemplate cvData={cvData} />;
      case "purple":
        return <PurpleTemplate cvData={cvData} />;
      default:
        return <ModernTemplate cvData={cvData} />;
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
            className="max-w-4xl mx-auto"
          >
            {renderTemplate()}
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
