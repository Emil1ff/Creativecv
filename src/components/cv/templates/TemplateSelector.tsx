import { CvData } from "../CvWizard";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import CreativeTemplate from "./CreativeTemplate";

interface TemplateSelectorProps {
  cvData: CvData;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech and creative industries",
    preview: "bg-gradient-to-br from-blue-500 to-purple-600",
    component: ModernTemplate,
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional layout ideal for corporate and executive positions",
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
    component: ClassicTemplate,
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Bold design with vibrant colors for creative professionals",
    preview: "bg-gradient-to-br from-pink-500 to-orange-500",
    component: CreativeTemplate,
  },
];

export default function TemplateSelector({ cvData, selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  return (
    <div className="space-y-8">
      {/* Template Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg rounded-lg overflow-hidden ${
              selectedTemplate === template.id ? 'ring-2 ring-brand-500 shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className={`${template.preview} h-32 flex items-center justify-center text-white font-semibold text-lg`}>
              {template.name}
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Preview</h3>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden max-h-96 overflow-y-auto">
          <SelectedTemplateComponent cvData={cvData} />
        </div>
      </div>
    </div>
  );
}

