import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import ModernTemplate from "../../components/cv/templates/ModernTemplate";
import ClassicTemplate from "../../components/cv/templates/ClassicTemplate";
import CreativeTemplate from "../../components/cv/templates/CreativeTemplate";
import TechTemplate from "../../components/cv/templates/TechTemplate";
import NatureTemplate from "../../components/cv/templates/NatureTemplate";
import DesignTemplate from "../../components/cv/templates/DesignTemplate";

// Sample data for each template
const modernData = {
  personalInfo: {
    firstName: "Herman",
    lastName: "Walton",
    title: "SALES ANALYST",
    email: "example@email.com",
    phone: "+123-456-7890",
    location: "Address line",
    website: "example.com",
    linkedin: "linkedin.com/in/example",
    github: "github.com/hermanwalton",
    summary: "An organized and motivated individual, eager to utilize time management and organizational skills across diverse settings."
  },
  workExperience: [
    {
      id: "1",
      position: "Creative Bike Salesperson",
      company: "Creative Transportation",
      location: "Metro, Florida",
      startDate: "Aug 2020",
      endDate: "Dec 2022",
      current: false,
      description: "",
      achievements: ["Worked as a salesperson in a bike shop", "Assisted customers with bike selection"]
    }
  ],
  education: [{ id: "1", degree: "Master's Degree in Business Administration", school: "Metropolitan University", location: "Metro City", startDate: "2015", endDate: "2017", gpa: "3.8", description: "Focus on Marketing" }],
  skills: { technical: [{ name: "Data Analysis", level: 85 }, { name: "Sales Strategy", level: 90 }], soft: [{ name: "Communication", level: 92 }], languages: [{ name: "English", proficiency: "Native" }] },
  projects: [],
  certifications: [],
  selectedTemplate: "modern"
};

const classicData = {
  personalInfo: {
    firstName: "John",
    lastName: "Smith",
    title: "Executive Manager",
    email: "john.smith@email.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    website: "johnsmith.com",
    linkedin: "linkedin.com/in/johnsmith",
    github: "github.com/johnsmith",
    summary: "Results-driven executive with over 15 years of experience in strategic planning and operations management."
  },
  workExperience: [
    {
      id: "1",
      position: "Chief Operating Officer",
      company: "Fortune 500 Corporation",
      location: "New York, NY",
      startDate: "Jan 2018",
      endDate: "Present",
      current: true,
      description: "",
      achievements: ["Led operational transformation resulting in 35% cost reduction"]
    }
  ],
  education: [{ id: "1", degree: "Master of Business Administration (MBA)", school: "Harvard Business School", location: "Boston, MA", startDate: "2008", endDate: "2010", gpa: "3.9", description: "Strategic Management" }],
  skills: { technical: [{ name: "Strategic Planning", level: 95 }], soft: [{ name: "Leadership", level: 96 }], languages: [{ name: "English", proficiency: "Native" }] },
  projects: [],
  certifications: [],
  selectedTemplate: "classic"
};

const creativeData = {
  personalInfo: {
    firstName: "Gerri",
    lastName: "Smith",
    title: "SETUARY MANAGER",
    email: "gerrismith@email.com",
    phone: "(702) 554-7168",
    location: "Fingerprint Rise Sengerema",
    website: "gerrismith.com",
    linkedin: "linkedin.com/in/gerrismith",
    github: "github.com/gerrismith",
    summary: "Creative professional with expertise in design, branding, and visual storytelling."
  },
  workExperience: [
    {
      id: "1",
      position: "Senior Creative Director",
      company: "Design Studio Pro",
      location: "San Francisco, CA",
      startDate: "Jan 2019",
      endDate: "Present",
      current: true,
      description: "",
      achievements: ["Led creative team of 12 designers and artists"]
    }
  ],
  education: [{ id: "1", degree: "Bachelor of Fine Arts in Graphic Design", school: "Rhode Island School of Design", location: "Providence, RI", startDate: "2011", endDate: "2015", gpa: "3.7", description: "Visual Communication" }],
  skills: { technical: [{ name: "Adobe Creative Suite", level: 95 }], soft: [{ name: "Creativity", level: 98 }], languages: [{ name: "English", proficiency: "Native" }] },
  projects: [{ id: "1", name: "Global Brand Redesign", startDate: "2023", endDate: "2024", description: "Complete visual identity overhaul", technologies: ["Branding"] }],
  certifications: [],
  selectedTemplate: "creative"
};

const techData = {
  personalInfo: {
    firstName: "Edward",
    lastName: "Newlin",
    title: "Software Engineer",
    email: "edward.newlin@email.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    website: "edwardnewlin.dev",
    linkedin: "linkedin.com/in/edwardnewlin",
    github: "github.com/edwardnewlin",
    summary: "Full-stack software engineer with 6+ years of experience building scalable web applications."
  },
  workExperience: [
    {
      id: "1",
      position: "Senior Software Engineer",
      company: "Tech Innovations Inc",
      location: "Seattle, WA",
      startDate: "Jan 2021",
      endDate: "Present",
      current: true,
      description: "",
      achievements: ["Architected microservices handling 1M+ requests daily"]
    }
  ],
  education: [{ id: "1", degree: "Bachelor of Science in Computer Science", school: "University of Washington", location: "Seattle, WA", startDate: "2014", endDate: "2018", gpa: "3.9", description: "Software Engineering" }],
  skills: { technical: [{ name: "React", level: 92 }, { name: "Node.js", level: 88 }], soft: [{ name: "Problem Solving", level: 94 }], languages: [{ name: "English", proficiency: "Native" }] },
  projects: [{ id: "1", name: "Real-time Chat Application", startDate: "2023", endDate: "2024", description: "Built scalable messaging platform", technologies: ["React", "Node.js"] }],
  certifications: [{ id: "1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2023" }],
  selectedTemplate: "tech"
};

const natureData = {
  personalInfo: {
    firstName: "Sarah",
    lastName: "Green",
    title: "Environmental Scientist",
    email: "sarah.green@email.com",
    phone: "+1 (555) 876-5432",
    location: "Portland, OR",
    website: "sarahgreen.eco",
    linkedin: "linkedin.com/in/sarahgreen",
    github: "github.com/sarahgreen",
    summary: "Dedicated environmental scientist with 8+ years of experience in sustainability research."
  },
  workExperience: [
    {
      id: "1",
      position: "Senior Environmental Scientist",
      company: "EcoSolutions Research Institute",
      location: "Portland, OR",
      startDate: "Mar 2019",
      endDate: "Present",
      current: true,
      description: "",
      achievements: ["Led 15+ environmental impact assessment projects"]
    }
  ],
  education: [{ id: "1", degree: "Master of Science in Environmental Science", school: "University of Oregon", location: "Eugene, OR", startDate: "2013", endDate: "2015", gpa: "3.9", description: "Ecology" }],
  skills: { technical: [{ name: "Environmental Impact Assessment", level: 92 }], soft: [{ name: "Research", level: 94 }], languages: [{ name: "English", proficiency: "Native" }] },
  projects: [],
  certifications: [{ id: "1", name: "Certified Environmental Professional (CEP)", issuer: "Academy of Board Certified Environmental Professionals", date: "2020" }],
  selectedTemplate: "nature"
};

const designData = {
  personalInfo: {
    firstName: "Alex",
    lastName: "Martinez",
    title: "UI/UX Designer",
    email: "alex.martinez@email.com",
    phone: "+1 (555) 321-9876",
    location: "Austin, TX",
    website: "alexmartinez.design",
    linkedin: "linkedin.com/in/alexmartinez",
    github: "github.com/alexmartinez",
    summary: "Award-winning UI/UX designer with 7+ years of experience creating intuitive digital experiences."
  },
  workExperience: [
    {
      id: "1",
      position: "Lead UX Designer",
      company: "Design Tech Studio",
      location: "Austin, TX",
      startDate: "Feb 2020",
      endDate: "Present",
      current: true,
      description: "",
      achievements: ["Led design team of 6 designers on multiple product launches"]
    }
  ],
  education: [{ id: "1", degree: "Bachelor of Fine Arts in Interaction Design", school: "California College of the Arts", location: "San Francisco, CA", startDate: "2013", endDate: "2017", gpa: "3.9", description: "Digital Media" }],
  skills: { technical: [{ name: "Figma", level: 95 }], soft: [{ name: "Creative Thinking", level: 96 }], languages: [{ name: "English", proficiency: "Native" }] },
  projects: [{ id: "1", name: "Mobile Banking App Redesign", startDate: "2023", endDate: "2024", description: "Complete UX overhaul", technologies: ["Figma"] }],
  certifications: [{ id: "1", name: "Google UX Design Professional Certificate", issuer: "Google", date: "2021" }],
  selectedTemplate: "design"
};

const templates = [
  { id: "modern", name: "Modern Professional", component: ModernTemplate, data: modernData, color: "blue" },
  { id: "classic", name: "Classic Executive", component: ClassicTemplate, data: classicData, color: "gray" },
  { id: "creative", name: "Creative Portfolio", component: CreativeTemplate, data: creativeData, color: "purple" },
  { id: "tech", name: "Tech Template", component: TechTemplate, data: techData, color: "indigo" },
  { id: "nature", name: "Nature Template", component: NatureTemplate, data: natureData, color: "green" },
  { id: "design", name: "Design Template", component: DesignTemplate, data: designData, color: "orange" }
];

export default function PreviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTemplate = templates[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
  };

  const handleExportPDF = () => {
    window.print();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <PageMeta
        title={`${currentTemplate.name} Preview - CV Templates`}
        description="Navigate through all CV templates with interactive slider"
      />
      
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Navigation Header - Hidden in print */}
        <div className="print:hidden sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Template Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentTemplate.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Template {currentIndex + 1} of {templates.length}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {/* Template Dots */}
                <div className="flex gap-2">
                  {templates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-blue-600 w-8"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                      }`}
                      title={templates[index].name}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Export PDF Button */}
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export PDF
                </button>
              </div>
            </div>

            {/* Template Selector Dropdown */}
            <div className="mt-4">
              <select
                value={currentIndex}
                onChange={(e) => setCurrentIndex(Number(e.target.value))}
                className="w-full md:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {templates.map((template, index) => (
                  <option key={template.id} value={index}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Template Preview */}
        <div className="py-8 print:py-0">
          <div className="max-w-5xl mx-auto px-4 print:px-0 print:max-w-none">
            <div className="bg-white rounded-lg shadow-lg print:shadow-none print:rounded-none">
              <currentTemplate.component cvData={currentTemplate.data} />
            </div>
          </div>
        </div>

        {/* Keyboard Navigation Hint - Hidden in print */}
        <div className="print:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-full text-sm">
          Use ← → arrow keys to navigate
        </div>
      </div>
    </>
  );
}
