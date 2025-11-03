import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";

interface TemplateSelectionStepProps {
  data: string;
  onUpdate: (data: string) => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech and creative industries",
    category: "Professional",
    preview: "bg-gradient-to-br from-blue-500 to-purple-600",
    popular: true,
    features: ["ATS Friendly", "Clean Layout", "Color Options", "Professional"]
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional layout ideal for corporate and executive positions",
    category: "Executive",
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
    features: ["Formal Design", "Corporate Style", "Traditional", "Executive"]
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Bold design with vibrant colors for creative professionals",
    category: "Creative",
    preview: "bg-gradient-to-br from-pink-500 to-orange-500",
    features: ["Creative Layout", "Vibrant Colors", "Portfolio Style", "Artistic"]
  },
  {
    id: "tech",
    name: "Tech Specialist",
    description: "Vibrant tech-focused design with modern gradients and dynamic layouts",
    category: "Technology",
    preview: "bg-gradient-to-br from-indigo-500 to-purple-500",
    popular: true,
    features: ["Tech Focused", "Modern Gradients", "Dynamic Layout", "Innovative"]
  },
  {
    id: "design",
    name: "Design Master",
    description: "Colorful and artistic design perfect for designers and creatives",
    category: "Design",
    preview: "bg-gradient-to-br from-orange-400 to-red-500",
    features: ["Artistic Layout", "Colorful Design", "Creative Focus", "Visual Impact"]
  },
  {
    id: "nature",
    name: "Nature Inspired",
    description: "Green and natural design with organic shapes and earth tones",
    category: "Eco-Friendly",
    preview: "bg-gradient-to-br from-green-500 to-teal-500",
    features: ["Eco-Friendly", "Natural Colors", "Organic Design", "Sustainable"]
  },
  {
    id: "purple",
    name: "Purple Creative",
    description: "Bold purple and pink design for creative professionals and artists",
    category: "Creative",
    preview: "bg-gradient-to-br from-purple-600 to-pink-500",
    features: ["Bold Colors", "Creative Layout", "Artistic Style", "Unique Design"]
  }
];

export default function TemplateSelectionStep({ data, onUpdate }: TemplateSelectionStepProps) {
  return (
    <ComponentCard title="Choose Your Template" desc="Select a template that best represents your professional style">
      <div className="space-y-6">
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Your template choice will determine the visual style and layout of your CV. 
            Choose one that aligns with your industry and personal brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                data === template.id 
                  ? 'ring-2 ring-brand-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onUpdate(template.id)}
            >
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {/* Template Preview */}
                <div className={`${template.preview} h-32 flex items-center justify-center text-white font-semibold text-lg relative`}>
                  {template.name}
                  {template.popular && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  {data === template.id && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Selected
                      </span>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400 px-2 py-1 rounded">
                      {template.category}
                    </span>
                    <Button
                      variant={data === template.id ? "primary" : "outline"}
                      size="sm"
                    >
                      {data === template.id ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal guidance instead of noisy comparison */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Tip: Choose Modern for ATS-friendly roles, Classic for corporate, Creative/Design for portfolios.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">💡 Template Selection Tips</h4>
          <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
            <li>• <strong>Modern Professional</strong> - Best for tech, marketing, and modern industries</li>
            <li>• <strong>Classic Executive</strong> - Ideal for corporate, finance, and traditional roles</li>
            <li>• <strong>Creative Portfolio</strong> - Perfect for design, art, and creative professionals</li>
            <li>• You can always change your template later if needed</li>
          </ul>
        </div>
      </div>
    </ComponentCard>
  );
}
