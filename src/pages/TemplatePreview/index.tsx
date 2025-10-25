import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design - Prime ATS style",
    path: "/preview/modern",
    color: "from-blue-500 to-purple-600",
    example: "Herman Walton - Sales Analyst"
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional layout - Classic style",
    path: "/preview/classic",
    color: "from-gray-700 to-gray-900",
    example: "John Smith - Executive Manager"
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Bold design with vibrant colors - Color Splash style",
    path: "/preview/creative",
    color: "from-purple-600 via-pink-500 to-red-500",
    example: "Gerri Smith - Creative Manager"
  },
  {
    id: "tech",
    name: "Tech Template",
    description: "Modern tech-focused design - Pure ATS style",
    path: "/preview/tech",
    color: "from-indigo-600 via-purple-600 to-pink-600",
    example: "Edward Newlin - Software Engineer"
  },
  {
    id: "nature",
    name: "Nature Template",
    description: "Fresh and organic design - Confetti style",
    path: "/preview/nature",
    color: "from-green-500 via-teal-500 to-blue-500",
    example: "Sarah Green - Environmental Scientist"
  },
  {
    id: "design",
    name: "Design Template",
    description: "Bold and vibrant design - Professional style",
    path: "/preview/design",
    color: "from-orange-400 via-red-500 to-pink-600",
    example: "Alex Martinez - UI/UX Designer"
  }
];

export default function TemplatePreviewIndex() {
  return (
    <>
      <PageMeta
        title="CV Template Previews - PDF Export Ready"
        description="Preview how each CV template looks when exported to PDF"
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              CV Template Previews
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Each template is optimized for PDF export. Click "View Full Preview" to see how your CV will look when exported.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <ComponentCard key={template.id} title={template.name}>
                <div className="space-y-4">
                  {/* Preview Color */}
                  <div className={`bg-gradient-to-br ${template.color} h-40 rounded-lg flex items-center justify-center text-white font-semibold text-lg shadow-lg`}>
                    {template.name}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {template.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                      Example: {template.example}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={template.path} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        View Full Preview
                      </Button>
                    </Link>
                    <Link to="/templates" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </ComponentCard>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12">
            <ComponentCard title="About These Previews">
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  These preview pages show exactly how each template will appear when exported to PDF. Each template includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Professional Layout:</strong> Optimized for ATS (Applicant Tracking Systems)</li>
                  <li><strong>Sample Data:</strong> Real-world examples to demonstrate the design</li>
                  <li><strong>PDF-Ready:</strong> Direct export capability with preserved styling</li>
                  <li><strong>Industry-Specific:</strong> Each template is tailored for different professions</li>
                </ul>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Tip:</strong> Use your browser's "Print to PDF" or "Save as PDF" feature on any preview page to export the template.
                  </p>
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Link to="/templates">
              <Button variant="primary" size="md">
                Browse All Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
