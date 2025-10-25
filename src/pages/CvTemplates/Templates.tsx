import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";
import ClassicTemplate from "../../components/cv/templates/ClassicTemplate";
import ModernTemplate from "../../components/cv/templates/ModernTemplate";
import CreativeTemplate from "../../components/cv/templates/CreativeTemplate";
import TechTemplate from "../../components/cv/templates/TechTemplate";
import NatureTemplate from "../../components/cv/templates/NatureTemplate";
import DesignTemplate from "../../components/cv/templates/DesignTemplate";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  popular?: boolean;
  industries?: string[];
  rating?: number;
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech and creative industries",
    category: "Professional",
    preview: "bg-gradient-to-br from-blue-500 to-purple-600",
    popular: true,
    industries: ["Technology", "Marketing", "Finance"],
    rating: 4.8,
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional layout ideal for corporate and executive positions",
    category: "Executive",
    preview: "bg-gradient-to-br from-gray-700 to-gray-900",
    industries: ["Finance", "Legal", "Consulting"],
    rating: 4.6,
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Bold design with vibrant colors for creative professionals",
    category: "Creative",
    preview: "bg-gradient-to-br from-purple-600 via-pink-500 to-red-500",
    industries: ["Design", "Arts", "Media"],
    rating: 4.9,
  },
  {
    id: "tech",
    name: "Tech Template",
    description: "Modern tech-focused design with gradient accents for IT professionals",
    category: "Professional",
    preview: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600",
    industries: ["Technology", "Engineering", "Software"],
    rating: 4.7,
  },
  {
    id: "nature",
    name: "Nature Template",
    description: "Fresh and organic design with natural color palette",
    category: "Creative",
    preview: "bg-gradient-to-br from-green-500 via-teal-500 to-blue-500",
    industries: ["Environmental", "Healthcare", "Education"],
    rating: 4.5,
  },
  {
    id: "design",
    name: "Design Template",
    description: "Bold and vibrant design perfect for designers and creatives",
    category: "Creative",
    preview: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600",
    popular: true,
    industries: ["Design", "Creative", "Marketing"],
    rating: 4.9,
  },
];

const categories = ["All", "Professional", "Executive", "Creative"];

// Sample CV data for preview
const sampleCvData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    title: "Senior Software Engineer",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "johndoe.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    summary: "Experienced software engineer with 8+ years in full-stack development. Specialized in React, Node.js, and cloud technologies."
  },
  workExperience: [
    {
      id: "1",
      position: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      current: true,
      description: "Leading development of microservices architecture and cloud infrastructure.",
      achievements: [
        "Reduced system latency by 40% through optimization",
        "Led team of 5 developers in successful project delivery",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ]
    },
    {
      id: "2",
      position: "Software Engineer",
      company: "StartUp Inc",
      location: "San Francisco, CA",
      startDate: "Jun 2018",
      endDate: "Dec 2019",
      current: false,
      description: "Developed full-stack web applications using React and Node.js.",
      achievements: [
        "Built responsive web applications serving 100K+ users",
        "Improved code quality through comprehensive testing"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of California",
      location: "Berkeley, CA",
      startDate: "2014",
      endDate: "2018",
      gpa: "3.8",
      description: "Focus on Software Engineering and Artificial Intelligence"
    }
  ],
  skills: {
    technical: [
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "TypeScript", level: 88 },
      { name: "AWS", level: 80 }
    ],
    soft: [
      { name: "Leadership", level: 85 },
      { name: "Communication", level: 90 },
      { name: "Problem Solving", level: 92 }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Professional" }
    ]
  },
  projects: [
    {
      id: "1",
      name: "E-Commerce Platform",
      startDate: "2023",
      endDate: "2024",
      description: "Built a scalable e-commerce platform handling 10K+ daily transactions.",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      url: "https://example.com"
    }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    }
  ],
  selectedTemplate: "modern"
};

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  // Render the correct template component for preview
  const renderTemplatePreview = (templateId: string) => {
    switch(templateId) {
      case 'modern':
        return <ModernTemplate cvData={sampleCvData} />;
      case 'classic':
        return <ClassicTemplate cvData={sampleCvData} />;
      case 'creative':
        return <CreativeTemplate cvData={sampleCvData} />;
      case 'tech':
        return <TechTemplate cvData={sampleCvData} />;
      case 'nature':
        return <NatureTemplate cvData={sampleCvData} />;
      case 'design':
        return <DesignTemplate cvData={sampleCvData} />;
      default:
        return <ModernTemplate cvData={sampleCvData} />;
    }
  };

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
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    {template.rating && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {template.rating}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {template.description}
                  </p>
                  
                  {/* Industries */}
                  {template.industries && template.industries.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.industries.slice(0, 2).map((industry, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-2 py-1 rounded"
                        >
                          {industry}
                        </span>
                      ))}
                      {template.industries.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                          +{template.industries.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPreviewTemplate(template.id)}
                      className="flex-1"
                    >
                      Preview
                    </Button>
                    <Link to={`/create?template=${template.id}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Use
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

      {/* Preview Modal */}
      {previewTemplate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setPreviewTemplate(null)}
        >
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] m-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {templates.find(t => t.id === previewTemplate)?.name} Preview
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  See how your CV will look with this template
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/create?template=${previewTemplate}`}>
                  <Button variant="primary" size="sm">
                    Use This Template
                  </Button>
                </Link>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto h-[calc(100%-80px)] p-4 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-4xl mx-auto">
                {renderTemplatePreview(previewTemplate)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
