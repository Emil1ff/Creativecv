import PageMeta from "../../components/common/PageMeta";
import ModernTemplate from "../../components/cv/templates/ModernTemplate";

const sampleCvData = {
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
    summary: "An organized and motivated individual, eager to utilize time management and organizational skills across diverse settings. Seeking entry-level opportunities to enhance abilities while contributing to company growth."
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
      achievements: [
        "Worked as a salesperson in a bike shop",
        "Assisted customers with bike selection and maintenance",
        "Managed inventory and organized displays"
      ]
    },
    {
      id: "2",
      position: "Freelance Consultant",
      company: "Global LLC",
      location: "Global City",
      startDate: "Apr 2017",
      endDate: "Jul 2020",
      current: false,
      description: "",
      achievements: [
        "Provided consulting services to various clients",
        "Developed business strategies and marketing plans"
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master's Degree in Business Administration",
      school: "Metropolitan University",
      location: "Metro City",
      startDate: "2015",
      endDate: "2017",
      gpa: "3.8",
      description: "Focus on Marketing and Strategy"
    }
  ],
  skills: {
    technical: [
      { name: "Data Analysis", level: 85 },
      { name: "Sales Strategy", level: 90 },
      { name: "CRM Software", level: 80 },
      { name: "Excel", level: 88 }
    ],
    soft: [
      { name: "Communication", level: 92 },
      { name: "Leadership", level: 85 },
      { name: "Problem Solving", level: 88 }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Intermediate" }
    ]
  },
  projects: [],
  certifications: [],
  selectedTemplate: "modern"
};

export default function ModernPreview() {
  return (
    <>
      <PageMeta
        title="Modern Template Preview - Professional CV"
        description="Preview of Modern Professional CV template"
      />
      
      <div className="min-h-screen bg-white">
        <ModernTemplate cvData={sampleCvData} />
      </div>
    </>
  );
}
