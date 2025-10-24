import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  popular?: boolean;
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech and creative industries",
    category: "Professional",
    preview: "bg-gradient-to-br from-blue-500 to-purple-600",
    popular: true,
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional layout ideal for corporate and executive positions",
    category: "Executive",
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Bold design with vibrant colors for creative professionals",
    category: "Creative",
    preview: "bg-gradient-to-br from-pink-500 to-orange-500",
  },
];

const categories = ["All", "Professional", "Executive", "Creative"];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <>
      <PageMeta
        title="CV Templates - Professional Resume Templates | Creative CV"
        description="Choose from our collection of professional CV templates. Find the perfect template for your industry and create a stunning resume."
      />
      
      {/* Header */}
      <div className="col-span-12 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your CV Template
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select from our professionally designed templates. Each template is optimized for different industries and job types.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="col-span-12 mb-8">
        <ComponentCard title="Filter Templates">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="col-span-12 md:col-span-6 lg:col-span-4">
            <div
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id ? 'ring-2 ring-brand-500' : ''
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <ComponentCard title={template.name}>
              <div className="relative">
                {template.popular && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                
                {/* Template Preview */}
                <div className={`${template.preview} h-48 rounded-lg mb-4 flex items-center justify-center text-white font-semibold text-lg`}>
                  {template.name}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                      {template.category}
                    </span>
                    <Link to={`/create?template=${template.id}`}>
                      <Button variant="primary" size="sm">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              </ComponentCard>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Template Actions */}
      {selectedTemplate && (
        <div className="col-span-12 mt-8">
          <ComponentCard title="Selected Template" desc="Ready to create your CV with this template?">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/create?template=${selectedTemplate}`}>
                <Button variant="primary" size="md">
                  Create CV with {templates.find(t => t.id === selectedTemplate)?.name}
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="md"
                onClick={() => setSelectedTemplate(null)}
              >
                Cancel Selection
              </Button>
            </div>
          </ComponentCard>
        </div>
      )}
    </>
  );
}
